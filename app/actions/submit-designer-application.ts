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
  // Education & certifications
  education?: string;
  certificates?: string;
};

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitDesignerApplication(
  formData: FormData
): Promise<SubmitResult> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const fullName = get("fullName");
  const email = get("email");
  const phone = get("phone");
  const city = get("city");
  const specialty = get("specialty");
  const experience = get("experience");
  const skills = get("skills");
  const tools = get("tools");
  const portfolioUrl = get("portfolioUrl");
  const availability = get("availability");
  const hourlyRate = get("hourlyRate");
  const canWorkOnSite = get("canWorkOnSite");
  const bio = get("bio");
  const whyJoin = get("whyJoin");
  const workedWithEthiopianBiz = get("workedWithEthiopianBiz");
  const socialUrl = get("socialUrl");
  const education = get("education");
  const certificates = get("certificates");

  if (!fullName) return { success: false, error: "Full name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, error: "A valid email address is required." };
  if (!phone) return { success: false, error: "Phone number is required." };
  if (!city) return { success: false, error: "Please select your city." };
  if (!specialty) return { success: false, error: "Please select your primary specialty." };
  if (!experience) return { success: false, error: "Please select your years of experience." };
  if (!skills) return { success: false, error: "Please describe your key skills." };
  if (!portfolioUrl) return { success: false, error: "Portfolio is required." };
  if (!availability) return { success: false, error: "Please select your availability." };
  if (!hourlyRate) return { success: false, error: "Please select your typical project rate." };
  if (!bio || bio.length < 80)
    return { success: false, error: "Please write a bio of at least 80 characters." };
  if (!whyJoin) return { success: false, error: "Please tell us why you want to join." };

  // Extract work sample files (up to 5)
  const workSampleFiles: File[] = [];
  for (let i = 0; i < 5; i++) {
    const file = formData.get(`workSample_${i}`);
    if (file instanceof File && file.size > 0) workSampleFiles.push(file);
  }

  // Extract certificate files (up to 3)
  const certFileList: File[] = [];
  for (let i = 0; i < 3; i++) {
    const file = formData.get(`certFile_${i}`);
    if (file instanceof File && file.size > 0) certFileList.push(file);
  }

  if (!supabase) {
    const { storeDemoApplicationSubmission } = await import("@/lib/supabase/admin-queries");
    storeDemoApplicationSubmission({
      full_name: fullName, email, phone, city, specialty, experience,
      skills, tools, portfolio_url: portfolioUrl, availability,
      hourly_rate: hourlyRate, can_work_on_site: canWorkOnSite,
      bio, why_join: whyJoin, worked_with_ethiopian_biz: workedWithEthiopianBiz,
      social_url: socialUrl || null, work_samples: null,
      education: education || null, certificates: certificates || null,
      certificate_files: null,
    });
    return { success: true };
  }

  // Upload work sample images to Supabase Storage
  let workSamplesJson: string | null = null;
  if (workSampleFiles.length > 0) {
    const urls: string[] = [];
    for (const file of workSampleFiles) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("portfolio-samples")
        .upload(path, file, { contentType: file.type });
      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("portfolio-samples")
          .getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    if (urls.length > 0) workSamplesJson = JSON.stringify(urls);
  }

  // Upload certificate files to Supabase Storage
  let certFilesJson: string | null = null;
  if (certFileList.length > 0) {
    const urls: string[] = [];
    for (const file of certFileList) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
      const path = `certs/${crypto.randomUUID()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("portfolio-samples")
        .upload(path, file, { contentType: file.type });
      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from("portfolio-samples")
          .getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    if (urls.length > 0) certFilesJson = JSON.stringify(urls);
  }

  const { error } = await supabase.from("designer_applications").insert({
    full_name: fullName,
    email,
    phone,
    city,
    specialty,
    experience,
    skills,
    tools,
    portfolio_url: portfolioUrl,
    availability,
    hourly_rate: hourlyRate,
    can_work_on_site: canWorkOnSite,
    bio,
    why_join: whyJoin,
    worked_with_ethiopian_biz: workedWithEthiopianBiz,
    social_url: socialUrl || null,
    work_samples: workSamplesJson,
    education: education || null,
    certificates: certificates || null,
    certificate_files: certFilesJson,
    status: "pending",
  });

  if (error) {
    console.error("[submitDesignerApplication]", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
