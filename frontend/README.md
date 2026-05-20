# FLOREX-WEARS Supabase Clothing Marketplace

A professional React + Supabase clothing marketplace with:

- Home, Shop, About, Contact, Admin pages
- Login and signup modal
- Dark/light theme
- Responsive hamburger navbar
- Add-to-cart checks if user is logged in
- Admin-only navigation using one email
- Supabase product CRUD: add, edit, delete, search
- Live product refresh using Supabase realtime channel

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

3. Add your Supabase values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=youradmin@email.com
```

4. Open `supabase/schema.sql`, replace `admin@example.com` with your real admin email.

5. Run the SQL inside Supabase SQL Editor.

6. Run the site:

```bash
npm run dev
```

## Important

The admin page only appears when the logged-in user email matches `VITE_ADMIN_EMAIL`.

The Supabase RLS policies also check the same admin email, so ordinary users cannot add, edit, or delete products even if they try from the browser console.
