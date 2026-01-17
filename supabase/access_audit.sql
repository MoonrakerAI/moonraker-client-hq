-- ACCESS AUDIT METADATA
-- Stores website platform and detailed property access status
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS website_platform TEXT,
    ADD COLUMN IF NOT EXISTS access_audit JSONB DEFAULT '{}'::jsonb;
ALTER TABLE onboarding_state
ADD COLUMN IF NOT EXISTS leadsie_connected BOOLEAN DEFAULT FALSE;