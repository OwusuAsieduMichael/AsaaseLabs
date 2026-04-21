alter table if exists public.job_applications
  add column if not exists status_note text,
  add column if not exists status_updated_at timestamptz,
  add column if not exists candidate_notified_at timestamptz;

alter table if exists public.job_applications
  drop constraint if exists job_applications_status_check;

alter table if exists public.job_applications
  add constraint job_applications_status_check
  check (status in ('new', 'reviewing', 'shortlisted', 'interview', 'rejected', 'hired'));
