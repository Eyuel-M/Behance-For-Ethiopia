import Link from "next/link";
import { createProjectFromScratch } from "@/app/actions/admin-projects";

export const dynamic = "force-dynamic";

const SERVICE_MODES = ["One-time project", "Retainer", "Consultation", "Workshop"];
const CATEGORIES = [
  "Brand Identity", "Logo Design", "UI/UX Design", "Social Media",
  "Print & Packaging", "Motion Graphics", "Illustration", "Other",
];

const inp = "w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 placeholder-zinc-300";
const ta  = `${inp} resize-y leading-relaxed`;

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-zinc-500 mb-1.5">
      {text}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

export default function NewProjectPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/projects" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">Projects</Link>
            <span className="text-zinc-300 text-xs">/</span>
            <span className="text-xs text-zinc-600 font-medium">New project</span>
          </div>
          <h1 className="text-lg font-bold text-zinc-900">Create project from scratch</h1>
        </div>
      </div>

      <form action={createProjectFromScratch}>
        <div className="grid grid-cols-3 gap-5">

          {/* ── Left: main form ── */}
          <div className="col-span-2 space-y-4">

            {/* Project basics */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Project</p>
              <div className="space-y-3">
                <div>
                  <Label text="Title" required />
                  <input name="title" type="text" required placeholder="e.g. Brand Identity for Selam Coffee" className={inp} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="Service mode" required />
                    <select name="serviceMode" required className={inp} defaultValue="">
                      <option value="" disabled>Select…</option>
                      {SERVICE_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label text="Category" required />
                    <select name="category" required className={inp} defaultValue="">
                      <option value="" disabled>Select…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Label text="Budget" required />
                    <input name="budget" type="text" required placeholder="ETB 50,000" className={inp} />
                  </div>
                  <div>
                    <Label text="Deadline" />
                    <input name="deadline" type="date" className={inp} />
                  </div>
                </div>
              </div>
            </div>

            {/* Scope of work */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Scope of work</p>
              <div className="space-y-3">
                <div>
                  <Label text="Deliverables" required />
                  <textarea name="deliverables" required rows={3} placeholder="Primary logo + variations, brand guidelines PDF, business card design…" className={ta} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="Exclusions" />
                    <textarea name="exclusions" rows={2} placeholder="Website design, print production…" className={ta} />
                  </div>
                  <div>
                    <Label text="Assumptions" />
                    <textarea name="assumptions" rows={2} placeholder="Client provides copy and photos…" className={ta} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Label text="Acceptance criteria" />
                    <input name="acceptanceCriteria" type="text" placeholder="Client signs off and receives source files" className={inp} />
                  </div>
                  <div>
                    <Label text="Revision limit" />
                    <input name="revisionLimit" type="number" min={1} max={10} defaultValue={2} className={inp} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: client + notes ── */}
          <div className="space-y-4">

            {/* Client info */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Client</p>
              <div className="space-y-3">
                <div>
                  <Label text="Business / org" required />
                  <input name="clientBusiness" type="text" required placeholder="Selam Coffee" className={inp} />
                </div>
                <div>
                  <Label text="Contact name" required />
                  <input name="clientName" type="text" required placeholder="Tigist Haile" className={inp} />
                </div>
                <div>
                  <Label text="Contact email" required />
                  <input name="clientEmail" type="email" required placeholder="tigist@selamcoffee.com" className={inp} />
                </div>
              </div>
            </div>

            {/* Internal notes */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Internal notes</p>
              <textarea
                name="managerNotes"
                rows={4}
                placeholder="Client called Oct 9, 3-week timeline, prefers minimal style…"
                className={ta}
              />
              <p className="text-xs text-zinc-300 mt-1.5">Not visible to client or professional</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Create project →
              </button>
              <Link
                href="/admin/projects"
                className="text-center text-sm text-zinc-400 hover:text-zinc-600 transition-colors py-1"
              >
                Cancel
              </Link>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
