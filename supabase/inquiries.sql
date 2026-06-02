-- Run this in Supabase Dashboard → SQL Editor

create table if not exists inquiries (
  id           uuid        primary key default gen_random_uuid(),
  business_name text       not null,
  email        text        not null,
  phone        text,
  budget       text        not null,
  description  text        not null,
  created_at   timestamptz not null default now()
);

alter table inquiries enable row level security;

-- Allow inserts from anonymous users (public form)
create policy "Public insert access"
  on inquiries for insert
  with check (true);
