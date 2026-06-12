const DEFAULT_ASSESSOR_PASSWORD_HASH = 'cad2b291f743744acb66216467d69e010b81c6267a9457703ededd7fbee61b97';
const SESSION_COOKIE = 'upskillpro_assessor_session';
const SESSION_TTL_SECONDS = 4 * 60 * 60;

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

async function sha256(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return encodeBase64Url(new Uint8Array(signature));
}

async function createSession(env) {
  const secret = env.ASSESSOR_SESSION_SECRET || env.ADMIN_SESSION_SECRET || DEFAULT_ASSESSOR_PASSWORD_HASH;
  const payload = encodeBase64Url(JSON.stringify({
    role: 'assessor',
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  }));
  return `${payload}.${await sign(payload, secret)}`;
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

export async function onRequest({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie') || '');

  if (request.method === 'GET') {
    const session = await verifySession(cookies[SESSION_COOKIE], env);
    return json({ ok: Boolean(session), role: session?.role || null });
  }

  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });

  const body = await request.json().catch(() => ({}));
  if (body.action === 'logout') {
    return json({ ok: true }, { headers: { 'Set-Cookie': `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` } });
  }

  const configuredHash = env.ASSESSOR_PASSWORD_SHA256 || DEFAULT_ASSESSOR_PASSWORD_HASH;
  if (await sha256(body.password || '') !== configuredHash) {
    return json({ ok: false, error: 'Invalid assessor password.' }, { status: 401 });
  }

  const session = await createSession(env);
  return json({ ok: true, role: 'assessor' }, {
    headers: { 'Set-Cookie': `${SESSION_COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}` },
  });
}
