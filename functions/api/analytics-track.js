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

function detectDevice(userAgent = '') {
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
  if (/mobile|iphone|android/i.test(userAgent)) return 'Mobile';
  return 'Desktop';
}

function detectBrowser(userAgent = '') {
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome|chromium/i.test(userAgent)) return 'Safari';
  if (/chrome|chromium/i.test(userAgent)) return 'Chrome';
  return 'Unknown';
}

function detectOs(userAgent = '') {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/iphone|ipad|ios/i.test(userAgent)) return 'iOS';
  if (/android/i.test(userAgent)) return 'Android';
  if (/mac os|macintosh/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'Unknown';
}

function detectSource(referrer = '') {
  if (!referrer) return 'Direct';
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host.includes('google')) return 'Google Search';
    if (host.includes('bing')) return 'Bing';
    if (host.includes('facebook')) return 'Facebook';
    if (host.includes('instagram')) return 'Instagram';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('tiktok')) return 'TikTok';
    if (host.includes('youtube')) return 'YouTube';
    return 'Referral';
  } catch {
    return 'Referral';
  }
}

function detectCourse(path = '') {
  const clean = path.toLowerCase();
  const courseMap = [
    ['aws', 'AWS Training'],
    ['ccna', 'CCNA'],
    ['cyber', 'Cyber Security'],
    ['ai', 'AI Courses'],
    ['digital', 'Digital Skills'],
    ['esol', 'ESOL'],
    ['childcare', 'Childcare'],
    ['retail', 'Retail Courses'],
    ['english', 'ESOL'],
  ];
  return courseMap.find(([keyword]) => clean.includes(keyword))?.[1] || 'General UpSkillPro';
}

async function insertEvent(db, event) {
  await db.prepare(`
    INSERT INTO analytics_events (
      id, session_id, event_type, path, page_url, referrer, source, course,
      device, browser, os, country, city, timezone, duration_seconds,
      entry_page, exit_page, created_at, metadata_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    event.id,
    event.sessionId,
    event.eventType,
    event.path,
    event.pageUrl,
    event.referrer,
    event.source,
    event.course,
    event.device,
    event.browser,
    event.os,
    event.country,
    event.city,
    event.timezone,
    event.durationSeconds,
    event.entryPage,
    event.exitPage,
    event.createdAt,
    JSON.stringify(event.metadata || {})
  ).run();
}

export async function onRequestPost({ request, env }) {
  const db = env.UPSKILLPRO_ANALYTICS_DB;
  if (!db) {
    return json({ ok: false, setupRequired: true, error: 'D1 binding UPSKILLPRO_ANALYTICS_DB is not configured.' }, { status: 202 });
  }

  const body = await request.json().catch(() => ({}));
  const userAgent = request.headers.get('user-agent') || '';
  const cf = request.cf || {};
  const path = String(body.path || '/').slice(0, 260);
  const referrer = String(body.referrer || '').slice(0, 600);

  const event = {
    id: crypto.randomUUID(),
    sessionId: String(body.sessionId || crypto.randomUUID()).slice(0, 120),
    eventType: String(body.eventType || 'page_view').slice(0, 60),
    path,
    pageUrl: String(body.pageUrl || '').slice(0, 900),
    referrer,
    source: String(body.source || detectSource(referrer)).slice(0, 120),
    course: String(body.course || detectCourse(path)).slice(0, 160),
    device: detectDevice(userAgent),
    browser: detectBrowser(userAgent),
    os: detectOs(userAgent),
    country: String(cf.country || body.country || 'Unknown').slice(0, 120),
    city: String(cf.city || body.city || 'Unknown').slice(0, 120),
    timezone: String(cf.timezone || body.timezone || 'Unknown').slice(0, 120),
    durationSeconds: Number(body.durationSeconds || 0),
    entryPage: String(body.entryPage || path).slice(0, 260),
    exitPage: String(body.exitPage || '').slice(0, 260),
    createdAt: new Date().toISOString(),
    metadata: body.metadata || {},
  };

  await insertEvent(db, event);
  return json({ ok: true });
}
