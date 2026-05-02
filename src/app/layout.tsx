import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundAurora from "@/components/BackgroundAurora";
import { getSettings } from "@/lib/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dharaneesh M | Hardware Engineer",
  description: "Portfolio of Dharaneesh M, Hardware Engineer & Embedded Systems specialist.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  
  const dynamicStyles = {
    "--void-color": settings["void-color"],
    "--accent-color": settings["accent-color"],
    "--text-primary-color": settings["text-primary-color"],
    "--aurora-1": settings["aurora-1"],
    "--aurora-2": settings["aurora-2"],
    "--aurora-3": settings["aurora-3"],
    "--bg-grad-1": settings["bg-grad-1"],
    "--bg-grad-2": settings["bg-grad-2"],
    "--bg-grad-3": settings["bg-grad-3"],
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      style={dynamicStyles}
    >
      <body className="min-h-screen flex flex-col relative text-text-primary bg-void font-body selection:bg-accent/20">
        <BackgroundAurora />
        <Navbar />
        <main className="flex-1 w-full pt-24 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
