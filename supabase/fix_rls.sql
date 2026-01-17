-- FIX RLS POLICIES FOR CLIENT HQ
-- Run this FIRST in Supabase SQL Editor, then run seed_full_hq_final.sql

-- ============================================
-- STEP 1: Disable RLS temporarily for seeding
-- ============================================

-- Disable RLS on all tables to allow data seeding
ALTER TABLE practices DISABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_state DISABLE ROW LEVEL SECURITY;
ALTER TABLE google_accounts DISABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_checklists DISABLE ROW LEVEL SECURITY;
ALTER TABLE press_releases DISABLE ROW LEVEL SECURITY;
ALTER TABLE gemini_insights DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;
ALTER TABLE billing_sync DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Clear existing data (optional - uncomment if you want fresh data)
-- ============================================
-- TRUNCATE workflow_tasks, practices, onboarding_state, optimization_checklists, press_releases, gemini_insights, google_accounts, assets, billing_sync CASCADE;

-- ============================================
-- STEP 3: After running seed_full_hq_final.sql, 
-- you can optionally re-enable RLS with permissive policies:
-- ============================================

-- Create permissive read policies (allow anyone to read)
-- DROP POLICY IF EXISTS "Allow public read" ON practices;
-- CREATE POLICY "Allow public read" ON practices FOR SELECT USING (true);

-- DROP POLICY IF EXISTS "Allow public read" ON workflow_tasks;
-- CREATE POLICY "Allow public read" ON workflow_tasks FOR SELECT USING (true);

-- Then re-enable RLS:
-- ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE workflow_tasks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICATION QUERIES (run after seeding)
-- ============================================
-- SELECT COUNT(*) as practice_count FROM practices;
-- SELECT COUNT(*) as task_count FROM workflow_tasks;
-- SELECT name, status FROM practices LIMIT 5;
