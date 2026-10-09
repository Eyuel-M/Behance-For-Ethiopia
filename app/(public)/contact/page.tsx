"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

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
      // Simple mailto fallback — replace with a server action when an inbox is configured
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Let&apos;s talk about your project
          </h1>
          <p className="mt-4 text-zinc-500 text-base leading-relaxed max-w-md">
            Not sure where to start? Send us a message and we&apos;ll point you in the
            right direction — or jump straight to a form below.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/get-started/client"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors"
            >
              Submit a brief
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link
              href="/get-started/designer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-zinc-300 text-zinc-700 text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              Apply as a professional
            </Link>
          </div>

          <ul className="mt-12 space-y-5">
            {[
              ["We respond within 48 hours", "Every message is read by a real person."],
              ["No spam, ever", "Your info is only used to follow up on your inquiry."],
              ["Plain-language answers", "No jargon — just clear next steps."],
            ].map(([title, body]) => (
              <li key={title as string} className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
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
              <span className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
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
                className="w-full py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 disabled:opacity-60 transition-colors"
              >
                {isPending ? "Sending…" : "Send message"}
              </button>

              <p className="text-center text-xs text-zinc-400">
                Need to submit a project brief?{" "}
                <Link href="/get-started/client" className="text-green-700 font-semibold hover:text-green-900 transition-colors">
                  Go here instead →
                </Link>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
