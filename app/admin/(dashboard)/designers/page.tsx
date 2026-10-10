import Link from "next/link";
import Image from "next/image";
import { getDesignerApplications, getAllFeedback } from "@/lib/supabase/admin-queries";
import type { DesignerFeedbackRow } from "@/lib/supabase/project-types";
import { profileCompletion, completionColor } from "@/lib/profile-completion";

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
    <div className="flex items-center gap-1">
      <span className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`text-sm leading-none ${n <= Math.round(score) ? "text-amber-400" : "text-zinc-200"}`}>★</span>
        ))}
      </span>
      <span className="text-xs font-bold text-zinc-700 ml-1">{score.toFixed(1)}</span>
      <span className="text-xs text-zinc-400">({count})</span>
    </div>
  );
}

function getFirstSample(workSamples: string | null): string | null {
  if (!workSamples) return null;
  try {
    const arr = JSON.parse(workSamples);
    return Array.isArray(arr) && arr[0] ? arr[0] : null;
  } catch {
    return null;
  }
}

export default async function AdminProfessionalsPage() {
  const [all, allFeedback] = await Promise.all([
    getDesignerApplications(),
    getAllFeedback(),
  ]);
  const approved = all.filter((a) => a.status === "approved");

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
          href="/admin/applications?status=approved"
          className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-sm font-semibold hover:bg-zinc-50 transition-colors"
        >
          View approved list →
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {approved.map((p) => {
            const pFeedback = feedbackByDesigner[p.id] ?? [];
            const score = avgRating(pFeedback);
            const ratedCount = pFeedback.filter((f) => f.status === "submitted").length;
            const initials = p.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
            const coverImg = getFirstSample(p.work_samples);
            const pct = profileCompletion(p);
            const color = completionColor(pct);
            const radius = 10;
            const circ = 2 * Math.PI * radius;
            const dash = (pct / 100) * circ;

            return (
              <Link
                key={p.id}
                href={`/admin/applications/${p.id}`}
                className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-300 hover:shadow-sm transition-all duration-150 flex flex-col"
              >
                {/* Cover image */}
                <div className="relative h-36 bg-zinc-100 shrink-0">
                  {coverImg ? (
                    <Image
                      src={coverImg}
                      alt={p.full_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-zinc-300">{initials}</span>
                    </div>
                  )}
                  {/* Profile completion ring — top right */}
                  <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r={radius} fill="none" stroke="#e4e4e7" strokeWidth="3" />
                      <circle
                        cx="20" cy="20" r={radius} fill="none"
                        stroke={color} strokeWidth="3"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                      <text x="20" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill={color}>{pct}</text>
                    </svg>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white flex items-center justify-center text-sm font-bold text-zinc-600 shrink-0 -mt-8 relative z-10 shadow-sm">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-zinc-900 group-hover:text-green-700 transition-colors truncate leading-tight">{p.full_name}</p>
                      <p className="text-xs text-zinc-400 truncate">{p.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{p.city}</span>
                    <span className="text-zinc-400">{p.hourly_rate}</span>
                  </div>

                  <div className="pt-1 border-t border-zinc-100">
                    {score !== null ? (
                      <Stars score={score} count={ratedCount} />
                    ) : (
                      <span className="text-xs text-zinc-300">No ratings yet</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
