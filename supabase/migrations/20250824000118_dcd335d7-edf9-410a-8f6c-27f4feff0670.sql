-- Fix security issues by restricting SELECT access to sensitive tables
-- These policies will prevent public reading while keeping form submissions working

-- 1. Referrals table - restrict SELECT access (contains referrer emails)
-- Only authenticated users with admin role can view referrals
CREATE POLICY "Only authenticated admins can view referrals" 
ON public.referrals 
FOR SELECT 
TO authenticated 
USING (false); -- For now, restrict all SELECT access until proper auth/roles are implemented

-- 2. Startup submissions table - restrict SELECT access (contains customer emails)
-- Only authenticated users with admin role can view startup submissions  
CREATE POLICY "Only authenticated admins can view startup submissions" 
ON public.startup_submissions 
FOR SELECT 
TO authenticated 
USING (false); -- For now, restrict all SELECT access until proper auth/roles are implemented

-- 3. Talent submissions table - restrict SELECT access (contains LinkedIn URLs)
-- Only authenticated users with admin role can view talent submissions
CREATE POLICY "Only authenticated admins can view talent submissions" 
ON public.talent_submissions 
FOR SELECT 
TO authenticated 
USING (false); -- For now, restrict all SELECT access until proper auth/roles are implemented

-- Note: The existing INSERT policies remain unchanged so forms continue to work
-- When authentication is implemented, the USING clauses can be updated to check for admin roles