"use client";

import { LucideFolder, LucideCalendar, LucideFileText, LucideTrendingUp, LucideCheckCircle2, LucideCircle } from "lucide-react";

export default function ClientPortal({ params }: { params: { clientId: string } }) {
    // In a real app, fetch client data from Firestore here
    const clientData = {
        name: "Acme SEO Project",
        status: "In Progress",
        phase: "Foundational Phase",
        driveLink: "#",
        campaignSteps: [
            { id: 1, title: "Technical Audit", status: "completed", date: "Jan 10, 2026" },
            { id: 2, title: "Keyword Research", status: "completed", date: "Jan 12, 2026" },
            { id: 3, title: "On-Page Optimization", status: "in-progress", date: "Expected Jan 20" },
            { id: 4, title: "Content Strategy", status: "upcoming", date: "Feb 1, 2026" },
        ]
    };

    return (
        <main style={{ padding: "2rem" }}>
            <div className="container">
                {/* Header */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }} className="animate-fade-in">
                    <div>
                        <h1 className="gradient-text" style={{ fontSize: "2.5rem" }}>{clientData.name}</h1>
                        <p style={{ color: "rgba(255,255,255,0.5)" }}>Welcome back! Here is your campaign progress.</p>
                    </div>
                    <div className="glass-card" style={{ padding: "0.5rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }}></span>
                        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{clientData.phase}</span>
                    </div>
                </header>

                <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "2rem" }}>
                    {/* Main Content: Campaign Steps */}
                    <div className="glass-card" style={{ padding: "2rem" }}>
                        <h3 style={{ marginBottom: "2rem" }}>Campaign Roadmap</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {clientData.campaignSteps.map((step, index) => (
                                <div key={step.id} style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
                                    {/* Timeline Line */}
                                    {index < clientData.campaignSteps.length - 1 && (
                                        <div style={{ position: "absolute", top: "24px", left: "12px", width: "2px", height: "calc(100% + 1.5rem)", background: "rgba(255,255,255,0.05)" }} />
                                    )}

                                    <div style={{ zIndex: 1 }}>
                                        {step.status === "completed" ? (
                                            <LucideCheckCircle2 size={24} color="var(--success)" />
                                        ) : step.status === "in-progress" ? (
                                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", animation: "pulse 2s infinite" }} />
                                            </div>
                                        ) : (
                                            <LucideCircle size={24} color="rgba(255,255,255,0.2)" />
                                        )}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                                            <h4 style={{ opacity: step.status === "upcoming" ? 0.4 : 1 }}>{step.title}</h4>
                                            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{step.date}</span>
                                        </div>
                                        {step.status === "in-progress" && (
                                            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>Current focus: Optimizing meta titles and descriptions for core landing pages.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Assets & Quick Links */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <h4 style={{ marginBottom: "1.5rem" }}>Quick Links</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <a href={clientData.driveLink} target="_blank" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.9rem", padding: "10px" }}>
                                    <LucideFolder size={18} /> Client Drive
                                </a>
                                <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                                    <LucideFileText size={18} /> Intake Document
                                </button>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <h4 style={{ marginBottom: "1.5rem" }}>Agency Resources</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
                                    <LucideCalendar size={18} color="var(--primary)" />
                                    <span>Next Sync: Jan 25</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
                                    <LucideTrendingUp size={18} color="var(--primary)" />
                                    <span>Foundational: 65%</span>
                                </div>
                            </div>
                        </div>

                        {/* Embedded Calendar Placeholder */}
                        <div className="glass-card" style={{ padding: "1.5rem", height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", textAlign: "center" }}>
                            <LucideCalendar size={32} opacity={0.2} />
                            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Book a strategy call</p>
                            <div style={{ width: "100%", height: "150px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.1)" }}>
                                {/* Google Calendar Embed code would go here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
        </main>
    );
}
