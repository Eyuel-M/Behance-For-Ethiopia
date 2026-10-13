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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hire Ethiopia's Best — Curated Creative Talent",
    template: "%s | Hire Ethiopia's Best",
  },
  description:
    "Ethiopia's first curated creative talent marketplace. We match businesses with vetted designers, branding studios, and digital professionals — matched to your brief within 48 hours.",
  keywords: ["Ethiopian designers", "Ethiopian branding", "creative talent Ethiopia", "hire designer Addis Ababa", "Ethiopian creative agency"],
  authors: [{ name: "Hire Ethiopia's Best", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: SITE_URL,
    siteName: "Hire Ethiopia's Best",
    title: "Hire Ethiopia's Best — Curated Creative Talent",
    description:
      "Ethiopia's first curated creative talent marketplace. Vetted designers matched to your brief within 48 hours.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Hire Ethiopia's Best",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Ethiopia's Best — Curated Creative Talent",
    description: "Ethiopia's first curated creative talent marketplace. Vetted designers matched to your brief within 48 hours.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
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
