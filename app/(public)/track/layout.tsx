import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Project",
  description: "Enter your project tracking code to see the current status, milestone progress, and messages from your team.",
  alternates: { canonical: "/track" },
  robots: { index: false, follow: false },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
