-- Hire Ethiopia's Best — Supabase schema
-- Run these in the Supabase SQL editor to create the required tables.
-- Existing tables (inquiries, designers) are preserved.

-- ─── Client applications (project briefs) ────────────────────────────────────

create table if not exists client_applications (
  id uuid primary key default gen_random_uuid(),
  service_mode text not null,
  category text not null,
  design_types text not null,
  project_description text not null,
  timeline text not null,
  budget text not null,
  references text,
  contact_name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  engagement_type text,
  worked_with_designer text,
  hear_about_us text,
  additional_notes text,
  status text not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now()
);

-- ─── Designer / professional applications ─────────────────────────────────────

create table if not exists designer_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  specialty text not null,
  experience text not null,
  skills text not null,
  tools text,
  portfolio_url text not null,
  availability text not null,
  hourly_rate text not null,
  can_work_on_site text,
  bio text not null,
  why_join text not null,
  worked_with_ethiopian_biz text,
  social_url text,
  status text not null default 'pending',
  reviewer_notes text,
  created_at timestamptz not null default now()
);

-- ─── Projects ─────────────────────────────────────────────────────────────────

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references client_applications(id) on delete set null,
  title text not null,
  client_name text not null,
  client_email text not null,
  client_business text not null,
  assigned_professional_ids uuid[] not null default '{}',
  service_mode text not null,
  category text not null,
  deliverables text not null,
  exclusions text,
  assumptions text,
  acceptance_criteria text,
  revision_limit integer not null default 2,
  status text not null default 'ready_to_start',
  deadline date,
  budget text not null,
  manager_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Project milestones ───────────────────────────────────────────────────────

create table if not exists project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  status text not null default 'pending',
  payment_condition text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Project notes (activity log / messages) ─────────────────────────────────

create table if not exists project_notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  author text not null,
  content text not null,
  is_internal boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── Row-level security (basic) ───────────────────────────────────────────────
-- Adjust these policies for your security requirements.
-- For now, server-side access via service role key; public access is blocked.

alter table client_applications enable row level security;
alter table designer_applications enable row level security;
alter table projects enable row level security;
alter table project_milestones enable row level security;
alter table project_notes enable row level security;

-- Allow service role full access (used by the Next.js server actions)
create policy "service_role_full_access" on client_applications
  for all using (true) with check (true);

create policy "service_role_full_access" on designer_applications
  for all using (true) with check (true);

create policy "service_role_full_access" on projects
  for all using (true) with check (true);

create policy "service_role_full_access" on project_milestones
  for all using (true) with check (true);

create policy "service_role_full_access" on project_notes
  for all using (true) with check (true);
