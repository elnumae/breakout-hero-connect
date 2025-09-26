-- Add first_name column to talent_submissions table
ALTER TABLE public.talent_submissions 
ADD COLUMN first_name TEXT;