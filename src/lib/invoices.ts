import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDoc,
    doc,
    updateDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy
} from "firebase/firestore";

export interface InvoiceItem {
    name: string;
    description: string;
    amount: number; // in cents
    recurring: boolean;
}

export interface Invoice {
    id?: string;
    clientName: string;
    clientEmail: string;
    clientCompany: string;
    clientPhone?: string;
    practiceType?: string;
    items: InvoiceItem[];
    status: "pending" | "paid" | "cancelled";
    createdAt: any;
    totalAmount: number;
    paymentMethod?: "card" | "us_bank_account";
    stripeSessionId?: string;
}

const COLLECTION_NAME = "invoices";

export const createInvoice = async (invoiceData: Omit<Invoice, "id" | "createdAt" | "status">) => {
    try {
        const response = await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create invoice via server API");
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Error creating invoice via Server API:", error);
        throw error;
    }
};

export const getInvoice = async (id: string): Promise<Invoice | null> => {
    try {
        const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Invoice;
        }
        return null;
    } catch (error) {
        console.error("Error getting invoice:", error);
        throw error;
    }
};

export const updateInvoiceStatus = async (id: string, status: Invoice["status"], stripeSessionId?: string) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const updates: any = { status };
        if (stripeSessionId) updates.stripeSessionId = stripeSessionId;
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating invoice status:", error);
        throw error;
    }
};

export const getInvoicesByEmail = async (email: string) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("clientEmail", "==", email),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
    } catch (error) {
        console.error("Error getting invoices by email:", error);
        throw error;
    }
};

export const getAllInvoices = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
    } catch (error) {
        console.error("Error getting all invoices:", error);
        throw error;
    }
};
