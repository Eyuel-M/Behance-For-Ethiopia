import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioProject } from "@/lib/content/store";
import { updatePortfolioAction } from "@/app/actions/admin-content";
import { PortfolioForm } from "../new/page";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const project = getPortfolioProject(id);
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/content/portfolio" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Portfolio</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900 truncate max-w-xs">{project.title}</span>
      </div>
      <PortfolioForm action={updatePortfolioAction} defaultValues={project} />
    </div>
  );
}
