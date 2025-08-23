-- Create startup submissions table
create table if not exists public.startup_submissions (
  id uuid primary key default gen_random_uuid(),
  jd_link text not null,
  email text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.startup_submissions enable row level security;

-- Anyone (even anonymous) can insert startup submissions
create policy "Anyone can create startup submission" 
on public.startup_submissions 
for insert 
to anon 
with check (true);