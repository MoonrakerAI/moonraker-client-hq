'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Shield } from 'lucide-react';

export default function AccessStep({ onNext, onPrev }: any) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading">Secure Platform Access</h2>
                <p className="text-slate-400 font-medium">We use Leadsie to securely connect to your SEO assets without passwords.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Shield size={32} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading">Connect to GBP & Search Console</h3>
                    <p className="text-sm text-slate-500 font-medium max-w-sm">
                        Clicking the link below will open a secure window where you can approve our access to your Google Business Profile and Search Console.
                    </p>
                </div>

                <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center gap-2 group">
                    Open Secure Connection <ExternalLink size={18} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <button onClick={onPrev} className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> Back
                </button>
                <button onClick={onNext} className="px-6 py-4 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group">
                    Access Granted <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
