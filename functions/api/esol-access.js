const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyHAm-MZ3SkNKHAbiIrhSwtAFsBe50OaavFCno8ayj8LaCH852-yTzNMW6KxXeREMAj/exec';

export async function onRequestPost({ request }) {
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
    return Response.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return Response.json({
      ok: false,
      error: 'The assessment service is temporarily unavailable. Please try again.',
    }, { status: 502 });
  }
}
