"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requestOtp, verifyOtp, updateProfessionalProfile } from "@/lib/supabase/admin-queries";

const COOKIE = "pro_session";
const COOKIE_OPTS = { httpOnly: true, path: "/", sameSite: "lax" as const, maxAge: 7 * 24 * 60 * 60 };

export type OtpRequestResult = { error?: string; demoCode?: string; phone?: string };
export type OtpVerifyResult = { error?: string };
export type ProfileSaveResult = { error?: string };

export async function sendOtp(_prev: OtpRequestResult, formData: FormData): Promise<OtpRequestResult> {
  const phone = (formData.get("phone") as string ?? "").trim();
  if (!phone) return { error: "Please enter your phone number." };

  const result = await requestOtp(phone);
  if (!result.found) return { error: "No account found for that phone number. Please use the number you registered with." };

  // Real mode: OTP sent via WhatsApp — nothing to return
  // Demo mode: surface the code so the user can see it
  return { demoCode: result.demoCode, phone };
}

export async function verifyOtpAction(_prev: OtpVerifyResult, formData: FormData): Promise<OtpVerifyResult> {
  const phone = (formData.get("phone") as string ?? "").trim();
  const code = (formData.get("code") as string ?? "").trim();
  if (!phone || !code) return { error: "Please enter the 6-digit code." };

  const result = await verifyOtp(phone, code);
  if (!result.success || !result.sessionToken) return { error: "Invalid or expired code. Please try again." };

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, result.sessionToken, COOKIE_OPTS);
  redirect("/account/profile");
}

export async function saveProfile(_prev: ProfileSaveResult, formData: FormData): Promise<ProfileSaveResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) redirect("/account");

  const applicationId = formData.get("applicationId") as string;
  if (!applicationId) return { error: "Session error. Please log in again." };

  const workSampleUrls = [
    formData.get("ws_0") as string,
    formData.get("ws_1") as string,
    formData.get("ws_2") as string,
  ].filter(Boolean);

  try {
    await updateProfessionalProfile(applicationId, {
      bio: formData.get("bio") as string,
      skills: formData.get("skills") as string,
      tools: formData.get("tools") as string,
      availability: formData.get("availability") as string,
      hourly_rate: formData.get("hourly_rate") as string,
      portfolio_url: formData.get("portfolio_url") as string,
      social_url: formData.get("social_url") as string,
      work_samples: workSampleUrls.length > 0 ? JSON.stringify(workSampleUrls) : undefined,
    });
  } catch {
    return { error: "Failed to save. Please try again." };
  }

  return {};
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
  redirect("/account");
}
