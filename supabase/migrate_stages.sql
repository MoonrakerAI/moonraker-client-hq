-- MIGRATE WORKFLOW STAGES
-- Run this in Supabase SQL Editor

-- 1. Update stages for all existing tasks
UPDATE workflow_tasks SET stage = 'Pre-Launch' WHERE stage = 'Pre-Kickoff';
UPDATE workflow_tasks SET stage = 'Launch' WHERE stage = 'Kickoff Strategy';
UPDATE workflow_tasks SET stage = 'Execution' WHERE stage IN ('Execution Phase', 'Authority Building');

-- 2. Verification
SELECT stage, COUNT(*) FROM workflow_tasks GROUP BY stage;
