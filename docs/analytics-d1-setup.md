# UpSkillPro Real Analytics Setup

The admin dashboard is wired for real analytics through Cloudflare D1.

## 1. Create D1 Database

In Cloudflare Dashboard:

1. Go to Workers & Pages.
2. Open D1 SQL Database.
3. Create a database named `upskillpro-analytics`.
4. Open the database console and run the SQL in `schema/analytics.sql`.

## 2. Bind D1 To Pages

In Cloudflare Pages:

1. Open the `upskillpro-platform` Pages project.
2. Go to Settings > Functions > D1 database bindings.
3. Add binding:
   - Variable name: `UPSKILLPRO_ANALYTICS_DB`
   - Database: `upskillpro-analytics`
4. Save and redeploy.

## 3. Admin Login

Current temporary password:

```text
UpskillProAdmin!2026
```

For production, add environment variables:

- `ADMIN_PASSWORD_SHA256`
- `ADMIN_SESSION_SECRET`
- Optional `ADMIN_MFA_CODE`
- Optional `ADMIN_IP_WHITELIST`

## 4. What Is Tracked

The tracker records anonymous events only:

- Session ID
- Page URL/path
- Referrer/source
- Course interest
- Device/browser/OS
- Country/city from Cloudflare request metadata
- Duration
- Entry/exit page

It does not store names, emails, phone numbers, or other personal details.
