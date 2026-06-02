import Link from "next/link";
import { getAllDesigners } from "@/lib/supabase/queries";
import DeleteDesignerButton from "@/components/admin/DeleteDesignerButton";

export const dynamic = "force-dynamic";

export default async function AdminDesignersPage() {
  const designers = await getAllDesigners();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Designers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{designers.length} listed</p>
        </div>
        <Link
          href="/admin/designers/new"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          + Add designer
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Location</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Rate</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {designers.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors duration-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${d.avatarColor} ${d.avatarText}`}>
                      {d.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-900">{d.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{d.category}</td>
                <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{d.location}</td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">${d.rate}/hr</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${d.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${d.available ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {d.available ? "Available" : "Booked"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/designers/${d.id}/edit`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      Edit
                    </Link>
                    <DeleteDesignerButton id={d.id} name={d.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
