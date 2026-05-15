# Capucor Web — Project Reference

Capucor Business Solutions public website and client portal. South African outsourced accounting firm targeting tech-forward SMEs. Deployed to Cloudflare Workers via OpenNext.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React Server Components) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Base Nova) |
| Database & Auth | Supabase (PostgreSQL) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Payments | Paystack (Phase 2 — wiring in progress) |
| Deployment | Cloudflare Workers via opennextjs-cloudflare |
| Testing | Vitest |

## Prerequisites

- Node.js 20 (see `.nvmrc`)
- A Supabase project
- A Cloudflare account with Workers enabled (for deploy)

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and fill in values
cp .env.example .env.local
```

**Required environment variables** (see `.env.example` for all):

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Settings → API (never expose client-side) |
| `REVALIDATE_SECRET` | Any long random string — `openssl rand -hex 32` |
| `RESEND_API_KEY` | Resend dashboard (optional — logs to console if absent) |
| `OWNER_NOTIFICATION_EMAIL` | e.g. `zjak@capucor.com` |
| `NEXT_PUBLIC_BOOKING_URL` | Your booking/calendar link (falls back to Google Calendar URL if absent) |

## Dev Scripts

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run lint         # ESLint over src/
npm run test         # Run Vitest unit tests
npm run test:watch   # Vitest in watch mode
npm run test:ui      # Open Vitest browser UI
npm run db:types     # Regenerate Supabase TypeScript types → src/types/db.ts
```

## Build & Deploy (Cloudflare)

```bash
npm run build:cf     # Build for Cloudflare Workers
npm run preview:cf   # Build and run local Cloudflare preview
npm run deploy:cf    # Build and deploy to Cloudflare Workers
```

The Cloudflare target is configured in `wrangler.jsonc` and `open-next.config.ts`.

## Database (Supabase)

Migrations live in `supabase/migrations/`. Apply them via the Supabase dashboard SQL editor or the Supabase CLI:

```bash
supabase db push     # Push local migrations to remote project
```

After any schema change, regenerate TypeScript types:

```bash
# Replace YOUR_PROJECT_REF with your Supabase project reference ID
npm run db:types
```

Generated types land in `src/types/db.ts` (gitignored — regenerate after pulling schema changes).

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/
│   ├── landing/      # Homepage sections (Hero, FAQ, etc.)
│   ├── pricing/      # Multi-step pricing calculator
│   ├── ui/           # shadcn + custom UI primitives
│   ├── layout/       # Navbar, Footer
│   ├── portal/       # Client portal components
│   └── services/     # Service page components
├── config/           # siteConfig, tier config, FAQ data
├── hooks/            # usePricingState, useCursorGlow
├── lib/              # utils, pricing logic, Supabase clients, validations
└── types/            # TypeScript interfaces
```

## Phase 2 Pending Items

The following are intentional stubs awaiting Paystack integration:

- `src/app/api/subscriptions/route.ts` — pricing math + Supabase insert
- `src/app/api/webhooks/paystack/route.ts` — webhook event handling
- `src/app/client-portal/page.tsx` — real auth + subscription fetch
- `src/app/onboarding/page.tsx` — real transaction verification

All TODOs are inline-documented in each file.

## Pending Content: Client Testimonials / Social Proof

The homepage section that used to live between Tech Stack (#7) and FAQ (#9) — formerly "A Month with Capucor" / `OutcomeStories.tsx` — has been removed and the slot is reserved for **real client testimonials / social proof**.

- Placement: `src/app/page.tsx` between `TechStackShowcase` and `FaqAccordion` (look for the placeholder HTML comment).
- Blocker: testimonials still need to be collected from clients. Once 3–5 quotes (name, role, company, quote, ideally a headshot) are in hand, build a new `Testimonials.tsx` landing component and slot it in.
- Do not ship the old four-week timeline visual back — it was scrapped intentionally. Build fresh around the real quotes.
