import DesignerForm from "@/components/admin/DesignerForm";
import { createDesignerAction } from "@/app/actions/admin-designers";

export default function NewDesignerPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Add designer</h1>
        <p className="text-sm text-slate-500 mt-0.5">New designer will appear on the public listing.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <DesignerForm action={createDesignerAction} />
      </div>
    </div>
  );
}
