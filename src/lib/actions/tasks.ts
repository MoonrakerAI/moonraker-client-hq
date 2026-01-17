'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type TaskStatus = 'Open' | 'Doing' | 'Internal Review' | 'Waiting on Client' | 'Done';

export async function getPracticeTasks(practiceId: string) {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
        .from('workflow_tasks')
        .select('*')
        .eq('practice_id', practiceId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus, notes?: string) {
    if (!isSupabaseConfigured) {
        // Return mock success for demo mode
        console.log('[Demo Mode] Task update simulated:', { taskId, status, notes });
        return { id: taskId, status, notes, updated_at: new Date().toISOString() };
    }

    const { data, error } = await supabase
        .from('workflow_tasks')
        .update({ status, notes, updated_at: new Date().toISOString() })
        .eq('id', taskId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getOptimizationChecklists(practiceId: string) {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
        .from('optimization_checklists')
        .select('*')
        .eq('practice_id', practiceId);

    if (error) throw error;
    return data;
}

export async function updateChecklistItem(checklistId: string, items: any) {
    if (!isSupabaseConfigured) {
        return { id: checklistId, items, updated_at: new Date().toISOString() };
    }

    const { data, error } = await supabase
        .from('optimization_checklists')
        .update({ items, updated_at: new Date().toISOString() })
        .eq('id', checklistId)
        .select()
        .single();

    if (error) throw error;
    return data;
}
export async function createCustomTask(practiceId: string, name: string, category: string = 'Access', stage: string = 'Execution Phase') {
    if (!isSupabaseConfigured) {
        return {
            id: 'demo-' + Date.now(),
            practice_id: practiceId,
            name,
            status: 'Open',
            category,
            stage,
            display_order: 99
        };
    }

    const { data, error } = await supabase
        .from('workflow_tasks')
        .insert({
            practice_id: practiceId,
            name,
            status: 'Open',
            category,
            stage,
            display_order: 99
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}
