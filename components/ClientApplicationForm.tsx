"use client";

import { useState, useTransition } from "react";
import {
  submitClientApplication,
  type ClientApplicationData,
} from "@/app/actions/submit-client-application";

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Technology & Software",
  "Finance & Banking",
  "Retail & E-commerce",
  "Healthcare & Wellness",
  "Education & Training",
  "NGO / Non-profit",
  "Government & Public Sector",
  "Hospitality & Tourism",
  "Real Estate & Construction",
  "Food & Beverage",
  "Media & Entertainment",
  "Agriculture",
  "Manufacturing",
  "Other",
];

const COMPANY_SIZES = [
  "Solo / Freelancer",
  "2–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const DESIGN_TYPES = [
  "Brand Identity & Logo",
  "UI/UX Design",
  "Web Design",
  "Print & Marketing Materials",
  "Motion Graphics & Video",
  "Photography",
  "Social Media Content",
  "Packaging Design",
  "Illustration",
  "Presentation Design",
];

const TIMELINES = [
  "ASAP (under 2 weeks)",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months / Ongoing",
  "Not sure yet",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Let's discuss",
];

const DESIGNERS_NEEDED = [
  "Just 1 designer",
  "2–3 designers",
  "A team of 4+",
  "Not sure yet",
];

const ENGAGEMENT_TYPES = [
  "One-time project",
  "Ongoing monthly retainer",
  "Full-time hire (via platform)",
  "Part-time / as-needed",
  "Not sure yet",
];

const WORK_STYLES = [
  "Fully remote",
  "On-site in Addis Ababa",
  "Flexible / hybrid",
];

const COMMS_OPTIONS = [
  "Email",
  "WhatsApp",
  "Phone call",
  "Zoom / video call",
  "In-person meeting",
];

const HEARD_FROM = [
  "Google search",
  "Social media (Instagram, LinkedIn, etc.)",
  "Referral from a colleague",
  "Ethiopian business community",
  "News article or blog",
  "Other",
];

const DESIGNER_EXPERIENCE = [
  "Yes, many times",
  "Yes, once or twice",
  "No, this is our first time",
  "We have an in-house design team",
];

// ─── Initial state ─────────────────────────────────────────────────────────────

