# VAUG

Two independent projects, each pushable to its own Git repository:

| Folder | What it is | Stack | Default port |
| --- | --- | --- | --- |
| [`frontend/`](frontend) | The website | Next.js 16, React 19, Tailwind CSS 4 | 3000 |
| [`backend/`](backend) | API for leads, newsletter and admin | Node 20+, Hono, Zod | 4000 |

## Run both locally

```bash
# terminal 1
cd backend && cp .env.example .env && npm install && npm run dev

# terminal 2
cd frontend && cp .env.example .env.local && npm install && npm run dev
```

Open http://localhost:3000. The browser only ever talks to the frontend; Next.js proxies
`/api/*` to the backend (`API_URL`), so no CORS setup is needed.

## Deploying

- **backend**: any Node host (Railway, Render, Fly.io, a VPS). Set `PORT`, `ADMIN_API_TOKEN`,
  `WEB_ORIGIN`, and optionally `LEAD_WEBHOOK_URL`. Leads are stored as JSON files in `data/`;
  on hosts without a persistent disk, swap `src/lib/store.ts` for a database.
- **frontend**: Vercel or any Node host. Set `API_URL` to the backend's public URL.

The lead form options exist in both projects (`frontend/src/lib/lead-options.ts` and
`backend/src/lib/lead-options.ts`). Keep them in sync when you change them.
