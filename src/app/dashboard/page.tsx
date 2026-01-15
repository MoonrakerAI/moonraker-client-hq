'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    Search
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
                        <button className="text-sm font-bold text-[var(--primary)] hover:underline underline-offset-4 tracking-tight">View Full Board</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-lg bg-red-400/10 text-red-400 flex items-center justify-center border border-red-400/20 group-hover:scale-105 transition-transform">
                                    <Clock size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">Complete Landing Page Schema</h4>
                                    <p className="text-sm text-slate-500 font-medium">Practice: Albuquerque Family Counseling</p>
                                </div>
                                <div className="text-right">
                                    <span className="px-3 py-1 rounded-full bg-red-400/10 text-red-400 text-xs font-bold border border-red-400/20">High Priority</span>
                                </div>
                            </div>
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
