# SaaS Funnel Audit (April 26, 2026)

## Scope
- Codebase: `funnel` (Next.js frontend + lightweight API routes)
- Requested audit: signup flow, agent-creation handoff flow, structural/security weaknesses, and flow breakers

## Current User Flow (Implemented)
1. Visitor lands on homepage.
2. Visitor can:
   - book strategy call (Cal.com modal),
   - submit free-trial form,
   - request instant callback,
   - start live voice demo.
3. Trial/callback submissions now go through internal API routes.
4. API routes validate/rate-limit and forward to n8n webhook(s).

## Critical Findings
1. Direct client-to-webhook posting (fixed)
   - Risk: webhook endpoint leakage, abuse, bypass of validation/rate limits.
   - Fix: moved to server-side proxy routes:
     - `POST /api/trial-signup`
     - `POST /api/demo-call`

2. No server-side validation on lead payloads (fixed)
   - Risk: malformed/poisoned data, spam payloads, downstream automation breakage.
   - Fix: shared validation + sanitization in `src/lib/funnel-validation.ts`.

3. No rate limiting on call trigger route (fixed)
   - Risk: cost abuse and denial-of-service against telephony pipeline.
   - Fix: IP-based in-memory limiter in `src/lib/rate-limit.ts` with stricter limits on demo-call flow.

## High Findings
1. Missing operational security headers (fixed)
   - Fix: hardened headers in `next.config.ts`.

2. Bot-spam susceptibility on forms (fixed)
   - Fix: added honeypot field and server-side rejection.

3. React/lint blockers in runtime-critical components (fixed)
   - Fixes:
     - `AnimatedHeader`: removed render-time component creation.
     - `VoiceAgent`: removed effect-time `setState` anti-pattern.
     - `ProblemsSection`: removed `any` usage and cleaned types/imports.

## Structural Gaps To Become Full SaaS (Not Yet Implemented)
1. No authentication or user accounts.
2. No tenant/workspace model.
3. No persisted lead/agent entities in database.
4. No onboarding state machine (signup -> verification -> billing -> agent provisioning -> go-live).
5. No billing/subscription enforcement.
6. No internal dashboard for customer self-serve configuration.
7. No event log/observability pipeline (submission events, webhook delivery, failures, retries).
8. No idempotency keys on provisioning events.

## Recommended Next Refinement Wave
1. Add auth + org model (Clerk/Auth.js + Postgres schema).
2. Add onboarding status model:
   - `lead_captured`
   - `qualified`
   - `account_created`
   - `billing_active`
   - `agent_provisioning`
   - `agent_ready`
3. Add webhook job queue + retry/dead-letter strategy.
4. Add admin/customer dashboard to track provisioning state.
5. Add analytics and conversion funnel instrumentation.
