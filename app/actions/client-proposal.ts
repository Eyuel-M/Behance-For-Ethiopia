"use server";

import { redirect } from "next/navigation";
import { selectProposalDesigner, requestProposalRevision } from "@/lib/supabase/admin-queries";

export async function selectDesigner(formData: FormData): Promise<void> {
  const token = formData.get("token") as string;
  const designerId = formData.get("designerId") as string;
  const designerLabel = formData.get("designerLabel") as string;

  await selectProposalDesigner(token, designerId);
  redirect(`/proposal/${token}/confirmed?choice=${designerLabel}`);
}

export async function requestRevision(token: string, note: string): Promise<void> {
  await requestProposalRevision(token, note);
}
