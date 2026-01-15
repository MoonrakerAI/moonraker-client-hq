'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    Settings,
    Newspaper,
    BarChart3,
    LogOut,
    PlusCircle
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Practices', href: '/practices', icon: Users },
    { name: 'Task Board', href: '/tasks', icon: CheckSquare },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-w)] bg-[var(--card-bg)] border-r border-[var(--card-border)] backdrop-blur-xl z-50 flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-[0_0_15px_var(--primary-glow)]">
                    <span className="text-black font-bold text-xl leading-none">M</span>
                </div>
                <h1 className="text-xl font-bold font-heading tracking-tight">Moonraker<span className="text-[var(--primary)]">.AI</span></h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive ? 'text-[var(--primary)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-gradient-to-r from-[var(--primary-glow)] to-transparent rounded-xl border-l-2 border-[var(--primary)]"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon size={20} className={`relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                                <span className="relative z-10 font-medium">{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold hover:opacity-90 transition-all shadow-[0_4px_15px_var(--primary-glow)]">
                    <PlusCircle size={20} />
                    <span>New Practice</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group">
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
