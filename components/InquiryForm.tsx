"use client";

import { useState, useTransition } from "react";
import { submitInquiry, type InquiryFormData } from "@/app/actions/submit-inquiry";

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ─── Budget options ───────────────────────────────────────────────────────────

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

// ─── Component ────────────────────────────────────────────────────────────────

const EMPTY: InquiryFormData = {
  businessName: "",
  email: "",
  phone: "",
  budget: "",
  description: "",
};

export default function InquiryForm() {
  const [form, setForm] = useState<InquiryFormData>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<InquiryFormData>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function set(field: keyof InquiryFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const errors: Partial<InquiryFormData> = {};
    if (!form.businessName.trim()) errors.businessName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.budget) errors.budget = "Required";
    if (!form.description.trim()) errors.description = "Required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    startTransition(async () => {
      const result = await submitInquiry(form);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error);
      }
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-14">
        <span className="text-emerald-500">
          <CheckCircleIcon />
        </span>
        <h2 className="text-xl font-bold text-zinc-900">Inquiry received!</h2>
        <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
          Thanks for reaching out. We&apos;ll review your project and get back
          to you within 48 hours.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSubmitted(false); }}
          className="mt-2 text-sm font-medium text-green-700 hover:text-green-900 transition-colors cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Business name */}
      <Field label="Business name" required error={fieldErrors.businessName}>
        <input
          type="text"
          value={form.businessName}
          onChange={(e) => set("businessName", e.target.value)}
          placeholder="Acme Ltd."
          autoComplete="organization"
          className={inputClass(!!fieldErrors.businessName)}
        />
      </Field>

      {/* Email + Phone (side by side on sm+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Email" required error={fieldErrors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className={inputClass(!!fieldErrors.email)}
          />
        </Field>
        <Field label="Phone" error={fieldErrors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+251 91 234 5678"
            autoComplete="tel"
            className={inputClass(false)}
          />
        </Field>
      </div>

      {/* Budget */}
      <Field label="Budget range" required error={fieldErrors.budget}>
        <select
          value={form.budget}
          onChange={(e) => set("budget", e.target.value)}
          className={inputClass(!!fieldErrors.budget) + " cursor-pointer"}
        >
          <option value="" disabled>Select a budget…</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </Field>

      {/* Project description */}
      <Field label="Project description" required error={fieldErrors.description}>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Briefly describe your project, goals, and timeline…"
          rows={5}
          className={inputClass(!!fieldErrors.description) + " resize-none"}
        />
      </Field>

      {/* Submit error */}
      {submitError && (
        <p role="alert" className="text-sm text-red-600">
          {submitError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green-500 text-black text-sm font-semibold hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
      >
        {isPending && <SpinnerIcon />}
        {isPending ? "Sending…" : "Send Inquiry"}
      </button>

      <p className="text-xs text-center text-zinc-400">
        We typically respond within 48 hours. No spam, ever.
      </p>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-zinc-900",
    "placeholder-zinc-400 outline-none transition-all duration-150",
    "focus:ring-2 focus:ring-green-500/20 focus:border-green-500",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
      : "border-zinc-200",
  ].join(" ");
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
