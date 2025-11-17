This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (Local Dev)

This repo includes a Next.js frontend and an Express + MongoDB backend.

1) Configure environment variables

- Copy `.env.local.example` to `.env.local` inside `my-app/` and fill values:
	- `MONGO_URI` (required)
	- `ADMIN_ID`, `ADMIN_PASSWORD`, `JWT_SECRET` (required)
	- `NEXT_PUBLIC_BACKEND_URL` (optional in dev; defaults to `http://localhost:4000`)

2) Start frontend and backend together

```bash
npm install
npm run dev:full
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:4000

If you prefer to run separately:

```bash
# Terminal 1 (frontend)
npm run dev

# Terminal 2 (backend)
npm run dev:backend
```

3) Verify backend health (PowerShell)

```powershell
Invoke-WebRequest -Uri http://localhost:4000/api/public/members | Select-Object -ExpandProperty Content
Invoke-WebRequest -Uri http://localhost:4000/api/public/events   | Select-Object -ExpandProperty Content
```

If these return JSON, the frontend hooks will load data correctly.

Troubleshooting "Failed to fetch":
- Ensure the backend is running and `MONGO_URI` is valid.
- Open the app via http://localhost:3000 (not a file:// path).
- Check that Windows Firewall isn’t blocking port 4000.
- In production, set `NEXT_PUBLIC_BACKEND_URL` to your deployed backend URL (https).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
