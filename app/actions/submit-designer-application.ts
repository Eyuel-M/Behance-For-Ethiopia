"use server";

import { supabase } from "@/lib/supabase/server";

export type DesignerApplicationData = {
  // Personal
  fullName: string;
  email: string;
  phone: string;
  city: string;
  // Expertise
  specialty: string;
  experience: string;
  skills: string;
  tools: string; // comma-separated
  portfolioUrl: string;
  // Availability
  availability: string;
  hourlyRate: string;
  canWorkOnSite: string;
  // About
  bio: string;
  whyJoin: string;
  workedWithEthiopianBiz: string;
  socialUrl: string;
};

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitDesignerApplication(
  data: DesignerApplicationData
): Promise<SubmitResult> {
  if (!data.fullName.trim()) return { success: false, error: "Full name is required." };
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { success: false, error: "A valid email address is required." };
  if (!data.phone.trim()) return { success: false, error: "Phone number is required." };
  if (!data.city) return { success: false, error: "Please select your city." };
  if (!data.specialty) return { success: false, error: "Please select your primary specialty." };
  if (!data.experience) return { success: false, error: "Please select your years of experience." };
  if (!data.skills.trim()) return { success: false, error: "Please describe your key skills." };
  if (!data.portfolioUrl.trim()) return { success: false, error: "Portfolio URL is required." };
  if (!data.availability) return { success: false, error: "Please select your availability." };
  if (!data.hourlyRate) return { success: false, error: "Please select your expected hourly rate." };
  if (!data.bio.trim() || data.bio.trim().length < 80)
    return { success: false, error: "Please write a bio of at least 80 characters." };
  if (!data.whyJoin.trim()) return { success: false, error: "Please tell us why you want to join." };

  if (!supabase) {
    console.warn("[submitDesignerApplication] Supabase not configured — application not persisted.");
    return { success: true };
  }

  const { error } = await supabase.from("designer_applications").insert({
    full_name: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    specialty: data.specialty,
    experience: data.experience,
    skills: data.skills.trim(),
    tools: data.tools,
    portfolio_url: data.portfolioUrl.trim(),
    availability: data.availability,
    hourly_rate: data.hourlyRate,
    can_work_on_site: data.canWorkOnSite,
    bio: data.bio.trim(),
    why_join: data.whyJoin.trim(),
    worked_with_ethiopian_biz: data.workedWithEthiopianBiz,
    social_url: data.socialUrl.trim() || null,
    status: "pending",
  });

  if (error) {
    console.error("[submitDesignerApplication]", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
