import { notFound } from "next/navigation";
import Link from "next/link";
import { getInsights } from "@/lib/content/store";
import { updateInsightAction } from "@/app/actions/admin-content";
import { InsightForm } from "../new/page";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditInsightPage({ params }: Props) {
  const { id } = await params;
  const insight = getInsights().find(i => i.id === id);
  if (!insight) notFound();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/content/insights" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Insights</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900 truncate max-w-xs">{insight.title}</span>
      </div>
      <InsightForm action={updateInsightAction} defaultValues={insight} />
    </div>
  );
}
