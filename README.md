
# FreeHub (Jobs • Courses • Books • Opportunities • Blogs)

Modern, clean React (Vite + Tailwind) site with Supabase auth + storage. Admin-only upload.

## 1) Install
```bash
npm i
npm run dev
```

## 2) Environment
Create `.env`:
```
VITE_SUPABASE_URL=YOUR_URL
VITE_SUPABASE_ANON_KEY=YOUR_ANON
VITE_ADMIN_EMAILS=your@email.com
VITE_GA_ID=G-XXXXXXXXXX   # optional
```

## 3) Supabase (run once)
- Storage → Buckets: create **books** (Public) and **assets** (Public).
- Table Editor → **books** table and **items** table (SQL below).
- Auth → Providers: enable **Email**.
- Storage → Objects → **Enable RLS**; SQL policies below.

### SQL: tables + policies
Run in **SQL Editor**:
```sql
-- Books table
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  description text,
  categories text[] default '{}',
  cover_url text,
  file_url text,
  created_at timestamptz not null default now(),
  uploaded_by uuid default auth.uid() references auth.users(id)
);
alter table public.books enable row level security;
drop policy if exists "Public read books" on public.books;
create policy "Public read books" on public.books for select using (true);
drop policy if exists "Auth insert books" on public.books;
create policy "Auth insert books" on public.books for insert to authenticated with check (true);

-- Items table for jobs/courses/opps/blogs
create type if not exists item_type as enum ('job','course','opp','blog');
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  type item_type not null,
  title text not null,
  description text,
  cover_url text,
  link text,
  created_at timestamptz not null default now(),
  uploaded_by uuid default auth.uid() references auth.users(id)
);
alter table public.items enable row level security;
drop policy if exists "Public read items" on public.items;
create policy "Public read items" on public.items for select using (true);
drop policy if exists "Auth insert items" on public.items;
create policy "Auth insert items" on public.items for insert to authenticated with check (true);

-- Storage policies for buckets
-- Books: public read, auth write
drop policy if exists "Public read storage books" on storage.objects;
create policy "Public read storage books"
on storage.objects for select using (bucket_id = 'books');

drop policy if exists "Auth write storage books" on storage.objects;
create policy "Auth write storage books"
on storage.objects for insert to authenticated with check (bucket_id = 'books');

-- Assets: public read, auth write
drop policy if exists "Public read storage assets" on storage.objects;
create policy "Public read storage assets"
on storage.objects for select using (bucket_id = 'assets');

drop policy if exists "Auth write storage assets" on storage.objects;
create policy "Auth write storage assets"
on storage.objects for insert to authenticated with check (bucket_id = 'assets');
```
> Also ensure **Enable RLS** is ON for `storage.objects` (Storage → Objects → toggle).

## 4) Admin access
- Create a user in Supabase Auth with an email in `VITE_ADMIN_EMAILS`.
- Visit `/admin`, sign in, upload content.
- Books need a PDF; other sections need a link (optional cover).

## 5) Build & deploy
```bash
npm run build
# deploy with any static host (Firebase Hosting, Netlify, Vercel)
```
