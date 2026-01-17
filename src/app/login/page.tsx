'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { signInWithMagicLink } from '@/lib/actions/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await signInWithMagicLink(email);

        if (result.success) {
            setIsSent(true);
        } else {
            setError(result.error || 'Failed to send magic link');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)] text-[var(--primary)] text-sm font-bold tracking-tight mb-4">
                        <Rocket size={16} />
                        <span>Command Center Login</span>
                    </div>
                    <h1 className="text-4xl font-bold font-heading tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-400 font-medium tracking-tight">Enter your email to receive a magic link</p>
                </div>

                <div className="p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl shadow-2xl">
                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary-glow)] transition-all font-medium"
                                        placeholder="you@practice.com"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold text-lg hover:shadow-[0_0_25px_var(--primary-glow)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Sending Link...</span>
                                    </>
                                ) : (
                                    <>
                                        Send Magic Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4 space-y-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
                                <CheckCircle2 size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold font-heading">Check your email</h3>
                                <p className="text-slate-400 font-medium">
                                    We&apos;ve sent a magic link to <span className="text-white">{email}</span>. Click the link to sign in.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSent(false)}
                                className="text-sm font-bold text-[var(--primary)] hover:underline"
                            >
                                Back to login
                            </button>
                        </motion.div>
                    )}
                </div>

                <p className="text-center mt-8 text-slate-500 text-sm font-medium">
                    No password required. Secure & encrypted by Moonraker AI.
                </p>
            </motion.div>
        </div>
    );
}
