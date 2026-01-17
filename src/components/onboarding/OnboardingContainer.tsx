'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ClipboardList, ShieldCheck, Key, Calendar, ArrowRight, Users, Files } from 'lucide-react';
import DiscoveryStep from './DiscoveryStep';
import ProfileStep from './ProfileStep';
import MediaStep from './MediaStep';
import MSAStep from './MSAStep';
import AccessStep from './AccessStep';
import BookingStep from './BookingStep';

const steps = [
    { id: 'discovery', name: 'Discovery', icon: ClipboardList },
    { id: 'profile', name: 'Profile', icon: Users },
    { id: 'media', name: 'Media', icon: Files },
    { id: 'msa', name: 'Agreement', icon: ShieldCheck },
    { id: 'access', name: 'Platform Access', icon: Key },
    { id: 'booking', name: 'Intro Call', icon: Calendar },
];

export default function OnboardingContainer({ practiceId }: { practiceId?: string }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ practiceId });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    const isCompleted = i < currentStep;
                    const isActive = i === currentStep;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center group">
                            <motion.div
                                initial={false}
                                animate={{
                                    backgroundColor: isCompleted || isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    scale: isActive ? 1.2 : 1
                                }}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 ${isCompleted || isActive ? 'text-black shadow-[0_0_15px_var(--primary-glow)]' : 'text-slate-500'}`}
                            >
                                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                            </motion.div>
                            <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest ${isActive ? 'text-[var(--primary)]' : 'text-slate-500'}`}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            <div className="min-h-[500px] p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 0 && <DiscoveryStep onNext={nextStep} formData={formData} setFormData={setFormData} />}
                        {currentStep === 1 && <ProfileStep onNext={nextStep} onPrev={prevStep} formData={formData} setFormData={setFormData} />}
                        {currentStep === 2 && <MediaStep onNext={nextStep} onPrev={prevStep} practiceId={(formData as any).practiceId} />}
                        {currentStep === 3 && <MSAStep onNext={nextStep} onPrev={prevStep} formData={formData} setFormData={setFormData} />}
                        {currentStep === 4 && <AccessStep onNext={nextStep} onPrev={prevStep} formData={formData} setFormData={setFormData} />}
                        {currentStep === 5 && <BookingStep onPrev={prevStep} formData={formData} setFormData={setFormData} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
