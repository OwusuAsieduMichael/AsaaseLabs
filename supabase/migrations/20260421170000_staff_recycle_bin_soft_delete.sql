alter table if exists public.project_inquiries
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by text;

alter table if exists public.job_applications
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by text;

create index if not exists project_inquiries_deleted_at_idx
  on public.project_inquiries (deleted_at);

create index if not exists job_applications_deleted_at_idx
  on public.job_applications (deleted_at);
