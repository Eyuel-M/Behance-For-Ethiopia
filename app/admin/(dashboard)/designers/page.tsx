import Link from "next/link";
import { getDesignerApplications, getAllFeedback } from "@/lib/supabase/admin-queries";
import type { DesignerFeedbackRow } from "@/lib/supabase/project-types";

export const dynamic = "force-dynamic";

function avgRating(feedback: DesignerFeedbackRow[]): number | null {
  const submitted = feedback.filter((f) => f.status === "submitted" && f.quality_rating);
  if (!submitted.length) return null;
  const sum = submitted.reduce(
    (s, f) => s + ((f.quality_rating! + f.communication_rating! + f.delivery_rating!) / 3),
    0
  );
  return sum / submitted.length;
}

function Stars({ score, count }: { score: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`text-sm leading-none ${n <= Math.round(score) ? "text-amber-400" : "text-zinc-200"}`}>★</span>
        ))}
      </span>
      <span className="text-xs font-bold text-zinc-700">{score.toFixed(1)}</span>
      <span className="text-xs text-zinc-400">({count})</span>
    </div>
  );
}

export default async function AdminProfessionalsPage() {
  const [all, allFeedback] = await Promise.all([
    getDesignerApplications(),
    getAllFeedback(),
  ]);
  const approved = all.filter((a) => a.status === "approved");

  // Group feedback by designer id
  const feedbackByDesigner = allFeedback.reduce<Record<string, DesignerFeedbackRow[]>>((acc, f) => {
    (acc[f.designer_application_id] ??= []).push(f);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Approved Professionals</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{approved.length} active in network</p>
        </div>
        <Link
          href="/admin/applications"
          className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-sm font-semibold hover:bg-zinc-50 transition-colors"
        >
          View all applications →
        </Link>
      </div>

      {approved.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
          <p className="text-zinc-400 text-sm">No approved professionals yet.</p>
          <Link href="/admin/applications" className="mt-3 inline-block text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
            Review pending applications →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">Specialty</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">City</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">Project rate</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Rating</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {approved.map((p) => {
                const pFeedback = feedbackByDesigner[p.id] ?? [];
                const score = avgRating(pFeedback);
                const ratedCount = pFeedback.filter((f) => f.status === "submitted").length;
                return (
                  <tr key={p.id} className="hover:bg-zinc-50 transition-colors duration-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-600 shrink-0">
                          {p.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900">{p.full_name}</p>
                          <p className="text-xs text-zinc-400">{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 hidden sm:table-cell">{p.specialty}</td>
                    <td className="px-4 py-3 text-zinc-500 hidden md:table-cell">{p.city}</td>
                    <td className="px-4 py-3 text-zinc-600 hidden sm:table-cell text-xs">{p.hourly_rate}</td>
                    <td className="px-4 py-3">
                      {score !== null ? (
                        <Stars score={score} count={ratedCount} />
                      ) : (
                        <span className="text-xs text-zinc-300">No ratings yet</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/applications/${p.id}`}
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
