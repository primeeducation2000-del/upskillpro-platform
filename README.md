# UpSkillPro Platform

UpSkillPro is a B2B workforce performance website for ESP English, soft skills training, workforce programmes, lead generation, and a future client portal.

## Current Build

The primary build is a React/Vite app designed for Cloudflare Pages.

```bash
npm install
npm run dev
npm run build
```

Cloudflare Pages build settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

`static-preview.html` is retained only as a no-install preview fallback.

## Included Pages

- Home
- About
- Sectors
- Hospitality
- Healthcare
- Recruitment & Workforce
- Programmes
- Services
- Workforce Training Request Form
- Case Studies
- Resources
- Contact
- Client Portal preview

## Lead Form

The Workforce Training Request Form captures company details, contact details, challenges, departments, goals, urgency, delivery preference, budget range, and biggest workforce challenge.

The React app posts to:

```text
/api/training-request
```

Cloudflare Pages Functions are scaffolded in:

```text
functions/api/training-request.js
```

For live storage, bind a Cloudflare KV namespace named `TRAINING_REQUESTS`. Email notifications can be added through a transactional email provider such as Resend, MailChannels-compatible routing, or a CRM integration.

## Domain

Use Cloudflare DNS for `upskillpro.co.uk`, then connect the domain to the Cloudflare Pages project.
