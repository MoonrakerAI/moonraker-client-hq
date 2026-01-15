import { getInvoiceAdmin } from "@/lib/invoices-admin";
import { notFound } from "next/navigation";
import InvoicePaymentClient from "./InvoicePaymentClient";
import { LucideAlertCircle, LucideFileText } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function InvoicePage({ params }: { params: { id: string } }) {
    const { id } = params;

    let invoice = null;
    let error = null;

    try {
        console.log(`[Invoice] Fetching invoice ${id} via Admin SDK...`);
        invoice = await getInvoiceAdmin(id);
        if (!invoice) {
            error = "Invoice not found or expired.";
        }
    } catch (err: any) {
        console.error("Server-side Fetch Error (Admin SDK):", err);
        error = "Failed to load invoice. Please try again later.";
    }

    if (error || !invoice) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem", textAlign: "center" }}>
                <LucideAlertCircle size={64} color="var(--error)" style={{ marginBottom: "1.5rem" }} />
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Invoice Issue</h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", maxWidth: "500px" }}>{error}</p>
                <div style={{ marginTop: "2rem", color: "rgba(255,255,255,0.3)" }}>Ref: {id}</div>
            </div>
        );
    }

    return (
        <main style={{ minHeight: "100vh", background: "var(--background)" }}>
            <div className="container" style={{ maxWidth: "1000px", padding: "4rem 1.5rem" }}>
                {/* ... UI structure remains same as before ... */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5rem" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <LucideFileText color="white" size={28} />
                            </div>
                            <span style={{ fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.02em" }}>ClientHQ <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span> Practice Growth</span>
                        </div>
                        <h1 className="gradient-text" style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>Service Invoice</h1>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem" }}>Secure Practice Investment Portal</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            borderRadius: "100px",
                            background: invoice.status === "paid" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                            color: invoice.status === "paid" ? "var(--success)" : "var(--warning)",
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: `1px solid ${invoice.status === "paid" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)"}`
                        }}>
                            {invoice.status}
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "4rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                        <div className="glass-card" style={{ padding: "3rem" }}>
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>Professional Services</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                                {invoice.items.map((item: any, idx: number) => (
                                    <div key={idx} style={{ position: "relative" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                                            <h3 style={{ fontSize: "1.35rem", fontWeight: "700" }}>{item.name}</h3>
                                            <span style={{ fontSize: "1.35rem", fontWeight: "700" }}>${(item.amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: "1.6", maxWidth: "90%" }}>
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <InvoicePaymentClient invoice={invoice} />
                </div>
            </div>
        </main>
    );
}
