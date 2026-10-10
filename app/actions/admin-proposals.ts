"use server";

import { redirect } from "next/navigation";
import { createProposal } from "@/lib/supabase/admin-queries";

export async function generateProposalLink(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const designerIds = formData.getAll("designerId") as string[];

  if (designerIds.length === 0) {
    throw new Error("Select at least one professional.");
  }

  const token = await createProposal(projectId, designerIds.slice(0, 3));
  redirect(`/admin/projects/${projectId}?proposalToken=${token}`);
}
