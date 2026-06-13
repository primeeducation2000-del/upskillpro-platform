const DEFAULT_ASSESSOR_PASSWORD_HASH = 'cad2b291f743744acb66216467d69e010b81c6267a9457703ededd7fbee61b97';
const SESSION_COOKIE = 'upskillpro_assessor_session';

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
  const secret = env.ASSESSOR_SESSION_SECRET || env.ADMIN_SESSION_SECRET || DEFAULT_ASSESSOR_PASSWORD_HASH;
  if (signature !== await sign(payload, secret)) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)));
    if (!data.expiresAt || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

function accessCode() {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  return `USP-${Array.from(bytes).map((byte) => byte.toString(36).padStart(2, '0')).join('').toUpperCase()}`;
}

async function all(db, sql, bindings = []) {
  return db.prepare(sql).bind(...bindings).all().then((result) => result.results || []);
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function resetProgress(progress, reset) {
  const next = {
    lessons: { ...(progress.lessons || {}) },
    formative: { ...(progress.formative || {}) },
    summative: { ...(progress.summative || {}) },
    writing: { ...(progress.writing || {}) },
  };

  (reset.lessonIds || []).forEach((id) => {
    delete next.lessons[id];
  });
  (reset.formativeIds || []).forEach((id) => {
    delete next.formative[id];
  });
  (reset.summativeIds || []).forEach((id) => {
    delete next.summative[id];
    delete next.writing[id];
  });

  return next;
}

export async function onRequest({ request, env }) {
  const session = await verifySession(parseCookies(request.headers.get('Cookie') || '')[SESSION_COOKIE], env);
  if (!session) return json({ ok: false, error: 'Unauthorised assessor session.' }, { status: 401 });

  const db = env.UPSKILLPRO_ANALYTICS_DB;
  if (!db) return json({ ok: true, setupRequired: true, learners: [], attempts: [] });

  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}));

    if (body.action === 'resetProgress') {
      const learnerId = String(body.learnerId || '');
      if (!learnerId) return json({ ok: false, error: 'Learner is required.' }, { status: 400 });

      const row = await db.prepare('SELECT progress_json FROM lms_progress WHERE learner_id = ?').bind(learnerId).first();
      const currentProgress = parseJson(row?.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {} });
      const nextProgress = resetProgress(currentProgress, body.reset || {});
      await db.prepare(`
        INSERT INTO lms_progress (learner_id, progress_json, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(learner_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = excluded.updated_at
      `).bind(learnerId, JSON.stringify(nextProgress), new Date().toISOString()).run();

      return json({ ok: true, progress: nextProgress });
    }

    if (body.action !== 'createLearner') return json({ ok: false, error: 'Unknown action.' }, { status: 400 });

    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || '').trim();
    const requestedUsername = String(body.username || '').trim().toLowerCase();
    const username = requestedUsername || fullName.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '') || `learner.${Date.now()}`;
    const code = accessCode();
    const learner = {
      id: crypto.randomUUID(),
      username,
      accessCode: code,
      fullName: fullName || username,
      email,
      createdAt: new Date().toISOString(),
    };

    try {
      await db.prepare(`
        INSERT INTO lms_learners (id, username, access_code, full_name, email, status, created_at)
        VALUES (?, ?, ?, ?, ?, 'active', ?)
      `).bind(learner.id, learner.username, learner.accessCode, learner.fullName, learner.email, learner.createdAt).run();
    } catch {
      return json({ ok: false, setupRequired: true, error: 'LMS database tables are not ready yet.' }, { status: 503 });
    }

    return json({ ok: true, learner });
  }

  if (request.method !== 'GET') return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });

  let learners = [];
  let attempts = [];
  try {
    [learners, attempts] = await Promise.all([
      all(db, `
        SELECT l.id, l.username, l.full_name, l.email, l.status, l.created_at, l.last_login_at, p.progress_json, p.updated_at
        FROM lms_learners l
        LEFT JOIN lms_progress p ON p.learner_id = l.id
        ORDER BY l.created_at DESC
      `),
      all(db, `
        SELECT a.*, l.username, l.full_name
        FROM lms_quiz_attempts a
        LEFT JOIN lms_learners l ON l.id = a.learner_id
        ORDER BY a.created_at DESC
        LIMIT 300
      `),
    ]);
  } catch {
    return json({ ok: true, setupRequired: true, learners: [], attempts: [] });
  }

  return json({
    ok: true,
    setupRequired: false,
    learners: learners.map((learner) => ({
      ...learner,
      progress: parseJson(learner.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {} }),
    })),
    attempts: attempts.map((attempt) => ({
      ...attempt,
      answers: parseJson(attempt.answers_json, []),
    })),
  });
}
