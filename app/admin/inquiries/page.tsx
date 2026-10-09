import { getAllInquiries } from "@/lib/supabase/admin-queries";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Inquiries</h1>
        <p className="text-sm text-slate-500 mt-0.5">{inquiries.length} total submissions</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-400 text-sm">No inquiries yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Business</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden sm:table-cell">Budget</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.business_name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.email}</td>
                  <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                      {row.budget}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden lg:table-cell max-w-xs truncate">{row.description}</td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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
