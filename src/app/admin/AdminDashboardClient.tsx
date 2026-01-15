"use client";

import { useState } from "react";
import {
    LucidePlus,
    LucideExternalLink,
    LucideMoreVertical,
    LucideSearch,
    LucideCopy,
} from "lucide-react";
import Link from "next/link";
import { Invoice } from "@/lib/invoices";

interface Props {
    initialInvoices: Invoice[];
    error?: string | null;
}

export default function AdminDashboardClient({ initialInvoices, error }: Props) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredInvoices = initialInvoices.filter(inv =>
        inv.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyLink = (id: string) => {
        const link = `${window.location.origin}/invoice/${id}`;
        navigator.clipboard.writeText(link);
        alert("Invoice link copied!");
    };

    return (
        <main style={{ padding: "3rem 2rem" }}>
            <div className="container">
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
                    <div>
                        <h1 className="gradient-text" style={{ fontSize: "3.5rem", marginBottom: "0.75rem" }}>Practice Overview</h1>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem" }}>Managing active growth campaigns and practice invoices.</p>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <Link href="/admin/invoices/new" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "none", fontSize: "1.1rem", padding: "14px 24px" }}>
                            <LucidePlus size={22} /> Create Invoice
                        </Link>
                        <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", padding: "14px 24px" }}>
                            <LucidePlus size={22} /> Add New Practice
                        </button>
                    </div>
                </header>

                {/* Stats Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
                    <div className="glass-card" style={{ padding: "2rem" }}>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.75rem", fontWeight: "600" }}>Total Practices</div>
                        <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{initialInvoices.length}</div>
                    </div>
                    <div className="glass-card" style={{ padding: "2rem" }}>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.75rem", fontWeight: "600" }}>Active Invoices</div>
                        <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{initialInvoices.filter(i => i.status === "pending").length}</div>
                    </div>
                    <div className="glass-card" style={{ padding: "2rem" }}>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.75rem", fontWeight: "600" }}>Settled Payments</div>
                        <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{initialInvoices.filter(i => i.status === "paid").length}</div>
                    </div>
                    <div className="glass-card" style={{ padding: "2rem" }}>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.75rem", fontWeight: "600" }}>Accrued Revenue</div>
                        <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--success)" }}>
                            ${(initialInvoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.totalAmount, 0) / 100).toLocaleString('en-US')}
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", gap: "1.5rem" }}>
                    <div style={{ position: "relative", flex: 1 }}>
                        <LucideSearch size={22} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                        <input
                            type="text"
                            placeholder="Search by practice name, doctor, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "16px 16px 16px 50px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                color: "white",
                                fontSize: "1.1rem"
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error)", color: "var(--error)" }}>
                        <strong>Server Connection Issue:</strong> {error}
                    </div>
                )}

                {/* Practice Table */}
                <div className="glass-card" style={{ overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                                <th style={{ padding: "1.5rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase" }}>PRACTICE & DOCTOR</th>
                                <th style={{ padding: "1.5rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase" }}>TYPE</th>
                                <th style={{ padding: "1.5rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase" }}>STATUS</th>
                                <th style={{ padding: "1.5rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase" }}>AMOUNT</th>
                                <th style={{ padding: "1.5rem", fontWeight: "700", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase", textAlign: "right" }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: "4rem", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "1.2rem" }}>
                                        No practices or invoices found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInvoices.map((inv) => (
                                    <tr key={inv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} className="table-row">
                                        <td style={{ padding: "1.5rem" }}>
                                            <div style={{ fontWeight: "700", fontSize: "1.2rem", color: "white" }}>{inv.clientCompany}</div>
                                            <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                                                {inv.clientName} • {inv.clientEmail}
                                            </div>
                                        </td>
                                        <td style={{ padding: "1.5rem" }}>
                                            <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}>
                                                {inv.practiceType || "Solo Practice"}
                                            </span>
                                        </td>
                                        <td style={{ padding: "1.5rem" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: "600" }}>
                                                <div style={{
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    background: inv.status === "paid" ? "var(--success)" : inv.status === "pending" ? "var(--warning)" : "var(--error)"
                                                }} />
                                                <span style={{ color: inv.status === "paid" ? "var(--success)" : "white" }}>
                                                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "1.5rem", fontSize: "1.1rem", fontWeight: "700", color: "white" }}>
                                            ${(inv.totalAmount / 100).toLocaleString('en-US')}
                                        </td>
                                        <td style={{ padding: "1.5rem", textAlign: "right" }}>
                                            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                                <Link
                                                    href={`/invoice/${inv.id}`}
                                                    target="_blank"
                                                    title="View Public Invoice"
                                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}
                                                >
                                                    <LucideExternalLink size={20} />
                                                </Link>
                                                <button
                                                    onClick={() => copyLink(inv.id!)}
                                                    title="Copy Shareable Link"
                                                    style={{ background: "rgba(59, 130, 246, 0.1)", border: "none", color: "var(--primary)", padding: "10px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}
                                                >
                                                    <LucideCopy size={20} />
                                                </button>
                                                <button
                                                    title="More Options"
                                                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center" }}
                                                >
                                                    <LucideMoreVertical size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .table-row:hover {
                    background: rgba(255, 255, 255, 0.03);
                }
            `}</style>
        </main>
    );
}
