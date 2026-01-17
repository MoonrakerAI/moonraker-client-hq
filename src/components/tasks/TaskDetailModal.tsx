'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    ExternalLink,
    FileText,
    Save
} from 'lucide-react';

interface Task {
    id: string;
    name: string;
    status: 'Open' | 'Doing' | 'Waiting on Client' | 'Done';
    category: string;
    stage: string;
    display_order: number;
    sop_url?: string;
    notes?: string;
    practice_name?: string;
}

interface TaskDetailModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdateStatus?: (taskId: string, status: Task['status'], notes?: string) => Promise<void>;
}

const statusOptions: Task['status'][] = ['Open', 'Doing', 'Waiting on Client', 'Done'];

const statusColors: Record<Task['status'], string> = {
    'Open': 'text-slate-500 bg-slate-500/10 border-slate-500/30',
    'Doing': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    'Waiting on Client': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'Done': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
};

const statusIcons: Record<Task['status'], React.ReactNode> = {
    'Open': <Circle size={16} />,
    'Doing': <Clock size={16} />,
    'Waiting on Client': <AlertCircle size={16} />,
    'Done': <CheckCircle2 size={16} />,
};

export default function TaskDetailModal({ task, isOpen, onClose, onUpdateStatus }: TaskDetailModalProps) {
    const [selectedStatus, setSelectedStatus] = useState<Task['status']>(task?.status || 'Open');
    const [notes, setNotes] = useState(task?.notes || '');
    const [isSaving, setIsSaving] = useState(false);

    // Update local state when task changes
    React.useEffect(() => {
        if (task) {
            setSelectedStatus(task.status);
            setNotes(task.notes || '');
        }
    }, [task]);

    const handleSave = async () => {
        if (!task || !onUpdateStatus) return;
        setIsSaving(true);
        try {
            await onUpdateStatus(task.id, selectedStatus, notes);
            onClose();
        } catch (err) {
            console.error('Failed to update task:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!task) return null;

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
                                <div className="space-y-2 flex-1 pr-4">
                                    <h2 className="text-2xl font-bold font-heading text-white">{task.name}</h2>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {task.practice_name && (
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] px-2 py-0.5 rounded-md bg-[var(--primary-glow)]">
                                                {task.practice_name}
                                            </span>
                                        )}
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            {task.category} • {task.stage}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Status Selector */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                    Status
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {statusOptions.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setSelectedStatus(status)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${selectedStatus === status
                                                    ? statusColors[status]
                                                    : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                                                }`}
                                        >
                                            {statusIcons[status]}
                                            <span className="text-sm font-bold">{status}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                    Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add notes about this task..."
                                    className="w-full h-28 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed font-medium outline-none focus:border-[var(--primary)] transition-all resize-none"
                                />
                            </div>

                            {/* SOP Link */}
                            {task.sop_url && (
                                <a
                                    href={task.sop_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold"
                                >
                                    <FileText size={16} />
                                    View Standard Operating Procedure
                                    <ExternalLink size={14} className="ml-auto" />
                                </a>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                {onUpdateStatus && (
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold hover:shadow-[0_0_20px_var(--primary-glow)] transition-all text-sm flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
