import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hire Ethiopia's Best Designers",
  description: "Connect your business with vetted Ethiopian designers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
