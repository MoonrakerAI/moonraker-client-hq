'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, QrCode, Upload, Download, Sparkles } from 'lucide-react';

export default function NeoCreativeTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NEO QR Code Module */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <QrCode className="text-[var(--primary)]" size={24} />
                    <h3 className="text-xl font-bold font-heading">NEO QR System</h3>
                </div>

                <div className="aspect-square max-w-[280px] mx-auto bg-white p-6 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/10 group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button className="px-4 py-2 bg-black text-white rounded-xl font-bold text-sm shadow-2xl flex items-center gap-2">
                            <Download size={14} /> Download HQ
                        </button>
                    </div>
                    <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                        {/* Placeholder for QR Code */}
                        <QrCode size={120} />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-sm text-slate-400 font-medium">Link: https://g.page/moonraker-wellness/review</p>
                    <button className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest hover:underline underline-offset-4">Change Target URL</button>
                </div>
            </div>

            {/* Asset Optimization Module */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <ImageIcon className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold font-heading">Optimized Creative</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-[var(--primary)] transition-all flex flex-col items-center justify-center gap-3 py-10 cursor-pointer group">
                        <Upload className="text-slate-500 group-hover:text-[var(--primary)] transition-colors" size={32} />
                        <p className="text-sm font-bold text-slate-500 group-hover:text-slate-300">Drop brand photos to optimize for GBP</p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Recent Assets</h4>
                        {[1, 2].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800" />
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-white">Office_Exterior_0${i}.jpg</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Optimized • 1.2MB</p>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-500 hover:text-[var(--primary)] transition-colors">
                                    <Download size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
