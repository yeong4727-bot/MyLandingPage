-- Optional Supabase Auth profile table for signup/login pages.
-- Do not use service_role or secret keys in browser code.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9]{4,20}$'),
  email text not null unique,
  phone text not null unique check (phone ~ '^010[0-9]{8}$'),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Anyone can check usernames" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create or replace function public.is_username_available(username_to_check text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select username_to_check ~ '^[a-z0-9]{4,20}$'
    and not exists (
      select 1
      from public.profiles
      where username = username_to_check
    );
$$;

revoke all on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;

drop policy if exists "Users can create own profile" on public.profiles;
create policy "Users can create own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
