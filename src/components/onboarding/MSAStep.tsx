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

            <div className="bg-black/40 border border-white/5 rounded-2xl p-8 text-sm text-slate-400 leading-relaxed font-medium space-y-8">
                <div className="text-center space-y-4 pb-10 border-b border-white/5">
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Moonraker Client Service Agreement</h1>
                    <p className="text-slate-300 text-lg">
                        This Client Service Agreement ("the Agreement") is entered into between: <strong>Moonraker.AI, LLC</strong>, a Massachusetts limited liability company, located at 119 Oliver St, Easthampton, MA 01027 ("Moonraker"), and "the Client", information below:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Legal Business Name</label>
                        <input
                            name="legal_business_name"
                            value={localData.legal_business_name}
                            onChange={handleChange}
                            placeholder="Exact Legal Entity Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all font-bold text-base"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Business Address</label>
                        <input
                            name="msa_address"
                            value={localData.msa_address}
                            onChange={handleChange}
                            placeholder="Full Legal Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all font-bold text-base"
                        />
                    </div>
                </div>

                <div className="prose prose-invert max-w-none space-y-10">
                    <section className="space-y-4">
                        <h3 className="text-white font-bold text-xl border-l-4 border-[var(--primary)] pl-4">Purpose of the Agreement</h3>
                        <p>The purpose of the Agreement is to set a clear, mutual understanding between Moonraker and the Client regarding the scope, objectives, and deliverables of the digital marketing services provided by Moonraker to the Client ("the Services"). It outlines the details of the Services, while also specifying the Client's responsibilities. The Agreement is essential to ensure that both parties are aligned on the goals, timelines, and measurable outcomes of the Services, thus minimizing misunderstandings and setting a clear path for collaboration and success.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-bold text-xl border-l-4 border-[var(--primary)] pl-4">Scope of Services and Limitations</h3>
                        <p>We're excited to work with you! Moonraker is your dedicated marketing and SEO team, and our mission is simple: to help potential clients find your practice when they're searching for the support you provide. To ensure there is clarity on what's included in our partnership, it's important to note what Moonraker does and doesn't handle.</p>
                        <p>The sections below outline exactly what services Moonraker provides, what falls outside our expertise, and how we'll work together when questions arise. Our goal is to make this partnership as clear and successful as possible.</p>
                    </section>

                    <section className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                                Section 1: What Moonraker DOES Provide
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 text-slate-400">
                                <li>• Digital marketing strategy</li>
                                <li>• Initial campaign setup and configuration</li>
                                <li>• Technical website optimization</li>
                                <li>• Search Engine Optimization (SEO) and Answer Engine Optimization (AEO)</li>
                            </ul>
                            <p className="text-sm italic text-[var(--primary)] font-bold">The complete scope of your specific project is outlined in the Statement of Work section of this Agreement.</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                Section 2: What Moonraker Does NOT Provide
                            </h4>
                            <p>The following services require specialized expertise that Moonraker does not provide. You will need to manage these directly or work with appropriate specialists:</p>

                            <div className="space-y-4 ml-4">
                                <div className="space-y-2">
                                    <p className="text-white font-bold text-base underline decoration-[var(--primary)] underline-offset-4">Website Infrastructure and Hosting</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-500 text-sm">
                                        <li>• Website hosting services or server management</li>
                                        <li>• On-going security monitoring, patches, or updates</li>
                                        <li>• SSL certificate management</li>
                                        <li>• Website backups</li>
                                        <li>• DNS or domain management</li>
                                        <li>• Ongoing website maintenance beyond SEO-related updates</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-white font-bold text-base underline decoration-[var(--primary)] underline-offset-4">Third-Party Platform Management</p>
                                    <p>Moonraker does not provide ongoing management, technical support, or troubleshooting for third-party platforms, including:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-500 text-sm">
                                        <li>• Electronic Health Records (EHR) systems (SimplePractice, TherapyNotes, etc.)</li>
                                        <li>• Booking and scheduling platforms (Acuity, Calendly, etc.)</li>
                                        <li>• Customer Relationship Management (CRM) systems</li>
                                        <li>• Email marketing platforms (Mailchimp, Constant Contact, etc.)</li>
                                        <li>• Payment processing systems (Stripe, PayPal, etc.)</li>
                                        <li>• Communication tools</li>
                                        <li>• Practice management software</li>
                                        <li>• Any other third-party applications or services</li>
                                    </ul>
                                    <p className="bg-white/5 p-4 rounded-xl text-sm italic border-l-2 border-[var(--primary)]">
                                        <strong>Important Clarification:</strong> When we perform initial setup or configuration of platforms like your booking calendar and communication tools as part of your Statement of Work, this is a one-time implementation. Ongoing management, updates, troubleshooting, or monitoring of these platforms is not included unless explicitly stated in your monthly deliverables.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-white font-bold text-base underline decoration-[var(--primary)] underline-offset-4">HIPAA Compliance and Regulatory Consulting</p>
                                    <p>Moonraker does not provide legal, compliance, or regulatory consulting services of any kind, including:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-500 text-sm">
                                        <li>• HIPAA compliance guidance or auditing</li>
                                        <li>• Healthcare regulatory compliance advice</li>
                                        <li>• Data privacy regulation guidance (GDPR, CCPA, etc.)</li>
                                        <li>• Professional licensing requirements</li>
                                        <li>• Industry-specific compliance standards</li>
                                        <li>• Business Associate Agreement (BAA) consulting beyond marketing services</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                                Section 3: The Gray Area (When We'll Still Help)
                            </h4>
                            <p>We understand that sometimes you need help with things that are technically "outside our scope." Here's how we handle those situations:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                                    <p className="text-emerald-400 font-bold flex items-center gap-2">
                                        <Check size={18} /> We WILL:
                                    </p>
                                    <ul className="text-xs space-y-2 text-slate-400 leading-relaxed font-bold">
                                        <li>• Answer questions about tools and integrations we installed (even months after setup)</li>
                                        <li>• Help troubleshoot tracking codes or analytics we implemented</li>
                                        <li>• Guide you through basic fixes for marketing-related issues</li>
                                        <li>• Point you toward the right resources or vendors for issues we can't handle</li>
                                        <li>• Provide reasonable support for minor issues related to our initial work</li>
                                    </ul>
                                </div>
                                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3">
                                    <p className="text-red-400 font-bold flex items-center gap-2">
                                        <ArrowRight size={18} className="rotate-45" /> We WON'T:
                                    </p>
                                    <ul className="text-xs space-y-2 text-slate-400 leading-relaxed font-bold">
                                        <li>• Act as ongoing technical support for your EHR or booking platform</li>
                                        <li>• Monitor your website for security vulnerabilities or breaches</li>
                                        <li>• Provide general IT support for technology issues</li>
                                        <li>• Take responsibility for third-party platform outages or functionality issues</li>
                                        <li>• Guarantee the ongoing functionality of platforms we don't control</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-white font-bold uppercase text-xs tracking-widest bg-white/5 py-2 px-4 rounded-lg inline-block">Example Scenarios:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div className="space-y-2">
                                        <p className="text-emerald-400">✅ <strong>We'll help:</strong> "The Google Analytics tracking code you installed isn't working correctly"</p>
                                        <p className="text-red-400">❌ <strong>Outside our scope:</strong> "My SimplePractice account is having login issues"</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-emerald-400">✅ <strong>We'll help:</strong> "The booking widget you embedded isn't displaying properly on my site"</p>
                                        <p className="text-red-400">❌ <strong>Outside our scope:</strong> "I need help configuring my booking platform's HIPAA settings"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                Section 4: Your Responsibilities as the Client
                            </h4>
                            <p>To ensure clarity about ownership and responsibilities, you acknowledge that you are responsible for:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4">
                                <div className="space-y-2">
                                    <p className="text-white font-bold text-sm underline underline-offset-4">Platform Selection and Management</p>
                                    <ul className="text-xs text-slate-500 space-y-1">
                                        <li>• Selecting appropriate third-party service providers and platforms</li>
                                        <li>• Ensuring all third-party platforms meet your compliance requirements</li>
                                        <li>• Managing user access, permissions, and security settings</li>
                                        <li>• Reviewing platform terms of service and privacy policies</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-bold text-sm underline underline-offset-4">Compliance and Regulatory Matters</p>
                                    <ul className="text-xs text-slate-500 space-y-1">
                                        <li>• Ensuring your operations, website, and platforms comply with laws (HIPAA, etc.)</li>
                                        <li>• Consulting with legal or compliance professionals when guidance is needed</li>
                                        <li>• Implementing required privacy policies and consent mechanisms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-violet-400" />
                                Section 5: Limited Warranties for Integration Work
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4">
                                <div className="space-y-2">
                                    <p className="text-white font-bold text-sm">Our Responsibility:</p>
                                    <ul className="text-xs text-slate-500 space-y-1">
                                        <li>• Correct technical implementation at time of installation</li>
                                        <li>• Following industry best practices for implementation</li>
                                        <li>• Testing the integration to ensure it works at time of setup</li>
                                        <li>• Providing documentation on how the integration functions</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-bold text-sm">Our Limitations:</p>
                                    <ul className="text-xs text-slate-500 space-y-1">
                                        <li>• No warranties regarding ongoing performance or security of 3rd parties</li>
                                        <li>• Not responsible for changes made by 3rd party providers after setup</li>
                                        <li>• Not responsible for issues caused by platform updates or outages</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-slate-200 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white" />
                                Section 6: Liability and Indemnification
                            </h4>
                            <div className="p-6 bg-white/5 rounded-2xl space-y-4">
                                <p className="text-white font-bold text-sm border-b border-white/10 pb-2">Client Acknowledgment of Responsibility</p>
                                <p className="text-xs leading-relaxed">You acknowledge and agree that Moonraker is not responsible or liable for security breaches, data breaches, or compliance violations involving your website or third-party platforms unless directly caused by Moonraker's proven negligence. The Client agrees to indemnify and hold Moonraker harmless from any claims, damages, or losses arising from compliance violations or third-party platform issues.</p>
                            </div>
                        </div>

                        <div className="space-y-8 pt-10 border-t border-white/5">
                            <h2 className="text-3xl font-bold text-white text-center tracking-tight">Statement of Work</h2>

                            <div className="space-y-12">
                                {[{
                                    title: "Project Setup & Tracking",
                                    timeline: "Month 1",
                                    details: "Moonraker will establish comprehensive project and task management to ensure that monthly tasks are completed, aiming to rank the Client's website and Google listing as quickly as possible."
                                }, {
                                    title: "Google Assets Configuration",
                                    timeline: "Month 1",
                                    details: "Moonraker will integrate the Client's GBP, GA4, and GSC into various campaign reporting tools for monthly KPI monitoring. If the Client does not have a GBP, GA4, or GSC account, Moonraker will create them."
                                }, {
                                    title: "Baseline Reporting",
                                    timeline: "Month 1",
                                    details: "Moonraker will generate baseline reports to snapshot the Client's website status, rankings, and visibility, along with local Geogrid reports for the Client’s most valuable keywords."
                                }, {
                                    title: "Keyword & Entities Research",
                                    timeline: "Month 1",
                                    details: "Moonraker will undertake comprehensive research to identify relevant, high-traffic keywords and entities for the Client's services."
                                }, {
                                    title: "Website Speed Optimization",
                                    timeline: "Month 1",
                                    details: "Moonraker will audit and optimize the speed of the Client's website, ensuring superfast page loading times to support ranking improvements."
                                }, {
                                    title: "Website Security Optimization",
                                    timeline: "Month 1",
                                    details: "Moonraker will audit and optimize the security of the Client's website, implementing enterprise-level protocols, firewall, brute force protection and ongoing site scanning. (WordPress only)"
                                }, {
                                    title: "Website Technical Optimization",
                                    timeline: "Month 1",
                                    details: "Moonraker will audit and optimize technical aspects of the Client's website, ensuring all on-page elements align with the Google listing."
                                }, {
                                    title: "Press Release Syndication",
                                    timeline: "Month 1",
                                    details: "Moonraker will create and syndicate a press release through our network of 500+ media partners, generating high authority brand mentions and backlinks."
                                }, {
                                    title: "AI Impression Engine",
                                    timeline: "Week 1 Onward",
                                    details: "Moonraker will deploy our proprietary AI Impression Engine to train Google Maps that your practice is the most important listing throughout the local area."
                                }].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)] flex items-center justify-center text-[var(--primary)] font-bold text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            {idx !== 8 && <div className="w-0.5 h-full bg-white/5 group-hover:bg-[var(--primary-glow)] transition-colors" />}
                                        </div>
                                        <div className="pb-8 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500">{item.timeline}</span>
                                            </div>
                                            <p className="text-slate-400 leading-relaxed">{item.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

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
