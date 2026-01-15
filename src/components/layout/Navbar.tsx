'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="h-20 border-b border-[var(--card-border)] flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search practices, tasks, or documents..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-glow)] transition-all text-sm placeholder:text-slate-600"
                        suppressHydrationWarning
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary)] rounded-full border-2 border-[#05070a] group-hover:scale-125 transition-transform" />
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-white">Chris Morin</p>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">System Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center p-0.5 shadow-lg group cursor-pointer overflow-hidden">
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                            <User size={20} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
