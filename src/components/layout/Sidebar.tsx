'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { AnimatePresence } from 'framer-motion';
import NewPracticeModal from '@/components/ui/NewPracticeModal';
import { createPractice } from '@/lib/actions/practices';
import { getUserProfile, UserProfile } from '@/lib/actions/auth';

const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Practices', href: '/practices', icon: Users },
    { name: 'Task Board', href: '/tasks', icon: CheckSquare },
];

const clientNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Task Board', href: '/tasks', icon: CheckSquare },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const [isNewPracticeModalOpen, setIsNewPracticeModalOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const { profile } = await getUserProfile();
            setProfile(profile);
        };
        fetchProfile();
    }, []);

    const navItems = profile?.role === 'admin' ? adminNavItems : clientNavItems;
    const isAdmin = profile?.role === 'admin';

    const handleCreatePractice = async (practiceData: any) => {
        const newPractice = await createPractice(practiceData);
        // Navigate to the new practice page
        if (newPractice?.id) {
            router.push(`/practices/${newPractice.id}`);
        } else {
            router.push('/practices');
        }
    };

    const handleSignOut = async () => {
        const { signOut } = await import('@/lib/actions/auth');
        await signOut();
        router.push('/login');
    };

    return (
        <>
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 100 : 260 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 h-screen bg-[var(--card-bg)] border-r border-[var(--card-border)] backdrop-blur-xl z-50 flex flex-col p-4 overflow-hidden"
            >
                <div className="flex flex-col mb-10 mt-2">
                    {/* Logo Section - Absolute stability for brand mark */}
                    <div className="flex items-center gap-3 px-2 h-12 overflow-hidden">
                        <div className="w-12 h-12 min-w-[48px] relative flex-shrink-0 z-20">
                            <Image
                                src="/images/logo.png"
                                alt="Moonraker Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.h1
                                    key="logo-text"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-xl font-bold font-heading tracking-tight whitespace-nowrap z-10"
                                >
                                    Moonraker<span className="text-[var(--primary)]">.AI</span>
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Toggle Button Section - Consistent left alignment */}
                    <div className="mt-8 px-2">
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
                    {isAdmin && (
                        <button
                            onClick={() => setIsNewPracticeModalOpen(true)}
                            className={`
                            w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold hover:opacity-90 transition-all shadow-[0_4px_15px_var(--primary-glow)]
                            ${isCollapsed ? 'justify-center' : ''}
                        `}>
                            <PlusCircle size={22} />
                            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">New Practice</motion.span>}
                        </button>
                    )}

                    <button
                        onClick={handleSignOut}
                        className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group
                        ${isCollapsed ? 'justify-center' : ''}
                    `}>
                        <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                        {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap">Sign Out</motion.span>}
                    </button>
                </div>
            </motion.aside>

            {/* New Practice Modal */}
            <NewPracticeModal
                isOpen={isNewPracticeModalOpen}
                onClose={() => setIsNewPracticeModalOpen(false)}
                onSubmit={handleCreatePractice}
            />
        </>
    );
}
