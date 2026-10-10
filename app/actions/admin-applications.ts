"use server";

import { revalidatePath } from "next/cache";
import { updateApplicationStatus } from "@/lib/supabase/admin-queries";

export async function reviewApplication(
  applicationId: string,
  status: string,
  reviewerNotes: string
): Promise<void> {
  await updateApplicationStatus(applicationId, status, reviewerNotes);
  revalidatePath(`/admin/applications/${applicationId}`);
  revalidatePath("/admin/applications");
  revalidatePath("/admin/designers");
}
