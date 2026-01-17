'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    ExternalLink,
    MoreHorizontal,
    ChevronRight
} from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';

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

const statusColors = {
    'Open': 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    'Doing': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Waiting on Client': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'Done': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

// Row border and background colors for prominent status display
const rowStatusStyles = {
    'Open': 'border-l-slate-500/50 bg-slate-500/5 hover:bg-slate-500/10',
    'Doing': 'border-l-blue-400 bg-blue-400/5 hover:bg-blue-400/10',
    'Waiting on Client': 'border-l-amber-400 bg-amber-400/5 hover:bg-amber-400/10',
    'Done': 'border-l-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10',
};

const checkboxColors = {
    'Open': 'border-slate-600 text-slate-600',
    'Doing': 'border-blue-400 text-blue-400 bg-blue-400/20',
    'Waiting on Client': 'border-amber-400 text-amber-400 bg-amber-400/20',
    'Done': 'border-emerald-400 text-emerald-400 bg-emerald-400',
};

interface TaskBoardProps {
    tasks: Task[];
    isAdmin?: boolean;
    onUpdateTask?: (taskId: string, status: Task['status'], notes?: string) => Promise<void>;
}

export default function TaskBoard({ tasks, isAdmin = false, onUpdateTask }: TaskBoardProps) {
    const [filter, setFilter] = useState<string>('All');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

    // Group tasks by stage
    const stages = Array.from(new Set(tasks.map(t => t.stage))).sort((a, b) => {
        const order = ['Pre-Kickoff', 'Kickoff Strategy', 'Execution Phase', 'Authority Building'];
        return order.indexOf(a) - order.indexOf(b);
    });

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <>
            <div className="space-y-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                        {['All', 'Open', 'Doing', 'Waiting on Client', 'Done'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === s ? 'bg-white/10 text-[var(--primary)] border border-[var(--primary-glow)]' : 'text-slate-500 hover:text-white'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{tasks.length} Total Tasks</p>
                </div>

                <div className="space-y-12">
                    {stages.map((stage) => {
                        const stageTasks = filteredTasks.filter(t => t.stage === stage).sort((a, b) => a.display_order - b.display_order);
                        if (stageTasks.length === 0) return null;

                        return (
                            <div key={stage} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-bold font-heading text-white bg-white/5 px-4 py-1 rounded-full border border-white/10 uppercase tracking-widest text-[10px]">
                                        {stage}
                                    </h3>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {stageTasks.map((task, i) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleTaskClick(task)}
                                            className={`group flex items-center justify-between p-5 rounded-2xl border-l-4 border border-white/5 transition-all cursor-pointer ${rowStatusStyles[task.status]}`}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${checkboxColors[task.status]} ${task.status === 'Done' ? 'text-black' : ''}`}>
                                                    {task.status === 'Done' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">{task.name}</h4>
                                                    <div className="flex items-center gap-3">
                                                        {task.practice_name && (
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] px-2 py-0.5 rounded-md bg-[var(--primary-glow)]">
                                                                {task.practice_name}
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{task.category}</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[task.status]}`}>
                                                            {task.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {isAdmin && task.sop_url && (
                                                    <a
                                                        href={task.sop_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={14} /> SOP
                                                    </a>
                                                )}
                                                <ChevronRight size={20} className="text-slate-700 group-hover:text-[var(--primary)] transition-colors" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <TaskDetailModal
                task={selectedTask}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onUpdateStatus={onUpdateTask}
            />
        </>
    );
}
