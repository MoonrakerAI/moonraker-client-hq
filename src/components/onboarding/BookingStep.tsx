'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BookingStep({ onPrev }: any) {
    return (
        <div className="space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold font-heading">Book Your Strategy Call</h2>
                <p className="text-slate-400 font-medium">The final step! Choose a time to walk through your campaign roadmap.</p>
            </div>

            <div className="aspect-video bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Calendar size={48} className="text-[var(--primary)]" />
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Google Calendar Integrated</p>
                    <button className="px-8 py-3 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all">
                        Open Scheduler
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 pt-6 text-center border-t border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-tight">
                    <CheckCircle2 size={20} />
                    <span>All other steps complete</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <button onClick={onPrev} className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Back
                    </button>
                    <Link href="/dashboard" className="px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
