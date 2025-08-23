-- Create talent submissions table
create table if not exists public.talent_submissions (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  linkedin_url text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.talent_submissions enable row level security;

-- Anyone (even anonymous) can insert talent submissions
create policy "Anyone can create talent submission" 
on public.talent_submissions 
for insert 
to anon 
with check (true);

-- No select policy for anon -> they cannot read the table