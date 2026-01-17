'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function getPracticeHolisticData(practiceId: string) {
    const mockData = {
        practice: {
            id: practiceId,
            name: 'Moonraker Wellness',
            status: 'Active',
            location: 'Albuquerque, NM',
            city_state: 'NM',
            tier: 'Full CORE Implementation',
            website: 'https://wellness.example.com',
            contact_name: 'Kelly Chisholm',
            notes: 'Directories started. NOTIFY BEFORE UPDATING SPEED!'
        },
        onboarding: { is_complete: true, msa_signed: true, leadsie_connected: true },
        tasks: [
            { id: '1', name: 'Onboarding Info & Access Audit', category: 'Access', stage: 'Pre-Kickoff', display_order: 1, status: 'Done' },
            { id: '2', name: 'Site Speed & Security Benchmark', category: 'Audit', stage: 'Pre-Kickoff', display_order: 2, status: 'Done' },
            { id: '3', name: 'GBP Address Uniqueness Check', category: 'GBP', stage: 'Pre-Kickoff', display_order: 3, status: 'Done' },
            { id: '4', name: 'Intro Call: Goal & KPI Alignment', category: 'Intro Call', stage: 'Kickoff Strategy', display_order: 4, status: 'Done' },
            { id: '5', name: 'Initialize Google Marketing Account', category: 'Gmail', stage: 'Kickoff Strategy', display_order: 5, status: 'Doing' },
            { id: '6', name: 'Core Directory Listing Sync', category: 'Citations', stage: 'Execution Phase', display_order: 6, status: 'Open' },
            { id: '7', name: 'Meta Data & Schema Implementation', category: 'Technical', stage: 'Execution Phase', display_order: 7, status: 'Open' },
            { id: '8', name: 'Monthly PR Syndication Batch', category: 'Authority', stage: 'Authority Building', display_order: 8, status: 'Open' },
        ],
        checklists: [],
        prs: [],
        insights: { summary: "DEMO MODE: Connect Supabase and seed your first practice to enable real-time campaign intelligence.", priority_score: 85, urgent_tasks: [] }
    };

    if (!isSupabaseConfigured) {
        return mockData;
    }

    try {
        const [
            { data: practice },
            { data: onboarding },
            { data: tasks },
            { data: checklists },
            { data: prs },
            { data: insights }
        ] = await Promise.all([
            supabase.from('practices').select('*').eq('id', practiceId).single(),
            supabase.from('onboarding_state').select('*').eq('practice_id', practiceId).single(),
            supabase.from('workflow_tasks').select('*').eq('practice_id', practiceId).order('display_order', { ascending: true }),
            supabase.from('optimization_checklists').select('*').eq('practice_id', practiceId),
            supabase.from('press_releases').select('*').eq('practice_id', practiceId),
            supabase.from('gemini_insights').select('*').eq('practice_id', practiceId).single()
        ]);

        if (!practice) {
            return mockData;
        }

        return {
            practice,
            onboarding,
            tasks: tasks || [],
            checklists: checklists || [],
            prs: prs || [],
            insights
        };
    } catch (err) {
        console.error("Supabase fetch error, falling back to mock:", err);
        return mockData;
    }
}

export async function getAllPracticesOverview() {
    const mockPractices = [
        { id: '1', name: 'Moonraker Wellness', location: 'Albuquerque, NM', status: 'Active', visibility: '+24%', lastUpdated: '2 hours ago' },
        { id: '2', name: 'Bay Area Therapy', location: 'San Francisco, CA', status: 'Onboarding', visibility: 'Initializing', lastUpdated: '5 hours ago' },
        { id: '3', name: 'Desert Rose Counseling', location: 'Phoenix, AZ', status: 'Active', visibility: '+18%', lastUpdated: '1 day ago' },
        { id: '4', name: 'Family First Wellness', location: 'Dallas, TX', status: 'Paused', visibility: '+2%', lastUpdated: '3 days ago' },
    ];

    if (!isSupabaseConfigured) return mockPractices;

    const { data, error } = await supabase
        .from('practices')
        .select(`
      *,
      onboarding_state(is_complete),
      gemini_insights(priority_score)
    `)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error("Supabase fetch error for overview:", error);
        return mockPractices;
    }

    if (!data || data.length === 0) {
        return mockPractices;
    }

    return data;
}
export async function updatePracticeNotes(practiceId: string, notes: string) {
    if (!isSupabaseConfigured) return { success: true, notes };

    const { data, error } = await supabase
        .from('practices')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', practiceId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function checkRealDataExistence() {
    if (!isSupabaseConfigured) return { status: 'Not Configured' };

    const { data, count, error } = await supabase
        .from('practices')
        .select('*', { count: 'exact' })
        .ilike('name', '%Albuquerque%');

    return {
        count: count || 0,
        found: data || [],
        error: error?.message
    };
}

export async function createPractice(practiceData: {
    name: string;
    contact_name?: string;
    email?: string;
    website?: string;
    notes?: string;
}) {
    if (!isSupabaseConfigured) {
        // Return mock success for demo mode
        return {
            id: 'demo-' + Date.now(),
            ...practiceData,
            status: 'Open',
            created_at: new Date().toISOString()
        };
    }

    const { data, error } = await supabase
        .from('practices')
        .insert({
            name: practiceData.name,
            contact_name: practiceData.contact_name || null,
            email: practiceData.email || null,
            website: practiceData.website || null,
            notes: practiceData.notes || null,
            status: 'Open'
        })
        .select()
        .single();

    if (error) throw error;

    // Also create initial onboarding state
    await supabase
        .from('onboarding_state')
        .insert({
            practice_id: data.id,
            is_complete: false
        });

    return data;
}

