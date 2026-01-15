import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { getAdminDb, admin } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';

export async function GET() {
    console.log("[Health] Starting diagnostic check...");

    const diagnostics: any = {
        firebase_client: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "FOUND" : "MISSING",
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "FOUND" : "MISSING",
        },
        firebase_admin: {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "FOUND" : "MISSING",
            clientEmail: process.env.GOOGLE_CLIENT_EMAIL ? "FOUND" : "MISSING",
            privateKey: process.env.GOOGLE_PRIVATE_KEY ? "FOUND" : "MISSING",
            initializedApps: admin.apps.length,
        },
        stripe: {
            secretKey: process.env.STRIPE_SECRET_KEY ? "FOUND" : "MISSING",
        },
        app: {
            nodeVersion: process.version,
            environment: process.env.NODE_ENV,
        },
        firestore_client: "TESTING...",
        firestore_admin: "TESTING...",
        databaseId: "moonraker-client-hq"
    };

    // Test Client SDK
    try {
        const q = query(collection(db, "invoices"), limit(1));
        await getDocs(q);
        diagnostics.firestore_client = "CONNECTED";
    } catch (err: any) {
        diagnostics.firestore_client = `ERROR: ${err.message}`;
    }

    // Test Admin SDK
    try {
        const snapshot = await getAdminDb().collection("invoices").limit(1).get();
        diagnostics.firestore_admin = "CONNECTED";
    } catch (err: any) {
        diagnostics.firestore_admin = `ERROR: ${err.message}`;
    }

    return NextResponse.json(diagnostics);
}
