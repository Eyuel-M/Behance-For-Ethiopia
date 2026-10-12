-- ─── Hire Ethiopia's Best — Supabase Schema ───────────────────────────────────
-- Run this in Supabase Dashboard → SQL Editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Client briefs ────────────────────────────────────────────────────────────
create table if not exists client_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  status          text not null default 'new'
                    check (status in ('new','needs_clarification','qualified','in_progress','completed','declined','cancelled')),
  service_mode    text not null,
  category        text not null,
  design_types    text not null,
  project_description text not null,
  timeline        text not null,
  budget          text not null,
  references      text,
  contact_name    text not null,
  business_name   text not null,
  email           text not null,
  phone           text not null,
  engagement_type text not null default '',
  worked_with_designer text not null default '',
  hear_about_us   text not null default '',
  additional_notes text,
  admin_notes     text
);

-- ─── Designer applications ────────────────────────────────────────────────────
create table if not exists designer_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  status          text not null default 'pending'
                    check (status in ('pending','approved','rejected','waitlisted','archived')),
  full_name       text not null,
  email           text not null,
  phone           text not null,
  city            text not null,
  specialty       text not null,
  experience      text not null,
  skills          text not null,
  tools           text not null default '',
  portfolio_url   text not null,
  availability    text not null,
  hourly_rate     text not null,
  can_work_on_site text not null default '',
  bio             text not null,
  why_join        text not null,
  worked_with_ethiopian_biz text not null default '',
  social_url      text,
  work_samples    text,       -- JSON array of storage URLs
  education       text,
  certificates    text,
  certificate_files text,     -- JSON array of storage URLs
  review_requested boolean not null default false,
  admin_notes     text,
  avg_rating      numeric(3,2),
  review_count    int not null default 0
);

-- ─── Projects ─────────────────────────────────────────────────────────────────
create table if not exists projects (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  brief_id        uuid references client_applications(id) on delete set null,
  title           text not null,
  status          text not null default 'scoping'
                    check (status in ('scoping','in_progress','review','revision','completed','cancelled')),
  client_name     text not null,
  client_email    text not null,
  client_business text not null default '',
  service_mode    text not null default '',
  category        text not null default '',
  deliverables    text not null default '',
  exclusions      text,
  assumptions     text,
  acceptance_criteria text,
  revision_limit  int not null default 2,
  deadline        date,
  budget          text not null default '',
  manager_notes   text,
  professional_token text unique,
  proposal_token  text unique,
  feedback_token  text unique,
  client_token    text unique
);

-- ─── Project milestones ───────────────────────────────────────────────────────
create table if not exists project_milestones (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  project_id      uuid not null references projects(id) on delete cascade,
  title           text not null,
  description     text,
  status          text not null default 'pending'
                    check (status in ('pending','in_progress','submitted','approved','revision_requested')),
  due_date        date,
  payment_condition text,
  sort_order      int not null default 0,
  submission_url  text,
  submission_notes text
);

-- ─── Project notes ────────────────────────────────────────────────────────────
create table if not exists project_notes (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  project_id      uuid not null references projects(id) on delete cascade,
  author          text not null,
  content         text not null,
  is_internal     boolean not null default false
);

-- ─── Designer proposals ───────────────────────────────────────────────────────
create table if not exists client_proposals (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  project_id      uuid not null references projects(id) on delete cascade,
  token           text unique not null,
  designer_ids    text not null,  -- JSON array of application UUIDs
  selected_id     text,           -- chosen application UUID
  status          text not null default 'pending'
                    check (status in ('pending','selected','revision_requested')),
  revision_notes  text,
  expires_at      timestamptz
);

-- ─── Designer feedback ────────────────────────────────────────────────────────
create table if not exists designer_feedback (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  application_id  uuid not null references designer_applications(id) on delete cascade,
  project_id      uuid references projects(id) on delete set null,
  token           text unique not null,
  rating          int check (rating between 1 and 5),
  quality         int check (quality between 1 and 5),
  communication   int check (communication between 1 and 5),
  timeliness      int check (timeliness between 1 and 5),
  would_hire_again boolean,
  review_text     text,
  submitted_at    timestamptz
);

-- ─── Storage bucket ───────────────────────────────────────────────────────────
-- Run in Dashboard → Storage → New bucket:
-- Name: portfolio-samples, Public: true

-- ─── Row Level Security (optional, for later) ─────────────────────────────────
-- All tables are accessed server-side only (service role key), so RLS can be
-- disabled for now. Enable and write policies once you add client-facing auth.
