'use server';

import { supabase as clientSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export type UserProfile = {
    id: string;
    role: 'admin' | 'client';
    practice_id: string | null;
    full_name: string | null;
    avatar_url: string | null;
};

export async function signInWithMagicLink(email: string) {
    if (!isSupabaseConfigured) {
        return { success: false, error: 'Authentication service is not configured.' };
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (error) {
        console.error('Magic link sign-in error:', error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function signOut() {
    if (!isSupabaseConfigured) return { success: true };

    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign out error:', error.message);
        return { success: false, error: error.message };
    }
    return { success: true };
}

export async function getUserProfile(): Promise<{ profile: UserProfile | null; error: string | null }> {
    if (!isSupabaseConfigured) return { profile: null, error: 'Not configured' };

    const supabase = createSupabaseServerClient();

    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return { profile: null, error: userError?.message || 'No user found' };
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', profileError.message);
            return { profile: null, error: profileError.message };
        }

        return { profile, error: null };
    } catch (err: any) {
        console.error('Unexpected error in getUserProfile:', err.message);
        return { profile: null, error: err.message };
    }
}
