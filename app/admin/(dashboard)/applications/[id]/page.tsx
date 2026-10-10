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

function Badge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-xs font-semibold ${APPLICATION_STATUS_COLORS[status]}`}>
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-zinc-100 last:border-0">
      <dt className="text-xs font-semibold text-zinc-400 w-36 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-sm text-zinc-700 leading-relaxed">{value}</dd>
    </div>
  );
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const app = await getDesignerApplication(id);
  if (!app) notFound();

  const status = app.status as ApplicationStatus;

  async function handleReview(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as string;
    const notes = formData.get("reviewerNotes") as string;
    await reviewApplication(id, newStatus, notes);
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6">
        ← All applications
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{app.full_name}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{app.email} · {app.phone}</p>
        </div>
        <Badge status={status} />
      </div>

      {/* Professional info */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Profile</h2>
        <dl>
          <InfoRow label="City" value={app.city} />
          <InfoRow label="Specialty" value={app.specialty} />
          <InfoRow label="Experience" value={app.experience} />
          <InfoRow label="Availability" value={app.availability} />
          <InfoRow label="Hourly rate" value={app.hourly_rate} />
          <InfoRow label="Can work on-site" value={app.can_work_on_site} />
          <InfoRow label="Tools" value={app.tools} />
          <InfoRow label="Social/other URL" value={app.social_url} />
        </dl>
        <div className="mt-4">
          <dt className="text-xs font-semibold text-zinc-400 mb-1">Key skills</dt>
          <dd className="text-sm text-zinc-700 leading-relaxed">{app.skills}</dd>
        </div>
      </div>

      {/* Portfolio link */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Portfolio</h2>
        <a
          href={app.portfolio_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
        >
          View portfolio →
        </a>
        <p className="text-xs text-zinc-400 mt-1">{app.portfolio_url}</p>
      </div>

      {/* About */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">About</h2>
        <div className="space-y-4">
          <div>
            <dt className="text-xs font-semibold text-zinc-400 mb-1">Bio</dt>
            <dd className="text-sm text-zinc-700 leading-relaxed">{app.bio}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-zinc-400 mb-1">Why they want to join</dt>
            <dd className="text-sm text-zinc-700 leading-relaxed">{app.why_join}</dd>
          </div>
          <InfoRow label="Ethiopian biz experience" value={app.worked_with_ethiopian_biz} />
        </div>
      </div>

      {/* Reviewer notes display */}
      {app.reviewer_notes && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 mb-5">
          <p className="text-xs font-semibold text-amber-700 mb-1">Reviewer notes</p>
          <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">{app.reviewer_notes}</p>
        </div>
      )}

      {/* Review panel */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-bold text-zinc-900 mb-4">Review decision</h2>
        <form action={handleReview} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Decision</label>
            <select name="status" className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer">
              <option value="reviewing">Reviewing (in progress)</option>
              <option value="approved">Approved — add to network</option>
              <option value="conditionally_approved">Conditionally approved</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-500 block mb-1.5">
              Notes (reason, conditions, next steps)
            </label>
            <textarea
              name="reviewerNotes"
              defaultValue={app.reviewer_notes ?? ""}
              rows={3}
              placeholder="Portfolio quality is strong. Skills match branding category. Needs portfolio link verification before final approval…"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Save decision
          </button>
        </form>
      </div>
    </div>
  );
}
