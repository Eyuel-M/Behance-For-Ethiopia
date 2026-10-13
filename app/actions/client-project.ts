"use server";

import { revalidatePath } from "next/cache";
import { addProjectMessage, getProjectByClientToken } from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

export async function postClientMessage(formData: FormData): Promise<void> {
  const token = ((formData.get("token") as string | null) ?? "").trim();
  const content = ((formData.get("content") as string | null) ?? "").trim();
  const authorName = ((formData.get("authorName") as string | null) ?? "Client").trim();
  if (!content || !token) return;

  const project = await getProjectByClientToken(token);
  if (!project) return;

  await addProjectMessage({ projectId: project.id, author: "client", authorName, content });
  notifyAdmin(`💬 <b>Client message</b>\nProject: ${project.title}\n${authorName}: ${content}`).catch(() => {});
  revalidatePath(`/project/${token}`);
}
