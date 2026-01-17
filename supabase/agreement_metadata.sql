-- SERVICE AGREEMENT METADATA
-- Run this to store legal identity and signature records
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS legal_business_name TEXT,
    ADD COLUMN IF NOT EXISTS msa_address TEXT;
ALTER TABLE onboarding_state
ADD COLUMN IF NOT EXISTS msa_signature_name TEXT,
    ADD COLUMN IF NOT EXISTS msa_signature_title TEXT,
    ADD COLUMN IF NOT EXISTS msa_signature_date TEXT;