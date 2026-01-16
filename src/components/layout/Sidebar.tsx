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
    PlusCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Practices', href: '/practices', icon: Users },
    { name: 'Task Board', href: '/tasks', icon: CheckSquare },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 100 : 260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen bg-[var(--card-bg)] border-r border-[var(--card-border)] backdrop-blur-xl z-50 flex flex-col p-4 overflow-hidden"
        >
            <div className="flex flex-col mb-10 mt-2">
                {/* Logo Section */}
                <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                    <div className="w-12 h-12 min-w-[48px] relative">
                        <Image
                            src="/images/logo.png"
                            alt="Moonraker Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {!isCollapsed && (
                        <motion.h1
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold font-heading tracking-tight whitespace-nowrap"
                        >
                            Moonraker<span className="text-[var(--primary)]">.AI</span>
                        </motion.h1>
                    )}
                </div>

                {/* Toggle Button Section - Positioned below logo, above Dashboard */}
                <div className={`mt-8 flex ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all shadow-lg flex items-center justify-center group"
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : (
                            <div className="flex items-center gap-2">
                                <ChevronLeft size={18} />
                                <span className="text-xs font-semibold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Collapse</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={`
                relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
                ${isActive ? 'text-[var(--primary)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-gradient-to-r from-[var(--primary-glow)] to-transparent rounded-xl border-l-2 border-[var(--primary)]"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon size={22} className={`relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative z-10 font-medium whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-4">
                <button className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold hover:opacity-90 transition-all shadow-[0_4px_15px_var(--primary-glow)]
                    ${isCollapsed ? 'justify-center' : ''}
                `}>
                    <PlusCircle size={22} />
                    {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">New Practice</motion.span>}
                </button>

                <button className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group
                    ${isCollapsed ? 'justify-center' : ''}
                `}>
                    <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                    {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap">Sign Out</motion.span>}
                </button>
            </div>
        </motion.aside>
    );
}
