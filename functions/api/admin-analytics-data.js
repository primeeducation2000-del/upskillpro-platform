const DEFAULT_PASSWORD_HASH = '9b48c26a35f2e20d115c78d6e0cf33c407b5b9a839cdafbf8fd8ed3e4145983d';
const SESSION_COOKIE = 'upskillpro_admin_session';

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(cookieHeader.split(';').map((cookie) => cookie.trim().split('=')).filter(([key, value]) => key && value));
}

function encodeBase64Url(input) {
  const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return encodeBase64Url(new Uint8Array(signature));
}

async function verifySession(token, env) {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  const secret = env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD_SHA256 || DEFAULT_PASSWORD_HASH;
  const expected = await sign(payload, secret);
  if (signature !== expected) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)));
    if (!data.expiresAt || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

async function all(db, sql, bindings = []) {
  return db.prepare(sql).bind(...bindings).all().then((result) => result.results || []);
}

export async function onRequestGet({ request, env }) {
  const session = await verifySession(parseCookies(request.headers.get('Cookie') || '')[SESSION_COOKIE], env);
  if (!session) return json({ ok: false, error: 'Unauthorised.' }, { status: 401 });

  const db = env.UPSKILLPRO_ANALYTICS_DB;
  if (!db) {
    return json({ ok: true, setupRequired: true, events: [], summary: null });
  }

  const now = Date.now();
  const iso = (msAgo) => new Date(now - msAgo).toISOString();
  const [events, today, week, month, total, unique, returning, submissions, courseRows, sourceRows, pageRows, countryRows, cityRows, hourlyRows, dailyRows] = await Promise.all([
    all(db, 'SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT 80'),
    all(db, 'SELECT COUNT(*) AS count FROM analytics_events WHERE created_at >= ?', [new Date().toISOString().slice(0, 10)]),
    all(db, 'SELECT COUNT(*) AS count FROM analytics_events WHERE created_at >= ?', [iso(7 * 24 * 60 * 60 * 1000)]),
    all(db, 'SELECT COUNT(*) AS count FROM analytics_events WHERE created_at >= ?', [iso(30 * 24 * 60 * 60 * 1000)]),
    all(db, 'SELECT COUNT(*) AS count FROM analytics_events'),
    all(db, 'SELECT COUNT(DISTINCT session_id) AS count FROM analytics_events'),
    all(db, 'SELECT COUNT(*) AS count FROM (SELECT session_id FROM analytics_events GROUP BY session_id HAVING COUNT(*) > 1)'),
    all(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type IN ('lead_submit','training_request','whatsapp_click')"),
    all(db, 'SELECT course AS label, COUNT(*) AS value FROM analytics_events GROUP BY course ORDER BY value DESC LIMIT 8'),
    all(db, 'SELECT source AS label, COUNT(*) AS value FROM analytics_events GROUP BY source ORDER BY value DESC LIMIT 9'),
    all(db, 'SELECT path AS label, COUNT(*) AS value FROM analytics_events GROUP BY path ORDER BY value DESC LIMIT 10'),
    all(db, 'SELECT country AS label, COUNT(*) AS value FROM analytics_events GROUP BY country ORDER BY value DESC LIMIT 8'),
    all(db, 'SELECT city AS label, COUNT(*) AS value FROM analytics_events GROUP BY city ORDER BY value DESC LIMIT 8'),
    all(db, "SELECT strftime('%H', created_at) AS label, COUNT(*) AS value FROM analytics_events WHERE created_at >= ? GROUP BY label ORDER BY label", [iso(24 * 60 * 60 * 1000)]),
    all(db, "SELECT substr(created_at, 1, 10) AS label, COUNT(*) AS value FROM analytics_events WHERE created_at >= ? GROUP BY label ORDER BY label", [iso(14 * 24 * 60 * 60 * 1000)]),
  ]);

  const liveVisitors = new Set(events.filter((event) => new Date(event.created_at).getTime() > now - 5 * 60 * 1000).map((event) => event.session_id)).size;
  const conversionRate = unique[0]?.count ? ((submissions[0]?.count || 0) / unique[0].count) * 100 : 0;

  return json({
    ok: true,
    setupRequired: false,
    events,
    summary: {
      liveVisitors,
      visitorsToday: today[0]?.count || 0,
      visitorsThisWeek: week[0]?.count || 0,
      visitorsThisMonth: month[0]?.count || 0,
      totalVisitors: total[0]?.count || 0,
      uniqueVisitors: unique[0]?.count || 0,
      returningVisitors: returning[0]?.count || 0,
      conversionRate: `${conversionRate.toFixed(1)}%`,
      formSubmissions: submissions[0]?.count || 0,
      courseEnquiries: courseRows.reduce((sum, row) => sum + row.value, 0),
      courseRows,
      sourceRows,
      pageRows,
      countryRows,
      cityRows,
      hourlyRows,
      dailyRows,
    },
  });
}
