const DEFAULT_ASSESSOR_PASSWORD_HASH = 'cad2b291f743744acb66216467d69e010b81c6267a9457703ededd7fbee61b97';
const SESSION_COOKIE = 'upskillpro_assessor_session';
const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyHAm-MZ3SkNKHAbiIrhSwtAFsBe50OaavFCno8ayj8LaCH852-yTzNMW6KxXeREMAj/exec';

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

function dedupeAssessments(assessments) {
  const seen = new Set();
  return assessments.filter((assessment) => {
    const key = [
      String(assessment.email || '').toLowerCase(),
      assessment.timestamp || assessment.created_at || '',
      assessment.readingScore ?? assessment.reading_score ?? '',
    ].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchSheetAssessments(env) {
  const exportToken = env.ESOL_EXPORT_TOKEN;
  if (!exportToken) return [];

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'exportAssessments', exportToken }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok || !Array.isArray(result.assessments)) return [];
    return result.assessments;
  } catch {
    return [];
  }
}

function resetProgress(progress, reset) {
  if (reset.clearAll) {
    return { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: progress.placement || {} };
  }

  const next = {
    lessons: { ...(progress.lessons || {}) },
    formative: { ...(progress.formative || {}) },
    summative: { ...(progress.summative || {}) },
    writing: { ...(progress.writing || {}) },
    vocabulary: { ...(progress.vocabulary || {}) },
    placement: { ...(progress.placement || {}) },
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
  (reset.vocabularyIds || []).forEach((id) => {
    delete next.vocabulary[id];
  });

  return next;
}

export async function onRequest({ request, env }) {
  const session = await verifySession(parseCookies(request.headers.get('Cookie') || '')[SESSION_COOKIE], env);
  if (!session) return json({ ok: false, error: 'Unauthorised assessor session.' }, { status: 401 });

  const db = env.UPSKILLPRO_ANALYTICS_DB;
  if (!db) return json({ ok: true, setupRequired: true, learners: [], attempts: [], esolAssessments: [] });

  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}));

    if (body.action === 'setLearnerStartLevel') {
      const learnerId = String(body.learnerId || '');
      const startLevelId = String(body.startLevelId || 'beginner');
      if (!learnerId) return json({ ok: false, error: 'Learner is required.' }, { status: 400 });

      const row = await db.prepare('SELECT progress_json FROM lms_progress WHERE learner_id = ?').bind(learnerId).first();
      const progress = parseJson(row?.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} });
      const nextProgress = {
        ...progress,
        placement: {
          ...(progress.placement || {}),
          startLevelId,
          placedAt: new Date().toISOString(),
        },
      };

      await db.prepare(`
        INSERT INTO lms_progress (learner_id, progress_json, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(learner_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = excluded.updated_at
      `).bind(learnerId, JSON.stringify(nextProgress), new Date().toISOString()).run();

      return json({ ok: true, progress: nextProgress });
    }

    if (body.action === 'markVocabularySentences') {
      const learnerId = String(body.learnerId || '');
      const activityId = String(body.activityId || '');
      if (!learnerId || !activityId) return json({ ok: false, error: 'Learner and vocabulary activity are required.' }, { status: 400 });

      const row = await db.prepare('SELECT progress_json FROM lms_progress WHERE learner_id = ?').bind(learnerId).first();
      const progress = parseJson(row?.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} });
      const vocabulary = { ...(progress.vocabulary || {}) };
      const currentActivity = { ...(vocabulary[activityId] || {}) };
      vocabulary[activityId] = {
        ...currentActivity,
        sentenceMarks: {
          ratings: body.ratings && typeof body.ratings === 'object' ? body.ratings : {},
          feedback: String(body.feedback || '').trim(),
          markedBy: String(body.markedBy || 'Assessor').trim() || 'Assessor',
          markedAt: new Date().toISOString(),
        },
      };

      const nextProgress = { ...progress, vocabulary };
      await db.prepare(`
        INSERT INTO lms_progress (learner_id, progress_json, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(learner_id) DO UPDATE SET progress_json = excluded.progress_json, updated_at = excluded.updated_at
      `).bind(learnerId, JSON.stringify(nextProgress), new Date().toISOString()).run();

      return json({ ok: true, progress: nextProgress });
    }

    if (body.action === 'markWriting') {
      const attemptId = String(body.attemptId || '');
      if (!attemptId) return json({ ok: false, error: 'Attempt is required.' }, { status: 400 });

      const grade = String(body.grade || '').trim();
      const feedback = String(body.feedback || '').trim();
      const markedBy = String(body.markedBy || 'Assessor').trim();
      const criteria = body.criteria && typeof body.criteria === 'object' ? body.criteria : {};

      await db.prepare(`
        UPDATE lms_quiz_attempts
        SET writing_grade = ?, writing_feedback = ?, writing_criteria_json = ?, marked_by = ?, marked_at = ?
        WHERE id = ?
      `).bind(
        grade,
        feedback,
        JSON.stringify(criteria),
        markedBy || 'Assessor',
        new Date().toISOString(),
        attemptId
      ).run();

      return json({ ok: true });
    }

    if (body.action === 'resetProgress') {
      const learnerId = String(body.learnerId || '');
      if (!learnerId) return json({ ok: false, error: 'Learner is required.' }, { status: 400 });

      const row = await db.prepare('SELECT progress_json FROM lms_progress WHERE learner_id = ?').bind(learnerId).first();
      const currentProgress = parseJson(row?.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} });
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
    const startLevelId = String(body.startLevelId || 'beginner');
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
      await db.prepare(`
        INSERT INTO lms_progress (learner_id, progress_json, updated_at)
        VALUES (?, ?, ?)
      `).bind(
        learner.id,
        JSON.stringify({ lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: { startLevelId, placedAt: learner.createdAt } }),
        learner.createdAt
      ).run();
    } catch {
      return json({ ok: false, setupRequired: true, error: 'LMS database tables are not ready yet.' }, { status: 503 });
    }

    return json({ ok: true, learner });
  }

  if (request.method !== 'GET') return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });

  let learners = [];
  let attempts = [];
  let esolAssessments = [];
  let sheetAssessments = [];
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
    return json({ ok: true, setupRequired: true, learners: [], attempts: [], esolAssessments: [] });
  }

  try {
    sheetAssessments = await fetchSheetAssessments(env);
  } catch {
    sheetAssessments = [];
  }

  try {
    const rows = await all(db, `
      SELECT id, created_at, metadata_json
      FROM analytics_events
      WHERE event_type = ?
      ORDER BY created_at DESC
      LIMIT 100
    `, ['esol_assessment_submission']);

    esolAssessments = rows.map((row) => {
      const payload = parseJson(row.metadata_json, {});
      return {
        id: row.id,
        created_at: row.created_at,
        ...payload,
        allReadingResponses: Array.isArray(payload.allReadingResponses) ? payload.allReadingResponses : [],
      };
    });
  } catch {
    esolAssessments = [];
  }

  return json({
    ok: true,
    setupRequired: false,
    learners: learners.map((learner) => ({
      ...learner,
      progress: parseJson(learner.progress_json, { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} }),
    })),
    attempts: attempts.map((attempt) => ({
      ...attempt,
      answers: parseJson(attempt.answers_json, []),
      writingCriteria: parseJson(attempt.writing_criteria_json, {}),
    })),
    esolAssessments: dedupeAssessments([...sheetAssessments, ...esolAssessments])
      .sort((a, b) => new Date(b.timestamp || b.created_at || 0) - new Date(a.timestamp || a.created_at || 0)),
  });
}
