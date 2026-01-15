'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Filter,
    Search,
    LayoutGrid,
    List,
    ArrowUpRight
} from 'lucide-react';
import TaskBoard from '@/components/tasks/TaskBoard';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function GlobalTaskBoard() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(isSupabaseConfigured);

    useEffect(() => {
        if (!isSupabaseConfigured) return;

        async function fetchAllTasks() {
            const { data, error } = await supabase
                .from('workflow_tasks')
                .select('*, practices(name)')
                .order('created_at', { ascending: false });

            if (data) {
                // Map practice name into the task object for display
                const mapped = data.map(t => ({
                    ...t,
                    practice_name: t.practices?.name
                }));
                setTasks(mapped);
            }
            setLoading(false);
        }
        fetchAllTasks();
    }, []);

    return (
        <div className="space-y-10">
            <header className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold font-heading tracking-tight">Unified Task Board</h1>
                        <p className="text-slate-400 font-medium">1,000 foot view of all active campaign deliverables.</p>
                    </div>
                </div>
            </header>

            <DatabaseAlert />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search across all campaigns..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--primary)] focus:outline-none transition-all font-medium text-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all text-sm font-bold">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10">
                        <button className="p-2 rounded-lg bg-[var(--primary-glow)] text-[var(--primary)]">
                            <LayoutGrid size={18} />
                        </button>
                        <button className="p-2 rounded-lg text-slate-500 hover:text-slate-300">
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                </div>
            ) : (
                <TaskBoard tasks={tasks} isAdmin={true} />
            )}
        </div>
    );
}
