"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { sendContactMessage } from "./actions";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const CLIENT_PERKS = [
  "Submit your brief in under 5 minutes",
  "Our team qualifies every brief — no auto-matching",
  "Choose Direct Match or Managed Project delivery",
  "Curated shortlist, not a feed of hundreds",
  "We respond within 48 hours",
];

const PRO_PERKS = [
  "Free to apply — no joining fees",
  "Matched to vetted Ethiopian businesses",
  "You set your own rates and availability",
  "Portfolio and identity reviewed — quality protected",
  "Managed Project option means less client management",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      await sendContactMessage(fd);
      setSent(true);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Path chooser ──────────────────────────────────── */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46] mb-3">
            Get started
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            How would you like to work with us?
          </h1>
          <p className="mt-4 text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
            Tell us what you need and we&apos;ll match you with the right professional — or
            if you are one, apply to join the network.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">

          {/* Business card */}
          <Link
            href="/get-started/client"
            className="group flex flex-col rounded-3xl border-2 border-zinc-200 bg-[#0d2318] hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#6dcc46] flex items-center justify-center font-extrabold text-lg mb-6 group-hover:scale-105 transition-transform duration-200" style={{ color: "#0d2318" }}>
                B
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">I need work done</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Submit your project brief. We&apos;ll qualify it, match you with vetted
                professionals, and support delivery your way.
              </p>
              <ul className="space-y-2.5">
                {CLIENT_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#6dcc46]/20 flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polyline points="2 6 5 9 10 3" stroke="#6dcc46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Submit a brief</span>
              <span className="text-white/40 group-hover:translate-x-1 transition-transform duration-150">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

          {/* Professional card */}
          <Link
            href="/get-started/designer"
            className="group flex flex-col rounded-3xl border-2 bg-[#6dcc46] border-[#6dcc46] hover:brightness-105 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#0d2318] flex items-center justify-center text-white font-extrabold text-lg mb-6 group-hover:scale-105 transition-transform duration-200">
                P
              </div>
              <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#0d2318" }}>I&apos;m a professional</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(13,35,24,0.6)" }}>
                Apply to join our curated network. We review every application — strong
                portfolios, reliable professionals only.
              </p>
              <ul className="space-y-2.5">
                {PRO_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(13,35,24,0.75)" }}>
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(13,35,24,0.15)" }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polyline points="2 6 5 9 10 3" stroke="#0d2318" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 py-5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(13,35,24,0.15)" }}>
              <span className="text-sm font-bold" style={{ color: "#0d2318" }}>Apply to the network</span>
              <span className="group-hover:translate-x-1 transition-transform duration-150" style={{ color: "rgba(13,35,24,0.5)" }}>
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

        </div>

        {/* ── Contact form ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46] mb-4">
              Or send us a message
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Not sure? Let&apos;s talk.
            </h2>
            <p className="mt-4 text-zinc-500 text-base leading-relaxed max-w-md">
              Send us a message and a real person will reply within 48 hours with clear next steps.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                ["We respond within 48 hours", "Every message is read by a real person."],
                ["No spam, ever", "Your info is only used to follow up on your inquiry."],
                ["Plain-language answers", "No jargon — just clear next steps."],
              ].map(([title, body]) => (
                <li key={title as string} className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-[#6dcc46]/15 flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{title}</p>
                    <p className="text-sm text-zinc-400">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            {sent ? (
              <div className="flex flex-col items-center text-center py-10">
                <span className="w-14 h-14 rounded-full bg-[#6dcc46]/15 flex items-center justify-center mb-5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <h2 className="text-xl font-extrabold text-zinc-900 mb-2">Message received</h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                  We&apos;ll follow up within 48 hours. In the meantime, feel free to browse
                  how we work.
                </p>
                <Link
                  href="/#how-it-works"
                  className="mt-6 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
                >
                  See how it works →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-zinc-900 mb-1">Send us a message</h2>
                  <p className="text-xs text-zinc-400">We&apos;ll get back to you within 48 hours.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Abebe Girma"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="abebe@company.com"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you're working on, or ask us anything..."
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-full bg-[#0d2318] text-white text-sm font-semibold hover:bg-zinc-700 disabled:opacity-60 transition-colors"
                >
                  {isPending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
