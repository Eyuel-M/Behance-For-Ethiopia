import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const displayFont = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hire Ethiopia's Best — Curated Creative Talent",
  description: "A curated network matching Ethiopian businesses with vetted creative and digital professionals. Branding, web, and visual content — matched to your brief.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${displayFont.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
