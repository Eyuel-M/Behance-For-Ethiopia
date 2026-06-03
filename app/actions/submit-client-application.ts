"use server";

import { supabase } from "@/lib/supabase/server";

export type ClientApplicationData = {
  // Business info
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  companySize: string;
  // Project
  designTypes: string; // comma-separated
  projectDescription: string;
  timeline: string;
  budget: string;
  // Preferences
  designersNeeded: string;
  engagementType: string;
  workStyle: string;
  preferredComms: string;
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
  if (!data.businessName.trim()) return { success: false, error: "Business name is required." };
  if (!data.contactName.trim()) return { success: false, error: "Your name is required." };
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { success: false, error: "A valid email address is required." };
  if (!data.phone.trim()) return { success: false, error: "Phone number is required." };
  if (!data.industry) return { success: false, error: "Please select your industry." };
  if (!data.companySize) return { success: false, error: "Please select your company size." };
  if (!data.designTypes) return { success: false, error: "Please select at least one design type." };
  if (!data.projectDescription.trim() || data.projectDescription.trim().length < 60)
    return { success: false, error: "Please describe your project in at least 60 characters." };
  if (!data.timeline) return { success: false, error: "Please select a project timeline." };
  if (!data.budget) return { success: false, error: "Please select a budget range." };
  if (!data.engagementType) return { success: false, error: "Please select an engagement type." };

  if (!supabase) {
    console.warn("[submitClientApplication] Supabase not configured — application not persisted.");
    return { success: true };
  }

  const { error } = await supabase.from("client_applications").insert({
    business_name: data.businessName.trim(),
    contact_name: data.contactName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    website: data.website.trim() || null,
    industry: data.industry,
    company_size: data.companySize,
    design_types: data.designTypes,
    project_description: data.projectDescription.trim(),
    timeline: data.timeline,
    budget: data.budget,
    designers_needed: data.designersNeeded,
    engagement_type: data.engagementType,
    work_style: data.workStyle,
    preferred_comms: data.preferredComms,
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
