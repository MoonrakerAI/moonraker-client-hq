import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createClientFolder, createIntakeDoc } from "@/lib/google";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { businessName, website, ...intakeInfo } = data;

        if (!businessName) {
            return NextResponse.json({ error: "Business name is required" }, { status: 400 });
        }

        // 1. Create Google Drive Folder
        const folder = await createClientFolder(businessName);
        const folderId = folder.id!;

        // 2. Create Intake Google Doc
        const doc = await createIntakeDoc(folderId, businessName, intakeInfo);

        // 3. Save to Firestore
        const clientRef = await addDoc(collection(db, "clients"), {
            name: businessName,
            website: website,
            driveFolderId: folderId,
            driveFolderLink: folder.webViewLink,
            intakeDocId: doc.documentId,
            status: "onboarding_completed",
            phase: "foundational",
            createdAt: serverTimestamp(),
            ...intakeInfo
        });

        return NextResponse.json({
            success: true,
            clientId: clientRef.id,
            folderLink: folder.webViewLink
        });
    } catch (error: any) {
        console.error("Onboarding Completion Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
