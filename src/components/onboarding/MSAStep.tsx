'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Signature } from 'lucide-react';
import { updatePracticeMetadata } from '@/lib/actions/practices';
import { updateOnboardingState } from '@/lib/actions/onboarding';

export default function MSAStep({ onNext, onPrev, formData, setFormData }: any) {
    const [isSigned, setIsSigned] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [localData, setLocalData] = useState({
        legal_business_name: formData.legal_business_name || '',
        msa_address: formData.msa_address || '',
        msa_signature_name: formData.msa_signature_name || '',
        msa_signature_title: formData.msa_signature_title || '',
        msa_signature_date: formData.msa_signature_date || new Date().toLocaleDateString(),
    });

    const handleSaveAndContinue = async () => {
        if (!isSigned) return;
        setIsSaving(true);
        try {
            const practiceId = formData.practiceId;

            // 1. Update Practice Table
            await updatePracticeMetadata(practiceId, {
                legal_business_name: localData.legal_business_name,
                msa_address: localData.msa_address
            });

            // 2. Update Onboarding State Table
            await updateOnboardingState(practiceId, {
                msa_signed: true,
                msa_signature_name: localData.msa_signature_name,
                msa_signature_title: localData.msa_signature_title,
                msa_signature_date: localData.msa_signature_date
            });

            setFormData({ ...formData, ...localData });
            onNext();
        } catch (err) {
            console.error('Failed to save agreement:', err);
            alert('Error saving agreement. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalData({ ...localData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3">
                    <ShieldCheck className="text-[var(--primary)]" /> Master Service Agreement
                </h2>
                <p className="text-slate-400 font-medium italic">Please review the following terms and provide your signature below.</p>
            </div>

            <div className="h-[500px] bg-black/40 border border-white/5 rounded-2xl p-8 overflow-y-auto text-sm text-slate-400 leading-relaxed font-medium space-y-6">
                <div className="text-center space-y-2 pb-8 border-b border-white/5">
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Moonraker Client Service Agreement</h1>
                    <p className="text-slate-300">This Client Service Agreement ("the Agreement") is entered into between: Moonraker.AI, LLC, 119 Oliver St, Easthampton, MA 01027 ("Moonraker"), and "the Client", information below:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Legal Business Name</label>
                        <input
                            name="legal_business_name"
                            value={localData.legal_business_name}
                            onChange={handleChange}
                            placeholder="e.g. Acme Therapy, LLC"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Business Address</label>
                        <input
                            name="msa_address"
                            value={localData.msa_address}
                            onChange={handleChange}
                            placeholder="Full Legal Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all"
                        />
                    </div>
                </div>

                <section className="space-y-4 pt-4">
                    <h3 className="text-white font-bold text-lg border-l-4 border-[var(--primary)] pl-3">Purpose of the Agreement</h3>
                    <p>The purpose of the Agreement is to set a clear, mutual understanding between Moonraker and the Client regarding the scope, objectives, and deliverables of the digital marketing services provided by Moonraker to the Client ("the Services"). It outlines the details of the Services, while also specifying the Client's responsibilities. The Agreement is essential to ensure that both parties are aligned on the goals, timelines, and measurable outcomes of the Services, thus minimizing misunderstandings and setting a clear path for collaboration and success.</p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-white font-bold text-lg border-l-4 border-[var(--primary)] pl-3">Scope of Services and Limitations</h3>
                    <p>We're excited to work with you! Moonraker is your dedicated marketing and SEO team, and our mission is simple: to help potential clients find your practice when they're searching for the support you provide. To ensure there is clarity on what's included in our partnership, it's important to note what Moonraker does and doesn't handle.</p>
                    <p>The sections below outline exactly what services Moonraker provides, what falls outside our expertise, and how we'll work together when questions arise. Our goal is to make this partnership as clear and successful as possible.</p>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest">Section 1: What Moonraker DOES Provide</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-400">
                        <li>Digital marketing strategy</li>
                        <li>Initial campaign setup and configuration</li>
                        <li>Technical website optimization</li>
                        <li>Search Engine Optimization (SEO) and Answer Engine Optimization (AEO)</li>
                    </ul>
                    <p className="text-xs italic">The complete scope of your specific project is outlined in the Statement of Work section of this Agreement.</p>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest">Section 2: What Moonraker Does NOT Provide</h4>
                    <p>The following services require specialized expertise that Moonraker does not provide. You will need to manage these directly or work with appropriate specialists:</p>

                    <div className="space-y-2">
                        <p className="text-white font-bold underline">Website Infrastructure and Hosting</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-500">
                            <li>Website hosting services or server management</li>
                            <li>On-going security monitoring, patches, or updates</li>
                            <li>SSL certificate management</li>
                            <li>Website backups</li>
                            <li>DNS or domain management</li>
                            <li>Ongoing website maintenance beyond SEO-related updates</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <p className="text-white font-bold underline">Third-Party Platform Management</p>
                        <p>Moonraker does not provide ongoing management, technical support, or troubleshooting for third-party platforms, including: EHR systems (SimplePractice, TherapyNotes, etc.), Booking and scheduling platforms (Acuity, Calendly, etc.), CRM systems, Email marketing platforms, Payment processing systems (Stripe, PayPal, etc.), and any other third-party applications or services.</p>
                        <p className="bg-white/5 p-3 rounded-lg text-xs italic">Important Clarification: When we perform initial setup or configuration of platforms like your booking calendar and communication tools as part of your Statement of Work, this is a one-time implementation. Ongoing management, updates, troubleshooting, or monitoring of these platforms is not included unless explicitly stated in your monthly deliverables.</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-white font-bold underline">HIPAA Compliance and Regulatory Consulting</p>
                        <p>Moonraker does not provide legal, compliance, or regulatory consulting services of any kind, including: HIPAA compliance guidance, Healthcare regulatory compliance advice, Data privacy regulation guidance (GDPR, CCPA, etc.), and Professional licensing requirements.</p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest">Section 3: The Gray Area (When We'll Still Help)</h4>
                    <p>We understand that sometimes you need help with things that are technically "outside our scope." We WILL: Answer questions about tools we installed, help troubleshoot tracking codes, guide you through basic marketing-related fixes, and point you toward the right resources or vendors for issues we can't handle.</p>
                    <p>We WON'T: Act as ongoing technical support for your EHR or booking platform, monitor your website for security vulnerabilities, provide general IT support, or guarantee the ongoing functionality of platforms we don't control.</p>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest">Section 4: Your Responsibilities as the Client</h4>
                    <p>To ensure clarity about ownership and responsibilities, you acknowledge that you are responsible for: Platform Selection and Management, Compliance and Regulatory Matters, Data and Security Management, and Website Infrastructure maintenance.</p>
                    <p>Clear ownership means no gaps in coverage. When you know exactly what you're responsible for managing, you can ensure those areas are properly covered, either by you, your staff, or appropriate specialists.</p>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest text-[var(--primary)]">Section 5: Limited Warranties for Integration Work</h4>
                    <p>Our Responsibility: Correct technical implementation at the time of installation, following industry best practices, testing integrations, and providing documentation.</p>
                    <p>Our Limitations: We make no warranties regarding security or compliance of third-party platforms, and are not responsible for changes made by third-party providers or issues caused by platform updates/outages after implementation.</p>
                </section>

                <section className="space-y-3">
                    <h4 className="text-slate-200 font-bold uppercase text-xs tracking-widest">Section 6: Liability and Indemnification</h4>
                    <p>You acknowledge and agree that Moonraker is not responsible or liable for: Security breaches involving third-party platforms, failure to maintain compliance with laws, or issues arising from providers you selected.</p>
                    <p>Indemnification: The Client agrees to indemnify and hold Moonraker harmless from any claims, damages, or losses arising from or related to compliance violations, third-party platform issues, or modifications made by the Client to the website or integrations.</p>
                </section>

                <section className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-white font-bold text-lg">Terms of Engagement</h3>
                    <div className="space-y-4">
                        <p><span className="text-white font-bold">Ownership:</span> Upon completion and full payment, the Client owns all tangible work product created specifically for the Client (Website, GBP, Content). Moonraker retains all rights to its proprietary methodologies and trade secrets.</p>
                        <p><span className="text-white font-bold">Confidentiality:</span> Both parties agree to maintain strict confidentiality regarding proprietary information and strategies throughout and after the term of the Agreement.</p>
                        <p><span className="text-white font-bold">Termination:</span> The Client may cancel services in writing at any time. Moonraker will complete deliverables for the current billing cycle before offboarding. No refunds provided for completed work.</p>
                        <p><span className="text-white font-bold">Guarantee:</span> For 12-month terms, Moonraker provides a performance guarantee. Failure to meet established goals results in continued service at no cost until met.</p>
                    </div>
                </section>

                <section className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-white font-bold text-lg">Statement of Work Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white/5 p-4 rounded-xl space-y-1">
                            <p className="text-white font-bold">Month 1: Foundation</p>
                            <p>GBP Optimization, GA4/GSC Integration, Technical Audit, Website Speed & Security Optimization, Keyword Research.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl space-y-1">
                            <p className="text-white font-bold">Ongoing Strategy</p>
                            <p>AI Impression Engine Deployment, Social Mesh Building, Weekly GBP Posts, Monthly Video Progress Reporting.</p>
                        </div>
                    </div>
                </section>

                <div className="space-y-4 pt-8 border-t-2 border-white/10">
                    <p className="text-center text-slate-300 font-bold uppercase tracking-widest">Electronic Signature</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Signatory Full Name</label>
                            <input
                                name="msa_signature_name"
                                value={localData.msa_signature_name}
                                onChange={handleChange}
                                placeholder="Your Full Legal Name"
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Title</label>
                            <input
                                name="msa_signature_title"
                                value={localData.msa_signature_title}
                                onChange={handleChange}
                                placeholder="e.g. CEO / Owner"
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] transition-all"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Date of Signing</span>
                            <span className="text-white font-mono">{localData.msa_signature_date}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-xl">
                            <div
                                onClick={() => setIsSigned(!isSigned)}
                                className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all border ${isSigned ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/20'}`}
                            >
                                {isSigned && <Check size={16} className="text-black font-bold" />}
                            </div>
                            <span className="text-sm text-slate-300">I accept the terms of this agreement.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <button onClick={onPrev} className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    onClick={handleSaveAndContinue}
                    disabled={!isSigned || isSaving || !localData.legal_business_name || !localData.msa_signature_name}
                    className="px-6 py-4 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Processing...' : (
                        <>Sign & Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
            </div>
        </div>
    );
}
