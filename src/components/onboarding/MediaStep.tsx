'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, Loader2, Image as ImageIcon, UserCircle, Files } from 'lucide-react';

export default function MediaStep({ onNext, onPrev, practiceId }: any) {
    const [uploads, setUploads] = useState<any>({
        Logos: { status: 'idle', link: null },
        Headshots: { status: 'idle', link: null },
        Other: { status: 'idle', link: null }
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploads({ ...uploads, [category]: { status: 'uploading', link: null } });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('practiceId', practiceId);
        formData.append('category', category);

        try {
            const res = await fetch('/api/upload/drive', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setUploads({ ...uploads, [category]: { status: 'success', link: data.link } });
            } else {
                throw new Error(data.error);
            }
        } catch (err: any) {
            console.error(err);
            setUploads({ ...uploads, [category]: { status: 'error', link: null } });
        }
    };

    const renderUploader = (category: string, label: string, icon: any, description: string) => {
        const state = uploads[category];
        const Icon = icon;

        return (
            <div className={`p-6 rounded-2xl border-2 border-dashed transition-all ${state.status === 'success' ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${state.status === 'success' ? 'bg-[var(--primary)] text-black' : 'bg-white/10 text-slate-400'
                        }`}>
                        <Icon size={32} />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-1">
                        <h4 className="font-bold text-lg">{label}</h4>
                        <p className="text-sm text-slate-400">{description}</p>
                    </div>

                    <div className="relative">
                        {state.status === 'idle' && (
                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Upload size={18} /> Select File
                                <input type="file" className="hidden" onChange={(e) => handleUpload(e, category)} />
                            </label>
                        )}
                        {state.status === 'uploading' && (
                            <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                                <Loader2 size={18} className="animate-spin" /> Uploading...
                            </div>
                        )}
                        {state.status === 'success' && (
                            <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                                <CheckCircle2 size={18} /> Success
                                <a href={state.link} target="_blank" rel="noreferrer" className="text-xs underline block mt-1">View in Drive</a>
                            </div>
                        )}
                        {state.status === 'error' && (
                            <button
                                onClick={() => setUploads({ ...uploads, [category]: { status: 'idle', link: null } })}
                                className="text-red-400 font-bold border-b border-red-400/50"
                            >
                                Failed. Try again?
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading">Media Assets</h2>
                <p className="text-slate-400 font-medium">Your assets will be stored securely in your dedicated Google Drive folder.</p>
            </div>

            <div className="space-y-4">
                {renderUploader('Logos', 'Practice Logo', ImageIcon, 'High-res JPG or PNG format preferred.')}
                {renderUploader('Headshots', 'Owner / PR Headshot', UserCircle, 'High-res headshot for PR and outreach.')}
                {renderUploader('Other', 'Additional Media', Files, 'Photos of facility, team, or location.')}
            </div>

            <div className="pt-6 flex gap-4">
                <button
                    onClick={onPrev}
                    className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    onClick={onNext}
                    className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold text-lg hover:shadow-[0_0_25px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group"
                >
                    Complete Onboarding <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
