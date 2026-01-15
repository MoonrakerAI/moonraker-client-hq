'use client';

import React from 'react';
import { AlertCircle, Database, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function DatabaseAlert() {
    if (isSupabaseConfigured) return null;

    return (
        <div className="mb-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                    <Database size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Database Not Connected</h3>
                    <p className="text-slate-400 text-sm max-w-xl">
                        Moonraker is currently running in "Aesthetic Mode" with mock data.
                        To enable live campaign tracking, AI insights, and task management, please add your
                        <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-amber-400 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
                        and <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-amber-400 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                        to your <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-amber-400 text-xs">.env.local</code> file.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-sm"
                >
                    Refresh App
                </button>
            </div>
        </div>
    );
}
