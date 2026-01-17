import React from 'react';
import DashboardContent from './DashboardContent';
import { getDashboardStats, getUrgentTasks } from '@/lib/actions/dashboard';
import { getUserProfile } from '@/lib/actions/auth';
import { Users, Clock, CheckCircle2, TrendingUp, Target } from 'lucide-react';

const iconMap: Record<string, any> = {
    'Active Practices': Users,
    'Pending Onboarding': Clock,
    'Completed Tasks': CheckCircle2,
    'Avg. Visibility Increase': TrendingUp,
    'My Campaign Progress': Target,
    'Tasks Completed': CheckCircle2,
    'Active Workflow Tasks': Clock,
    'Growth Insight': TrendingUp,
};

export default async function DashboardPage() {
    const { profile } = await getUserProfile();
    const statsData = await getDashboardStats();
    const urgentTasks = await getUrgentTasks();

    if (!profile) return null;

    // Attach icons to stats
    const stats = (statsData || []).map(s => ({
        ...s,
        icon: iconMap[s.name] || Target
    }));

    return (
        <DashboardContent
            stats={stats}
            urgentTasks={urgentTasks}
            userName={profile.full_name?.split(' ')[0] || 'User'}
            role={profile.role}
        />
    );
}
