import { NextResponse } from "next/server";
import { getAdminDb, admin } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(request: Request) {
    console.log("[API] Received Invoice Creation Request (Admin SDK)");
    try {
        const body = await request.json();
        console.log("[API] Request body parsed successfully:", body.clientEmail);

        // Add server-side metadata
        const invoiceData = {
            ...body,
            status: "pending",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        console.log("[API] Attempting Firestore write (Admin SDK)...");
        // Using the custom database handle from getAdminDb()
        const docRef = await getAdminDb().collection("invoices").add(invoiceData);
        console.log("[API] Firestore write successful, ID:", docRef.id);

        return NextResponse.json({ id: docRef.id }, { status: 201 });
    } catch (error: any) {
        console.error("[API] Server-side Invoice Creation Error:", error);
        return NextResponse.json(
            { error: "Failed to create invoice on server", details: error.message },
            { status: 500 }
        );
    }
}
