"use server";

import {
  getDesignerPitchByToken,
  getClientBrief,
  getDesignerApplication,
  submitDesignerPitch,
} from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

type SubmitResult = { success: true } | { success: false; error: string };

export async function submitPitch(
  token: string,
  formData: FormData
): Promise<SubmitResult> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const approach = get("approach");
  const timeline = get("timeline");
  const price = get("price");
  const message = get("message");

  if (!approach || approach.length < 80)
    return { success: false, error: "Please write an approach of at least 80 characters." };
  if (!timeline)
    return { success: false, error: "Please specify your timeline." };
  if (!price)
    return { success: false, error: "Please specify your price." };

  const pitch = await getDesignerPitchByToken(token);
  if (!pitch) return { success: false, error: "Invalid pitch link." };
  if (pitch.status === "submitted")
    return { success: false, error: "This pitch has already been submitted." };

  await submitDesignerPitch(token, { approach, timeline, price, message: message || undefined });

  // Notify admin
  const [brief, designer] = await Promise.all([
    getClientBrief(pitch.brief_id),
    getDesignerApplication(pitch.designer_id),
  ]);
  if (brief && designer) {
    await notifyAdmin(
      `✅ <b>Pitch Received</b>\n\n` +
      `<b>Designer:</b> ${designer.full_name}\n` +
      `<b>Brief:</b> ${brief.business_name} — ${brief.category}\n` +
      `<b>Price:</b> ${price}\n` +
      `<b>Timeline:</b> ${timeline}\n\n` +
      `<b>Approach:</b> ${approach.slice(0, 200)}${approach.length > 200 ? "…" : ""}`
    );
  }

  return { success: true };
}
