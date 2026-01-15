-- Database Schema for Moonraker Client HQ
-- To be run in Supabase SQL Editor

-- 1. Enable pgcrypto for encrypted fields if needed
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Create Types
CREATE TYPE practice_status AS ENUM ('Open', 'Doing', 'Waiting on Client', 'Done');
CREATE TYPE task_category AS ENUM ('Intro Call', 'Gmail', 'Access', 'Content', 'GBP', 'NEO', 'Directories', 'PR');
CREATE TYPE checklist_type AS ENUM ('Homepage', 'Service Page', 'Location Page', 'GBP', 'NEO', 'Directories');

-- 3. Practices Table
CREATE TABLE IF NOT EXISTS practices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status practice_status DEFAULT 'Open',
    start_date TEXT, -- Changed to TEXT to accommodate various formats from CSV like "2020" or "7/11/2025"
    contact_name TEXT,
    email TEXT,
    website TEXT,
    gbp_link TEXT,
    campaign_link TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Google Accounts Table (Encrypted in application layer recommended)
CREATE TABLE IF NOT EXISTS google_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    gmail_address TEXT UNIQUE,
    password_encrypted TEXT,
    recovery_email TEXT,
    recovery_phone TEXT,
    authenticator_secret TEXT,
    backup_codes TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Onboarding State
CREATE TABLE IF NOT EXISTS onboarding_state (
    practice_id UUID PRIMARY KEY REFERENCES practices(id) ON DELETE CASCADE,
    msa_signed BOOLEAN DEFAULT FALSE,
    leadsie_connected BOOLEAN DEFAULT FALSE,
    intro_call_date TIMESTAMP WITH TIME ZONE,
    google_drive_link TEXT,
    reminders_sent INTEGER DEFAULT 0,
    last_reminder_at TIMESTAMP WITH TIME ZONE,
    is_complete BOOLEAN DEFAULT FALSE
);

-- 6. Optimization Checklists (JSONB for flexibility as per Sheets)
CREATE TABLE IF NOT EXISTS optimization_checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    type checklist_type NOT NULL,
    items JSONB NOT NULL DEFAULT '{}',
    status practice_status DEFAULT 'Open',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6.1 Workflow Tasks (Kanban/List state)
CREATE TABLE IF NOT EXISTS workflow_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status practice_status DEFAULT 'Open',
    category task_category NOT NULL,
    stage TEXT NOT NULL DEFAULT 'Pre-Kickoff',
    display_order INTEGER DEFAULT 0,
    sop_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Press Releases
CREATE TABLE IF NOT EXISTS press_releases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    brand_name TEXT,
    type TEXT,
    industry TEXT,
    top_3_audience TEXT,
    live_url TEXT,
    keywords TEXT[],
    status TEXT DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Gemini Insights
CREATE TABLE IF NOT EXISTS gemini_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    summary TEXT,
    priority_score INTEGER DEFAULT 0,
    urgent_tasks JSONB DEFAULT '[]',
    last_analyzed TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Assets Management
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Billing Sync
CREATE TABLE IF NOT EXISTS billing_sync (
    practice_id UUID PRIMARY KEY REFERENCES practices(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    active_plan TEXT,
    payment_status TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS (Row Level Security) - Basic Setup
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
-- Add policies based on user auth...
