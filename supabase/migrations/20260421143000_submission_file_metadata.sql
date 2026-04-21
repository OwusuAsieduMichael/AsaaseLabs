alter table if exists public.project_inquiries
  add column if not exists description_file_name text,
  add column if not exists description_file_path text,
  add column if not exists description_file_type text,
  add column if not exists description_file_size_bytes bigint;

alter table if exists public.job_applications
  add column if not exists resume_file_type text,
  add column if not exists resume_file_size_bytes bigint,
  add column if not exists cover_letter_file_name text,
  add column if not exists cover_letter_storage_path text,
  add column if not exists cover_letter_file_type text,
  add column if not exists cover_letter_file_size_bytes bigint;
