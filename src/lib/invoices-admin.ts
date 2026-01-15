import { getAdminDb } from "./firebase-admin";
import { Invoice } from "./invoices";

const COLLECTION_NAME = "invoices";

export const getAllInvoicesAdmin = async (): Promise<Invoice[]> => {
    try {
        console.log("[Admin SDK] Fetching all invoices...");
        const snapshot = await getAdminDb().collection(COLLECTION_NAME)
            .orderBy("createdAt", "desc")
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            // Handle Firestore Timestamps from Admin SDK
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || data.createdAt,
            } as Invoice;
        });
    } catch (error) {
        console.error("Error getting all invoices (Admin):", error);
        throw error;
    }
};

export const getInvoiceAdmin = async (id: string): Promise<Invoice | null> => {
    try {
        console.log(`[Admin SDK] Fetching invoice ${id}...`);
        const doc = await getAdminDb().collection(COLLECTION_NAME).doc(id).get();

        if (doc.exists) {
            const data = doc.data()!;
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || data.createdAt,
            } as Invoice;
        }
        return null;
    } catch (error) {
        console.error("Error getting invoice (Admin):", error);
        throw error;
    }
};
