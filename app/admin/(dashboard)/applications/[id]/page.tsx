import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesignerApplication } from "@/lib/supabase/admin-queries";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  type ApplicationStatus,
} from "@/lib/supabase/project-types";
import { reviewApplication } from "@/app/actions/admin-applications";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${APPLICATION_STATUS_COLORS[status]}`}>
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200">
      {label}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-semibold text-zinc-800 leading-snug">{value}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const app = await getDesignerApplication(id);
  if (!app) notFound();

  const status = app.status as ApplicationStatus;
  const initials = app.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const isPdf = app.portfolio_url.startsWith("[PDF:");
  const pdfName = isPdf ? app.portfolio_url.replace(/^\[PDF:\s*/, "").replace(/\]$/, "") : null;

  async function handleReview(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as string;
    const notes = formData.get("reviewerNotes") as string;
    await reviewApplication(id, newStatus, notes);
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Back */}
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        All applications
      </Link>

      {/* Hero card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-5 flex items-start gap-5 flex-wrap">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-white text-xl font-black shrink-0 select-none">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
            <div>
              <h1 className="text-2xl font-black text-zinc-900">{app.full_name}</h1>
              <p className="text-sm text-zinc-500 mt-0.5">{app.specialty} · {app.city}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <span>{app.email}</span>
            <span className="text-zinc-200 hidden sm:inline">|</span>
            <span>{app.phone}</span>
            {app.social_url && (
              <>
                <span className="text-zinc-200 hidden sm:inline">|</span>
                <a href={app.social_url} target="_blank" rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition-colors font-medium">
                  LinkedIn / Website →
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Experience" value={app.experience} />
        <StatCard label="Hourly rate" value={app.hourly_rate} />
        <StatCard label="Availability" value={app.availability} />
        <StatCard label="On-site" value={app.can_work_on_site} />
      </div>

      {/* Skills & Tools */}
      <SectionCard title="Skills & Tools">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-zinc-400 mb-2.5">Key skills</p>
            <div className="flex flex-wrap gap-2">
              {app.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                <Chip key={s} label={s} />
              ))}
            </div>
          </div>
          {app.tools && (
            <div>
              <p className="text-xs font-semibold text-zinc-400 mb-2.5">Tools</p>
              <div className="flex flex-wrap gap-2">
                {app.tools.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Portfolio */}
      <div className="mt-5">
        <SectionCard title="Portfolio">
          {isPdf ? (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                <span className="text-red-600 text-xs font-black">PDF</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{pdfName}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Uploaded portfolio PDF</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-800 truncate">{app.portfolio_url}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Online portfolio</p>
              </div>
              <a
                href={app.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-700 transition-colors shrink-0"
              >
                View portfolio →
              </a>
            </div>
          )}
        </SectionCard>
      </div>

      {/* About */}
      <div className="mt-5">
        <SectionCard title="About">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-zinc-400 mb-2">Bio</p>
              <p className="text-sm text-zinc-700 leading-relaxed">{app.bio}</p>
            </div>
            <div className="h-px bg-zinc-100" />
            <div>
              <p className="text-xs font-semibold text-zinc-400 mb-2">Why they want to join</p>
              <p className="text-sm text-zinc-700 leading-relaxed">{app.why_join}</p>
            </div>
            <div className="h-px bg-zinc-100" />
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
              <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-400">Ethiopian business experience</p>
                <p className="text-sm font-medium text-zinc-700 mt-0.5">{app.worked_with_ethiopian_biz}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Reviewer notes */}
      {app.reviewer_notes && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Previous reviewer notes</p>
          <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">{app.reviewer_notes}</p>
        </div>
      )}

      {/* Review decision */}
      <div className="mt-5 mb-8">
        <SectionCard title="Review Decision">
          <form action={handleReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Decision</label>
                <select
                  name="status"
                  defaultValue={status}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                >
                  <option value="reviewing">Reviewing — in progress</option>
                  <option value="approved">Approved — add to network</option>
                  <option value="conditionally_approved">Conditionally approved</option>
                  <option value="waitlisted">Waitlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="sm:col-span-1 hidden sm:block" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                Notes
              </label>
              <textarea
                name="reviewerNotes"
                defaultValue={app.reviewer_notes ?? ""}
                rows={4}
                placeholder="Portfolio quality, skill match, conditions, next steps…"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
              />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Save decision
              </button>
              <span className="text-xs text-zinc-400">
                Submitted {new Date(app.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
          </form>
        </SectionCard>
      </div>

    </div>
  );
}
