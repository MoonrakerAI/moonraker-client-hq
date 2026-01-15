'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface ChecklistItem {
    id: string;
    name: string;
    status: 'Open' | 'Done';
}

export default function SEOStrategyTab({ checklists }: { checklists: any[] }) {
    const homepageChecklist = checklists.find(c => c.type === 'Homepage')?.items || [];
    const completedCount = homepageChecklist.filter((i: any) => i.status === 'Done').length;
    const progress = homepageChecklist.length > 0 ? Math.round((completedCount / homepageChecklist.length) * 100) : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Homepage Checklist */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <Layout className="text-[var(--primary)]" size={24} />
                        <h3 className="text-xl font-bold font-heading">Homepage Optimization</h3>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                        {progress}% Complete
                    </span>
                </div>

                <div className="space-y-3">
                    {homepageChecklist.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-black/40 transition-all cursor-pointer group">
                            <span className={`font-medium ${item.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{item.name}</span>
                            {item.status === 'Done' ? (
                                <CheckCircle2 size={18} className="text-emerald-400" />
                            ) : (
                                <AlertCircle size={18} className="text-slate-700 group-hover:text-amber-400 transition-colors" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Pages & Location Pages Shell */}
            <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <FileText className="text-blue-400" size={24} />
                        <h3 className="text-xl font-bold font-heading">Global Technicals</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Standardizing the technical foundation across all service and location pages to ensure maximum crawlability and indexing for Gemini and Google.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {['Sitemap.xml Auto-Sync', 'Canonical URL Standard', 'Image Alt Text Audit'].map(t => (
                            <div key={t} className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
