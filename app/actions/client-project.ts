"use server";

import { revalidatePath } from "next/cache";
import { addProjectMessage, getProjectByClientToken } from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

export async function postClientMessage(formData: FormData): Promise<void> {
  const token = ((formData.get("token") as string | null) ?? "").trim();
  const content = ((formData.get("content") as string | null) ?? "").trim();
  const authorName = ((formData.get("authorName") as string | null) ?? "Client").trim();
  const file = formData.get("file") as File | null;

  if (!token) return;
  if (!content && !(file && file.size > 0)) return;

  const project = await getProjectByClientToken(token);
  if (!project) return;

  let attachmentUrl: string | null = null;
  let attachmentName: string | null = null;
  let attachmentSize: number | null = null;
  let attachmentType: string | null = null;

  if (file && file.size > 0) {
    attachmentName = file.name;
    attachmentSize = file.size;
    attachmentType = file.type || "application/octet-stream";

    const { supabase } = await import("@/lib/supabase/server");
    if (supabase) {
      const path = `client/${project.id}/${Date.now()}-${file.name}`;
      const bytes = await file.arrayBuffer();
      const { data, error } = await supabase.storage
        .from("chat-attachments")
        .upload(path, bytes, { contentType: attachmentType, upsert: false });
      if (!error && data) {
        const { data: pub } = supabase.storage.from("chat-attachments").getPublicUrl(data.path);
        attachmentUrl = pub.publicUrl;
      }
    } else if (file.size <= 1_048_576) {
      const buf = await file.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      attachmentUrl = `data:${attachmentType};base64,${b64}`;
    }
  }

  await addProjectMessage({ projectId: project.id, author: "client", authorName, content, attachmentUrl, attachmentName, attachmentSize, attachmentType });
  notifyAdmin(`💬 <b>Client message</b>\nProject: ${project.title}\n${authorName}: ${content}${attachmentName ? ` [${attachmentName}]` : ""}`).catch(() => {});
  revalidatePath(`/project/${token}`);
}
