import Link from "next/link";
import { createProjectFromScratch } from "@/app/actions/admin-projects";

export const dynamic = "force-dynamic";

const SERVICE_MODES = ["One-time project", "Retainer", "Consultation", "Workshop"];
const CATEGORIES = [
  "Brand Identity",
  "Logo Design",
  "UI/UX Design",
  "Social Media",
  "Print & Packaging",
  "Motion Graphics",
  "Illustration",
  "Other",
];

function Field({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-zinc-400 mt-1.5">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 placeholder-zinc-300";
const textareaCls = `${inputCls} resize-y leading-relaxed`;

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-7 flex items-center gap-3">
        <Link href="/admin/projects" className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors">
          ← Projects
        </Link>
        <span className="text-zinc-200">/</span>
        <span className="text-xs font-semibold text-zinc-600">New project</span>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Create project from scratch</h1>
        <p className="text-sm text-zinc-400 mt-0.5">
          For clients who called in or discussed their project offline.
        </p>
      </div>


      <form action={createProjectFromScratch} className="space-y-5">

        {/* Project basics */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Project basics</h2>
          </div>
          <div className="p-6">
            <Field label="Project title" required>
              <input
                name="title"
                type="text"
                required
                placeholder="e.g. Brand Identity for Selam Coffee"
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Service mode" required>
                <select name="serviceMode" required className={inputCls} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {SERVICE_MODES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Category" required>
                <select name="category" required className={inputCls} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Budget" required hint="e.g. ETB 50,000">
                <input
                  name="budget"
                  type="text"
                  required
                  placeholder="ETB 50,000"
                  className={inputCls}
                />
              </Field>
              <Field label="Deadline" hint="Leave blank if flexible">
                <input
                  name="deadline"
                  type="date"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Client info</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Business / org name" required>
                <input
                  name="clientBusiness"
                  type="text"
                  required
                  placeholder="Selam Coffee"
                  className={inputCls}
                />
              </Field>
              <Field label="Contact name" required>
                <input
                  name="clientName"
                  type="text"
                  required
                  placeholder="Tigist Haile"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Contact email" required>
              <input
                name="clientEmail"
                type="email"
                required
                placeholder="tigist@selamcoffee.com"
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        {/* Scope */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Scope of work</h2>
          </div>
          <div className="p-6">
            <Field label="Deliverables" required hint="What exactly will be delivered to the client?">
              <textarea
                name="deliverables"
                required
                rows={4}
                placeholder="Primary logo + variations, brand guidelines PDF, business card design…"
                className={textareaCls}
              />
            </Field>
            <Field label="Exclusions" hint="What is NOT included?">
              <textarea
                name="exclusions"
                rows={2}
                placeholder="Website design, print production…"
                className={textareaCls}
              />
            </Field>
            <Field label="Assumptions" hint="What do we assume the client will provide?">
              <textarea
                name="assumptions"
                rows={2}
                placeholder="Client will provide final copy, photos, and approve within 3 business days…"
                className={textareaCls}
              />
            </Field>
            <Field label="Acceptance criteria" hint="How will the client confirm the work is done?">
              <textarea
                name="acceptanceCriteria"
                rows={2}
                placeholder="Client signs off on final logo and receives all source files…"
                className={textareaCls}
              />
            </Field>
            <Field label="Revision limit" hint="How many revision rounds are included?">
              <input
                name="revisionLimit"
                type="number"
                min={1}
                max={10}
                defaultValue={2}
                className={`${inputCls} w-24`}
              />
            </Field>
          </div>
        </div>

        {/* Internal notes */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Internal notes</h2>
          </div>
          <div className="p-6">
            <Field label="Manager notes" hint="Not visible to the client or professional.">
              <textarea
                name="managerNotes"
                rows={3}
                placeholder="Client called on Oct 9, discussed 3-week timeline, prefers minimal aesthetic…"
                className={textareaCls}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 pb-8">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Create project →
          </button>
          <Link
            href="/admin/projects"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
