import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
        <SidebarProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
