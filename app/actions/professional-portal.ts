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
  revalidatePath(`/professional/${token}`);
}

export async function postProfessionalMessage(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const token = ((formData.get("token") as string | null) ?? "").trim();
  const content = ((formData.get("content") as string | null) ?? "").trim();
  const authorName = ((formData.get("authorName") as string | null) ?? "Designer").trim();
  if (!content) return;
  const { addProjectMessage } = await import("@/lib/supabase/admin-queries");
  await addProjectMessage({ projectId, author: "professional", authorName, content });
  notifyAdmin(`💬 <b>Designer message</b>\nProject ID: ${projectId}\n${authorName}: ${content}`).catch(() => {});
  revalidatePath(`/professional/${token}`);
}
