-- BOOKING STATUS METADATA
-- Stores whether the intro call has been confirmed by the user
ALTER TABLE onboarding_state
ADD COLUMN IF NOT EXISTS booking_confirmed BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS booking_notes TEXT;