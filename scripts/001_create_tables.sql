-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Profiles RLS policies
create policy "users_select_own_profile" on public.profiles
  for select using (auth.uid() = id);

create policy "users_select_all_profiles" on public.profiles
  for select using (true);

create policy "users_insert_own_profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "users_update_own_profile" on public.profiles
  for update using (auth.uid() = id);

create policy "users_delete_own_profile" on public.profiles
  for delete using (auth.uid() = id);

-- Create snippets table
create table if not exists public.snippets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  code text not null,
  language text default 'javascript',
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.snippets enable row level security;

-- Snippets RLS policies
create policy "users_select_own_snippets" on public.snippets
  for select using (auth.uid() = user_id);

create policy "users_select_public_snippets" on public.snippets
  for select using (is_public = true);

create policy "users_insert_snippets" on public.snippets
  for insert with check (auth.uid() = user_id);

create policy "users_update_own_snippets" on public.snippets
  for update using (auth.uid() = user_id);

create policy "users_delete_own_snippets" on public.snippets
  for delete using (auth.uid() = user_id);

-- Create indexes
create index if not exists snippets_user_id_idx on public.snippets(user_id);
create index if not exists snippets_is_public_idx on public.snippets(is_public);
create index if not exists snippets_created_at_idx on public.snippets(created_at desc);
create index if not exists profiles_username_idx on public.profiles(username);
