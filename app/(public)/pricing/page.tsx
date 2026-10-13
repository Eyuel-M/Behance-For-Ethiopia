import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const CLIENT_INCLUDED = [
  "Submit a brief for free",
  "Human review within 48 hours",
  "Curated shortlist of 2–3 designers",
  "Scope and milestone planning",
  "Project tracking dashboard",
  "Revision requests included",
  "Post-project review system",
];

const DESIGNER_INCLUDED = [
  "Free to apply to the network",
  "Matched to relevant briefs",
  "Keep 100% of your quoted price",
  "Proposal tools and templates",
  "Client communication support",
  "Milestone-based payment releases",
  "Profile in our designer roster",
];

const FAQ = [
  {
    q: "When exactly do I pay?",
    a: "Only after you've reviewed and approved a designer's proposal. Once you confirm the scope and milestones, you fund the project — not before.",
  },
  {
    q: "What if I'm not happy with the work?",
    a: "Payment is held until you approve each milestone. If work doesn't meet the agreed scope, we mediate and withhold payment until it's resolved.",
  },
  {
    q: "Is the 15% platform fee added on top of the designer's quote?",
    a: "Yes. If a designer quotes ETB 10,000, you pay ETB 11,500. The designer keeps their full ETB 10,000 — the 15% is a service fee charged to you, not deducted from them. It covers vetting, matching, milestone management, and dispute resolution.",
  },
  {
    q: "Do designers pay any fees?",
    a: "No. Designers keep 100% of what they quote. There are no deductions, no listing fees, and no monthly charges. The platform fee is paid entirely by the client.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Bank transfer, Telebirr, and CBE Birr. International clients can pay via wire transfer or Stripe. Contact us if you need a different arrangement.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Transparent Pricing</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Simple fees.<br />
              <span style={{ color: "#6dcc46" }}>No surprises.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Businesses post and match for free. Designers keep 100% of what they quote.
              A 15% platform fee is added to the client's payment — only when value is delivered.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Plans ── */}
      <section className="py-20 sm:py-28 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Client card */}
            <FadeUp>
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">For Businesses</span>
                </div>
                <div className="mt-5 mb-6">
                  <p className="text-5xl font-black text-[#0d2318]" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                    ETB 0
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">to submit · to match · to choose</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  You pay nothing to post a brief, get matched, or review proposals.
                  Payment only begins when you approve a scope and are ready to proceed.
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {CLIENT_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <svg className="w-4 h-4 text-[#6dcc46] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started/client"
                  className="w-full text-center py-3 rounded-full text-sm font-bold transition-colors"
                  style={{ backgroundColor: "#0d2318", color: "white" }}
                >
                  Submit a Brief →
                </Link>
              </div>
            </FadeUp>

            {/* Designer card */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl p-8 sm:p-10 h-full flex flex-col" style={{ backgroundColor: "#0d2318" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">For Designers</span>
                </div>
                <div className="mt-5 mb-6">
                  <p className="text-5xl font-black text-white" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                    0%
                  </p>
                  <p className="text-sm text-white/35 mt-1">deducted from your earnings · ever</p>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Free to apply and maintain a profile. Quote your price — you keep all of it.
                  The platform fee is paid by the client, not you. No monthly fees, no listing charges.
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {DESIGNER_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <svg className="w-4 h-4 text-[#6dcc46] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started/designer"
                  className="w-full text-center py-3 rounded-full text-sm font-bold transition-colors"
                  style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
                >
                  Apply to the Network →
                </Link>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── How payment works ── */}
      <section className="py-20 sm:py-28 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeUp className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Payment flow</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0d2318] leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Money moves only when<br />milestones are met.
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Client funds the project", body: "After approving the proposal, the client transfers the full agreed amount. Funds are held — not released to the designer yet." },
              { n: "02", title: "Work completes by milestone", body: "The designer delivers each milestone. The client reviews and approves. Payment for that milestone is released immediately on approval." },
              { n: "03", title: "Final payout on completion", body: "When the last milestone is approved, the remaining balance releases to the designer in full. The 15% platform fee was already included in what the client paid upfront. Done." },
            ].map((step) => (
              <StaggerItem
                key={step.n}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 p-7"
              >
                <span className="text-xs font-black text-zinc-300 mb-4 block" style={{ fontFamily: "var(--font-display), sans-serif" }}>{step.n}</span>
                <h3 className="font-extrabold text-zinc-900 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.body}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FadeUp className="mb-10">
            <h2
              className="text-3xl font-black text-[#0d2318] leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Pricing questions.
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              More questions? <Link href="/faq" className="text-[#0d2318] font-semibold hover:text-[#6dcc46] transition-colors">See the full FAQ →</Link>
            </p>
          </FadeUp>

          <div className="space-y-4">
            {FAQ.map((item) => (
              <FadeUp key={item.q}>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <h3 className="font-bold text-zinc-900 text-sm mb-2">{item.q}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
