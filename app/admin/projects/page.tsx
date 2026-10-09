import Link from "next/link";
import { getProjects } from "@/lib/supabase/admin-queries";
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_COLORS,
  type ProjectStatus,
} from "@/lib/supabase/project-types";

export const dynamic = "force-dynamic";

function Badge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full border text-xs font-semibold ${PROJECT_STATUS_COLORS[status]}`}>
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const active = projects.filter((p) =>
    ["ready_to_start", "in_progress", "submitted_for_review", "revision_requested", "change_requested"].includes(p.status)
  );
  const closed = projects.filter((p) =>
    ["accepted", "completed", "disputed", "cancelled"].includes(p.status)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Projects</h1>
        <p className="text-sm text-zinc-400 mt-0.5">{projects.length} total · {active.length} active</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-16 text-center">
          <p className="text-zinc-400 text-sm">No projects yet. Create one from a qualified brief.</p>
          <Link href="/admin/briefs" className="mt-3 inline-block text-sm font-semibold text-green-700 hover:text-green-900 cursor-pointer">
            Go to briefs →
          </Link>
        </div>
      ) : (
        <>
          {active.length > 0 && <ProjectTable projects={active} heading="Active" />}
          {closed.length > 0 && (
            <div className="mt-8">
              <ProjectTable projects={closed} heading="Closed" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProjectTable({
  projects,
  heading,
}: {
  projects: Awaited<ReturnType<typeof getProjects>>;
  heading: string;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">{heading}</h2>
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Project</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">Client</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">Mode</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden lg:table-cell">Deadline</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors duration-100">
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-900 leading-snug">{p.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <p className="text-sm text-zinc-700">{p.client_business}</p>
                  <p className="text-xs text-zinc-400">{p.client_name}</p>
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500 hidden md:table-cell">{p.service_mode}</td>
                <td className="px-4 py-3 text-xs hidden lg:table-cell">
                  {p.deadline ? (
                    <span className={`${new Date(p.deadline) < new Date() ? "text-red-600 font-semibold" : "text-zinc-500"}`}>
                      {new Date(p.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  ) : (
                    <span className="text-zinc-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge status={p.status as ProjectStatus} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                  >
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
