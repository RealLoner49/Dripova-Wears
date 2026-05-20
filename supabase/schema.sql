-- FLOREX-WEARS Supabase setup
-- Run this inside Supabase SQL Editor.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Clothing',
  price numeric not null default 0,
  old_price numeric,
  image_url text,
  description text,
  sizes text[] default array['S','M','L'],
  colors text[] default array['Black'],
  stock integer not null default 1,
  featured boolean default false,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

drop policy if exists "Anyone can read products" on public.products;
create policy "Anyone can read products"
on public.products for select
using (true);

drop policy if exists "Admin can insert products" on public.products;
create policy "Admin can insert products"
on public.products for insert
with check (auth.jwt() ->> 'email' = 'admin@example.com');

drop policy if exists "Admin can update products" on public.products;
create policy "Admin can update products"
on public.products for update
using (auth.jwt() ->> 'email' = 'admin@example.com')
with check (auth.jwt() ->> 'email' = 'admin@example.com');

drop policy if exists "Admin can delete products" on public.products;
create policy "Admin can delete products"
on public.products for delete
using (auth.jwt() ->> 'email' = 'admin@example.com');

-- IMPORTANT:
-- Replace admin@example.com above with the same admin email you put in VITE_ADMIN_EMAIL.

insert into public.products (name, category, price, old_price, image_url, description, sizes, colors, stock, featured)
values
('Noir Executive Jacket', 'Outerwear', 46000, 58000, 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80', 'Premium structured jacket for bold everyday styling.', array['M','L','XL'], array['Black','Charcoal'], 8, true),
('Ivory Luxe Hoodie', 'Hoodies', 28500, 35000, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80', 'Soft heavyweight hoodie with a clean luxury finish.', array['S','M','L'], array['Ivory','Cream'], 13, true),
('Urban Cargo Pants', 'Pants', 32000, null, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', 'Streetwear cargo pants with utility pockets.', array['M','L','XL'], array['Olive','Black'], 5, false),
('Aurelia Summer Dress', 'Dresses', 41000, 49500, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', 'Elegant dress made for brunch, dates, and events.', array['S','M','L'], array['Gold','White'], 6, true);
