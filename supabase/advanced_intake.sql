-- ADVANCED INTAKE (DIFFERENTIATORS & CREDENTIALS)
-- Run this in Supabase SQL Editor or via runner
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS intake_differentiators JSONB DEFAULT '{
    "ideal_client": "",
    "reasons_to_choose": "",
    "intake_process": "",
    "after_care": ""
}'::jsonb,
    ADD COLUMN IF NOT EXISTS intake_credentials JSONB DEFAULT '{
    "npi_minc": "",
    "institution_degree": "",
    "board_certifications": "",
    "residencies_fellowships": "",
    "awards_recognitions": "",
    "associations_orgs": ""
}'::jsonb;