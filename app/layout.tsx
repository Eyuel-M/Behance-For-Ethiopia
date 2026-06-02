import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire Ethiopia's Best Designers",
  description: "Connect your business with vetted Ethiopian designers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Hire Ethiopia&apos;s Best Designers
        </footer>
      </body>
    </html>
  );
}
