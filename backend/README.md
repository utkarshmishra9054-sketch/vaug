# VAUG backend

Hono API that stores contact-form leads and newsletter subscribers.

```bash
cp .env.example .env
npm install
npm run dev      # http://localhost:4000/api (watch mode)
npm run build    # bundles to dist/
npm start        # runs dist/index.js
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Uptime check |
| POST | `/api/leads` | Contact form. Zod-validated, rate-limited, honeypot spam filter |
| GET | `/api/leads` | Admin list. `Authorization: Bearer $ADMIN_API_TOKEN` |
| POST | `/api/subscribe` | Newsletter sign-up (deduplicated) |
| GET | `/api/subscribers` | Admin list. `Authorization: Bearer $ADMIN_API_TOKEN` |

## Structure

```
src/
  index.ts            server, middleware (logger, secure headers, CORS), route mounting
  routes/             leads.ts, subscribe.ts
  lib/
    validation.ts     Zod schemas (lead form, newsletter)
    lead-options.ts   form dropdown values (keep in sync with the frontend copy)
    leads.ts          lead + subscriber logic, webhook notification
    store.ts          JSON-file storage — replace with a database for production
    rate-limit.ts     in-memory limiter — replace with Redis for multiple instances
    http.ts           IP, admin auth, JSON helpers
```

Data is written to `data/*.json` (override with `DATA_DIR`).
