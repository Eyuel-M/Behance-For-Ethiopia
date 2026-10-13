"use server";

import { redirect } from "next/navigation";
import {
  selectProposalDesigner,
  requestProposalRevision,
  getProposalByToken,
  getProject,
  getDesignerApplication,
} from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";
import { sendDesignerChosen } from "@/lib/email";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? null;

export async function selectDesigner(formData: FormData): Promise<void> {
  const token = formData.get("token") as string;
  const designerId = formData.get("designerId") as string;
  const designerLabel = formData.get("designerLabel") as string;

  await selectProposalDesigner(token, designerId);

  // Fire-and-forget notifications
  (async () => {
    const [proposal, designer] = await Promise.all([
      getProposalByToken(token),
      getDesignerApplication(designerId),
    ]);
    const project = proposal ? await getProject(proposal.project_id) : null;

    const businessName = project?.client_business ?? project?.client_name ?? "a client";
    const designerName = designer?.full_name ?? `Designer ${designerLabel}`;
    const proposalUrl = `${SITE_URL}/proposal/${token}`;

    notifyAdmin(
      `🎉 <b>Designer Selected!</b>\n\n` +
      `<b>Client:</b> ${businessName}\n` +
      `<b>Chosen:</b> ${designerName} (Option ${designerLabel})\n\n` +
      `Next step: generate pro portal link and set up milestones.\n` +
      `<a href="${SITE_URL}/admin/projects/${proposal?.project_id ?? ""}">Open project →</a>`
    ).catch(() => {});

    if (ADMIN_EMAIL) {
      sendDesignerChosen(ADMIN_EMAIL, businessName, designerName, proposalUrl).catch(() => {});
    }
  })();

  redirect(`/proposal/${token}/confirmed?choice=${designerLabel}`);
}

export async function requestRevision(token: string, note: string): Promise<void> {
  await requestProposalRevision(token, note);

  // Fire-and-forget notification
  (async () => {
    const proposal = await getProposalByToken(token);
    const project = proposal ? await getProject(proposal.project_id) : null;
    const businessName = project?.client_business ?? project?.client_name ?? "a client";
    const adminProjectUrl = `${SITE_URL}/admin/projects/${proposal?.project_id ?? ""}`;
    notifyAdmin(
      `🔄 <b>Client requested proposal revision</b>\n\n` +
      `<b>Client:</b> ${businessName}\n` +
      `<b>Note:</b> ${note || "(no note provided)"}\n\n` +
      `<a href="${adminProjectUrl}">Open project →</a>`
    ).catch(() => {});
  })();
}
