'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Map,
    Image as ImageIcon,
    Settings2,
    Newspaper,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import SEOStrategyTab from '@/components/tasks/SEOStrategyTab';
import GBPManagementTab from '@/components/tasks/GBPManagementTab';
import NeoCreativeTab from '@/components/tasks/NeoCreativeTab';
import AdminInternalTab from '@/components/tasks/AdminInternalTab';
import PressReleaseTab from '@/components/tasks/PressReleaseTab';
import TaskBoard from '@/components/tasks/TaskBoard';
import AIInsightCard from '@/components/ui/AIInsightCard';
import DatabaseAlert from '@/components/ui/DatabaseAlert';
import { getPracticeHolisticData } from '@/lib/actions/practices';
import { analyzePracticePerformance } from '@/lib/actions/gemini';

const tabs = [
    { id: 'strategy', name: 'SEO Strategy', icon: BarChart3 },
    { id: 'gbp', name: 'GBP Management', icon: Map },
    { id: 'pr', name: 'PR Syndication', icon: Newspaper },
    { id: 'creative', name: 'NEO & Creative', icon: ImageIcon },
    { id: 'admin', name: 'Admin/Internal', icon: Settings2 },
];

import { createCustomTask } from '@/lib/actions/tasks';

export default function PracticeDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState('strategy');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [newTaskName, setNewTaskName] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const holisticData = await getPracticeHolisticData(params.id);
            setData(holisticData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRefreshAI = async () => {
        await analyzePracticePerformance(params.id);
        await fetchData();
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;
        setIsAddingTask(true);
        try {
            await createCustomTask(params.id, newTaskName);
            setNewTaskName('');
            await fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setIsAddingTask(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
        </div>
    );

    if (!data?.practice) return <div>Practice not found</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-[var(--primary)] transition-colors w-fit">
                    <ChevronLeft size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
                </Link>

                <DatabaseAlert />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold font-heading">{data.practice.name}</h1>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">
                                    {data.practice.status} Campaign
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-400 font-medium">
                                    {data.practice.location || 'Primary Market'}: {data.practice.city_state || 'National'} • Tier: {data.practice.tier || 'Full CORE Implementation'}
                                </p>
                                {data.practice.contact_name && (
                                    <p className="text-sm text-[var(--primary)] font-bold">Point of Contact: {data.practice.contact_name}</p>
                                )}
                            </div>
                        </div>

                        {data.practice.notes && (
                            <div className="max-w-3xl p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">Internal Campaign Notes</h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    {data.practice.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {data.practice.campaign_link && (
                            <a
                                href={data.practice.campaign_link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all"
                            >
                                Strategy Sheet
                            </a>
                        )}
                        <button className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-black text-sm font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all">
                            Edit Practice
                        </button>
                    </div>
                </div>
            </div>
            {/* Intelligence Layer */}
            <div className="mb-8">
                <AIInsightCard
                    summary={data.insights?.summary || "Gemini is analyzing the latest campaign data. Refresh to generate a priority roadmap."}
                    score={data.insights?.priority_score || 0}
                    tasks={data.insights?.urgent_tasks || []}
                    onRefresh={handleRefreshAI}
                />
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl w-fit border border-white/5">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'text-[var(--primary)]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Icon size={18} />
                            <span>{tab.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/5 rounded-xl border border-[var(--primary-glow)]"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="min-h-[500px]"
            >
                {activeTab === 'strategy' && <SEOStrategyTab checklists={data.checklists} />}
                {activeTab === 'gbp' && <GBPManagementTab onboarding={data.onboarding} />}
                {activeTab === 'pr' && <PressReleaseTab prs={data.prs} />}
                {activeTab === 'creative' && <NeoCreativeTab />}
                {activeTab === 'admin' && <AdminInternalTab practice={data.practice} onboarding={data.onboarding} insights={data.insights} />}
            </motion.div>

            {/* Task Feed (Sidebar/Bottom Section) */}
            <div className="pt-12 border-t border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold font-heading">Campaign Task Feed</h2>
                        <p className="text-sm text-slate-500 font-medium">Live execution status for this practice.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <form onSubmit={handleAddTask} className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Add custom request..."
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-all min-w-[300px]"
                            />
                            <button
                                type="submit"
                                disabled={isAddingTask}
                                className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-all disabled:opacity-50"
                            >
                                {isAddingTask ? 'Adding...' : 'Add Task'}
                            </button>
                        </form>
                        <button className="text-sm font-bold text-[var(--primary)] hover:underline">Launch Batch Action</button>
                    </div>
                </div>
                <TaskBoard tasks={data.tasks} isAdmin={true} />
            </div>
        </div>
    );
}

const mockTasks: any[] = [
    { id: '1', name: 'Initiate PR Syndication Batch', status: 'Doing', category: 'PR & Content', sop_url: '#' },
    { id: '2', name: 'Update Homepage Schema with Local Keywords', status: 'Open', category: 'Technical SEO', sop_url: '#' },
    { id: '3', name: 'Schedule GBP Posts for Q1', status: 'Waiting on Client', category: 'GBP Management', sop_url: '#' },
    { id: '4', name: 'Audit MX/DKIM Records', status: 'Done', category: 'Infrastructure', sop_url: '#' },
];
