-- Enable UUID generation (usually on by default)
create extension if not exists "uuid-ossp";

-- Create referrals table
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_email text not null,
  talent_linkedin_url text not null,
  talent_contact text,
  status text not null default 'new',
  user_agent text,
  created_at timestamptz not null default now()
);

-- Helpful for search/dedup checks later (no uniqueness enforced)
create index if not exists referrals_linkedin_idx on public.referrals (lower(talent_linkedin_url));

-- Enable Row Level Security
alter table public.referrals enable row level security;

-- Anyone (even anonymous) can insert referrals
create policy "Anyone can create referral" 
on public.referrals 
for insert 
to anon 
with check (true);

-- No select policy for anon -> they cannot read the table