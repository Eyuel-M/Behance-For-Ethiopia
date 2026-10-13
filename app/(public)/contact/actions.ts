"use server";

import { notifyAdmin } from "@/lib/telegram";

export async function sendContactMessage(formData: FormData): Promise<{ ok: boolean }> {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();

  if (!name || !email || !message) return { ok: false };

  await notifyAdmin(
    `📩 <b>New contact message</b>\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  ).catch(() => {});

  return { ok: true };
}
