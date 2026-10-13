"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  assignDesignersToBrief,
  getClientBrief,
  getDesignerApplication,
  getDesignerPitchesByBrief,
  createProject,
  createProposal,
  updateBriefStatus,
} from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

export async function assignDesigners(formData: FormData): Promise<void> {
  const briefId = (formData.get("briefId") as string | null)?.trim();
  if (!briefId) return;

  const designerIds: string[] = [];
  for (let i = 0; i < 3; i++) {
    const id = (formData.get(`designer_${i}`) as string | null)?.trim();
    if (id) designerIds.push(id);
  }
  if (designerIds.length === 0) return;

  const brief = await getClientBrief(briefId);
  if (!brief) return;

  const pitches = await assignDesignersToBrief(briefId, designerIds);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const designerNames: string[] = [];
  for (const pitch of pitches) {
    const designer = await getDesignerApplication(pitch.designer_id);
    if (designer) {
      designerNames.push(designer.full_name);
      const pitchUrl = `${siteUrl}/pitch/${pitch.id}`;
      await notifyAdmin(
        `🎯 <b>Pitch Invitation Sent</b>\n\n` +
        `<b>Designer:</b> ${designer.full_name}\n` +
        `<b>Brief:</b> ${brief.business_name} — ${brief.category}\n` +
        `<b>Budget:</b> ${brief.budget}\n` +
        `<b>Timeline:</b> ${brief.timeline}\n\n` +
        `<b>Pitch link:</b> <a href="${pitchUrl}">${pitchUrl}</a>\n\n` +
        `Share this link directly with the designer.`
      );
    }
  }

  revalidatePath(`/admin/briefs/${briefId}`);
}

export async function sendToClient(formData: FormData): Promise<void> {
  const briefId = (formData.get("briefId") as string | null)?.trim();
  if (!briefId) return;

  const brief = await getClientBrief(briefId);
  if (!brief) return;

  // Get submitted pitches
  const pitches = await getDesignerPitchesByBrief(briefId);
  const submittedPitches = pitches.filter((p) => p.status === "submitted");
  const designerIdsToInclude = submittedPitches.length > 0
    ? submittedPitches.map((p) => p.designer_id)
    : pitches.map((p) => p.designer_id);

  if (designerIdsToInclude.length === 0) return;

  // Create project stub
  const projectId = await createProject({
    briefId,
    title: `${brief.category} — ${brief.business_name}`,
    clientName: brief.contact_name,
    clientEmail: brief.email,
    clientBusiness: brief.business_name,
    serviceMode: brief.service_mode,
    category: brief.category,
    deliverables: brief.project_description,
    budget: brief.budget,
    revisionLimit: 2,
  });

  // Create proposal
  const proposalToken = await createProposal(projectId, designerIdsToInclude);

  // Update brief status to in_progress
  await updateBriefStatus(briefId, "in_progress");

  // Send confirmation email to client
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const proposalUrl = `${siteUrl}/proposal/${proposalToken}`;
  const { sendProposalReady } = await import("@/lib/email");
  await sendProposalReady(brief.email, brief.business_name, proposalUrl);

  // Notify admin
  await notifyAdmin(
    `📨 <b>Proposal Sent to Client</b>\n\n` +
    `<b>Client:</b> ${brief.business_name}\n` +
    `<b>Email:</b> ${brief.email}\n` +
    `<b>Designers presented:</b> ${designerIdsToInclude.length}\n\n` +
    `<a href="${proposalUrl}">View proposal →</a>`
  );

  redirect(`/admin/projects/${projectId}`);
}
