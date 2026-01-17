-- INTAKE FORM SCHEMA EXTENSION
-- Run this in Supabase SQL Editor

-- 1. Add flat columns for business details
ALTER TABLE practices 
ADD COLUMN IF NOT EXISTS legal_business_name TEXT,
ADD COLUMN IF NOT EXISTS team_size TEXT,
ADD COLUMN IF NOT EXISTS service_delivery_type TEXT,
ADD COLUMN IF NOT EXISTS credentials TEXT,
ADD COLUMN IF NOT EXISTS modalities TEXT,
ADD COLUMN IF NOT EXISTS primary_groups TEXT,
ADD COLUMN IF NOT EXISTS primary_issues TEXT,
ADD COLUMN IF NOT EXISTS additional_services TEXT,
ADD COLUMN IF NOT EXISTS session_frequency TEXT,
ADD COLUMN IF NOT EXISTS average_session_cost TEXT,
ADD COLUMN IF NOT EXISTS insurance_accepted TEXT,
ADD COLUMN IF NOT EXISTS ehr_system TEXT,
ADD COLUMN IF NOT EXISTS crm_system TEXT;

-- 2. Add JSONB column for strategic goals and targeting
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS campaign_goals JSONB DEFAULT '{
    "primary_objective": "",
    "current_caseload": "",
    "target_caseload": "",
    "focus_keywords": [],
    "omissions": "",
    "brand_voice_preference": "",
    "brand_voice_links": [],
    "other_marketing": ""
}'::jsonb;

-- 3. Add Location Targeting details
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS gbp_count INTEGER,
ADD COLUMN IF NOT EXISTS gbp_address_visible TEXT,
ADD COLUMN IF NOT EXISTS gbp_verification_location TEXT;

-- 4. Verification
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'practices' 
AND column_name IN (
    'legal_business_name', 'campaign_goals', 'gbp_count'
);
