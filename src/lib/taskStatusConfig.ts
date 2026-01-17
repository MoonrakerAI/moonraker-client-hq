// Shared task status configuration for consistent styling across the app

export type TaskStatus = 'Open' | 'Doing' | 'Internal Review' | 'Waiting on Client' | 'Done';

// All available status options
export const statusOptions: TaskStatus[] = ['Open', 'Doing', 'Internal Review', 'Waiting on Client', 'Done'];

// Pill/badge colors for status indicators
export const statusBadgeColors: Record<TaskStatus, string> = {
    'Open': 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    'Doing': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Internal Review': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    'Waiting on Client': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'Done': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

// Row border and background colors for prominent status display
export const rowStatusStyles: Record<TaskStatus, string> = {
    'Open': 'border-l-slate-500/50 bg-slate-500/5 hover:bg-slate-500/10',
    'Doing': 'border-l-blue-400 bg-blue-400/5 hover:bg-blue-400/10',
    'Internal Review': 'border-l-orange-400 bg-orange-400/5 hover:bg-orange-400/10',
    'Waiting on Client': 'border-l-amber-400 bg-amber-400/5 hover:bg-amber-400/10',
    'Done': 'border-l-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10',
};

// Solid dot/checkbox colors - all filled with the status color
export const statusDotColors: Record<TaskStatus, string> = {
    'Open': 'bg-slate-500 border-slate-500 text-white',
    'Doing': 'bg-blue-400 border-blue-400 text-white',
    'Internal Review': 'bg-orange-400 border-orange-400 text-white',
    'Waiting on Client': 'bg-amber-400 border-amber-400 text-black',
    'Done': 'bg-emerald-400 border-emerald-400 text-black',
};

// Status icons for modal selector
export const statusIconMap = {
    'Open': 'Circle',
    'Doing': 'Clock',
    'Internal Review': 'Eye',
    'Waiting on Client': 'AlertCircle',
    'Done': 'CheckCircle2',
} as const;
