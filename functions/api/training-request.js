export async function onRequestPost({ request, env }) {
  const payload = await request.json();

  const required = ['companyName', 'industry', 'staffCount', 'location', 'name', 'jobTitle', 'email'];
  const missing = required.filter((field) => !payload[field]);

  if (missing.length > 0) {
    return Response.json({ ok: false, error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });
  }

  const lead = {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: 'upskillpro.co.uk',
  };

  if (env.TRAINING_REQUESTS) {
    await env.TRAINING_REQUESTS.put(`lead:${lead.submittedAt}:${lead.email}`, JSON.stringify(lead));
  }

  return Response.json({
    ok: true,
    message: 'Training request received',
  });
}
