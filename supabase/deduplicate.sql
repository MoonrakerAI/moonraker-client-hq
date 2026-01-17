-- DEDUPLICATION & SCHEMA UPDATE
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/rfgzoyezphiogihihesv/sql)

-- 1. Add contact_phone column to practices
ALTER TABLE practices ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- 2. Deduplicate practices (keeping only the oldest record for each name)
-- This will also cascade delete associated tasks for the duplicate practices
WITH CTE AS (
  SELECT id,
    ROW_NUMBER() OVER (
      PARTITION BY name 
      ORDER BY created_at ASC
    ) as row_num
  FROM practices
)
DELETE FROM practices
WHERE id IN (
  SELECT id FROM CTE WHERE row_num > 1
);

-- 3. Verification
SELECT COUNT(*) as practice_count FROM practices;
SELECT name, contact_name, email, contact_phone, website FROM practices LIMIT 10;
