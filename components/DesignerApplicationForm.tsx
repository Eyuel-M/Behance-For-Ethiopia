"use client";

import { useState, useTransition } from "react";
import {
  submitDesignerApplication,
  type DesignerApplicationData,
} from "@/app/actions/submit-designer-application";

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

const SPECIALTIES = [
  "Brand Identity & Logo Design",
  "UI/UX Design",
  "Web Design",
  "Motion Graphics & Animation",
  "Print & Marketing Materials",
  "Photography",
  "Illustration",
  "Packaging Design",
  "Social Media Design",
  "Video Production & Editing",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

const TOOLS = [
  "Figma", "Adobe XD", "Sketch",
  "Photoshop", "Illustrator", "InDesign",
  "After Effects", "Premiere Pro", "Cinema 4D",
  "Blender", "Canva", "Procreate",
];

const CITIES = [
  "Addis Ababa", "Dire Dawa", "Mekelle", "Hawassa",
  "Bahir Dar", "Adama", "Jimma", "Gondar", "Remote / Other",
];

const AVAILABILITY_OPTIONS = [
  "Full-time (40 hrs/week)",
  "Part-time (20 hrs/week)",
  "Project-based / Freelance",
  "Open to anything",
];

const RATE_OPTIONS = [
  "Under $10/hr",
  "$10–$20/hr",
  "$20–$40/hr",
  "$40–$60/hr",
  "$60–$100/hr",
  "$100+/hr",
];

const ONSITE_OPTIONS = [
  "Yes, I can work on-site",
  "Remote only",
  "Flexible / Depends on project",
];

const WORKED_WITH_ETH = [
  "Yes, multiple times",
  "Yes, once or twice",
  "No, but I'm eager to",
  "Currently working with one",
];

// ─── Initial state ─────────────────────────────────────────────────────────────

const EMPTY: DesignerApplicationData = {
  fullName: "", email: "", phone: "", city: "",
  specialty: "", experience: "", skills: "", tools: "", portfolioUrl: "",
  availability: "", hourlyRate: "", canWorkOnSite: "",
  bio: "", whyJoin: "", workedWithEthiopianBiz: "", socialUrl: "",
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function DesignerApplicationForm() {
  const [form, setForm] = useState<DesignerApplicationData>(EMPTY);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof DesignerApplicationData, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function set(field: keyof DesignerApplicationData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleTool(tool: string) {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof DesignerApplicationData, string>> = {};
    if (!form.fullName.trim()) errors.fullName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Required";
    if (!form.city) errors.city = "Required";
    if (!form.specialty) errors.specialty = "Required";
    if (!form.experience) errors.experience = "Required";
    if (!form.skills.trim()) errors.skills = "Required";
    if (!form.portfolioUrl.trim()) errors.portfolioUrl = "Required";
    if (!form.availability) errors.availability = "Required";
    if (!form.hourlyRate) errors.hourlyRate = "Required";
    if (!form.canWorkOnSite) errors.canWorkOnSite = "Required";
    if (!form.bio.trim() || form.bio.trim().length < 80)
      errors.bio = "Please write at least 80 characters";
    if (!form.whyJoin.trim()) errors.whyJoin = "Required";
    if (!form.workedWithEthiopianBiz) errors.workedWithEthiopianBiz = "Required";
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
      const result = await submitDesignerApplication({
        ...form,
        tools: selectedTools.join(", "),
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
        <h2 className="text-2xl font-extrabold text-zinc-900">Application received!</h2>
        <p className="text-zinc-500 max-w-md text-sm leading-relaxed">
          Thanks for applying to join our network. Our team reviews every application carefully and
          we&apos;ll get back to you within 3–5 business days.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSelectedTools([]); setSubmitted(false); }}
          className="mt-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">

      {/* ── Section 1: Personal Information ─────────────────── */}
      <Section title="Personal Information" step={1} total={4}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full name" required error={fieldErrors.fullName}>
            <input type="text" value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
              placeholder="Tigist Bekele" autoComplete="name" className={inputClass(!!fieldErrors.fullName)} />
          </Field>
          <Field label="Email address" required error={fieldErrors.email}>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com" autoComplete="email" className={inputClass(!!fieldErrors.email)} />
          </Field>
          <Field label="Phone number" required error={fieldErrors.phone}>
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
              placeholder="+251 91 234 5678" autoComplete="tel" className={inputClass(!!fieldErrors.phone)} />
          </Field>
          <Field label="City / Location" required error={fieldErrors.city}>
            <select value={form.city} onChange={(e) => set("city", e.target.value)}
              className={inputClass(!!fieldErrors.city) + " cursor-pointer"}>
              <option value="" disabled>Select your city…</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <Field label="LinkedIn / Personal website" error={undefined}>
          <input type="url" value={form.socialUrl} onChange={(e) => set("socialUrl", e.target.value)}
            placeholder="https://linkedin.com/in/yourname" autoComplete="url"
            className={inputClass(false)} />
        </Field>
      </Section>

      {/* ── Section 2: Design Expertise ─────────────────────── */}
      <Section title="Design Expertise" step={2} total={4}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Primary design specialty" required error={fieldErrors.specialty}>
            <select value={form.specialty} onChange={(e) => set("specialty", e.target.value)}
              className={inputClass(!!fieldErrors.specialty) + " cursor-pointer"}>
              <option value="" disabled>Choose your main specialty…</option>
              {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Years of experience" required error={fieldErrors.experience}>
            <select value={form.experience} onChange={(e) => set("experience", e.target.value)}
              className={inputClass(!!fieldErrors.experience) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Key skills" required error={fieldErrors.skills}
          hint="Describe your top skills — e.g. logo design, Figma prototyping, brand strategy, typography">
          <textarea value={form.skills} onChange={(e) => set("skills", e.target.value)}
            placeholder="e.g. Brand identity systems, Figma UI prototyping, typography, icon design…"
            rows={3} className={inputClass(!!fieldErrors.skills) + " resize-none"} />
        </Field>

        <div>
          <p className="text-sm font-medium text-zinc-700 mb-3">
            Tools & software you use
            <span className="ml-2 text-xs font-normal text-zinc-400">(select all that apply)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${
                  selectedTools.includes(tool)
                    ? "bg-green-500 border-green-500 text-black"
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <Field label="Portfolio URL" required error={fieldErrors.portfolioUrl}
          hint="Link to your Behance, Dribbble, personal website, or any online portfolio">
          <input type="url" value={form.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)}
            placeholder="https://behance.net/yourname" className={inputClass(!!fieldErrors.portfolioUrl)} />
        </Field>
      </Section>

      {/* ── Section 3: Availability & Rates ──────────────────── */}
      <Section title="Availability & Rates" step={3} total={4}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Work availability" required error={fieldErrors.availability}>
            <select value={form.availability} onChange={(e) => set("availability", e.target.value)}
              className={inputClass(!!fieldErrors.availability) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {AVAILABILITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Expected hourly rate" required error={fieldErrors.hourlyRate}>
            <select value={form.hourlyRate} onChange={(e) => set("hourlyRate", e.target.value)}
              className={inputClass(!!fieldErrors.hourlyRate) + " cursor-pointer"}>
              <option value="" disabled>Select range…</option>
              {RATE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Can work on-site?" required error={fieldErrors.canWorkOnSite}>
            <select value={form.canWorkOnSite} onChange={(e) => set("canWorkOnSite", e.target.value)}
              className={inputClass(!!fieldErrors.canWorkOnSite) + " cursor-pointer"}>
              <option value="" disabled>Select…</option>
              {ONSITE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      {/* ── Section 4: About You ──────────────────────────────── */}
      <Section title="About You" step={4} total={4}>
        <Field label="Professional bio" required error={fieldErrors.bio}
          hint="Tell clients who you are, what you specialize in, and what makes your work unique. Minimum 80 characters.">
          <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)}
            placeholder="I'm a brand identity designer based in Addis Ababa with 5 years of experience helping Ethiopian startups and SMEs build memorable visual identities…"
            rows={5} className={inputClass(!!fieldErrors.bio) + " resize-none"} />
          <p className="text-xs text-zinc-400 mt-1 text-right tabular-nums">
            {form.bio.length} chars {form.bio.length < 80 && <span className="text-orange-500">({80 - form.bio.length} more needed)</span>}
          </p>
        </Field>

        <Field label="Why do you want to join our network?" required error={fieldErrors.whyJoin}
          hint="What draws you to Hire Ethiopia's Best? What kind of clients are you hoping to work with?">
          <textarea value={form.whyJoin} onChange={(e) => set("whyJoin", e.target.value)}
            placeholder="I want to connect with Ethiopian businesses that value great design and help them stand out in a growing market…"
            rows={4} className={inputClass(!!fieldErrors.whyJoin) + " resize-none"} />
        </Field>

        <Field label="Have you worked with Ethiopian businesses before?" required error={fieldErrors.workedWithEthiopianBiz}>
          <select value={form.workedWithEthiopianBiz} onChange={(e) => set("workedWithEthiopianBiz", e.target.value)}
            className={inputClass(!!fieldErrors.workedWithEthiopianBiz) + " cursor-pointer"}>
            <option value="" disabled>Select…</option>
            {WORKED_WITH_ETH.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </Section>

      {submitError && (
        <p role="alert" className="text-sm text-red-600 text-center">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
      >
        {isPending && <SpinnerIcon />}
        {isPending ? "Submitting…" : "Submit Application"}
      </button>
      <p className="text-xs text-center text-zinc-400">
        We review every application and respond within 3–5 business days.
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
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-black text-xs font-bold shrink-0">
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
