"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  updateProjectStatus,
  addMilestone,
  updateMilestoneStatus,
  addProjectNote,
  generateProfessionalToken,
} from "@/lib/supabase/admin-queries";

export async function changeProjectStatus(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const status = formData.get("status") as string;
  const notes = (formData.get("notes") as string).trim();
  await updateProjectStatus(projectId, status, notes || undefined);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function addProjectMilestone(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const dueDate = (formData.get("dueDate") as string).trim();
  const paymentCondition = (formData.get("paymentCondition") as string).trim();
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  if (!title) throw new Error("Milestone title is required.");

  await addMilestone({
    projectId,
    title,
    description: description || undefined,
    dueDate: dueDate || undefined,
    paymentCondition: paymentCondition || undefined,
    sortOrder,
  });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function changeMilestoneStatus(formData: FormData): Promise<void> {
  const milestoneId = formData.get("milestoneId") as string;
  const projectId = formData.get("projectId") as string;
  const status = formData.get("status") as string;
  await updateMilestoneStatus(milestoneId, status);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function postProjectNote(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const content = (formData.get("content") as string).trim();
  const author = (formData.get("author") as string).trim() || "Admin";
  const isInternal = formData.get("isInternal") === "true";

  if (!content) throw new Error("Note content is required.");

  await addProjectNote({ projectId, author, content, isInternal });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function generateProLink(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId") as string;
  const token = await generateProfessionalToken(projectId);
  redirect(`/admin/projects/${projectId}?proToken=${token}`);
}
