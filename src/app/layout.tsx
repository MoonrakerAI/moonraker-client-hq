import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Moonraker Client HQ | Premium SEO Management",
  description: "The ultimate command center for Moonraker AI client campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-black">
        <Sidebar />
        <div className="flex-1 ml-[var(--sidebar-w)] flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
