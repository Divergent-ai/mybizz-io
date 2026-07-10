# mybizz.io

Production-ready Next.js website for a premium web, AI automation and compliance consultancy.

## Stack
- Next.js 16 App Router + React 19
- TypeScript
- Tailwind CSS 4
- Motion for React
- Zod validation

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Environment variables
- `NEXT_PUBLIC_SITE_URL`: canonical production URL.
- `LEADS_WEBHOOK_URL`: optional POST endpoint for CRM, Zapier, Make, n8n or custom lead handling.
- `LEADS_WEBHOOK_SECRET`: optional bearer token sent to the webhook.

Without a webhook, validated enquiries are acknowledged and minimally logged with requirements redacted. Configure a real destination before launch.

## Quality checks
```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel
1. Push the folder to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables in Project Settings.
4. Set `NEXT_PUBLIC_SITE_URL=https://mybizz.io`.
5. Deploy, then connect the mybizz.io domain.

## Other Node hosting
```bash
npm install
npm run build
npm start
```
Use Node 20.9+ and place a reverse proxy/CDN in front of the app.

## Launch checklist
- Replace placeholder privacy wording with counsel-approved policy.
- Configure and test the lead webhook.
- Add verified company details and real contact channels.
- Add analytics only with an appropriate consent implementation.
- Run Lighthouse against the deployed production build.

## Architecture
- Server Components by default.
- Client Components restricted to navigation, reveals, animated hero and form state.
- CSS texture and SVG assets avoid stock imagery and heavy media.
- Font optimisation via `next/font`.
- Contact endpoint includes schema validation and a honeypot.
