import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
    console.log("[Health] Starting diagnostic check...");

    const diagnostics: any = {
        supabase: {
            configured: isSupabaseConfigured,
            url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "MISSING",
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "FOUND" : "MISSING",
        },
        gemini: {
            configured: !!process.env.GEMINI_API_KEY,
        },
        resend: {
            configured: !!process.env.RESEND_API_KEY,
        },
        app: {
            nodeVersion: process.version,
            environment: process.env.NODE_ENV,
        }
    };

    return NextResponse.json(diagnostics);
}
