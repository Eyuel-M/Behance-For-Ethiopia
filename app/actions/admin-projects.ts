"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createProject,
  addMilestone,
  addProjectNote,
  generateProfessionalToken,
  updateMilestoneStatus,
  updateProjectStatus,
  resendProposal,
} from "@/lib/supabase/admin-queries";

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
  const status = ((formData.get("status") as string | null) ?? "").trim();
  await updateMilestoneStatus(milestoneId, status);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function changeProjectStatus(formData: FormData): Promise<void> {
  const projectId = ((formData.get("projectId") as string | null) ?? "").trim();
  const status = ((formData.get("status") as string | null) ?? "").trim();
  const notes = ((formData.get("notes") as string | null) ?? "").trim() || undefined;
  await updateProjectStatus(projectId, status, notes);
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
