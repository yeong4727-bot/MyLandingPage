create extension if not exists "pgcrypto";

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) > 0 and char_length(name) <= 40),
  message text not null check (char_length(btrim(message)) > 0 and char_length(message) <= 500),
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.guestbook enable row level security;

drop policy if exists "Anyone can read guestbook" on public.guestbook;
create policy "Anyone can read guestbook"
on public.guestbook
for select
to anon, authenticated
using (true);

drop policy if exists "Anyone can add guestbook" on public.guestbook;
create policy "Anyone can add guestbook"
on public.guestbook
for insert
to anon, authenticated
with check (
  char_length(btrim(name)) > 0
  and char_length(name) <= 40
  and char_length(btrim(message)) > 0
  and char_length(message) <= 500
);

create index if not exists guestbook_created_at_idx
on public.guestbook (created_at desc);
