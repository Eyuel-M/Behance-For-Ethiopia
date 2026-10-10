"use server";

import { revalidatePath } from "next/cache";
import { submitClientProjectReview } from "@/lib/supabase/admin-queries";

export async function submitClientReview(formData: FormData): Promise<void> {
  const clientToken = formData.get("clientToken") as string;
  const quality = parseInt(formData.get("quality") as string);
  const communication = parseInt(formData.get("communication") as string);
  const delivery = parseInt(formData.get("delivery") as string);
  const wouldRehire = formData.get("wouldRehire") as "yes" | "maybe" | "no";
  const comments = ((formData.get("comments") as string) ?? "").trim();

  if (!quality || !communication || !delivery || !wouldRehire) {
    throw new Error("Please fill in all required fields.");
  }

  await submitClientProjectReview({
    clientToken,
    qualityRating: quality,
    communicationRating: communication,
    deliveryRating: delivery,
    wouldRehire,
    comments,
  });

  revalidatePath(`/project/${clientToken}`);
}
