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

function CheckSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_MODES = [
  {
    value: "Direct Match",
    title: "Direct Match",
    description: "We find and vet the right professional. You manage the day-to-day relationship.",
    detail: "Best when you know what you want and have bandwidth to manage a creative.",
  },
  {
    value: "Managed Project",
    title: "Managed Project",
    description: "We scope, assign, coordinate milestones, check quality, and manage handover.",
    detail: "Best when you need work done but lack time to manage a project.",
  },
  {
    value: "Not sure yet",
    title: "Not sure yet",
    description: "Submit your brief and we'll recommend the right mode after reviewing it.",
    detail: "Our team will reach out before anything moves forward.",
  },
];

const CATEGORIES = [
  {
    value: "Branding & Graphic Design",
    label: "Branding & Graphic Design",
    examples: "Identity, logo, packaging, marketing materials, presentations",
  },
  {
    value: "Web & Digital",
    label: "Web & Digital",
    examples: "WordPress, landing pages, UI/UX, web app interfaces",
  },
  {
    value: "Visual Content",
    label: "Visual Content",
    examples: "3D visualisation, motion graphics, video editing, product rendering",
  },
  {
    value: "Multiple / combination",
    label: "Multiple / combination",
    examples: "Spans more than one category above",
  },
  {
    value: "Something else",
    label: "Something else",
    examples: "Describe it in your project brief below",
  },
];

const DESIGN_TYPES: Record<string, string[]> = {
  "Branding & Graphic Design": [
    "Brand identity & logo", "Packaging design", "Marketing materials",
    "Presentation design", "Print design", "Social media assets",
  ],
  "Web & Digital": [
    "UI/UX design", "WordPress site", "Landing page",
    "Web app interface", "E-commerce design", "Design system",
  ],
  "Visual Content": [
    "3D visualisation", "Product rendering", "Motion graphics",
    "Explainer video", "Video editing", "Animation",
  ],
  "Multiple / combination": [
    "Brand identity & logo", "UI/UX design", "Marketing materials",
    "3D visualisation", "Motion graphics", "Web design",
    "Packaging design", "Social media assets",
  ],
  "Something else": [],
};

const TIMELINES = [
  "ASAP — under 2 weeks",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible / not time-critical",
  "Not sure yet",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure — let's discuss",
];

const ENGAGEMENT_TYPES = [
  "One-time project",
  "Ongoing retainer",
  "Part-time / as-needed",
  "Not sure yet",
];

const DESIGNER_EXPERIENCE = [
  "Yes, many times",
  "Yes, once or twice",
  "No — this is our first time",
  "We have an in-house team",
];

const HEARD_FROM = [
  "Google search",
  "Referral from a colleague",
  "Social media",
  "Ethiopian business community",
  "News or blog",
  "Other",
];

// ─── Initial state ─────────────────────────────────────────────────────────────

