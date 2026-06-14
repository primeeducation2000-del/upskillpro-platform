const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyHAm-MZ3SkNKHAbiIrhSwtAFsBe50OaavFCno8ayj8LaCH852-yTzNMW6KxXeREMAj/exec';

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || !['validateAccessCode', 'submitAssessment'].includes(body.action)) {
    return Response.json({ ok: false, error: 'Invalid ESOL access action.' }, { status: 400 });
  }

  const payload = body.action === 'submitAssessment'
    ? { ...(body.payload || {}) }
    : {
      action: 'validateAccessCode',
      accessCode: body.accessCode,
      email: body.email,
    };

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    const result = JSON.parse(text);
    if (body.action === 'submitAssessment' && result.ok) {
      await saveAssessmentSubmission(env, payload);
    }
    return Response.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return Response.json({
      ok: false,
      error: 'The assessment service is temporarily unavailable. Please try again.',
    }, { status: 502 });
  }
}

async function saveAssessmentSubmission(env, payload) {
  const db = env?.UPSKILLPRO_ANALYTICS_DB;
  if (!db) return;

  try {
    const createdAt = payload.timestamp || new Date().toISOString();
    await db.prepare(`
      INSERT INTO analytics_events (id, session_id, event_type, path, page_url, source, course, created_at, metadata_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      `esol-${String(payload.email || 'anonymous').toLowerCase()}`,
      'esol_assessment_submission',
      '/esol-initial-assessment',
      'https://upskillpro.co.uk/esol-initial-assessment',
      'ESOL Initial Assessment',
      'ESOL',
      createdAt,
      JSON.stringify(payload)
    ).run();
  } catch {
    // Google Sheets remains the primary submission destination; D1 is for assessor review.
  }
}
