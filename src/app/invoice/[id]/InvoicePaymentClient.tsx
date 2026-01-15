"use client";

import { useState } from "react";
import {
    LucideCreditCard,
    LucideBanknote,
    LucideLoader2,
    LucideCheckCircle,
    LucideLock
} from "lucide-react";
import { Invoice } from "@/lib/invoices";

interface Props {
    invoice: Invoice;
}

export default function InvoicePaymentClient({ invoice }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "us_bank_account">("us_bank_account");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invoiceId: invoice.id,
                    paymentMethod,
                    customerEmail: invoice.clientEmail
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Payment failed to initialize.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const convenienceFee = paymentMethod === "card" ? Math.round(invoice.totalAmount * 0.035) : 0;
    const finalTotal = invoice.totalAmount + convenienceFee;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div className="glass-card" style={{ padding: "3rem" }}>
                <div style={{ marginBottom: "3rem" }}>
                    <div style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", fontWeight: "700" }}>Practice Details</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "white", marginBottom: "0.5rem" }}>{invoice.clientCompany}</div>
                    <div style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>{invoice.clientName}</div>
                    {invoice.clientPhone && (
                        <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)" }}>{invoice.clientPhone}</div>
                    )}
                    {invoice.practiceType && (
                        <div style={{ fontSize: "1rem", color: "var(--primary)", marginTop: "0.5rem", fontWeight: "600" }}>{invoice.practiceType}</div>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", padding: "2rem 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Strategic Investment</span>
                        <span style={{ fontWeight: "600" }}>${(invoice.totalAmount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {paymentMethod === "card" && (
                        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--primary)", fontSize: "1.1rem" }}>
                            <span>Convenience Fee (3.5%)</span>
                            <span>+${(convenienceFee / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "2.25rem", fontWeight: "800", marginTop: "1rem", color: "white" }}>
                        <span>Total</span>
                        <span>${(finalTotal / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div style={{ marginBottom: "3rem" }}>
                    <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem", fontWeight: "700", textTransform: "uppercase" }}>Choose Funding Method</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <button
                            onClick={() => setPaymentMethod("us_bank_account")}
                            style={{
                                padding: "1.5rem", borderRadius: "16px", border: `1px solid ${paymentMethod === "us_bank_account" ? "var(--success)" : "rgba(255,255,255,0.1)"}`,
                                background: paymentMethod === "us_bank_account" ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                color: "white", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem"
                            }}
                        >
                            <LucideBanknote size={28} color={paymentMethod === "us_bank_account" ? "var(--success)" : "rgba(255,255,255,0.4)"} />
                            <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>ACH Transfer</span>
                            <span style={{ fontSize: "0.8rem", color: "var(--success)", opacity: 0.8 }}>No Extra Fee</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod("card")}
                            style={{
                                padding: "1.5rem", borderRadius: "16px", border: `1px solid ${paymentMethod === "card" ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
                                background: paymentMethod === "card" ? "rgba(59, 130, 246, 0.1)" : "rgba(255,255,255,0.02)",
                                color: "white", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem"
                            }}
                        >
                            <LucideCreditCard size={28} color={paymentMethod === "card" ? "var(--primary)" : "rgba(255,255,255,0.4)"} />
                            <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>Credit Card</span>
                            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>3.5% Fee</span>
                        </button>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isProcessing || invoice.status === "paid"}
                    className="btn-primary"
                    style={{ width: "100%", fontSize: "1.4rem", padding: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
                >
                    {invoice.status === "paid" ? (
                        <><LucideCheckCircle size={32} /> Investment Secured</>
                    ) : isProcessing ? (
                        <LucideLoader2 className="animate-spin" size={32} />
                    ) : (
                        <>Authorize Strategic Plan</>
                    )}
                </button>

                <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                    <LucideLock size={14} /> Bank-Grade Security via Stripe
                </div>
            </div>
        </div>
    );
}
