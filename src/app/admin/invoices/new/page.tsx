"use client";

import { useState, useEffect } from "react";
import {
    LucideArrowLeft,
    LucidePlus,
    LucideTrash2,
    LucideSave,
    LucideCheckCircle,
    LucideCopy,
    LucideExternalLink
} from "lucide-react";
import Link from "next/link";
import { createInvoice, InvoiceItem } from "@/lib/invoices";

export default function NewInvoicePage() {
    const [clientInfo, setClientInfo] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        practiceType: "Solo Practice"
    });

    const [items, setItems] = useState<InvoiceItem[]>([
        { name: "The CORE Marketing System™", description: "3-Month Foundational Strategy & Setup for Mental Health Practices", amount: 500000, recurring: false }
    ]);

    const [isSaving, setIsSaving] = useState(false);
    const [createdInvoiceId, setCreatedInvoiceId] = useState<string | null>(null);

    const formatCurrency = (amountInCents: number) => {
        return (amountInCents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const addItem = () => {
        setItems([...items, { name: "", description: "", amount: 0, recurring: false }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.amount, 0);
    };

    const handleCreateInvoice = async () => {
        if (!clientInfo.email || items.length === 0) {
            alert("Please provide client email and at least one item.");
            return;
        }

        setIsSaving(true);

        try {
            const invoiceId = await createInvoice({
                clientName: clientInfo.name,
                clientEmail: clientInfo.email,
                clientCompany: clientInfo.company,
                clientPhone: clientInfo.phone,
                practiceType: clientInfo.practiceType,
                items,
                totalAmount: calculateTotal(),
            });

            if (invoiceId) {
                setCreatedInvoiceId(invoiceId);
            }
        } catch (error) {
            console.error("Critical Failure creating invoice:", error);
            alert("An error occurred while creating the invoice. This usually happens if the server is unreachable or there is a configuration error.");
        } finally {
            setIsSaving(false);
        }
    };

    const copyInvoiceLink = () => {
        const link = `${window.location.origin}/invoice/${createdInvoiceId}`;
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };

    if (createdInvoiceId) {
        return (
            <main style={{ padding: "4rem 1rem", minHeight: "100vh", display: "flex", alignItems: "center" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <div className="glass-card" style={{ padding: "4rem", textAlign: "center", border: "1px solid var(--success)" }}>
                        <LucideCheckCircle size={80} color="var(--success)" style={{ marginBottom: "2rem" }} />
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Invoice Created</h2>
                        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "3rem", fontSize: "1.2rem" }}>
                            Tailored invoice for <strong>{clientInfo.company || clientInfo.name}</strong> is ready to be sent.
                        </p>

                        <div style={{ background: "rgba(255,255,255,0.05)", padding: "2rem", borderRadius: "16px", marginBottom: "3rem", textAlign: "left" }}>
                            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", textTransform: "uppercase", fontWeight: "700" }}>Shareable Link</div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <input
                                    readOnly
                                    value={`${window.location.origin}/invoice/${createdInvoiceId}`}
                                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px", borderRadius: "8px", color: "var(--primary)", flex: 1, fontSize: "1rem" }}
                                />
                                <button onClick={copyInvoiceLink} className="btn-primary" style={{ padding: "12px" }}><LucideCopy size={20} /></button>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1.5rem" }}>
                            <Link href={`/invoice/${createdInvoiceId}`} target="_blank" className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "1.1rem", padding: "1rem" }}>
                                <LucideExternalLink size={20} /> Preview Invoice
                            </Link>
                            <button onClick={() => setCreatedInvoiceId(null)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "white", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: "1.1rem" }}>
                                Create New
                            </button>
                        </div>

                        <Link href="/admin" style={{ display: "block", marginTop: "3rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "1rem" }}>
                            Return to Admin Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main style={{ padding: "3rem 1rem" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                <header style={{ marginBottom: "4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
                        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "1.1rem" }}>
                            <LucideArrowLeft size={20} /> Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: "3rem" }}>Create Practice Invoice (V3.0)</h1>
                </header>

                <section className="glass-card" style={{ padding: "3rem", marginBottom: "2.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>Practice Information</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <label style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}>Practice Name</label>
                            <input
                                type="text"
                                value={clientInfo.company}
                                onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                                placeholder="e.g. Serenity Therapy Group"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "10px", color: "white" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <label style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}>Owner Name</label>
                            <input
                                type="text"
                                value={clientInfo.name}
                                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                                placeholder="e.g. Jane Smith"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "10px", color: "white" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <label style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}>Practice Email</label>
                            <input
                                type="email"
                                value={clientInfo.email}
                                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                                placeholder="billing@practice.com"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "10px", color: "white" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <label style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}>Phone Number</label>
                            <input
                                type="tel"
                                value={clientInfo.phone}
                                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                                placeholder="(555) 000-0000"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "10px", color: "white" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", gridColumn: "span 2" }}>
                            <label style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}>Practice Type</label>
                            <select
                                value={clientInfo.practiceType}
                                onChange={(e) => setClientInfo({ ...clientInfo, practiceType: e.target.value })}
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px", borderRadius: "10px", color: "white" }}
                            >
                                <option value="Solo Practice" style={{ color: "black", background: "white" }}>Solo Practice</option>
                                <option value="Group Practice" style={{ color: "black", background: "white" }}>Group Practice</option>
                                <option value="Clinic" style={{ color: "black", background: "white" }}>Clinic / Multi-Location</option>
                                <option value="Mental Health Hybrid" style={{ color: "black", background: "white" }}>Mental Health Hybrid</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="glass-card" style={{ padding: "3rem", marginBottom: "4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem", flex: 1 }}>Services & Line Items</h3>
                        <button onClick={addItem} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(59, 130, 246, 0.1)", color: "var(--primary)", border: "none", padding: "10px 20px", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "1rem" }}>
                            <LucidePlus size={20} /> Add Item
                        </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {items.map((item, index) => (
                            <div key={index} style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
                                <button
                                    onClick={() => removeItem(index)}
                                    style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "rgba(239, 68, 68, 0.5)", cursor: "pointer" }}
                                >
                                    <LucideTrash2 size={22} />
                                </button>

                                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Service Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateItem(index, "name", e.target.value)}
                                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px", borderRadius: "8px", color: "white" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        <label style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Amount (USD)</label>
                                        <input
                                            type="number"
                                            value={item.amount / 100}
                                            onChange={(e) => updateItem(index, "amount", parseFloat(e.target.value) * 100)}
                                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px", borderRadius: "8px", color: "white" }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    <label style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>Description</label>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => updateItem(index, "description", e.target.value)}
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px", borderRadius: "8px", color: "white", minHeight: "100px", resize: "vertical" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "2px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.5)" }}>Total Strategic Investment</div>
                        <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "white" }}>
                            ${formatCurrency(calculateTotal())}
                        </div>
                    </div>
                </section>

                <button
                    onClick={handleCreateInvoice}
                    disabled={isSaving}
                    className="btn-primary"
                    style={{ width: "100%", fontSize: "1.5rem", padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
                >
                    {isSaving ? "Creating..." : <><LucideSave size={32} /> Generate Practice Invoice Link</>}
                </button>
            </div>
        </main>
    );
}
