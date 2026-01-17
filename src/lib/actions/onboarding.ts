'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { resend, emailConfig } from '@/lib/resend';

export async function initializeOnboarding(practiceId: string) {
    if (!isSupabaseConfigured) return { success: true, message: 'Supabase not configured' };

    // Check if already initialized to avoid duplicate folders
    const { data: existingState } = await supabase
        .from('onboarding_state')
        .select('google_drive_root_id')
        .eq('practice_id', practiceId)
        .single();

    if (existingState?.google_drive_root_id) {
        return { success: true, message: 'Already initialized' };
    }

    // 1. Initialize onboarding state in DB
    const { error: stateError } = await supabase
        .from('onboarding_state')
        .upsert({
            practice_id: practiceId,
            msa_signed: false,
            leadsie_connected: false,
            is_complete: false
        }, { onConflict: 'practice_id' });

    if (stateError) throw stateError;

    // 2. Provision Google Drive
    let driveData = null;
    try {
        const { data: practice } = await supabase
            .from('practices')
            .select('name, email')
            .eq('id', practiceId)
            .single();

        if (practice) {
            const { createClientFolder, isDriveConfigured } = await import('@/lib/google-drive');

            if (!isDriveConfigured) {
                console.warn('Google Drive not configured, skipping folder creation');
            } else {
                driveData = await createClientFolder(practice.name, practice.email);

                // Save drive links back to onboarding state
                await supabase
                    .from('onboarding_state')
                    .update({
                        google_drive_root_id: driveData.rootFolderId,
                        google_drive_link: driveData.webViewLink,
                        google_drive_subfolders: driveData.subfolderIds
                    })
                    .eq('practice_id', practiceId);

                console.log(`Drive provisioned for ${practice.name}: ${driveData.webViewLink}`);
            }
        }
    } catch (driveErr: any) {
        console.error('Drive provisioning failed:', driveErr.message);
        return { success: false, error: `Drive provisioning failed: ${driveErr.message}` };
    }

    // 3. Seed Initial Workflow Tasks (Systematic SEO Workflow)
    const initialTasks = [
        // Phase 1: Pre-Kickoff Audits
        { practice_id: practiceId, name: 'Onboarding Info & Access Audit', category: 'Access', stage: 'Pre-Launch', display_order: 1, status: 'Open' },
        { practice_id: practiceId, name: 'Site Speed & Security Benchmark', category: 'Access', stage: 'Pre-Launch', display_order: 2, status: 'Open' },
        { practice_id: practiceId, name: 'GBP Address Uniqueness Check', category: 'GBP', stage: 'Pre-Launch', display_order: 3, status: 'Open' },

        // Phase 2: Kickoff Strategy (Intro Call)
        { practice_id: practiceId, name: 'Intro Call: Goal & KPI Alignment', category: 'Intro Call', stage: 'Launch', display_order: 4, status: 'Open' },
        { practice_id: practiceId, name: 'Initialize Google Marketing Account', category: 'Gmail', stage: 'Launch', display_order: 5, status: 'Open' },
        { practice_id: practiceId, name: 'Finalize Targeted Keywords (Q1)', category: 'Content', stage: 'Launch', display_order: 6, status: 'Open' },
        { practice_id: practiceId, name: 'Social Brand Page Creation (FB/LI)', category: 'Access', stage: 'Launch', display_order: 7, status: 'Open' },

        // Phase 3: Execution Phase
        { practice_id: practiceId, name: 'NEO Image Asset Creation', category: 'NEO', stage: 'Execution', display_order: 8, status: 'Open' },
        { practice_id: practiceId, name: 'New Service Page Development', category: 'Content', stage: 'Execution', display_order: 9, status: 'Open' },
        { practice_id: practiceId, name: 'Draft 6x GBP High-Engagement Posts', category: 'GBP', stage: 'Execution', display_order: 10, status: 'Open' },
        { practice_id: practiceId, name: 'Client Approval: Content & Creative', category: 'Content', stage: 'Execution', display_order: 11, status: 'Waiting on Client' },

        // Phase 4: Authority & Syndication
        { practice_id: practiceId, name: 'Core Directory Listing Sync', category: 'Directories', stage: 'Execution', display_order: 12, status: 'Open' },
        { practice_id: practiceId, name: 'Press Release Distribution (Q1)', category: 'PR', stage: 'Execution', display_order: 13, status: 'Open' },
        { practice_id: practiceId, name: 'Social Profile Authority Building', category: 'Access', stage: 'Execution', display_order: 14, status: 'Open' },
        { practice_id: practiceId, name: 'Professional Endorsement Campaign', category: 'Content', stage: 'Execution', display_order: 15, status: 'Open' },
    ];

    const { error: taskError } = await supabase.from('workflow_tasks').insert(initialTasks);
    if (taskError) throw taskError;

    // 3. Seed Base SEO Checklist
    const { error: checklistError } = await supabase.from('optimization_checklists').insert({
        practice_id: practiceId,
        type: 'Homepage',
        items: [
            { id: '1', name: 'Page Title Optimized', status: 'Open' },
            { id: '2', name: 'Meta Description Drafted', status: 'Open' },
            { id: '3', name: 'H1 keyword alignment', status: 'Open' }
        ]
    });
    if (checklistError) throw checklistError;

    // 4. Mock Google Drive provisioning
    console.log(`Provisioning complete for practice: ${practiceId}`);

    return { success: true };
}

export async function updateOnboardingState(practiceId: string, updates: any) {
    const { error } = await supabase
        .from('onboarding_state')
        .update(updates)
        .eq('practice_id', practiceId);

    if (error) throw error;
    return { success: true };
}

export async function sendOnboardingReminder(practiceId: string, email: string) {
    if (!resend) return { success: false, error: 'Resend not configured' };

    try {
        const { data, error } = await resend.emails.send({
            from: emailConfig.from,
            to: [email],
            subject: 'Action Required: Complete Your Moonraker Onboarding',
            html: `
        <h1>Welcome to Moonraker AI</h1>
        <p>Your campaign is ready to launch, but we need a few more details to get started.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding?id=${practiceId}">Click here to complete your onboarding</a></p>
      `,
        });

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Failed to send reminder:', err);
        return { success: false, error: err };
    }
}
