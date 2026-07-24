# Sellyt Affiliate Program

Frontend-only affiliate marketing portal built to match Sellyt webapp patterns (Plus Jakarta Sans, Sellyt green theme, component structure) and the Lovable product flows.

## Surfaces

- **Landing** (`/`) — single-page marketing site
- **Auth** — affiliate login/register/verify, admin login
- **Affiliate portal** (`/portal/*`) — dashboard, referral links, analytics, conversions, wallet, withdrawals, notifications, settings
- **Admin** (`/admin/*`) — overview, applications, affiliates, commissions, payouts, reports, settings

No backend yet — auth and data are mocked via `localStorage` + `src/lib/mock/data.ts`.

## Demo accounts

- Affiliate: any email on `/login` (defaults to `alex@example.com`)
- Admin: `/admin/login` (defaults to `admin@sellyt.com`)

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
```
