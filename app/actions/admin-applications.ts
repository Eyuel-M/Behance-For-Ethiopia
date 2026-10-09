"use server";

import { updateApplicationStatus } from "@/lib/supabase/admin-queries";

export async function reviewApplication(
  applicationId: string,
  status: string,
  reviewerNotes: string
): Promise<void> {
  await updateApplicationStatus(applicationId, status, reviewerNotes);
}
