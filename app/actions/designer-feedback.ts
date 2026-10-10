"use server";

import { redirect } from "next/navigation";
import { createFeedbackRequest, submitFeedbackResponse } from "@/lib/supabase/admin-queries";

export async function generateFeedbackLink(formData: FormData): Promise<void> {
  const designerId = formData.get("designerId") as string;
  const projectTitle = formData.get("projectTitle") as string;
  const clientName = formData.get("clientName") as string;
  const clientEmail = formData.get("clientEmail") as string;

  if (!designerId || !projectTitle.trim() || !clientName.trim()) {
    redirect(`/admin/applications/${designerId}?feedbackError=missing_fields`);
  }

  const token = await createFeedbackRequest({
    designerApplicationId: designerId,
    projectTitle: projectTitle.trim(),
    clientName: clientName.trim(),
    clientEmail: clientEmail?.trim() || undefined,
  });

  redirect(`/admin/applications/${designerId}?newToken=${token}`);
}

export async function submitFeedback(formData: FormData): Promise<void> {
  const token = formData.get("token") as string;
  const quality = parseInt(formData.get("qualityRating") as string, 10);
  const communication = parseInt(formData.get("communicationRating") as string, 10);
  const delivery = parseInt(formData.get("deliveryRating") as string, 10);
  const wouldRehire = formData.get("wouldRehire") as "yes" | "maybe" | "no";
  const comments = (formData.get("comments") as string) ?? "";

  if (!token || !quality || !communication || !delivery || !wouldRehire) {
    redirect(`/feedback/${token}?error=incomplete`);
  }

  await submitFeedbackResponse({
    token,
    qualityRating: quality,
    communicationRating: communication,
    deliveryRating: delivery,
    wouldRehire,
    comments,
  });

  redirect(`/feedback/${token}/thank-you`);
}
