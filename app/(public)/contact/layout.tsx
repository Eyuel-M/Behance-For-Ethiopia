import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send us a message or get started. Submit a project brief, apply to join our designer network, or just say hello — a real person replies within 48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
