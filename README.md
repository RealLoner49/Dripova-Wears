# FLOREX-WEARS Fullstack Clean Structure

This project is now properly separated:

```txt
florex-wears-fullstack-clean/
  frontend/     React + Vite website
  backend/      Express API starter
  supabase/     Database schema and policies
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=youradmin@email.com
```

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend `.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=youradmin@email.com
```

## Supabase

Open `supabase/schema.sql`, replace `admin@example.com` with your real admin email, then run it in Supabase SQL Editor.

## Current behavior

The frontend already connects directly to Supabase for auth and products.

The backend is included cleanly for future protected API work. For now, product CRUD is still working from the frontend through Supabase with Row Level Security.


## Updated frontend structure

Each JSX file now has its own folder and CSS file:

```txt
frontend/src/components/Layout/Layout.jsx
frontend/src/components/Layout/Layout.css

frontend/src/pages/Home/Home.jsx
frontend/src/pages/Home/Home.css
```

`frontend/src/styles/global.css` is now only for reset, variables, and body defaults.
