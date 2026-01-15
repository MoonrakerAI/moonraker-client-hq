'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

export default function MSAStep({ onNext, onPrev }: any) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading">Master Service Agreement</h2>
                <p className="text-slate-400 font-medium">Please review and sign your service commitment.</p>
            </div>

            <div className="h-64 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto text-sm text-slate-400 leading-relaxed font-medium space-y-4">
                <p className="text-white font-bold">1. SCOPE OF SERVICES</p>
                <p>Moonraker AI will provide Technical SEO, Google Business Profile optimization, and Content Syndication services as outlined in the campaign brief...</p>
                <p className="text-white font-bold">2. TERM & TERMINATION</p>
                <p>The standard agreement term is 3 months, renewing monthly thereafter unless cancelled 30 days in advance...</p>
                <p className="text-white font-bold">3. CONFIDENTIALITY</p>
                <p>Both parties agree to maintain strict confidentiality regarding all proprietary business data and campaign strategies...</p>
                <p>Full terms of service are available for download in your campaign drive.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--primary-glow)] border border-[var(--primary)] flex items-start gap-4">
                <div className="w-6 h-6 rounded-md bg-[var(--primary)] flex items-center justify-center mt-1">
                    <Check size={16} className="text-black font-bold" />
                </div>
                <div>
                    <p className="text-white font-bold">Electronically Accept Terms</p>
                    <p className="text-xs text-[var(--primary)] font-bold">Logged today by System Admin</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <button onClick={onPrev} className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> Back
                </button>
                <button onClick={onNext} className="px-6 py-4 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group">
                    Sign & Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
