import { notFound } from "next/navigation";
import DesignerForm from "@/components/admin/DesignerForm";
import { getDesignerBySlug } from "@/lib/supabase/queries";
import { getAllDesigners } from "@/lib/supabase/queries";
import { updateDesignerAction } from "@/app/actions/admin-designers";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditDesignerPage({ params }: Props) {
  const { id } = await params;

  // id param here is the database UUID (from admin table links)
  const all = await getAllDesigners();
  const designer = all.find((d) => d.id === id);
  if (!designer) notFound();

  const action = updateDesignerAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Edit designer</h1>
        <p className="text-sm text-slate-500 mt-0.5">{designer.name}</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <DesignerForm action={action} designer={designer} />
      </div>
    </div>
  );
}
