-- Server-only writes: RLS enabled, no policies for anon/authenticated.
-- Inserts go through Next.js API routes using SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).

create extension if not exists "pgcrypto";

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  position text not null,
  location text,
  linkedin_url text,
  portfolio_url text,
  experience text,
  availability text,
  cover_letter text,

  resume_file_name text,
  resume_storage_path text,
  resume_public_url text,

  status text not null default 'new'
    check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),

  source text default 'website',
  meta jsonb default '{}'::jsonb
);

create index if not exists job_applications_created_at_idx
  on public.job_applications (created_at desc);
create index if not exists job_applications_email_idx
  on public.job_applications (email);

create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text,
  company text,
  project_type text,
  description text,
  budget text,
  timeline text,

  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),

  source text default 'get-started',
  meta jsonb default '{}'::jsonb
);

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);
create index if not exists project_inquiries_email_idx
  on public.project_inquiries (email);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  status text not null default 'active'
    check (status in ('active', 'unsubscribed', 'bounced')),
  source text default 'insights',
  meta jsonb default '{}'::jsonb,
  constraint newsletter_subscribers_email_unique unique (email)
);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

alter table public.job_applications enable row level security;
alter table public.project_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
