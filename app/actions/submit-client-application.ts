"use server";

import { supabase } from "@/lib/supabase/server";

export type ClientApplicationData = {
  // Service mode
  serviceMode: string; // "Direct Match" | "Managed Project" | "Not sure yet"
  // Project
  category: string;
  designTypes: string; // comma-separated
  projectDescription: string;
  timeline: string;
  budget: string;
  references: string;
  // Contact
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  // Context
  engagementType: string;
  workedWithDesigner: string;
  hearAboutUs: string;
  additionalNotes: string;
};

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitClientApplication(
  data: ClientApplicationData
): Promise<SubmitResult> {
  if (!data.serviceMode) return { success: false, error: "Please select a service mode." };
  if (!data.category) return { success: false, error: "Please select a project category." };
  if (!data.designTypes) return { success: false, error: "Please select at least one type of work." };
  if (!data.projectDescription.trim() || data.projectDescription.trim().length < 60)
    return { success: false, error: "Please describe your project in at least 60 characters." };
  if (!data.timeline) return { success: false, error: "Please select a project timeline." };
  if (!data.budget) return { success: false, error: "Please select a budget range." };
  if (!data.contactName.trim()) return { success: false, error: "Your name is required." };
  if (!data.businessName.trim()) return { success: false, error: "Business or organisation name is required." };
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { success: false, error: "A valid email address is required." };
  if (!data.phone.trim()) return { success: false, error: "Phone number is required." };

  if (!supabase) {
    const { storeDemoBriefSubmission } = await import("@/lib/supabase/admin-queries");
    storeDemoBriefSubmission({
      service_mode: data.serviceMode,
      category: data.category,
      design_types: data.designTypes,
      project_description: data.projectDescription.trim(),
      timeline: data.timeline,
      budget: data.budget,
      references: data.references.trim() || null,
      contact_name: data.contactName.trim(),
      business_name: data.businessName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      engagement_type: data.engagementType,
      worked_with_designer: data.workedWithDesigner,
      hear_about_us: data.hearAboutUs,
      additional_notes: data.additionalNotes.trim() || null,
    });
    return { success: true };
  }

  const { error } = await supabase.from("client_applications").insert({
    service_mode: data.serviceMode,
    category: data.category,
    design_types: data.designTypes,
    project_description: data.projectDescription.trim(),
    timeline: data.timeline,
    budget: data.budget,
    references: data.references.trim() || null,
    contact_name: data.contactName.trim(),
    business_name: data.businessName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    engagement_type: data.engagementType,
    worked_with_designer: data.workedWithDesigner,
    hear_about_us: data.hearAboutUs,
    additional_notes: data.additionalNotes.trim() || null,
    status: "new",
  });

  if (error) {
    console.error("[submitClientApplication]", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
