import { getAllInvoicesAdmin } from "@/lib/invoices-admin";
import { Invoice } from "@/lib/invoices";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let invoices: Invoice[] = [];
    let error: string | null = null;
    try {
        console.log("[Admin] Fetching invoices via Admin SDK...");
        invoices = await getAllInvoicesAdmin();
    } catch (err: any) {
        console.error("Failed to load invoices on server (Admin SDK):", err);
        error = err.message || "Unknown data fetching error";
    }

    return <AdminDashboardClient initialInvoices={invoices} error={error} />;
}
