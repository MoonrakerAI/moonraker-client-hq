'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';
import {
    TaskStatus,
    statusBadgeColors,
    rowStatusStyles,
    statusDotColors
} from '@/lib/taskStatusConfig';

interface Task {
    id: string;
    name: string;
    status: TaskStatus;
    category: string;
    stage: string;
    display_order: number;
    sop_url?: string;
    notes?: string;
    practice_name?: string;
}

interface TaskBoardProps {
    tasks: Task[];
    isAdmin?: boolean;
    onUpdateTask?: (taskId: string, status: TaskStatus, notes?: string) => Promise<void>;
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
                    <div className="flex items-center gap-2 flex-wrap">
                        {['All', 'Open', 'Doing', 'Internal Review', 'Waiting on Client', 'Done'].map(s => (
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
                                            className={`group flex items-center justify-between p-5 rounded-2xl border-l-4 border border-white/5 transition-all cursor-pointer ${rowStatusStyles[task.status] || rowStatusStyles['Open']}`}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className={`w-4 h-4 rounded-full ${statusDotColors[task.status] || statusDotColors['Open']}`} />
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">{task.name}</h4>
                                                    <div className="flex items-center gap-3">
                                                        {task.practice_name && (
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] px-2 py-0.5 rounded-md bg-[var(--primary-glow)]">
                                                                {task.practice_name}
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{task.category}</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeColors[task.status] || statusBadgeColors['Open']}`}>
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
