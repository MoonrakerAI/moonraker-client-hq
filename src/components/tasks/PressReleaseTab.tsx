'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Globe, Target, ExternalLink, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function PressReleaseTab({ prs }: { prs: any[] }) {
    const activePR = prs[0] || {};

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PR Asset Context */}
            <div className="lg:col-span-1 space-y-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Target className="text-amber-400" size={24} />
                        <h3 className="text-xl font-bold font-heading">Syndication Strategy</h3>
                    </div>

                    <div className="space-y-4">
                        <StrategyItem label="Brand Name" value={activePR.brand_name || 'N/A'} />
                        <StrategyItem label="Industry" value={activePR.industry || 'N/A'} />
                        <StrategyItem label="Target Audience" value={activePR.top_3_audience || 'N/A'} />
                        <StrategyItem label="Top Keywords" value={activePR.keywords?.join(', ') || 'N/A'} />
                    </div>

                    <button className="w-full py-3 rounded-xl border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                        Edit Strategy
                    </button>
                </div>
            </div>

            {/* Distribution Feed */}
            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <Globe className="text-[var(--primary)]" size={24} />
                            <h3 className="text-xl font-bold font-heading">Network Distribution</h3>
                        </div>
                        <button className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-[var(--primary)] hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
                            <PlusCircle size={16} /> Add Release
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: 'New Holistic Wellness Center Opens in Downtown ABQ', date: 'Jan 12, 2026', links: '240+ Outlets', status: 'Live' },
                            { title: 'Moonraker Wellness Announces Partnership with Local Clinics', date: 'Dec 15, 2025', links: '185 Outlets', status: 'Archived' },
                        ].map((pr, i) => (
                            <div key={i} className="group p-5 rounded-2xl bg-black/20 border border-white/5 hover:border-[var(--primary-glow)] transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">{pr.title}</h4>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{pr.date} • {pr.links}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${pr.status === 'Live' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-slate-500 border-white/10'}`}>
                                        {pr.status}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                        <ExternalLink size={14} /> View Live URL
                                    </button>
                                    <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                        <CheckCircle2 size={14} /> Full Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StrategyItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
            <p className="text-sm font-medium text-slate-300 leading-relaxed">{value}</p>
        </div>
    );
}
