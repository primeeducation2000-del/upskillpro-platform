const DEFAULT_PASSWORD_HASH = '9b48c26a35f2e20d115c78d6e0cf33c407b5b9a839cdafbf8fd8ed3e4145983d';
const SESSION_COOKIE = 'upskillpro_admin_session';
const SESSION_TTL_SECONDS = 30 * 60;

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
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim().split('='))
      .filter(([key, value]) => key && value)
  );
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
  const secret = env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD_SHA256 || DEFAULT_PASSWORD_HASH;
  const payload = encodeBase64Url(JSON.stringify({
    role: 'admin',
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
  }));
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
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

function isIpAllowed(request, env) {
  const whitelist = (env.ADMIN_IP_WHITELIST || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (!whitelist.length) return true;
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || '';
  return whitelist.includes(ip);
}

export async function onRequest({ request, env }) {
  if (!isIpAllowed(request, env)) {
    return json({ ok: false, error: 'This IP address is not authorised for admin access.' }, { status: 403 });
  }

  const cookies = parseCookies(request.headers.get('Cookie') || '');

  if (request.method === 'GET') {
    const session = await verifySession(cookies[SESSION_COOKIE], env);
    return json({ ok: Boolean(session), role: session?.role || null, expiresAt: session?.expiresAt || null });
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
  }

  const body = await request.json().catch(() => ({}));

  if (body.action === 'logout') {
    return json(
      { ok: true },
      { headers: { 'Set-Cookie': `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` } }
    );
  }

  const configuredHash = env.ADMIN_PASSWORD_SHA256 || DEFAULT_PASSWORD_HASH;
  const incomingHash = await sha256(body.password || '');
  const mfaEnabled = Boolean(env.ADMIN_MFA_CODE);
  const mfaPassed = !mfaEnabled || body.mfaCode === env.ADMIN_MFA_CODE;

  if (incomingHash !== configuredHash || !mfaPassed) {
    return json({ ok: false, error: 'Invalid admin credentials.' }, { status: 401 });
  }

  const session = await createSession(env);
  return json(
    {
      ok: true,
      role: 'admin',
      expiresInSeconds: SESSION_TTL_SECONDS,
      mfaEnabled,
    },
    {
      headers: {
        'Set-Cookie': `${SESSION_COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`,
      },
    }
  );
}
