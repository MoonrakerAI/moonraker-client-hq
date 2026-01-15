import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Export a flag to check connection status in UI
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn('Supabase credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
}

// Only initialize if we have credentials to avoid runtime crash
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl!, supabaseAnonKey!)
    : ({} as any); // Fallback to empty object, handled by isSupabaseConfigured checks

/**
 * Helper to get the service role client (server-side only)
 */
export const getServiceSupabase = () => {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey || !supabaseUrl) {
        console.error('SUPABASE_SERVICE_ROLE_KEY or URL is missing');
        return {} as any;
    }
    return createClient(supabaseUrl, serviceKey);
};
