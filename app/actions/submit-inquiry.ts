"use server";

import { supabase } from "@/lib/supabase/server";

export type InquiryFormData = {
  businessName: string;
  email: string;
  phone: string;
  budget: string;
  description: string;
};

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitInquiry(data: InquiryFormData): Promise<SubmitResult> {
  // Basic server-side validation
  if (!data.businessName.trim()) return { success: false, error: "Business name is required." };
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { success: false, error: "A valid email address is required." };
  if (!data.budget) return { success: false, error: "Please select a budget range." };
  if (!data.description.trim()) return { success: false, error: "Project description is required." };

  // If Supabase isn't configured, accept anyway (dev mode)
  if (!supabase) {
    console.warn("[submitInquiry] Supabase not configured — inquiry not persisted.");
    return { success: true };
  }

  const { error } = await supabase.from("inquiries").insert({
    business_name: data.businessName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim() || null,
    budget: data.budget,
    description: data.description.trim(),
  });

  if (error) {
    console.error("[submitInquiry]", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
