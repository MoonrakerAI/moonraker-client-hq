'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function getPracticeHolisticData(practiceId: string) {
    if (!isSupabaseConfigured) {
        // Return premium mock data for demo mode
        return {
            practice: { id: practiceId, name: 'Moonraker Wellness', status: 'Active', website: 'https://wellness.example.com' },
            onboarding: { is_complete: true, msa_signed: true, leadsie_connected: true },
            tasks: [
                { id: '1', name: 'Onboarding Info & Access Audit', category: 'Access', stage: 'Pre-Kickoff', display_order: 1, status: 'Done' },
                { id: '2', name: 'Site Speed & Security Benchmark', category: 'Audit', stage: 'Pre-Kickoff', display_order: 2, status: 'Done' },
                { id: '3', name: 'GBP Address Uniqueness Check', category: 'GBP', stage: 'Pre-Kickoff', display_order: 3, status: 'Done' },
                { id: '4', name: 'Intro Call: Goal & KPI Alignment', category: 'Intro Call', stage: 'Kickoff Strategy', display_order: 4, status: 'Done' },
                { id: '5', name: 'Initialize Google Marketing Account', category: 'Gmail', stage: 'Kickoff Strategy', display_order: 5, status: 'Doing' },
            ],
            checklists: [],
            prs: [],
            insights: { summary: "DEMO MODE: Gemini analysis is simulated. Connect Supabase to enable real AI insights based on your campaign data.", priority_score: 85, urgent_tasks: [] }
        };
    }

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

    return {
        practice,
        onboarding,
        tasks: tasks || [],
        checklists: checklists || [],
        prs: prs || [],
        insights
    };
}

export async function getAllPracticesOverview() {
    const { data, error } = await supabase
        .from('practices')
        .select(`
      *,
      onboarding_state(is_complete),
      gemini_insights(priority_score)
    `)
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
}
