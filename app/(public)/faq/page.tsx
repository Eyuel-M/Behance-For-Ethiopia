"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeUp } from "@/components/Motion";

type Section = {
  heading: string;
  items: { q: string; a: string }[];
};

const SECTIONS: Section[] = [
  {
    heading: "For Businesses",
    items: [
      {
        q: "How much does it cost to submit a brief?",
        a: "Nothing. Submitting a brief, getting reviewed, and receiving a matched proposal are all free. You only pay once you've approved a proposal and are ready to start.",
      },
      {
        q: "How long does matching take?",
        a: "A real person reviews every brief within 48 hours. If your brief is qualified, we present a shortlist of 2–3 designers within 3–5 business days.",
      },
      {
        q: "Can I request a specific designer I've seen in the portfolio?",
        a: "Yes. When submitting your brief, mention in the notes section that you have a preference. We'll do our best to match you, subject to availability.",
      },
      {
        q: "What if I'm not happy with the final work?",
        a: "Payment is milestone-based and held until you approve each stage. If delivered work doesn't meet the agreed scope, we mediate and withhold payment until the issue is resolved.",
      },
      {
        q: "What file formats will I receive?",
        a: "Standard deliverables include source files (AI, Figma, PSD depending on the service) plus print-ready and web-ready exports. Specific formats are agreed during scoping.",
      },
      {
        q: "Can briefs be in Amharic?",
        a: "Yes. Briefs in Amharic are fully supported. Your matched designer will also be fluent in Amharic where relevant to the project.",
      },
      {
        q: "How many revisions are included?",
        a: "Revision rounds are agreed during the scoping phase and written into the milestone plan. Typically 2 rounds per milestone, with additional rounds available at an agreed rate.",
      },
    ],
  },
  {
    heading: "For Designers",
    items: [
      {
        q: "Is it free to apply?",
        a: "Yes, applying is free. If you're accepted into the network, maintaining your profile and receiving brief matches is also free. There are no fees deducted from your earnings — ever. The platform fee is charged to the client, not you.",
      },
      {
        q: "What does the vetting process involve?",
        a: "We review your portfolio for quality and range, your work history for reliability, and conduct a short onboarding call. We reject more than 70% of applicants — not to be exclusive, but because quality matters.",
      },
      {
        q: "How do I get matched to briefs?",
        a: "When a client brief comes in that matches your specialty, availability, and budget range, we reach out to you with the brief details. You choose whether to submit a proposal.",
      },
      {
        q: "When do I get paid?",
        a: "Payments release on milestone approval. As soon as a client approves your milestone delivery, the full payment for that milestone is released to your account. Nothing is deducted — you keep 100% of your quoted price.",
      },
      {
        q: "What if a client goes quiet or refuses to pay?",
        a: "Funds are held in advance before work begins. Clients cannot withhold payment for work that meets the agreed scope. We mediate all disputes and have never left a designer unpaid for completed work.",
      },
    ],
  },
  {
    heading: "Payments & Logistics",
    items: [
      {
        q: "What payment methods do you support?",
        a: "Bank transfer, Telebirr, and CBE Birr for local clients. International clients can pay via wire transfer or Stripe. Contact us if you need a different arrangement.",
      },
      {
        q: "Is the platform fee added on top of the project price?",
        a: "Yes. We add a 15% platform fee on top of the designer's quoted price. If a designer quotes ETB 10,000, the client pays ETB 11,500. The designer receives their full ETB 10,000 — nothing is deducted from them.",
      },
      {
        q: "What if a project is cancelled mid-way?",
        a: "Any completed and approved milestones are paid out in full. Uncommenced milestones are refunded to the client. A cancellation policy is included in every project agreement.",
      },
      {
        q: "Do you provide contracts or invoices?",
        a: "Yes. Every project starts with a formal scope agreement. Invoices are issued per milestone. We can also issue a consolidated invoice for the full project if required.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-zinc-900 text-sm leading-snug group-hover:text-[#0d2318] transition-colors">
          {q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border-2 border-zinc-200 flex items-center justify-center transition-all duration-200"
          style={open ? { backgroundColor: "#0d2318", borderColor: "#0d2318" } : {}}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#6dcc46" : "#999"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-zinc-500 leading-relaxed pb-5 pr-10">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">FAQ</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Questions we<br />
              <span style={{ color: "#6dcc46" }}>hear a lot.</span>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Answers for businesses, designers, and anyone trying to figure out how this works before committing.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24 space-y-14">
        {SECTIONS.map((section) => (
          <FadeUp key={section.heading}>
            <h2
              className="text-xl font-black text-[#0d2318] mb-1"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {section.heading}
            </h2>
            <div className="rounded-2xl border border-zinc-100 bg-white px-6 divide-y-0">
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── Still have questions ── */}
      <div className="border-t border-zinc-100 py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <FadeUp>
            <p className="text-zinc-500 text-sm mb-4">Still have a question not covered here?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
              style={{ backgroundColor: "#0d2318", color: "white" }}
            >
              Contact Us →
            </Link>
          </FadeUp>
        </div>
      </div>

    </div>
  );
}
