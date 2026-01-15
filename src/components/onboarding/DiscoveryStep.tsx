'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DiscoveryStep({ onNext, formData, setFormData }: any) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading">Practice Discovery</h2>
                <p className="text-slate-400 font-medium">Let&apos;s gather the essentials to fuel your technical strategy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Practice Name</label>
                    <input
                        type="text"
                        name="practiceName"
                        value={formData.practiceName || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-glow)] transition-all"
                        placeholder="e.g. Moonraker Wellness"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Main Website URL</label>
                    <input
                        type="text"
                        name="websiteUrl"
                        value={formData.websiteUrl || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-glow)] transition-all"
                        placeholder="https://..."
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">What are your top 3 service areas?</label>
                    <textarea
                        name="services"
                        value={formData.services || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-glow)] transition-all resize-none"
                        placeholder="e.g. Family Counseling, Anxiety Therapy, Couples Workshops"
                    />
                </div>
            </div>

            <div className="pt-6">
                <button
                    onClick={onNext}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold text-lg hover:shadow-[0_0_25px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group"
                >
                    Save & Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
