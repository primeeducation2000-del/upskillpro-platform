const SESSION_COOKIE = 'upskillpro_learner_session';
const EMPTY_PROGRESS = { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} };

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

async function getProgress(db, learnerId) {
  const row = await db.prepare('SELECT progress_json FROM lms_progress WHERE learner_id = ?').bind(learnerId).first();
  if (!row?.progress_json) return EMPTY_PROGRESS;
  try {
    return { ...EMPTY_PROGRESS, ...JSON.parse(row.progress_json) };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export async function onRequest({ request, env }) {
  const session = await verifySession(parseCookies(request.headers.get('Cookie') || '')[SESSION_COOKIE], env);
  if (!session) return json({ ok: false, error: 'Unauthorised learner session.' }, { status: 401 });

  const db = env.UPSKILLPRO_ANALYTICS_DB;
  if (!db) return json({ ok: true, setupRequired: true, progress: EMPTY_PROGRESS });

  if (request.method === 'GET') {
    try {
      return json({ ok: true, progress: await getProgress(db, session.learnerId) });
    } catch {
      return json({ ok: true, setupRequired: true, progress: EMPTY_PROGRESS });
    }
  }

  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });

  const body = await request.json().catch(() => ({}));
  const progress = { ...EMPTY_PROGRESS, ...(body.progress || {}) };
  const now = new Date().toISOString();

  try {
    const existingProgress = await getProgress(db, session.learnerId);
    const existingPlacedAt = existingProgress.placement?.placedAt || '';
    const incomingPlacedAt = progress.placement?.placedAt || '';
    if (existingPlacedAt && (!incomingPlacedAt || existingPlacedAt > incomingPlacedAt)) {
      progress.placement = existingProgress.placement;
    }

    await db.prepare(`
      INSERT INTO lms_progress (learner_id, progress_json, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(learner_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = excluded.updated_at
    `).bind(session.learnerId, JSON.stringify(progress), now).run();

    if (body.attempt) {
      const attempt = body.attempt;
      await db.prepare(`
        INSERT INTO lms_quiz_attempts (
          id, learner_id, assessment_id, assessment_type, level_id, unit_id, score, correct, total,
          answers_json, writing_response, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        crypto.randomUUID(),
        session.learnerId,
        String(attempt.assessmentId || ''),
        String(attempt.assessmentType || ''),
        String(attempt.levelId || ''),
        String(attempt.unitId || ''),
        Number(attempt.score || 0),
        Number(attempt.correct || 0),
        Number(attempt.total || 0),
        JSON.stringify(attempt.answers || []),
        attempt.writingResponse ? String(attempt.writingResponse) : '',
        now
      ).run();
    }
  } catch {
    return json({ ok: true, setupRequired: true, progress });
  }

  return json({ ok: true, progress });
}
