"use server";

import { revalidatePath } from "next/cache";
import { submitMilestoneByPro, updateProjectStatus } from "@/lib/supabase/admin-queries";

export async function submitMilestone(milestoneId: string, token: string): Promise<void> {
  await submitMilestoneByPro(milestoneId);
  revalidatePath(`/professional/${token}`);
}

export async function resubmitProject(projectId: string, token: string): Promise<void> {
  await updateProjectStatus(projectId, "submitted_for_review");
  revalidatePath(`/professional/${token}`);
}
