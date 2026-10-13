"use server";

import { redirect } from "next/navigation";
import { createProposal, getProject } from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";
import { sendProposalReady } from "@/lib/email";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

export async function generateProposalLink(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const designerIds = formData.getAll("designerId") as string[];

  if (designerIds.length === 0) {
    throw new Error("Select at least one professional.");
  }

  const token = await createProposal(projectId, designerIds.slice(0, 3));
  const proposalUrl = `${SITE_URL}/proposal/${token}`;

  // Send proposal email to client + notify admin
  const project = await getProject(projectId);
  if (project) {
    sendProposalReady(project.client_email, project.client_business || project.client_name, proposalUrl).catch(() => {});
    notifyAdmin(
      `📨 <b>Client Proposal Created</b>\n\n` +
      `<b>Project:</b> ${project.title}\n` +
      `<b>Client:</b> ${project.client_name} — ${project.client_email}\n` +
      `<b>Designers:</b> ${designerIds.length}\n\n` +
      `<a href="${proposalUrl}">Proposal link →</a>`
    ).catch(() => {});
  }

  redirect(`/admin/projects/${projectId}?proposalToken=${token}`);
}
