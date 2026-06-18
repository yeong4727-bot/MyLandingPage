create extension if not exists "pgcrypto";

-- Supabase Auth가 만든 auth.users와 1:1로 연결되는 공개 프로필 테이블입니다.
-- 비밀번호는 절대 여기에 저장하지 않습니다. 비밀번호는 Supabase Auth가 안전하게 관리합니다.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9]{4,20}$'),
  email text not null unique,
  phone text not null unique check (phone ~ '^010[0-9]{8}$'),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- username 중복 검사는 회원가입 전에 브라우저에서 profiles를 조회해 확인합니다.
-- 이 정책은 과제용 단순 구현입니다. 운영 서비스라면 username 중복 확인 RPC를 따로 두는 편이 더 안전합니다.
drop policy if exists "Anyone can check usernames" on public.profiles;
create policy "Anyone can check usernames"
on public.profiles
for select
to anon, authenticated
using (true);

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

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null check (char_length(btrim(name)) > 0 and char_length(name) <= 40),
  message text not null check (char_length(btrim(message)) > 0 and char_length(message) <= 500),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- 이미 guestbook 테이블이 있는 프로젝트에서도 user_id 컬럼을 안전하게 추가합니다.
alter table public.guestbook
add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.guestbook enable row level security;

drop policy if exists "Anyone can read guestbook" on public.guestbook;
create policy "Anyone can read guestbook"
on public.guestbook
for select
to anon, authenticated
using (true);

-- 기존 익명 작성 정책을 제거하고, 로그인한 사용자만 작성할 수 있게 바꿉니다.
drop policy if exists "Anyone can add guestbook" on public.guestbook;
drop policy if exists "Authenticated users can add guestbook" on public.guestbook;
create policy "Authenticated users can add guestbook"
on public.guestbook
for insert
to authenticated
with check (
  user_id = auth.uid()
  and char_length(btrim(name)) > 0
  and char_length(name) <= 40
  and char_length(btrim(message)) > 0
  and char_length(message) <= 500
);

create index if not exists guestbook_created_at_idx
on public.guestbook (created_at desc);

create index if not exists guestbook_user_id_idx
on public.guestbook (user_id);
