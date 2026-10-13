"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createProject,
  addMilestone,
  addProjectNote,
  generateProfessionalToken,
  updateMilestoneStatus,
  updateMilestonePayment,
  updateProjectStatus,
  resendProposal,
  getProject,
  getDesignerApplication,
  createFeedbackRequest,
  addProjectMessage,
} from "@/lib/supabase/admin-queries";
import { sendFeedbackRequest } from "@/lib/email";
import { notifyAdmin } from "@/lib/telegram";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

export async function createProjectFromScratch(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const revisionLimit = parseInt((formData.get("revisionLimit") as string) || "2") || 2;
  const deadline = get("deadline");

  const projectId = await createProject({
    briefId: null,
    title: get("title"),
    clientName: get("clientName"),
    clientEmail: get("clientEmail"),
    clientBusiness: get("clientBusiness"),
    serviceMode: get("serviceMode"),
    category: get("category"),
    deliverables: get("deliverables"),
    exclusions: get("exclusions") || undefined,
    assumptions: get("assumptions") || undefined,
    acceptanceCriteria: get("acceptanceCriteria") || undefined,
    revisionLimit,
    deadline: deadline || undefined,
    budget: get("budget"),
    managerNotes: get("managerNotes") || undefined,
  });

  redirect(`/admin/projects/${projectId}`);
}

export async function addProjectMilestone(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const projectId = get("projectId");
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0") || 0;

  await addMilestone({
    projectId,
    title: get("title"),
    description: get("description") || undefined,
    dueDate: get("dueDate") || undefined,
    paymentCondition: get("paymentCondition") || undefined,
    sortOrder,
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function postProjectNote(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const projectId = get("projectId");

  await addProjectNote({
    projectId,
    author: get("author") || "Admin",
    content: get("content"),
    isInternal: formData.get("isInternal") === "true",
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function changeMilestoneStatus(formData: FormData): Promise<void> {
  const milestoneId = ((formData.get("milestoneId") as string | null) ?? "").trim();
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const status = ((formData.get("status") as string | null) ?? "").trim() as import("@/lib/supabase/project-types").MilestoneStatus;
  const revisionNote = ((formData.get("revisionNote") as string | null) ?? "").trim() || undefined;
  await updateMilestoneStatus(milestoneId, status, revisionNote);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function changeMilestonePayment(formData: FormData): Promise<void> {
  const milestoneId = ((formData.get("milestoneId") as string | null) ?? "").trim();
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const paymentStatus = ((formData.get("paymentStatus") as string | null) ?? "").trim() as import("@/lib/supabase/project-types").PaymentStatus;
  await updateMilestonePayment(milestoneId, paymentStatus);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function changeProjectStatus(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const status = ((formData.get("status") as string | null) ?? "").trim() as import("@/lib/supabase/project-types").ProjectStatus;
  const notes = ((formData.get("notes") as string | null) ?? "").trim() || undefined;
  await updateProjectStatus(projectId, status, notes);

  if (status === "completed") {
    const project = await getProject(projectId);
    if (project) {
      const designerId = project.assigned_professional_ids?.[0] ?? null;
      const designer = designerId ? await getDesignerApplication(designerId) : null;
      const designerName = designer?.full_name ?? "your designer";
      const token = await createFeedbackRequest({
        designerApplicationId: designerId ?? "unknown",
        projectTitle: project.title,
        clientName: project.client_name,
        clientEmail: project.client_email,
      });
      const feedbackUrl = `${SITE_URL}/feedback/${token}`;
      sendFeedbackRequest(project.client_email, designerName, feedbackUrl).catch(() => {});
      notifyAdmin(
        `✅ <b>Project completed</b>\nProject: ${project.title}\nClient: ${project.client_name}\nFeedback link sent to ${project.client_email}`
      ).catch(() => {});
    }
  }

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function postProjectMessage(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const content = ((formData.get("content") as string | null) ?? "").trim();
  const authorName = ((formData.get("authorName") as string | null) ?? "Admin").trim();
  if (!content) return;
  await addProjectMessage({ projectId, author: "admin", authorName, content });
  notifyAdmin(`💬 <b>Admin message</b>\nProject ID: ${projectId}\n${authorName}: ${content}`).catch(() => {});
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function resendProposalToClient(formData: FormData): Promise<void> {
  const proposalId = ((formData.get("proposalId") as string | null) ?? "").trim();
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  await resendProposal(proposalId);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function generateProLink(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const token = await generateProfessionalToken(projectId);
  revalidatePath(`/admin/projects/${projectId}`);
  redirect(`/admin/projects/${projectId}?proToken=${token}`);
}
