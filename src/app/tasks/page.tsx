'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Filter,
    Search,
    LayoutGrid,
    List,
    ArrowUpRight,
    X,
    CheckSquare
} from 'lucide-react';
import TaskBoard from '@/components/tasks/TaskBoard';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { updateTaskStatus } from '@/lib/actions/tasks';

// Filter categories
const categoryFilters = ['All', 'Access', 'Content', 'GBP', 'NEO', 'Directories', 'PR', 'Intro Call', 'Gmail'];

export default function GlobalTaskBoard() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(isSupabaseConfigured);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const fetchAllTasks = async () => {
        if (!isSupabaseConfigured) return;

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
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    // Filter tasks based on search and category
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = searchTerm === '' ||
                task.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.practice_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.category?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [tasks, searchTerm, categoryFilter]);

    const handleUpdateTask = async (taskId: string, status: any, notes?: string) => {
        await updateTaskStatus(taskId, status, notes);
        await fetchAllTasks(); // Refresh the task list
    };

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
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by task, practice, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--primary)] focus:outline-none transition-all font-medium text-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all text-sm font-bold ${showFilters ? 'border-[var(--primary)] text-[var(--primary)]' : ''}`}
                        >
                            <Filter size={18} />
                            <span>Filter</span>
                            {categoryFilter !== 'All' && (
                                <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--primary)] text-black text-[10px] font-bold">1</span>
                            )}
                        </button>

                        {/* Filter Dropdown */}
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute right-0 top-full mt-2 w-56 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl z-20"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</h4>
                                    {categoryFilter !== 'All' && (
                                        <button
                                            onClick={() => setCategoryFilter('All')}
                                            className="text-[10px] text-[var(--primary)] font-bold hover:underline"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-1 max-h-64 overflow-y-auto">
                                    {categoryFilters.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setCategoryFilter(category);
                                                setShowFilters(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === category ? 'bg-[var(--primary-glow)] text-[var(--primary)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
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

            {/* Active Filters */}
            {(searchTerm || categoryFilter !== 'All') && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Active filters:</span>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold"
                        >
                            &quot;{searchTerm}&quot;
                            <X size={12} />
                        </button>
                    )}
                    {categoryFilter !== 'All' && (
                        <button
                            onClick={() => setCategoryFilter('All')}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] text-xs font-bold"
                        >
                            {categoryFilter}
                            <X size={12} />
                        </button>
                    )}
                </div>
            )}

            {/* Results Count */}
            {!loading && (
                <div className="text-xs text-slate-500 font-medium">
                    Showing {filteredTasks.length} of {tasks.length} tasks
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                </div>
            ) : filteredTasks.length > 0 ? (
                <TaskBoard
                    tasks={filteredTasks}
                    isAdmin={true}
                    onUpdateTask={handleUpdateTask}
                />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                        <CheckSquare size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No tasks found</h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                        {searchTerm || categoryFilter !== 'All'
                            ? "Try adjusting your search or filters."
                            : "Tasks will appear here once practices have been added."}
                    </p>
                </div>
            )}
        </div>
    );
}
