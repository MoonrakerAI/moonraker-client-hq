'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getUserProfile } from './auth';

export async function getDashboardStats() {
    const { profile } = await getUserProfile();
    const supabase = createSupabaseServerClient();

    if (!profile) return null;

    if (profile.role === 'admin') {
        // Admin Stats (Global)
        const { count: activePractices } = await supabase.from('practices').select('*', { count: 'exact', head: true });
        const { count: pendingOnboarding } = await supabase.from('onboarding_state').select('*', { count: 'exact', head: true }).eq('is_complete', false);
        const { count: completedTasks } = await supabase.from('workflow_tasks').select('*', { count: 'exact', head: true }).eq('status', 'Done');

        return [
            { name: 'Active Practices', value: String(activePractices || 0), change: '+2', changeType: 'increase' }, // Mocking growth
            { name: 'Pending Onboarding', value: String(pendingOnboarding || 0), change: '-1', changeType: 'decrease' },
            { name: 'Completed Tasks', value: (completedTasks || 0).toLocaleString(), change: '+42', changeType: 'increase' },
            { name: 'Avg. Visibility Increase', value: '+22%', change: '+5%', changeType: 'increase' },
        ];
    } else {
        // Client Stats (Practice Specific)
        const practiceId = profile.practice_id;
        if (!practiceId) return null;

        const { count: totalTasks } = await supabase.from('workflow_tasks').select('*', { count: 'exact', head: true }).eq('practice_id', practiceId);
        const { count: doneTasks } = await supabase.from('workflow_tasks').select('*', { count: 'exact', head: true }).eq('practice_id', practiceId).eq('status', 'Done');

        const completionRate = totalTasks ? Math.round((doneTasks || 0) / totalTasks * 100) : 0;

        return [
            { name: 'My Campaign Progress', value: `${completionRate}%`, change: '+3%', changeType: 'increase' },
            { name: 'Tasks Completed', value: String(doneTasks || 0), change: '+2', changeType: 'increase' },
            { name: 'Active Workflow Tasks', value: String((totalTasks || 0) - (doneTasks || 0)), change: '-1', changeType: 'decrease' },
            { name: 'Growth Insight', value: '+18%', change: '+2%', changeType: 'increase' },
        ];
    }
}

export async function getUrgentTasks() {
    const { profile } = await getUserProfile();
    const supabase = createSupabaseServerClient();

    if (!profile) return [];

    let query = supabase
        .from('workflow_tasks')
        .select(`
            id,
            title,
            status,
            priority,
            practices (
                name
            )
        `)
        .neq('status', 'Done')
        .order('priority', { ascending: false })
        .limit(5);

    if (profile.role === 'client' && profile.practice_id) {
        query = query.eq('practice_id', profile.practice_id);
    }

    const { data: tasks, error } = await query;

    if (error) {
        console.error('Error fetching urgent tasks:', error.message);
        return [];
    }

    return tasks.map(t => ({
        id: t.id,
        name: t.title,
        practice: (t.practices as any)?.name || 'Unknown',
        status: t.status as any
    }));
}
