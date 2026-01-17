'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Plus,
    Building2,
    User,
    Mail,
    Globe,
    MapPin,
    FileText,
    Loader2
} from 'lucide-react';

interface NewPracticeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (practiceData: PracticeFormData) => Promise<void>;
}

export interface PracticeFormData {
    name: string;
    contact_name: string;
    email: string;
    website: string;
    notes: string;
}

export default function NewPracticeModal({ isOpen, onClose, onSubmit }: NewPracticeModalProps) {
    const [formData, setFormData] = useState<PracticeFormData>({
        name: '',
        contact_name: '',
        email: '',
        website: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setIsSubmitting(true);
        try {
            if (onSubmit) {
                await onSubmit(formData);
            }
            // Reset form
            setFormData({
                name: '',
                contact_name: '',
                email: '',
                website: '',
                notes: ''
            });
            onClose();
        } catch (err) {
            console.error('Failed to create practice:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
                    >
                        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--primary-glow)] text-[var(--primary)] flex items-center justify-center">
                                            <Building2 size={20} />
                                        </div>
                                        <h2 className="text-2xl font-bold font-heading text-white">New Practice</h2>
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium">
                                        Add a new client practice to your SEO campaign roster.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Practice Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <Building2 size={12} />
                                        Practice Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Albuquerque Family Counseling"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium"
                                    />
                                </div>

                                {/* Contact Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <User size={12} />
                                        Contact Name
                                    </label>
                                    <input
                                        type="text"
                                        name="contact_name"
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                        placeholder="e.g., Kelly Chisholm"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <Mail size={12} />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g., contact@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <Globe size={12} />
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="e.g., https://example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium"
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <FileText size={12} />
                                        Initial Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Any initial notes about this practice..."
                                        className="w-full h-24 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-[var(--primary)] transition-all text-sm font-medium resize-none"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.name.trim()}
                                        className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all text-sm flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Plus size={16} />
                                        )}
                                        {isSubmitting ? 'Creating...' : 'Create Practice'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
