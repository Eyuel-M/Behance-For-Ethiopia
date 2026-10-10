import Link from "next/link";
import { getDesignerApplications } from "@/lib/supabase/admin-queries";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  type ApplicationStatus,
} from "@/lib/supabase/project-types";

export const dynamic = "force-dynamic";

function Badge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full border text-xs font-semibold ${APPLICATION_STATUS_COLORS[status]}`}>
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}

export default async function ApplicationsPage() {
  const applications = await getDesignerApplications();

  const counts = applications.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Professional Applications</h1>
        <p className="text-sm text-zinc-400 mt-0.5">{applications.length} total submissions</p>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-2 mb-7">
        {(Object.entries(APPLICATION_STATUS_LABELS) as [ApplicationStatus, string][]).map(([status, label]) => {
          const count = counts[status] ?? 0;
          if (count === 0) return null;
          return (
            <span key={status} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${APPLICATION_STATUS_COLORS[status]}`}>
              {label} <strong>{count}</strong>
            </span>
          );
        })}
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-16 text-center">
          <p className="text-zinc-400 text-sm">No applications yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">Specialty</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">City</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden lg:table-cell">Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {applications.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-50 transition-colors duration-100">
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-900 leading-snug">{a.full_name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{a.email}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 hidden sm:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs">
                      {a.specialty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs hidden md:table-cell">{a.city}</td>
                  <td className="px-4 py-3 text-zinc-600 text-xs hidden lg:table-cell">{a.hourly_rate}</td>
                  <td className="px-4 py-3">
                    <Badge status={a.status as ApplicationStatus} />
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs hidden md:table-cell whitespace-nowrap">
                    {new Date(a.created_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/applications/${a.id}`}
                      className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
