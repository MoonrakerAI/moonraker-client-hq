'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Shield, Globe, Google, HelpCircle, CheckCircle2, Monitor } from 'lucide-react';
import { updatePracticeMetadata } from '@/lib/actions/practices';
import { updateOnboardingState } from '@/lib/actions/onboarding';

export default function AccessStep({ onNext, onPrev, formData, setFormData }: any) {
    const [subStep, setSubStep] = useState(0); // 0: Leadsie, 1: Website, 2: Google Props
    const [isSaving, setIsSaving] = useState(false);

    const [accessData, setAccessData] = useState({
        website_platform: formData.website_platform || '',
        website_access_status: formData.website_access_status || '',
        gbp: { has_account: 'Yes', access_granted: 'Access granted!', issue: '' },
        gsc: { has_account: 'Yes', access_granted: 'Access granted!', issue: '' },
        ga4: { has_account: 'Yes', access_granted: 'Access granted!', issue: '' },
        gtm: { has_account: 'Yes', access_granted: 'Access granted!', issue: '' },
        ...formData.access_audit
    });

    const handleNextSubStep = () => {
        if (subStep < 2) {
            setSubStep(subStep + 1);
            window.scrollTo(0, 0);
        } else {
            handleFinalSubmit();
        }
    };

    const handlePrevSubStep = () => {
        if (subStep > 0) {
            setSubStep(subStep - 1);
        } else {
            onPrev();
        }
    };

    const handleFinalSubmit = async () => {
        setIsSaving(true);
        try {
            const practiceId = formData.practiceId;

            await updatePracticeMetadata(practiceId, {
                website_platform: accessData.website_platform,
                access_audit: {
                    gbp: accessData.gbp,
                    gsc: accessData.gsc,
                    ga4: accessData.ga4,
                    gtm: accessData.gtm
                }
            });

            await updateOnboardingState(practiceId, {
                leadsie_connected: true // Assuming they went through the embed
            });

            setFormData({ ...formData, ...accessData });
            onNext();
        } catch (err) {
            console.error('Failed to save access audit:', err);
            alert('Error saving data. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const updateProperty = (prop: string, field: string, value: string) => {
        setAccessData({
            ...accessData,
            [prop]: { ...(accessData as any)[prop], [field]: value }
        });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3">
                    <Shield className="text-[var(--primary)]" /> Secure Platform Access
                </h2>
                <div className="flex gap-2 mb-4">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= subStep ? 'bg-[var(--primary)]' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {subStep === 0 && (
                    <motion.div
                        key="leadsie"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-slate-300">
                                We use a tool called <span className="text-white font-bold">Leadsie</span> to streamline access to your website and Google properties. The process is similar to logging into an account using Google. Please ensure you are logged into the correct Google business account before starting!
                            </p>
                            <p className="text-slate-400 text-sm italic">
                                Once you've completed this process, please tap Next at the bottom of the page to share with our team what access you have granted.
                            </p>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                            <iframe
                                src="https://app.leadsie.com/embed/connect/to/digital-access-partners/core-marketing-system"
                                scrolling="auto"
                                width="100%"
                                height="800px"
                                style={{ border: 0 }}
                                title="Leadsie Connection"
                            />
                        </div>
                    </motion.div>
                )}

                {subStep === 1 && (
                    <motion.div
                        key="website"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Website Platform</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['Squarespace', 'Wix', 'Other'].map(plat => (
                                    <button
                                        key={plat}
                                        onClick={() => setAccessData({ ...accessData, website_platform: plat })}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${accessData.website_platform === plat ? 'bg-[var(--primary-glow)] border-[var(--primary)] text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                                    >
                                        <Globe size={24} />
                                        <span className="font-bold text-sm">{plat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {accessData.website_platform === 'Squarespace' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h3 className="text-white font-bold text-lg">Squarespace Access Instructions</h3>
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <iframe
                                        src="https://customer-dmmj9ibzv6vjzqlm.cloudflarestream.com/168cb629a4c9d181d5086ce445a13007/iframe?poster=https%3A%2F%2Fcustomer-dmmj9ibzv6vjzqlm.cloudflarestream.com%2F168cb629a4c9d181d5086ce445a13007%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        )}

                        {accessData.website_platform === 'Wix' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h3 className="text-white font-bold text-lg">Wix Access Instructions</h3>
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <iframe
                                        src="https://customer-dmmj9ibzv6vjzqlm.cloudflarestream.com/198ae2d09c7296e1152e35291606d21a/iframe?poster=https%3A%2F%2Fcustomer-dmmj9ibzv6vjzqlm.cloudflarestream.com%2F198ae2d09c7296e1152e35291606d21a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        allowFullScreen={true}
                                    />
                                </div>
                            </div>
                        )}

                        {accessData.website_platform === 'Other' && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h3 className="text-white font-bold">Standard CMS Access</h3>
                                <p className="text-slate-400 text-sm">Please add <span className="text-[var(--primary)] font-bold">support@moonraker.ai</span> as an Admin on your site.</p>
                                <p className="text-slate-500 text-xs italic">Note: Some platforms don't provide the ability to add multiple admins (i.e. therapysites.com). In that case, the only option is to share your own login with our team via our secure dashboard later.</p>
                            </div>
                        )}

                        {accessData.website_platform && (
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Have you been able to grant access?</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Access granted!', 'I need help!'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setAccessData({ ...accessData, website_access_status: status })}
                                            className={`p-4 rounded-xl border font-bold transition-all ${accessData.website_access_status === status ? 'bg-[var(--primary)] border-[var(--primary)] text-black' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {subStep === 2 && (
                    <motion.div
                        key="google"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2x p-6 mb-8">
                            <p className="text-sm text-slate-400">
                                This is an important step to let our team know what access has been granted so we can verify it and determine what needs to be built new.
                            </p>
                        </div>

                        {[
                            { id: 'gbp', name: 'Google Business Profile', icon: Monitor },
                            { id: 'gsc', name: 'Google Search Console', icon: Shield },
                            { id: 'ga4', name: 'Google Analytics 4', icon: CheckCircle2 },
                            { id: 'gtm', name: 'Google Tag Manager', icon: Monitor }
                        ].map(item => (
                            <div key={item.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-glow)] text-[var(--primary)] flex items-center justify-center">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Do you have a {item.name}?</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {['Yes', 'No, I need one'].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => updateProperty(item.id, 'has_account', val)}
                                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${(accessData as any)[item.id].has_account === val ? 'bg-white/10 border-white/20 text-white' : 'bg-black/20 border-white/5 text-slate-500 hover:bg-white/5'}`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>

                                {(accessData as any)[item.id].has_account === 'Yes' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4 pt-4 border-t border-white/5"
                                    >
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Has access been granted?</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Access granted!', 'I need help!'].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => updateProperty(item.id, 'access_granted', val)}
                                                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${(accessData as any)[item.id].access_granted === val ? 'bg-[var(--primary)] border-[var(--primary)] text-black' : 'bg-black/20 border-white/5 text-slate-500 hover:bg-white/5'}`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>

                                        {(accessData as any)[item.id].access_granted === 'I need help!' && (
                                            <div className="space-y-2 pt-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Describe the issue</label>
                                                <textarea
                                                    value={(accessData as any)[item.id].issue}
                                                    onChange={(e) => updateProperty(item.id, 'issue', e.target.value)}
                                                    placeholder="e.g. My login isn't working or I can't find the settings..."
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[var(--primary)] transition-all min-h-[80px]"
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <button
                    onClick={handlePrevSubStep}
                    className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    onClick={handleNextSubStep}
                    disabled={isSaving}
                    className="px-6 py-4 rounded-xl bg-[var(--primary)] text-slate-900 font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : (
                        <>{subStep === 2 ? 'Finish Audit' : 'Next Step'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
            </div>
        </div>
    );
}
