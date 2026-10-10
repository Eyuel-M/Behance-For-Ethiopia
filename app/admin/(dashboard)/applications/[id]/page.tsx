import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesignerApplication, getDesignerFeedback } from "@/lib/supabase/admin-queries";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  type ApplicationStatus,
  type DesignerFeedbackRow,
} from "@/lib/supabase/project-types";
import { reviewApplication } from "@/app/actions/admin-applications";
import { generateFeedbackLink } from "@/app/actions/designer-feedback";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ newToken?: string }> };

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

function SectionCard({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border overflow-hidden ${accent ? "border-green-200" : "border-zinc-200"}`}>
      <div className={`px-6 py-4 border-b ${accent ? "bg-green-50 border-green-100" : "bg-zinc-50/50 border-zinc-100"}`}>
        <h2 className={`text-xs font-bold uppercase tracking-widest ${accent ? "text-green-700" : "text-zinc-400"}`}>{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((n) => (
        <span key={n} className={`text-sm ${n <= Math.round(value) ? "text-amber-400" : "text-zinc-200"}`}>★</span>
      ))}
      <span className="ml-1 text-xs font-bold text-zinc-700">{value.toFixed(1)}</span>
    </span>
  );
}

function RehirePill({ value }: { value: "yes" | "maybe" | "no" }) {
  const map = { yes: "bg-green-50 text-green-700 border-green-100", maybe: "bg-amber-50 text-amber-700 border-amber-100", no: "bg-red-50 text-red-700 border-red-100" };
  const label = { yes: "Yes, definitely", maybe: "Maybe", no: "Probably not" };
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-xs font-semibold ${map[value]}`}>{label[value]}</span>;
}

function computeMetrics(feedback: DesignerFeedbackRow[]) {
  const submitted = feedback.filter((f) => f.status === "submitted");
  if (submitted.length === 0) return null;
  const avg = (key: keyof DesignerFeedbackRow) =>
    submitted.reduce((s, f) => s + ((f[key] as number) ?? 0), 0) / submitted.length;
  const rehireYes = submitted.filter((f) => f.would_rehire === "yes").length;
  return {
    count: submitted.length,
    quality: avg("quality_rating"),
    communication: avg("communication_rating"),
    delivery: avg("delivery_rating"),
    overall: (avg("quality_rating") + avg("communication_rating") + avg("delivery_rating")) / 3,
    rehireRate: Math.round((rehireYes / submitted.length) * 100),
  };
}

export default async function ApplicationDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { newToken } = await searchParams;
  const [app, feedback] = await Promise.all([
    getDesignerApplication(id),
    getDesignerFeedback(id),
  ]);
  if (!app) notFound();
  const metrics = computeMetrics(feedback);

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
        <StatCard label="Project rate" value={app.hourly_rate} />
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

      {/* New feedback link banner */}
      {newToken && (
        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-6 py-5">
          <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Feedback link generated</p>
          <p className="text-sm text-green-800 mb-3">Share this link with the client — it&apos;s unique to this request:</p>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-green-200 px-4 py-3 flex-wrap">
            <code className="text-xs text-zinc-700 flex-1 break-all font-mono">
              {typeof window === "undefined" ? `/feedback/${newToken}` : `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/feedback/${newToken}`}
            </code>
          </div>
          <p className="text-xs text-green-700 mt-2 opacity-70">⚠ Link only persists once Supabase is connected.</p>
        </div>
      )}

      {/* Performance metrics */}
      {metrics && (
        <div className="mt-5">
          <SectionCard title="Performance Metrics">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
                <p className="text-2xl font-black text-zinc-900">{metrics.overall.toFixed(1)}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Overall score</p>
                <div className="flex justify-center mt-1">
                  {[1,2,3,4,5].map((n) => (
                    <span key={n} className={`text-xs ${n <= Math.round(metrics.overall) ? "text-amber-400" : "text-zinc-200"}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
                <p className="text-2xl font-black text-green-700">{metrics.rehireRate}%</p>
                <p className="text-xs text-zinc-400 mt-0.5">Would rehire</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
                <p className="text-2xl font-black text-zinc-900">{metrics.count}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Projects rated</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
                <p className="text-2xl font-black text-zinc-900">{feedback.filter(f => f.status === "pending").length}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Awaiting response</p>
              </div>
            </div>
            <div className="space-y-3">
              {(["quality", "communication", "delivery"] as const).map((key) => {
                const labels = { quality: "Work quality", communication: "Communication", delivery: "On-time delivery" };
                const val = metrics[`${key}_rating` as never] ?? metrics[key];
                const score = key === "quality" ? metrics.quality : key === "communication" ? metrics.communication : metrics.delivery;
                return (
                  <div key={key} className="flex items-center gap-4">
                    <p className="text-xs font-semibold text-zinc-500 w-32 shrink-0">{labels[key]}</p>
                    <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(score / 5) * 100}%` }} />
                    </div>
                    <Stars value={score} />
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Individual feedback */}
      {feedback.length > 0 && (
        <div className="mt-5">
          <SectionCard title={`Client Feedback (${feedback.length})`}>
            <div className="space-y-4">
              {feedback.map((f) => (
                <div key={f.id} className={`rounded-xl border p-4 ${f.status === "pending" ? "bg-zinc-50 border-zinc-100 border-dashed" : "bg-white border-zinc-200"}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">{f.project_title ?? "Untitled project"}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{f.client_name} · {new Date(f.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    {f.status === "pending" ? (
                      <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-400 text-xs font-semibold border border-zinc-200">Awaiting response</span>
                    ) : (
                      f.would_rehire && <RehirePill value={f.would_rehire} />
                    )}
                  </div>
                  {f.status === "submitted" && (
                    <>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {([["Quality", f.quality_rating], ["Communication", f.communication_rating], ["On-time", f.delivery_rating]] as [string, number][]).map(([label, val]) => (
                          <div key={label} className="text-center">
                            <p className="text-xs text-zinc-400 mb-1">{label}</p>
                            <Stars value={val} />
                          </div>
                        ))}
                      </div>
                      {f.comments && (
                        <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 rounded-lg px-3 py-2.5 border border-zinc-100 italic">&ldquo;{f.comments}&rdquo;</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Generate feedback link */}
      <div className="mt-5">
        <SectionCard title="Request Client Feedback" accent>
          <p className="text-sm text-zinc-500 mb-4">Generate a unique feedback link to send to a client after a completed project.</p>
          <form action={generateFeedbackLink} className="space-y-4">
            <input type="hidden" name="designerId" value={id} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Client name <span className="text-red-400">*</span></label>
                <input type="text" name="clientName" required placeholder="Dawit Alemu"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Client email (optional)</label>
                <input type="email" name="clientEmail" placeholder="client@example.com"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Project title <span className="text-red-400">*</span></label>
              <input type="text" name="projectTitle" required placeholder="Brand Identity — Business Name"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
            </div>
            <button type="submit"
              className="px-6 py-3 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors cursor-pointer">
              Generate feedback link →
            </button>
          </form>
        </SectionCard>
      </div>

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
