# Ledger — Banking Frontend

A production-ready React 18 + Vite frontend for the Banking Ledger backend, built with a
"Midnight Ledger" fintech design system (Tailwind CSS, Framer Motion, Recharts).

## Setup

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 and expects the backend at http://localhost:3000
(configurable via `.env` → `VITE_API_BASE_URL`).

## Pages

Splash · Login · Register · Dashboard · Accounts · Balance · Profile · Settings · 404

## Notes

- JWT is stored in `localStorage` and attached to every request via an Axios interceptor.
- A global 401 interceptor clears the session and redirects to `/login`.
- Protected routes auto-restore the session on page reload (auto-login).
- Dark/Light mode is toggled from Settings or the navbar and persisted in `localStorage`.
