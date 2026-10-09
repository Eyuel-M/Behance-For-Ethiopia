import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjectMilestones, getProjectNotes } from "@/lib/supabase/admin-queries";
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_COLORS,
  MILESTONE_STATUS_LABELS,
  MILESTONE_STATUS_COLORS,
  type ProjectStatus,
  type MilestoneStatus,
} from "@/lib/supabase/project-types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ClientProjectPage({ params }: Props) {
  const { id } = await params;
  const [project, milestones, notes] = await Promise.all([
    getProject(id),
    getProjectMilestones(id),
    getProjectNotes(id),
  ]);
  if (!project) notFound();

  const status = project.status as ProjectStatus;
  const publicNotes = notes.filter((n) => !n.is_internal);

  const completedMilestones = milestones.filter((m) => m.status === "accepted").length;
  const progress = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Home
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                Project tracker
              </p>
              <h1 className="text-2xl font-extrabold text-zinc-900">{project.title}</h1>
              <p className="text-sm text-zinc-500 mt-1">
                {project.client_business} · {project.service_mode}
              </p>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full border text-sm font-semibold ${PROJECT_STATUS_COLORS[status]}`}>
              {PROJECT_STATUS_LABELS[status]}
            </span>
          </div>

          {/* Progress bar */}
          {milestones.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-zinc-500">{completedMilestones} of {milestones.length} milestones complete</span>
                <span className="text-xs font-semibold text-zinc-700">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Project details */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Project details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <InfoRow label="Category" value={project.category} />
            <InfoRow label="Budget" value={project.budget} />
            <InfoRow label="Deadline" value={project.deadline ? new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Not set"} />
            <InfoRow label="Revision limit" value={`${project.revision_limit} rounds`} />
          </div>
          <div className="mt-4">
            <dt className="text-xs font-semibold text-zinc-400 mb-1">Deliverables</dt>
            <dd className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{project.deliverables}</dd>
          </div>
          {project.exclusions && (
            <div className="mt-3">
              <dt className="text-xs font-semibold text-zinc-400 mb-1">Not included</dt>
              <dd className="text-sm text-zinc-500 leading-relaxed">{project.exclusions}</dd>
            </div>
          )}
          {project.acceptance_criteria && (
            <div className="mt-3">
              <dt className="text-xs font-semibold text-zinc-400 mb-1">Completion criteria</dt>
              <dd className="text-sm text-zinc-600 leading-relaxed">{project.acceptance_criteria}</dd>
            </div>
          )}
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Milestones
            </h2>
            <div className="space-y-3">
              {milestones.map((m, i) => {
                const ms = m.status as MilestoneStatus;
                const isAccepted = ms === "accepted";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${isAccepted ? "border-green-100 bg-green-50" : "border-zinc-100 bg-zinc-50"}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${isAccepted ? "bg-green-500 text-black" : "bg-zinc-200 text-zinc-500"}`}>
                      {isAccepted ? "✓" : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${isAccepted ? "text-green-800" : "text-zinc-900"}`}>{m.title}</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full border text-xs font-medium ${MILESTONE_STATUS_COLORS[ms]}`}>
                          {MILESTONE_STATUS_LABELS[ms]}
                        </span>
                      </div>
                      {m.description && <p className="text-xs text-zinc-500 mt-0.5">{m.description}</p>}
                      {m.due_date && (
                        <p className="text-xs text-zinc-400 mt-1">
                          Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Updates */}
        {publicNotes.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Updates
            </h2>
            <div className="space-y-3">
              {publicNotes.map((n) => (
                <div key={n.id} className="border-l-2 border-zinc-200 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-zinc-600">{n.author}</span>
                    <span className="text-xs text-zinc-400">
                      {new Date(n.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-sm font-semibold text-zinc-700 mb-1">Have a question or need to make a change?</p>
          <p className="text-xs text-zinc-400 mb-4">Contact your project manager directly or reach our team.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex gap-2 py-1.5">
      <dt className="text-xs text-zinc-400 w-28 shrink-0">{label}</dt>
      <dd className="text-sm text-zinc-700">{value ?? "—"}</dd>
    </div>
  );
}
