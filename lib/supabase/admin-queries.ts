import { supabase } from "./server";
import type {
  ClientBriefRow,
  DesignerApplicationRow,
  ProjectRow,
  MilestoneRow,
  ProjectNoteRow,
} from "./project-types";

// ─── Client briefs ────────────────────────────────────────────────────────────

export async function getClientBriefs(): Promise<ClientBriefRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("client_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getClientBriefs]", error.message); return []; }
  return data as ClientBriefRow[];
}

export async function getClientBrief(id: string): Promise<ClientBriefRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("client_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ClientBriefRow;
}

export async function updateBriefStatus(
  id: string,
  status: string,
  adminNotes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status };
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;
  const { error } = await supabase
    .from("client_applications")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Designer applications ─────────────────────────────────────────────────────

export async function getDesignerApplications(): Promise<DesignerApplicationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("designer_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getDesignerApplications]", error.message); return []; }
  return data as DesignerApplicationRow[];
}

export async function getDesignerApplication(id: string): Promise<DesignerApplicationRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("designer_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as DesignerApplicationRow;
}

export async function updateApplicationStatus(
  id: string,
  status: string,
  reviewerNotes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status };
  if (reviewerNotes !== undefined) updates.reviewer_notes = reviewerNotes;
  const { error } = await supabase
    .from("designer_applications")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getProjects]", error.message); return []; }
  return data as ProjectRow[];
}

export async function getProject(id: string): Promise<ProjectRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ProjectRow;
}

export async function createProject(input: {
  briefId: string | null;
  title: string;
  clientName: string;
  clientEmail: string;
  clientBusiness: string;
  serviceMode: string;
  category: string;
  deliverables: string;
  exclusions?: string;
  assumptions?: string;
  acceptanceCriteria?: string;
  revisionLimit?: number;
  deadline?: string;
  budget: string;
  managerNotes?: string;
}): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { data, error } = await supabase
    .from("projects")
    .insert({
      brief_id: input.briefId,
      title: input.title,
      client_name: input.clientName,
      client_email: input.clientEmail,
      client_business: input.clientBusiness,
      assigned_professional_ids: [],
      service_mode: input.serviceMode,
      category: input.category,
      deliverables: input.deliverables,
      exclusions: input.exclusions || null,
      assumptions: input.assumptions || null,
      acceptance_criteria: input.acceptanceCriteria || null,
      revision_limit: input.revisionLimit ?? 2,
      status: "ready_to_start",
      deadline: input.deadline || null,
      budget: input.budget,
      manager_notes: input.managerNotes || null,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function updateProjectStatus(
  id: string,
  status: string,
  notes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status, updated_at: new Date().toISOString() };
  if (notes !== undefined) updates.manager_notes = notes;
  const { error } = await supabase.from("projects").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Milestones ───────────────────────────────────────────────────────────────

export async function getProjectMilestones(projectId: string): Promise<MilestoneRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("project_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data as MilestoneRow[];
}

export async function addMilestone(input: {
  projectId: string;
  title: string;
  description?: string;
  dueDate?: string;
  paymentCondition?: string;
  sortOrder?: number;
}): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("project_milestones").insert({
    project_id: input.projectId,
    title: input.title,
    description: input.description || null,
    due_date: input.dueDate || null,
    status: "pending",
    payment_condition: input.paymentCondition || null,
    sort_order: input.sortOrder ?? 0,
  });
  if (error) throw new Error(error.message);
}

export async function updateMilestoneStatus(
  id: string,
  status: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase
    .from("project_milestones")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Project notes ────────────────────────────────────────────────────────────

export async function getProjectNotes(projectId: string): Promise<ProjectNoteRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("project_notes")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) return [];
  return data as ProjectNoteRow[];
}

export async function addProjectNote(input: {
  projectId: string;
  author: string;
  content: string;
  isInternal?: boolean;
}): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("project_notes").insert({
    project_id: input.projectId,
    author: input.author,
    content: input.content,
    is_internal: input.isInternal ?? true,
  });
  if (error) throw new Error(error.message);
}

