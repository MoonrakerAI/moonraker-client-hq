'use client';

import React from 'react';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';
import { motion } from 'framer-motion';

export default function OnboardingPage({ searchParams }: { searchParams: { id?: string } }) {
    return (
        <div className="min-h-screen py-20 bg-[var(--background)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-heading">Onboarding Center</h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Ready to scale? Complete the steps below to initialize your campaign intelligence layer.
                    </p>
                </motion.div>

                <OnboardingContainer practiceId={searchParams.id} />
            </div>
        </div>
    );
}