const EMPTY: ClientApplicationData = {
  serviceMode: "",
  category: "",
  designTypes: "",
  projectDescription: "",
  timeline: "",
  budget: "",
  references: "",
  contactName: "",
  businessName: "",
  email: "",
  phone: "",
  engagementType: "",
  workedWithDesigner: "",
  hearAboutUs: "",
  additionalNotes: "",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ClientApplicationForm() {
  const [form, setForm] = useState<ClientApplicationData>(EMPTY);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ClientApplicationData, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function set(field: keyof ClientApplicationData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function setCategory(cat: string) {
    set("category", cat);
    setSelectedTypes([]);
    if (fieldErrors.designTypes) setFieldErrors((e) => ({ ...e, designTypes: "" }));
  }

  function toggleType(type: string) {
    setSelectedTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
      if (fieldErrors.designTypes) setFieldErrors((e) => ({ ...e, designTypes: "" }));
      return next;
    });
  }

  const availableTypes = form.category ? (DESIGN_TYPES[form.category] ?? []) : [];

  function validate(): boolean {
    const errors: Partial<Record<keyof ClientApplicationData, string>> = {};
    if (!form.serviceMode) errors.serviceMode = "Please choose a service mode";
    if (!form.category) errors.category = "Please select a category";
    if (availableTypes.length > 0 && selectedTypes.length === 0)
      errors.designTypes = "Select at least one type of work";
    if (!form.projectDescription.trim() || form.projectDescription.trim().length < 60)
      errors.projectDescription = "Please write at least 60 characters";
    if (!form.timeline) errors.timeline = "Required";
    if (!form.budget) errors.budget = "Required";
    if (!form.contactName.trim()) errors.contactName = "Required";
    if (!form.businessName.trim()) errors.businessName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Required";
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
        designTypes: selectedTypes.length > 0 ? selectedTypes.join(", ") : form.category,
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
        <h2 className="text-2xl font-extrabold text-zinc-900">Brief received.</h2>
        <p className="text-zinc-500 max-w-md text-sm leading-relaxed">
          Our team will review your project brief and follow up within 48 hours — either to
          confirm it&apos;s a good fit or to ask a clarifying question.
        </p>
        <p className="text-xs text-zinc-400">
          You won&apos;t be charged anything at this stage.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSelectedTypes([]); setSubmitted(false); }}
          className="mt-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">

      {/* ── Section 1: Service mode ───────────────────────────── */}
      <Section title="How would you like to work?" step={1} total={3}
        description="Choose how much coordination you want from us. You can change your mind after we review the brief.">
        <div className="grid grid-cols-1 gap-3" data-field-error={fieldErrors.serviceMode ? true : undefined}>
          {SERVICE_MODES.map((mode) => {
            const active = form.serviceMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => set("serviceMode", mode.value)}
                className={`text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
                  active
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    active ? "border-white bg-white text-zinc-900" : "border-zinc-300"
                  }`}>
                    {active && <CheckSmIcon />}
                  </span>
                  <div>
                    <p className={`text-sm font-bold leading-snug ${active ? "text-white" : "text-zinc-900"}`}>
                      {mode.title}
                    </p>
                    <p className={`text-xs mt-0.5 leading-relaxed ${active ? "text-zinc-300" : "text-zinc-500"}`}>
                      {mode.description}
                    </p>
                    <p className={`text-xs mt-1 ${active ? "text-zinc-400" : "text-zinc-400"}`}>
                      {mode.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {fieldErrors.serviceMode && (
          <p role="alert" className="text-xs text-red-500 mt-1">{fieldErrors.serviceMode}</p>
        )}
      </Section>

      {/* ── Section 2: Project details ────────────────────────── */}
      <Section title="Tell us about your project" step={2} total={3}
        description="The more detail you give, the better we can match. Vague briefs take longer to qualify.">

        {/* Category */}
        <Field label="Project category" required error={fieldErrors.category}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const active = form.category === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`text-left rounded-xl border p-3.5 transition-all duration-150 cursor-pointer ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white hover:border-zinc-400"
                  }`}
                >
                  <p className={`text-sm font-semibold leading-snug ${active ? "text-white" : "text-zinc-900"}`}>
                    {cat.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${active ? "text-zinc-400" : "text-zinc-400"}`}>
                    {cat.examples}
                  </p>
                </button>
              );
            })}
          </div>
        </Field>

        {/* Specific types */}
        {availableTypes.length > 0 && (
          <div>
            <p className="text-sm font-medium text-zinc-700 mb-2">
              Specific type of work
              <span className="text-red-500 ml-0.5">*</span>
            </p>
            <p className="text-xs text-zinc-400 mb-3">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${
                    selectedTypes.includes(type)
                      ? "bg-green-500 border-green-500 text-black"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {fieldErrors.designTypes && (
              <p role="alert" className="text-xs text-red-500 mt-2" data-field-error>{fieldErrors.designTypes}</p>
            )}
          </div>
        )}

        {/* Description */}
        <Field
          label="Project description"
          required
          error={fieldErrors.projectDescription}
          hint="Describe your goal, what you need delivered, your audience, and any context that helps us match the right professional."
        >
          <textarea
            value={form.projectDescription}
            onChange={(e) => set("projectDescription", e.target.value)}
            placeholder="We're a fintech startup in Addis Ababa looking to rebrand our mobile app. We need a complete visual identity overhaul — new logo, colour system, typography, and a brand guidelines document…"
            rows={6}
            className={textareaClass(!!fieldErrors.projectDescription)}
          />
          <p className="text-xs text-zinc-400 mt-1 text-right tabular-nums">
            {form.projectDescription.length} chars
            {form.projectDescription.length < 60 && (
              <span className="text-orange-500"> ({60 - form.projectDescription.length} more needed)</span>
            )}
          </p>
        </Field>

        {/* Timeline + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Project timeline" required error={fieldErrors.timeline}>
            <select
              value={form.timeline}
              onChange={(e) => set("timeline", e.target.value)}
              className={inputClass(!!fieldErrors.timeline) + " cursor-pointer"}
            >
              <option value="" disabled>When do you need this?</option>
              {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Budget range" required error={fieldErrors.budget}>
            <select
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              className={inputClass(!!fieldErrors.budget) + " cursor-pointer"}
            >
              <option value="" disabled>Select your budget…</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>

        {/* References */}
        <Field
          label="Reference links or inspiration"
          hint="Optional — portfolio work you admire, competitors, any existing brand assets, or a Figma/Google Drive link."
          error={undefined}
        >
          <input
            type="text"
            value={form.references}
            onChange={(e) => set("references", e.target.value)}
            placeholder="https://dribbble.com/… or drive.google.com/…"
            className={inputClass(false)}
          />
        </Field>
      </Section>

      {/* ── Section 3: Your contact info ─────────────────────── */}
      <Section title="Your contact details" step={3} total={3}
        description="We use these to follow up about your brief. No spam, no auto-matching — a real person will reach out.">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Your name" required error={fieldErrors.contactName}>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => set("contactName", e.target.value)}
              placeholder="Abebe Girma"
              autoComplete="name"
              className={inputClass(!!fieldErrors.contactName)}
            />
          </Field>
          <Field label="Business or organisation" required error={fieldErrors.businessName}>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => set("businessName", e.target.value)}
              placeholder="Acme Technologies"
              autoComplete="organization"
              className={inputClass(!!fieldErrors.businessName)}
            />
          </Field>
          <Field label="Email address" required error={fieldErrors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className={inputClass(!!fieldErrors.email)}
            />
          </Field>
          <Field label="Phone number" required error={fieldErrors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+251 91 234 5678"
              autoComplete="tel"
              className={inputClass(!!fieldErrors.phone)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Type of engagement" error={fieldErrors.engagementType}>
            <select
              value={form.engagementType}
              onChange={(e) => set("engagementType", e.target.value)}
              className={inputClass(!!fieldErrors.engagementType) + " cursor-pointer"}
            >
              <option value="" disabled>Select…</option>
              {ENGAGEMENT_TYPES.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </Field>
          <Field label="Have you worked with a designer before?" error={fieldErrors.workedWithDesigner}>
            <select
              value={form.workedWithDesigner}
              onChange={(e) => set("workedWithDesigner", e.target.value)}
              className={inputClass(!!fieldErrors.workedWithDesigner) + " cursor-pointer"}
            >
              <option value="" disabled>Select…</option>
              {DESIGNER_EXPERIENCE.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        </div>

        <Field label="How did you hear about us?" error={undefined}>
          <select
            value={form.hearAboutUs}
            onChange={(e) => set("hearAboutUs", e.target.value)}
            className={inputClass(false) + " cursor-pointer"}
          >
            <option value="" disabled>Select…</option>
            {HEARD_FROM.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </Field>

        <Field
          label="Anything else we should know?"
          hint="Optional — specific requirements, languages, cultural context, or anything that helps us match well."
          error={undefined}
        >
          <textarea
            value={form.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)}
            placeholder="The designer should be comfortable working with both Amharic and English. We have an existing brand guide to follow…"
            rows={3}
            className={textareaClass(false)}
          />
        </Field>
      </Section>

      {submitError && (
        <p role="alert" className="text-sm text-red-600 text-center">{submitError}</p>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
        >
          {isPending && <SpinnerIcon />}
          {isPending ? "Submitting…" : "Submit Brief"}
        </button>
        <p className="text-xs text-center text-zinc-400 leading-relaxed">
          Our team reviews every brief before anything moves forward. You won&apos;t be
          charged or matched without your explicit agreement.
        </p>
      </div>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, step, total, description, children }: {
  title: string;
  step: number;
  total: number;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <div className="pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3 mb-1">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">
            {step}
          </span>
          <legend className="font-bold text-zinc-900 text-base">{title}</legend>
        </div>
        {description && (
          <p className="text-xs text-zinc-400 ml-10 leading-relaxed">{description}</p>
        )}
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

function textareaClass(hasError: boolean) {
  return inputClass(hasError) + " resize-none";
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
      {hint && <p className="text-xs text-zinc-400 -mt-1 leading-relaxed">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}
