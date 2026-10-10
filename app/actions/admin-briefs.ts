"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  updateBriefStatus,
  createProject,
  getClientBrief,
  deleteBriefById,
} from "@/lib/supabase/admin-queries";

export async function qualifyBrief(
  briefId: string,
  status: string,
  adminNotes: string
): Promise<void> {
  await updateBriefStatus(briefId, status, adminNotes);
  revalidatePath(`/admin/briefs/${briefId}`);
  revalidatePath("/admin/briefs");
}

export async function createProjectFromBrief(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const briefId = formData.get("briefId") as string;
  const title = get("title");
  const deliverables = get("deliverables");
  const exclusions = get("exclusions");
  const assumptions = get("assumptions");
  const acceptanceCriteria = get("acceptanceCriteria");
  const revisionLimit = parseInt(formData.get("revisionLimit") as string) || 2;
  const deadline = get("deadline");
  const managerNotes = get("managerNotes");

  const brief = await getClientBrief(briefId);
  if (!brief) throw new Error("Brief not found");

  const projectId = await createProject({
    briefId,
    title: title || `${brief.category} — ${brief.business_name}`,
    clientName: brief.contact_name,
    clientEmail: brief.email,
    clientBusiness: brief.business_name,
    serviceMode: brief.service_mode,
    category: brief.category,
    deliverables: deliverables || brief.project_description,
    exclusions: exclusions || undefined,
    assumptions: assumptions || undefined,
    acceptanceCriteria: acceptanceCriteria || undefined,
    revisionLimit,
    deadline: deadline || undefined,
    budget: brief.budget,
    managerNotes: managerNotes || undefined,
  });

  // Mark brief as in_progress
  await updateBriefStatus(briefId, "in_progress");

  redirect(`/admin/projects/${projectId}`);
}

export async function deleteBrief(briefId: string): Promise<void> {
  await deleteBriefById(briefId);
  revalidatePath("/admin/briefs");
  redirect("/admin/briefs");
}
