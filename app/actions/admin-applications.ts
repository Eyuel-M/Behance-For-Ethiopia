"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateApplicationStatus, deleteApplicationById } from "@/lib/supabase/admin-queries";

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

export async function deleteApplication(applicationId: string): Promise<void> {
  await deleteApplicationById(applicationId);
  revalidatePath("/admin/applications");
  revalidatePath("/admin/designers");
  revalidatePath("/admin/archive");
  redirect("/admin/applications");
}

export async function restoreApplicationAction(applicationId: string): Promise<void> {
  const { restoreApplication } = await import("@/lib/supabase/admin-queries");
  await restoreApplication(applicationId);
  revalidatePath("/admin/archive");
  revalidatePath("/admin/applications");
  redirect("/admin/archive");
}
