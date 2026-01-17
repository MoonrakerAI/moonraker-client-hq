'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    Clock,
    X,
    LayoutGrid,
    List,
    ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import NewPracticeModal from '@/components/ui/NewPracticeModal';
import { getAllPracticesOverview, createPractice } from '@/lib/actions/practices';

// Filter options
const statusFilters = ['All', 'Active', 'Done', 'Doing', 'Waiting on Client', 'Open', 'Onboarding', 'Paused'];

export default function PracticesPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [practices, setPractices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isNewPracticeModalOpen, setIsNewPracticeModalOpen] = useState(false);

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

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPractices = practices
        .filter(p => {
            const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.location || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return (a.name || '').localeCompare(b.name || '');
            } else {
                const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
                const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
                return dateB - dateA; // Descending
            }
        });

    const handleCreatePractice = async (practiceData: any) => {
        await createPractice(practiceData);
        await fetchData(); // Refresh the list
    };

    const handlePracticeClick = (id: string) => {
        router.push(`/practices/${id}`);
    };

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold font-heading tracking-tight">Practices</h1>
                    <p className="text-slate-400 font-medium">Manage and monitor all active client SEO campaigns.</p>
                </div>
                <button
                    onClick={() => setIsNewPracticeModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_var(--primary-glow)] transition-all"
                >
                    <Plus size={20} /> Add New Practice
                </button>
            </header>

            <DatabaseAlert />

            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
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

                <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-white'}`}
                            title="Grid View"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-white'}`}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setShowSort(!showSort); setShowFilters(false); }}
                            className={`px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all ${showSort ? 'border-[var(--primary)] text-[var(--primary)]' : ''}`}
                        >
                            <ArrowUpDown size={18} />
                            <span className="hidden sm:inline">Sort: {sortBy === 'name' ? 'Name' : 'Recent'}</span>
                        </button>

                        <AnimatePresence>
                            {showSort && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl z-20"
                                >
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => { setSortBy('name'); setShowSort(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === 'name' ? 'bg-[var(--primary-glow)] text-[var(--primary)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            Sort by Name
                                        </button>
                                        <button
                                            onClick={() => { setSortBy('recent'); setShowSort(false); }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === 'recent' ? 'bg-[var(--primary-glow)] text-[var(--primary)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            Sort by Recency
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setShowFilters(!showFilters); setShowSort(false); }}
                            className={`px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all ${showFilters ? 'border-[var(--primary)] text-[var(--primary)]' : ''}`}
                        >
                            <Filter size={18} />
                            <span className="hidden sm:inline">Filters</span>
                            {statusFilter !== 'All' && (
                                <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--primary)] text-black text-[10px] font-bold">1</span>
                            )}
                        </button>

                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-56 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl z-20"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</h4>
                                        {statusFilter !== 'All' && (
                                            <button
                                                onClick={() => setStatusFilter('All')}
                                                className="text-[10px] text-[var(--primary)] font-bold hover:underline"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                                        {statusFilters.map(status => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status);
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status ? 'bg-[var(--primary-glow)] text-[var(--primary)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Active Filters */}
            {statusFilter !== 'All' && (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Active filters:</span>
                    <button
                        onClick={() => setStatusFilter('All')}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] text-xs font-bold"
                    >
                        {statusFilter}
                        <X size={12} />
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                </div>
            ) : viewMode === 'grid' ? (
                /* Practice Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPractices.map((practice, i) => (
                        <motion.div
                            key={practice.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handlePracticeClick(practice.id)}
                            className="group relative rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 hover:border-[var(--primary-glow)] transition-all overflow-hidden cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button
                                    onClick={(e) => { e.stopPropagation(); /* Potential menu */ }}
                                    className="p-2 text-slate-500 hover:text-white transition-colors"
                                >
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-[var(--primary)] transition-colors line-clamp-1">{practice.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium line-clamp-1">{practice.location || practice.city_state || 'No location set'}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${practice.status === 'Active' || practice.status === 'Done' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                                            practice.status === 'Onboarding' || practice.status === 'Doing' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
                                                practice.status === 'Waiting on Client' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                                    practice.status === 'Internal Review' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' :
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="space-y-3">
                    <div className="hidden lg:grid grid-cols-6 gap-4 px-8 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="col-span-2">Practice</div>
                        <div>Status</div>
                        <div>Visibility</div>
                        <div>Last Modified</div>
                        <div className="text-right">Actions</div>
                    </div>
                    {filteredPractices.map((practice, i) => (
                        <motion.div
                            key={practice.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => handlePracticeClick(practice.id)}
                            className="group flex flex-col lg:grid lg:grid-cols-6 items-center gap-4 p-5 lg:px-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-glow)] transition-all cursor-pointer"
                        >
                            <div className="col-span-2 w-full lg:w-auto space-y-1">
                                <h3 className="text-base font-bold text-white group-hover:text-[var(--primary)] transition-colors truncate">{practice.name}</h3>
                                <p className="text-xs text-slate-500 font-medium truncate">{practice.location || practice.city_state || 'No location set'}</p>
                            </div>
                            <div className="w-full lg:w-auto">
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${practice.status === 'Active' || practice.status === 'Done' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                                        practice.status === 'Onboarding' || practice.status === 'Doing' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
                                            practice.status === 'Waiting on Client' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                                practice.status === 'Internal Review' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' :
                                                    'text-slate-500 border-white/10'
                                    }`}>
                                    {practice.status}
                                </span>
                            </div>
                            <div className="w-full lg:w-auto">
                                <p className={`text-sm font-bold ${practice.visibility?.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {practice.visibility || 'Analyzing...'}
                                </p>
                            </div>
                            <div className="w-full lg:w-auto">
                                <p className="text-sm font-bold text-slate-300">
                                    {practice.lastUpdated || (practice.updated_at ? new Date(practice.updated_at).toLocaleDateString() : 'N/A')}
                                </p>
                            </div>
                            <div className="w-full lg:w-auto flex justify-end items-center gap-4">
                                <ChevronRight className="text-slate-700 group-hover:text-[var(--primary)] transition-colors" size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredPractices.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                        <Users size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No practices found</h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                        {searchTerm || statusFilter !== 'All'
                            ? "Try adjusting your search or filters."
                            : "Get started by adding your first practice."}
                    </p>
                </div>
            )}

            {/* New Practice Modal */}
            <NewPracticeModal
                isOpen={isNewPracticeModalOpen}
                onClose={() => setIsNewPracticeModalOpen(false)}
                onSubmit={handleCreatePractice}
            />
        </div>
    );
}
