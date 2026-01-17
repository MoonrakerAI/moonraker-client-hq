'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, Globe, Mail, Clock, Hash, Tag, Users, CreditCard } from 'lucide-react';

export default function ProfileStep({ onNext, onPrev, formData, setFormData }: any) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePaymentMethod = (method: string) => {
        const current = formData.payment_methods || [];
        const next = current.includes(method)
            ? current.filter((m: string) => m !== method)
            : [...current, method];
        setFormData({ ...formData, payment_methods: next });
    };

    const handleNext = async () => {
        if (formData.practiceId) {
            const { updatePracticeMetadata } = await import('@/lib/actions/practices');

            // Reconstruct payload based on schema
            await updatePracticeMetadata(formData.practiceId, {
                email: formData.email,
                correspondence_email: formData.correspondence_email,
                date_founded: formData.date_founded,
                hours_of_operation: formData.hours_of_operation,
                business_id: formData.business_id,
                tagline: formData.tagline,
                social_profiles: formData.social_profiles, // Note: Guide says JSONB, but UI has TEXTAREA for now. Keeping it flexible.
                payment_methods: formData.payment_methods,
                owner_pr_name: formData.owner_pr_name,
                owner_pr_linkedin: formData.owner_pr_linkedin,
                owner_pr_bio: formData.owner_pr_bio
            });
        }
        onNext();
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading">Practice Profile</h2>
                <p className="text-slate-400 font-medium">Complete your identity layer for campaign content and PR.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-[var(--primary)]" /> Business Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="official@practice.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Mail size={14} className="text-[var(--primary)]" /> Correspondence Email
                    </label>
                    <input
                        type="email"
                        name="correspondence_email"
                        value={formData.correspondence_email || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="updates@practice.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Date Founded</label>
                    <input
                        type="text"
                        name="date_founded"
                        value={formData.date_founded || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="e.g. 2015"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-[var(--primary)]" /> Hours of Operation
                    </label>
                    <input
                        type="text"
                        name="hours_of_operation"
                        value={formData.hours_of_operation || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="Mon-Fri 9am-5pm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Hash size={14} className="text-[var(--primary)]" /> Business ID (EIN/BN)
                    </label>
                    <input
                        type="text"
                        name="business_id"
                        value={formData.business_id || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <Tag size={14} className="text-[var(--primary)]" /> Tagline
                    </label>
                    <input
                        type="text"
                        name="tagline"
                        value={formData.tagline || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="Your unique catchphrase"
                    />
                </div>

                {/* Socials & PR */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Business Social Profiles</label>
                    <textarea
                        name="social_profiles"
                        value={formData.social_profiles || ''}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all resize-none"
                        placeholder="Links to Facebook, Instagram, LinkedIn..."
                    />
                </div>

                {/* Payment Methods */}
                <div className="md:col-span-2 space-y-4">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        <CreditCard size={14} className="text-[var(--primary)]" /> Payment Methods Accepted
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Cash', 'Check', 'Visa', 'Mastercard', 'Amex', 'Discover', 'Paypal', 'Crypto'].map(method => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => togglePaymentMethod(method)}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${(formData.payment_methods || []).includes(method)
                                    ? 'bg-[var(--primary)] text-black border-[var(--primary)]'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                                    }`}
                            >
                                {method}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Owner/PR Section */}
                <div className="md:col-span-2 pt-4 border-t border-white/5">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Users size={18} className="text-[var(--primary)]" /> Owner / PR Information
                    </h3>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Contact Name</label>
                    <input
                        type="text"
                        name="owner_pr_name"
                        value={formData.owner_pr_name || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">LinkedIn Profile</label>
                    <input
                        type="text"
                        name="owner_pr_linkedin"
                        value={formData.owner_pr_linkedin || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all"
                        placeholder="https://linkedin.com/in/..."
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Professional Bio</label>
                    <textarea
                        name="owner_pr_bio"
                        value={formData.owner_pr_bio || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] transition-all resize-none"
                        placeholder="Feature person bio for blog content and outreach..."
                    />
                </div>
            </div>

            <div className="pt-6 flex gap-4">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    onClick={handleNext}
                    className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold text-lg hover:shadow-[0_0_25px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group"
                >
                    Next Step <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
