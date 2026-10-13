export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header skeleton */}
      <div className="h-7 w-48 bg-zinc-200 rounded-lg mb-2" />
      <div className="h-4 w-64 bg-zinc-100 rounded mb-8" />

      {/* KPI cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-zinc-100 bg-white p-5">
            <div className="h-3 w-20 bg-zinc-100 rounded mb-3" />
            <div className="h-8 w-16 bg-zinc-200 rounded mb-1" />
            <div className="h-3 w-24 bg-zinc-100 rounded" />
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-zinc-100 bg-white p-6">
          <div className="h-4 w-32 bg-zinc-200 rounded mb-5" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-zinc-200 rounded mb-1.5" style={{ width: `${60 + (i % 3) * 15}%` }} />
                  <div className="h-2.5 w-24 bg-zinc-100 rounded" />
                </div>
                <div className="h-5 w-16 bg-zinc-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-100 bg-white p-5">
            <div className="h-4 w-28 bg-zinc-200 rounded mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="h-3 w-20 bg-zinc-100 rounded" />
                <div className="h-3 w-10 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-white p-5">
            <div className="h-4 w-24 bg-zinc-200 rounded mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-9 bg-zinc-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
