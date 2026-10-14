"use server";

import { revalidatePath } from "next/cache";
import { submitMilestoneByPro, updateProjectStatus, getMilestone, getProfessionalProject } from "@/lib/supabase/admin-queries";
import { sendMilestoneUpdate } from "@/lib/email";
import { notifyAdmin } from "@/lib/telegram";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

export async function submitMilestone(
  milestoneId: string,
  token: string,
  deliveryUrl?: string
): Promise<void> {
  await submitMilestoneByPro(milestoneId, deliveryUrl || undefined);

  const [milestone, project] = await Promise.all([
    getMilestone(milestoneId),
    getProfessionalProject(token),
  ]);

  if (project && milestone) {
    const projectUrl = `${SITE_URL}/project/${project.client_token ?? project.id}`;
    sendMilestoneUpdate(project.client_email, project.client_name, project.title, milestone.title, projectUrl).catch(() => {});

    const tgMsg = [
      `📦 <b>Milestone submitted</b>`,
      `Project: ${project.title}`,
      `Milestone: ${milestone.title}`,
      deliveryUrl ? `Delivery: ${deliveryUrl}` : "",
      `Client: ${project.client_name}`,
    ].filter(Boolean).join("\n");
    notifyAdmin(tgMsg).catch(() => {});
  }

  revalidatePath(`/professional/${token}`);
}

export async function resubmitProject(projectId: string, token: string): Promise<void> {
  await updateProjectStatus(projectId, "submitted_for_review");
  const project = await getProfessionalProject(token);
  if (project) {
    notifyAdmin(`🔄 <b>Designer resubmitted</b>\nProject: ${project.title}\nClient: ${project.client_name}`).catch(() => {});
  }
  revalidatePath(`/professional/${token}`);
}

export async function startProject(projectId: string, token: string): Promise<void> {
  await updateProjectStatus(projectId, "in_progress");
  const project = await getProfessionalProject(token);
  if (project) {
    notifyAdmin(`🚀 <b>Designer started work</b>\nProject: ${project.title}\nClient: ${project.client_name}`).catch(() => {});
  }
  revalidatePath(`/professional/${token}`);
}

export async function postProfessionalMessage(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const token = ((formData.get("token") as string | null) ?? "").trim();
  const content = ((formData.get("content") as string | null) ?? "").trim();
  const authorName = ((formData.get("authorName") as string | null) ?? "Designer").trim();
  const file = formData.get("file") as File | null;

  if (!content && !file) return;

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
      const path = `professional/${projectId}/${Date.now()}-${file.name}`;
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

  const { addProjectMessage } = await import("@/lib/supabase/admin-queries");
  await addProjectMessage({ projectId, author: "professional", authorName, content, attachmentUrl, attachmentName, attachmentSize, attachmentType });
  notifyAdmin(`💬 <b>Designer message</b>\nProject ID: ${projectId}\n${authorName}: ${content}${attachmentName ? ` [${attachmentName}]` : ""}`).catch(() => {});
  revalidatePath(`/professional/${token}`);
}
