const SESSION_COOKIE = 'upskillpro_learner_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const DEMO_LEARNER = {
  id: 'demo-learner-001',
  username: 'learner001',
  access_code: 'Learner001!',
  full_name: 'Demo Learner',
  email: '',
  status: 'active',
};

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

async function createSession(learner, env) {
  const secret = env.LMS_SESSION_SECRET || env.ADMIN_SESSION_SECRET || 'upskillpro-lms-session';
  const payload = encodeBase64Url(JSON.stringify({
    role: 'learner',
    learnerId: learner.id,
    username: learner.username,
    fullName: learner.full_name,
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  }));
  return `${payload}.${await sign(payload, secret)}`;
}

async function verifySession(token, env) {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  const secret = env.LMS_SESSION_SECRET || env.ADMIN_SESSION_SECRET || 'upskillpro-lms-session';
  if (signature !== await sign(payload, secret)) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)));
    if (!data.expiresAt || Date.now() > data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

async function findLearner(db, username) {
  return db.prepare('SELECT * FROM lms_learners WHERE lower(username) = lower(?) AND status = ? LIMIT 1').bind(username, 'active').first();
}

export async function onRequest({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie') || '');

  if (request.method === 'GET') {
    const session = await verifySession(cookies[SESSION_COOKIE], env);
    return json({ ok: Boolean(session), learner: session ? { id: session.learnerId, username: session.username, fullName: session.fullName } : null });
  }

  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });

  const body = await request.json().catch(() => ({}));
  if (body.action === 'logout') {
    return json({ ok: true }, { headers: { 'Set-Cookie': `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` } });
  }

  const username = String(body.username || '').trim();
  const accessCode = String(body.accessCode || '').trim();
  let learner = null;

  if (env.UPSKILLPRO_ANALYTICS_DB) {
    try {
      learner = await findLearner(env.UPSKILLPRO_ANALYTICS_DB, username);
    } catch {
      learner = null;
    }
  }

  if (!learner && username.toLowerCase() === DEMO_LEARNER.username && accessCode === DEMO_LEARNER.access_code) {
    learner = DEMO_LEARNER;
  }

  if (!learner || learner.access_code !== accessCode) {
    return json({ ok: false, error: 'Invalid username or access code.' }, { status: 401 });
  }

  if (env.UPSKILLPRO_ANALYTICS_DB && learner.id !== DEMO_LEARNER.id) {
    await env.UPSKILLPRO_ANALYTICS_DB.prepare('UPDATE lms_learners SET last_login_at = ? WHERE id = ?').bind(new Date().toISOString(), learner.id).run();
  }

  const session = await createSession(learner, env);
  return json(
    { ok: true, learner: { id: learner.id, username: learner.username, fullName: learner.full_name } },
    { headers: { 'Set-Cookie': `${SESSION_COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}` } }
  );
}
