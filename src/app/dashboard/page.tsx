'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    ChevronRight
} from 'lucide-react';
import AIInsightCard from '@/components/ui/AIInsightCard';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import { isSupabaseConfigured } from '@/lib/supabase';
import Link from 'next/link';

const stats = [
    { name: 'Active Practices', value: '24', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Pending Onboarding', value: '5', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { name: 'Completed Tasks', value: '1,284', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Avg. Visibility Increase', value: '+22%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

// Sample urgent tasks with status
const urgentTasks = [
    { id: 1, name: 'Complete Landing Page Schema', practice: 'Albuquerque Family Counseling', status: 'Waiting on Client' as const },
    { id: 2, name: 'Optimize GBP Service Categories', practice: 'Bay Area Therapy', status: 'Internal Review' as const },
    { id: 3, name: 'Fix MX/DKIM Records', practice: 'Desert Rose Counseling', status: 'Doing' as const },
];

// Status colors matching the shared config
const statusDotColors = {
    'Open': 'bg-slate-500',
    'Doing': 'bg-blue-400',
    'Internal Review': 'bg-orange-400',
    'Waiting on Client': 'bg-amber-400',
    'Done': 'bg-emerald-400',
};

const rowStatusStyles = {
    'Open': 'border-l-slate-500/50 bg-slate-500/5 hover:bg-slate-500/10',
    'Doing': 'border-l-blue-400 bg-blue-400/5 hover:bg-blue-400/10',
    'Internal Review': 'border-l-orange-400 bg-orange-400/5 hover:bg-orange-400/10',
    'Waiting on Client': 'border-l-amber-400 bg-amber-400/5 hover:bg-amber-400/10',
    'Done': 'border-l-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10',
};

const statusBadgeColors = {
    'Open': 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    'Doing': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Internal Review': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    'Waiting on Client': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'Done': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export default function Dashboard() {
    return (
        <div className="space-y-10">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-heading tracking-tight">Command Center</h1>
                <p className="text-slate-400 font-medium">Welcome back, Chris. Here&apos;s what&apos;s happening across your campaigns today.</p>
            </header>

            <DatabaseAlert />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-glow)] transition-colors group cursor-default"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">{stat.name}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            <div className="text-[var(--primary)] flex items-center gap-1 text-sm font-bold bg-[var(--primary-glow)] px-2 py-0.5 rounded-lg border border-[var(--primary-glow)]">
                                <ArrowUpRight size={14} />
                                <span>Live</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Urgent Tasks */}
                <div className="lg:col-span-2 p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold font-heading">Urgent Campaign Tasks</h2>
                        <Link href="/tasks" className="text-sm font-bold text-[var(--primary)] hover:underline underline-offset-4 tracking-tight">View Full Board</Link>
                    </div>

                    <div className="space-y-3">
                        {urgentTasks.map((task) => (
                            <Link
                                key={task.id}
                                href="/tasks"
                                className={`flex items-center gap-4 p-4 rounded-xl border-l-4 border border-white/5 transition-all cursor-pointer group ${rowStatusStyles[task.status]}`}
                            >
                                <div className={`w-4 h-4 rounded-full ${statusDotColors[task.status]}`} />
                                <div className="flex-1">
                                    <h4 className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">{task.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">Practice: {task.practice}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeColors[task.status]}`}>
                                        {task.status}
                                    </span>
                                    <ChevronRight size={18} className="text-slate-600 group-hover:text-[var(--primary)]" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Intelligence Layer Section */}
                <AIInsightCard
                    summary="3 campaigns show high potential for ranking boost with immediate schema optimization. Priority assigned to 'Albuquerque Family' and 'Bay Area Therapy'."
                    score={85}
                    tasks={[
                        { task: "Complete Landing Page Schema", reason: "Missing local schema on homepage", impact: "High" },
                        { task: "Optimize GBP Service Categories", reason: "Mismatch with current campaign focus", impact: "Medium" },
                        { task: "Fix MX/DKIM Records", reason: "Email deliverability at risk", impact: "High" }
                    ]}
                />
            </div>
        </div>
    );
}
