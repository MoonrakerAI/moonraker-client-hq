'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, CheckCircle2, AlertCircle, ChevronRight, Share2 } from 'lucide-react';
import Link from 'next/link';
import { updateOnboardingState } from '@/lib/actions/onboarding';

export default function BookingStep({ onPrev, formData, setFormData }: any) {
    const [subStep, setSubStep] = useState(0); // 0: Scheduler, 1: Confirmation
    const [isSaving, setIsSaving] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(formData.booking_status || 'Yes, looking forward to it!');

    const handleNextSubStep = () => {
        if (subStep === 0) {
            setSubStep(1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevSubStep = () => {
        if (subStep === 1) {
            setSubStep(0);
        } else {
            onPrev();
        }
    };

    const handleFinalSubmit = async () => {
        setIsSaving(true);
        try {
            const practiceId = formData.practiceId;

            await updateOnboardingState(practiceId, {
                booking_confirmed: bookingStatus === 'Yes, looking forward to it!',
                is_complete: true
            });

            setFormData({
                ...formData,
                booking_status: bookingStatus,
                is_complete: true
            });

            setIsComplete(true);
        } catch (err) {
            console.error('Failed to save booking status:', err);
            alert('Error completing onboarding. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
            >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={48} />
                </div>
                <div className="space-y-3">
                    <h2 className="text-4xl font-bold font-heading">Onboarding Complete!</h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Your practice is now in our system. We're getting started on your campaign assets right away.
                    </p>
                </div>
                <div className="pt-6">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold hover:shadow-[0_0_30px_var(--primary-glow)] transition-all group">
                        Enter Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold font-heading">
                    {subStep === 0 ? 'Book Your Strategy Call' : 'Final Verification'}
                </h2>
                <p className="text-slate-400 font-medium">
                    {subStep === 0
                        ? 'Choose a time to walk through your campaign roadmap and align on goals.'
                        : 'Please check your calendar and confirm that our call has been added!'}
                </p>
            </div>

            <AnimatePresence mode="wait">
                {subStep === 0 && (
                    <motion.div
                        key="scheduler"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <ul className="space-y-3">
                                {[
                                    'Review your onboarding info and get aligned on your goals',
                                    'Ensure that we have access to your website and Google properties',
                                    'Discuss how we can amplify your impact and make the biggest difference'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-300 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-slate-500 text-xs mt-4 italic font-medium">Once you've booked your call, please tap Next at the bottom of the page</p>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 min-h-[600px] relative">
                            <iframe
                                src="https://msg.moonraker.ai/widget/booking/ouIbhSjJ3q2VTR8U0g8z"
                                style={{ width: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                id="ouIbhSjJ3q2VTR8U0g8z_1737001179934"
                            />
                            {/* Script tag is handled by the browser if injected, but for Next.js we just need the iframe most of the time. */}
                        </div>
                    </motion.div>
                )}

                {subStep === 1 && (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Do you see our call on your calendar?</label>
                            <div className="space-y-3">
                                {[
                                    { label: 'Yes, looking forward to it!', icon: CheckCircle2, color: 'text-emerald-400' },
                                    { label: 'Not yet', icon: AlertCircle, color: 'text-amber-400' }
                                ].map(status => (
                                    <button
                                        key={status.label}
                                        onClick={() => setBookingStatus(status.label)}
                                        className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${bookingStatus === status.label ? 'bg-white/10 border-white/20 shadow-xl' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className="font-bold text-lg">{status.label}</span>
                                        <status.icon className={bookingStatus === status.label ? status.color : 'text-slate-600'} size={24} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {bookingStatus === 'Not yet' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4"
                            >
                                <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
                                <p className="text-sm text-amber-200/60 leading-relaxed italic">
                                    Sometimes it can take a bit for events to sync with your calendar. Please wait a minute and check again.
                                    <br /><br />
                                    If you still don't see it, don't worry! We will verify the booking on our end and reach out if there's an issue.
                                </p>
                            </motion.div>
                        )}

                        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-3">
                            <div className="flex items-center gap-2 text-blue-400 font-bold">
                                <Share2 size={18} />
                                <h3>Important Note</h3>
                            </div>
                            <p className="text-sm text-blue-200/60 leading-relaxed">
                                Please accept the event so that you'll receive reminders! The Zoom link for our call is located within the event details. If you have any issues joining the call, please reach out to <span className="text-blue-400 font-bold">support@moonraker.ai</span>.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <button
                    onClick={handlePrevSubStep}
                    className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    onClick={subStep === 0 ? handleNextSubStep : handleFinalSubmit}
                    disabled={isSaving}
                    className="px-6 py-4 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {isSaving ? 'Finalizing...' : (
                        <>{subStep === 0 ? 'Next' : 'Submit Onboarding'} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
            </div>
        </div>
    );
}
