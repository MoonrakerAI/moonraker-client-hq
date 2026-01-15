'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, ExternalLink, Settings, Zap, History } from 'lucide-react';

const internalLinks = [
    { name: 'Master SOP Hub', url: '#', icon: BookOpen, description: 'Standard Operating Procedures for all SEO tasks' },
    { name: 'Campaign Tracker Sheet', url: '#', icon: History, description: 'Legacy tracking and depth-of-work log' },
    { name: 'Leadsie Portal', url: '#', icon: Shield, description: 'Advanced access management' },
];

export default function AdminInternalTab({ practice, onboarding, insights }: { practice: any, onboarding: any, insights: any }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SOP Integration */}
            <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Settings className="text-slate-400" size={24} />
                        <h3 className="text-xl font-bold font-heading">Internal Campaign Controls</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {internalLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[var(--primary)] group transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-white/5 text-slate-400 group-hover:text-[var(--primary)] transition-colors">
                                        <link.icon size={20} />
                                    </div>
                                    <ExternalLink size={16} className="text-slate-700 group-hover:text-white" />
                                </div>
                                <h4 className="font-bold text-white mb-1">{link.name}</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{link.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary-glow)] to-transparent border border-[var(--primary-glow)] border-opacity-20 space-y-4">
                    <div className="flex items-center gap-2 text-[var(--primary)]">
                        <Zap size={20} />
                        <h4 className="font-bold text-sm uppercase tracking-widest">AI Command Context</h4>
                    </div>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">
                        {insights?.summary || "Gemini has not yet generated a technical audit context for this practice. Trigger an AI analysis to see advanced recommendations."}
                    </p>
                    <button className="text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                        Execute Technical Audit
                    </button>
                </div>
            </div>

            {/* Campaign Metadata */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6 h-fit">
                <h3 className="text-xl font-bold font-heading border-b border-white/5 pb-4">Onboarding Metadata</h3>
                <div className="space-y-4">
                    <MetadataItem label="Gmail Account" value={practice.email || 'N/A'} />
                    <MetadataItem label="Backup Password" value="********" isSensitive />
                    <MetadataItem label="2FA Secret" value="********" isSensitive />
                    <MetadataItem label="Drive Link" value={onboarding.google_drive_link || 'Pending provisioning'} />
                </div>

                <div className="pt-4">
                    <button className="w-full py-3 rounded-xl border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                        Update Credentials
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetadataItem({ label, value, isSensitive = false }: { label: string, value: string, isSensitive?: boolean }) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
            <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                <span>{value}</span>
                {isSensitive && (
                    <button className="text-[10px] font-bold text-[var(--primary)] hover:underline">Reveal</button>
                )}
            </div>
        </div>
    );
}
