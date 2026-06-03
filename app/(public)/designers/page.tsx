import { getAllDesigners } from "@/lib/supabase/queries";
import DesignersGrid from "@/components/DesignersGrid";

export const dynamic = "force-dynamic";

export default async function DesignersPage() {
  const designers = await getAllDesigners();

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Browse Designers
          </h1>
          <p className="mt-1.5 text-zinc-500 text-base">
            {designers.length} vetted Ethiopian designers ready to work with
            your business.
          </p>
        </div>
      </div>

      <DesignersGrid designers={designers} />
    </div>
  );
}
