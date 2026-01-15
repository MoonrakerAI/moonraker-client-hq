'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Map, MessageSquare, Send, Calendar, ListChecks } from 'lucide-react';

export default function GBPManagementTab({ onboarding }: { onboarding: any }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GBP Core Optimization */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <Map className="text-emerald-400" size={24} />
                    <h3 className="text-xl font-bold font-heading">Google Maps Optimization</h3>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Leadsie Connection', status: onboarding?.leadsie_connected ? 'Done' : 'Open' },
                        { label: 'Localo Integration', status: onboarding?.google_drive_link ? 'Done' : 'Open' },
                        { label: 'Primary/Secondary Category Check', status: 'Open' },
                        { label: 'Social Media Links Verification', status: 'Open' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                            <span className="text-slate-300 font-medium">{item.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${item.status === 'Done' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-slate-500 border-white/10'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* GBP Posts & Content */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <MessageSquare className="text-blue-400" size={24} />
                    <h3 className="text-xl font-bold font-heading">Post Distribution</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white tracking-tight">3 Months of Posts (Q1)</h4>
                            <button className="p-2 rounded-lg bg-[var(--primary)] text-black font-bold text-xs hover:scale-105 transition-transform">
                                Generate with AI
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <PostStatusStep label="Draft Content" status="Done" />
                            <PostStatusStep label="Client Review" status="Doing" />
                            <PostStatusStep label="Schedule Posting" status="Open" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostStatusStep({ label, status }: { label: string, status: string }) {
    const isDone = status === 'Done';
    const isDoing = status === 'Doing';

    return (
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isDone ? 'bg-emerald-400 border-emerald-400 text-black' : isDoing ? 'border-blue-400 text-blue-400 animate-pulse' : 'border-slate-800 text-slate-800'}`}>
                {isDone && <CheckCircle className="w-3 h-3" />}
            </div>
            <span className={`text-sm font-bold ${isDone ? 'text-slate-500' : 'text-slate-300'}`}>{label}</span>
        </div>
    );
}

import { CheckCircle } from 'lucide-react';