const EMPTY: ClientApplicationData = {
  businessName: "", contactName: "", email: "", phone: "",
  website: "", industry: "", companySize: "",
  designTypes: "", projectDescription: "", timeline: "", budget: "",
  designersNeeded: "", engagementType: "", workStyle: "",
  preferredComms: "", workedWithDesigner: "", hearAboutUs: "", additionalNotes: "",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ClientApplicationForm() {
  const [form, setForm] = useState<ClientApplicationData>(EMPTY);
  const [selectedDesignTypes, setSelectedDesignTypes] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ClientApplicationData, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function set(field: keyof ClientApplicationData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleDesignType(type: string) {
    setSelectedDesignTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
      if (fieldErrors.designTypes) setFieldErrors((e) => ({ ...e, designTypes: "" }));
      return next;
    });
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof ClientApplicationData, string>> = {};
    if (!form.businessName.trim()) errors.businessName = "Required";
    if (!form.contactName.trim()) errors.contactName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Required";
    if (!form.industry) errors.industry = "Required";
    if (!form.companySize) errors.companySize = "Required";
    if (selectedDesignTypes.length === 0) errors.designTypes = "Select at least one type";
    if (!form.projectDescription.trim() || form.projectDescription.trim().length < 60)
      errors.projectDescription = "Please write at least 60 characters";
    if (!form.timeline) errors.timeline = "Required";
    if (!form.budget) errors.budget = "Required";
    if (!form.engagementType) errors.engagementType = "Required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) {
      const firstError = document.querySelector("[data-field-error]");
      (firstError as HTMLElement)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    startTransition(async () => {
      const result = await submitClientApplication({
        ...form,
        designTypes: selectedDesignTypes.join(", "),
      });
      if (result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(result.error);
      }
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-20">
        <span className="text-green-500"><CheckCircleIcon /></span>
        <h2 className="text-2xl font-extrabold text-zinc-900">Request received!</h2>
        <p className="text-zinc-500 max-w-md text-sm leading-relaxed">
          Thanks for reaching out. Our team will review your project requirements and match you
          with the best designers within 48 hours.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSelectedDesignTypes([]); setSubmitted(false); }}
          className="mt-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">

      {/* ── Section 1: Business Information ──────────────────── */}
      <Section title="Business Information" step={1} total={3}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Business / company name" required error={fieldErrors.businessName}>
            <input type="text" value={form.businessName} onChange={(e) => set("businessName", e.target.value)}
              placeholder="Acme Technologies" autoComplete="organization"
              className={inputClass(!!fieldErrors.businessName)} />
          </Field>
          <Field label="Your name (contact person)" required error={fieldErrors.contactName}>
            <input type="text" value={form.contactName} onChange={(e) => set("contactName", e.target.value)}
              placeholder="Abebe Girma" autoComplete="name"
              className={inputClass(!!fieldErrors.contactName)} />
          </Field>
          <Field label="Work email" required error={fieldErrors.email}>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com" autoComplete="email"
              className={inputClass(!!fieldErrors.email)} />
          </Field>
          <Field label="Phone number" required error={fieldErrors.phone}>
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
              placeholder="+251 91 234 5678" autoComplete="tel"
              className={inputClass(!!fieldErrors.phone)} />
          </Field>
          <Field label="Industry / sector" required error={fieldErrors.industry}>
            <select value={form.industry} onChange={(e) => set("industry", e.target.value)}
              className={inputClass(!!fieldErrors.industry) + " cursor-pointer"}>
              <option value="" disabled>Select your industry…</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </Field>
          <Field label="Company size" required error={fieldErrors.companySize}>
            <select value={form.companySize} onChange={(e) => set("companySize", e.target.value)}
              className={inputClass(!!fieldErrors.companySize) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {COMPANY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Website" error={undefined}
          hint="Optional — your company website or any relevant online presence">
          <input type="url" value={form.website} onChange={(e) => set("website", e.target.value)}
            placeholder="https://yourcompany.com" autoComplete="url"
            className={inputClass(false)} />
        </Field>
      </Section>

      {/* ── Section 2: Project Details ───────────────────────── */}
      <Section title="Project Details" step={2} total={3}>
        <div>
          <p className="text-sm font-medium text-zinc-700 mb-1">
            Type of design needed
            <span className="text-red-500 ml-0.5">*</span>
          </p>
          <p className="text-xs text-zinc-400 mb-3">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {DESIGN_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleDesignType(type)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${
                  selectedDesignTypes.includes(type)
                    ? "bg-zinc-900 border-zinc-900 text-white"
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {fieldErrors.designTypes && (
            <p role="alert" className="text-xs text-red-500 mt-2" data-field-error>
              {fieldErrors.designTypes}
            </p>
          )}
        </div>

        <Field label="Project description" required error={fieldErrors.projectDescription}
          hint="Describe what you need — your goals, audience, brand context, and any specific requirements. More detail = better matches.">
          <textarea value={form.projectDescription} onChange={(e) => set("projectDescription", e.target.value)}
            placeholder="We're a fintech startup in Addis Ababa looking to rebrand our mobile app. We need a complete UI/UX overhaul plus new brand identity that feels modern, trustworthy, and Ethiopian…"
            rows={6} className={inputClass(!!fieldErrors.projectDescription) + " resize-none"} />
          <p className="text-xs text-zinc-400 mt-1 text-right tabular-nums">
            {form.projectDescription.length} chars {form.projectDescription.length < 60 && (
              <span className="text-orange-500">({60 - form.projectDescription.length} more needed)</span>
            )}
          </p>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Project timeline" required error={fieldErrors.timeline}>
            <select value={form.timeline} onChange={(e) => set("timeline", e.target.value)}
              className={inputClass(!!fieldErrors.timeline) + " cursor-pointer"}>
              <option value="" disabled>When do you need this done?</option>
              {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Budget range" required error={fieldErrors.budget}>
            <select value={form.budget} onChange={(e) => set("budget", e.target.value)}
              className={inputClass(!!fieldErrors.budget) + " cursor-pointer"}>
              <option value="" disabled>Select your budget…</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Number of designers needed" error={fieldErrors.designersNeeded}>
            <select value={form.designersNeeded} onChange={(e) => set("designersNeeded", e.target.value)}
              className={inputClass(!!fieldErrors.designersNeeded) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {DESIGNERS_NEEDED.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Engagement type" required error={fieldErrors.engagementType}>
            <select value={form.engagementType} onChange={(e) => set("engagementType", e.target.value)}
              className={inputClass(!!fieldErrors.engagementType) + " cursor-pointer"}>
              <option value="" disabled>How do you want to work?</option>
              {ENGAGEMENT_TYPES.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      {/* ── Section 3: Preferences ───────────────────────────── */}
      <Section title="Preferences & Final Details" step={3} total={3}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Preferred work style" error={fieldErrors.workStyle}>
            <select value={form.workStyle} onChange={(e) => set("workStyle", e.target.value)}
              className={inputClass(!!fieldErrors.workStyle) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {WORK_STYLES.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Preferred communication" error={fieldErrors.preferredComms}>
            <select value={form.preferredComms} onChange={(e) => set("preferredComms", e.target.value)}
              className={inputClass(!!fieldErrors.preferredComms) + " cursor-pointer"}>
              <option value="" disabled>How should we reach you?</option>
              {COMMS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Have you worked with a designer before?" error={fieldErrors.workedWithDesigner}>
            <select value={form.workedWithDesigner} onChange={(e) => set("workedWithDesigner", e.target.value)}
              className={inputClass(!!fieldErrors.workedWithDesigner) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {DESIGNER_EXPERIENCE.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="How did you hear about us?" error={fieldErrors.hearAboutUs}>
            <select value={form.hearAboutUs} onChange={(e) => set("hearAboutUs", e.target.value)}
              className={inputClass(!!fieldErrors.hearAboutUs) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {HEARD_FROM.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Anything else you'd like us to know?" error={undefined}
          hint="Reference projects, specific designer profiles you liked, cultural considerations, languages needed, etc.">
          <textarea value={form.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)}
            placeholder="We've been inspired by the work of [designer name] on your platform. We also need the designer to be comfortable working in both Amharic and English contexts…"
            rows={4} className={inputClass(false) + " resize-none"} />
        </Field>
      </Section>

      {submitError && (
        <p role="alert" className="text-sm text-red-600 text-center">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
      >
        {isPending && <SpinnerIcon />}
        {isPending ? "Submitting…" : "Submit Project Request"}
      </button>
      <p className="text-xs text-center text-zinc-400">
        We&apos;ll match you with the right designers and respond within 48 hours.
      </p>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, step, total, children }: {
  title: string;
  step: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">
          {step}
        </span>
        <div>
          <legend className="font-bold text-zinc-900 text-base">{title}</legend>
          <p className="text-xs text-zinc-400">Step {step} of {total}</p>
        </div>
      </div>
      {children}
    </fieldset>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-zinc-900",
    "placeholder-zinc-400 outline-none transition-all duration-150",
    "focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
      : "border-zinc-200",
  ].join(" ");
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5" data-field-error={error ? true : undefined}>
      <label className="text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="text-xs text-zinc-400 -mt-1">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}
