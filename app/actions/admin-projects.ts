"use server";

import { redirect } from "next/navigation";
import { createProject } from "@/lib/supabase/admin-queries";

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
