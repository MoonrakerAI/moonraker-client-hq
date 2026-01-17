-- CLIENT ONBOARDING (IDENTITY & MEDIA)
-- Run this in Supabase SQL Editor or via runner
ALTER TABLE practices
ADD COLUMN IF NOT EXISTS correspondence_email TEXT,
    ADD COLUMN IF NOT EXISTS date_founded TEXT,
    ADD COLUMN IF NOT EXISTS hours_of_operation TEXT,
    ADD COLUMN IF NOT EXISTS business_id TEXT,
    ADD COLUMN IF NOT EXISTS tagline TEXT,
    ADD COLUMN IF NOT EXISTS social_profiles JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS payment_methods JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS owner_pr_name TEXT,
    ADD COLUMN IF NOT EXISTS owner_pr_linkedin TEXT,
    ADD COLUMN IF NOT EXISTS owner_pr_bio TEXT;
-- Update onboarding_state to store folder links
ALTER TABLE onboarding_state
ADD COLUMN IF NOT EXISTS google_drive_root_id TEXT,
    ADD COLUMN IF NOT EXISTS google_drive_link TEXT,
    ADD COLUMN IF NOT EXISTS google_drive_subfolders JSONB DEFAULT '{}'::jsonb;