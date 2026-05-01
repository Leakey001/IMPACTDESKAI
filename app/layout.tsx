import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ImpactDesk AI",
  description: "Write winning grants, produce sharper impact reports, and communicate with donors faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex min-h-screen flex-col`}>
        <Header />
          <div className="flex-1">
            {children}
          </div>
        <Footer />
      </body>
    </html>
  );
}
