'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import { getAllPracticesOverview } from '@/lib/actions/practices';

export default function PracticesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [practices, setPractices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPracticesOverview();
                setPractices(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredPractices = practices.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Practices</h1>
                    <p className="text-slate-400 font-medium">Manage and monitor all active client SEO campaigns.</p>
                </div>
                <button className="px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_var(--primary-glow)] transition-all">
                    <Plus size={20} /> Add New Practice
                </button>
            </header>

            <DatabaseAlert />

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium"
                    />
                </div>
                <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                </div>
            ) : (
                /* Practice Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPractices.map((practice, i) => (
                        <motion.div
                            key={practice.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 hover:border-[var(--primary-glow)] transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <Link href={`/practices/${practice.id}`}>
                                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-[var(--primary)] transition-colors cursor-pointer">{practice.name}</h3>
                                    </Link>
                                    <p className="text-sm text-slate-500 font-medium">{practice.location}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${practice.status === 'Active' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                                        practice.status === 'Onboarding' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
                                            'text-slate-500 border-white/10'
                                        }`}>
                                        {practice.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <TrendingUp size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Visibility</span>
                                        </div>
                                        <p className={`text-sm font-bold ${practice.visibility?.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}`}>
                                            {practice.visibility || 'Analyzing...'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Clock size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Modified</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-300">
                                            {practice.lastUpdated || (practice.updated_at ? new Date(practice.updated_at).toLocaleDateString() : 'N/A')}
                                        </p>
                                    </div>
                                </div>

                                <Link href={`/practices/${practice.id}`} className="block">
                                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest group-hover:bg-[var(--primary)] group-hover:text-black transition-all flex items-center justify-center gap-2">
                                        View Campaign <ChevronRight size={14} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
