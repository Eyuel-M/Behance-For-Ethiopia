"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateApplicationStatus, deleteApplicationById, getDesignerApplication } from "@/lib/supabase/admin-queries";
import { sendDesignerApproved, sendDesignerRejected } from "@/lib/email";
import { notifyAdmin } from "@/lib/telegram";

export async function reviewApplication(
  applicationId: string,
  status: string,
  reviewerNotes: string
): Promise<void> {
  await updateApplicationStatus(applicationId, status, reviewerNotes);

  const app = await getDesignerApplication(applicationId);
  if (app) {
    if (status === "approved") {
      sendDesignerApproved(app.email, app.full_name).catch(() => {});
      notifyAdmin(`✅ <b>Designer approved</b>\n${app.full_name} (${app.specialty})\n${app.email}`).catch(() => {});
    } else if (status === "rejected") {
      sendDesignerRejected(app.email, app.full_name).catch(() => {});
      notifyAdmin(`❌ <b>Designer rejected</b>\n${app.full_name} (${app.specialty})\n${app.email}`).catch(() => {});
    }
  }

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

export async function permanentDeleteApplicationAction(applicationId: string): Promise<void> {
  const { hardDeleteApplication } = await import("@/lib/supabase/admin-queries");
  await hardDeleteApplication(applicationId);
  revalidatePath("/admin/archive");
  redirect("/admin/archive");
}
