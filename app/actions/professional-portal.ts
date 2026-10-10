"use server";

import { revalidatePath } from "next/cache";
import { submitMilestoneByPro } from "@/lib/supabase/admin-queries";

export async function submitMilestone(milestoneId: string, token: string): Promise<void> {
  await submitMilestoneByPro(milestoneId);
  revalidatePath(`/professional/${token}`);
}
