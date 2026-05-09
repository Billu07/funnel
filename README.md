# Voicium Funnel

Marketing funnel built with Next.js App Router for:
- trial signup capture
- instant demo call requests
- live Vapi voice demo

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy env template and fill values:
```bash
cp .env.example .env.local
```

3. Run locally:
```bash
npm run dev
```

## Environment Variables

Public:
- `NEXT_PUBLIC_CALENDAR_LINK`
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID`

Server only:
- `N8N_WEBHOOK_TRIAL_URL`
- `N8N_WEBHOOK_CALL_URL`
- `N8N_WEBHOOK_URL` (optional fallback)
- `N8N_WEBHOOK_SECRET` (optional)

## API Routes

- `POST /api/trial-signup`
  - validates/sanitizes trial form input
  - applies IP rate limiting
  - forwards payload to configured webhook

- `POST /api/demo-call`
  - validates/sanitizes callback request
  - applies stricter IP rate limiting
  - forwards payload to configured webhook

## Security Controls Included

- server-side webhook proxy (no direct webhook calls from browser)
- payload size limits on API routes
- honeypot field support for bot filtering
- IP-based in-memory rate limiting
- security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- API responses marked `no-store`
