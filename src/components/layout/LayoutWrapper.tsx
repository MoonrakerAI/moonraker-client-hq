'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();
    const isOnboarding = pathname?.startsWith('/onboarding');

    if (isOnboarding) {
        return (
            <main className="flex-1 bg-[var(--background)]">
                {children}
            </main>
        );
    }

    return (
        <>
            <Sidebar />
            <motion.div
                className="flex-1 flex flex-col min-w-0"
                initial={false}
                animate={{
                    marginLeft: isCollapsed ? '100px' : '260px'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </motion.div>
        </>
    );
}
