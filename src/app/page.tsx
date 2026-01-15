'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, ShieldCheck, Zap, BarChart4 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)] text-[var(--primary)] text-sm font-bold tracking-tight mb-4">
          <Rocket size={16} />
          <span>The New Standard in AI SEO Management</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold font-heading tracking-tight leading-tight">
          Everything You Need to <span className="text-[var(--primary)]">Dominate Search</span>
        </h1>

        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Moonraker Client HQ is your command center for scaling agency operations,
          automating onboarding, and delivering AI-ready visibility for your clients.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link href="/dashboard">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-slate-900 font-bold text-lg hover:shadow-[0_0_25px_var(--primary-glow)] transition-all flex items-center gap-2">
              Go to Command Center <ArrowRight size={20} />
            </button>
          </Link>
          <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
            See the Architecture
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <FeatureCard
          icon={<ShieldCheck className="text-[var(--primary)]" />}
          title="Automated Onboarding"
          description="Provision Google Drive folders and assets instantly upon client payment."
        />
        <FeatureCard
          icon={<Zap className="text-amber-400" />}
          title="Real-time Tracking"
          description="Clients see real-time progress as your team executes SOP-backed tasks."
        />
        <FeatureCard
          icon={<BarChart4 className="text-purple-400" />}
          title="Gemini Insights"
          description="AI-driven analysis prioritizing urgent tasks for maximum ranking impact."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] text-left hover:border-[var(--primary-glow)] transition-all group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-heading mb-3">{title}</h3>
      <p className="text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
    </div>
  );
}
