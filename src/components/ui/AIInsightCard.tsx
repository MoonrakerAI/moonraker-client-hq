'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface UrgentTask {
    task: string;
    reason: string;
    impact: string;
}

interface AIInsightProps {
    summary: string;
    score: number;
    tasks: UrgentTask[];
    onRefresh?: () => void;
}

export default function AIInsightCard({ summary, score, tasks, onRefresh }: AIInsightProps) {
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
        if (onRefresh) {
            setLoading(true);
            await onRefresh();
            setLoading(false);
        }
    };

    return (
        <div className="relative rounded-3xl bg-gradient-to-br from-[var(--primary-glow)] to-black border border-[var(--primary-glow)] border-opacity-30 p-8 overflow-hidden group">
            {/* Decorative backdrop */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[var(--primary)] opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity" />

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[var(--primary)] text-black shadow-[0_0_15px_var(--primary-glow)]">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">Gemini Smart Insights</h3>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className={`p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all ${loading ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Performance Score */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Priority Score</span>
                        <div className={`text-5xl font-black ${score > 80 ? 'text-red-400' : score > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {score}
                        </div>
                        <p className="text-[10px] font-bold text-slate-600 mt-2 uppercase tracking-tighter">Needs Immediate Action</p>
                    </div>

                    {/* AI Summary */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest">Campaign Overview</h4>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                {summary}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Priority Task Generation</h4>
                            <div className="grid grid-cols-1 gap-2">
                                {tasks.map((task, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--primary-glow)] transition-all group/task"
                                    >
                                        <div className="flex items-center gap-3">
                                            <AlertCircle size={16} className={task.impact === 'High' ? 'text-red-400' : 'text-amber-400'} />
                                            <span className="text-sm font-bold text-white group-hover/task:text-[var(--primary)] transition-colors">{task.task}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-700" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
