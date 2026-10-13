"use server";

import { redirect } from "next/navigation";
import { getMilestone, getProjectByClientToken, markMilestoneFunded } from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";

export async function initiateMilestonePayment(formData: FormData): Promise<void> {
  const milestoneId = ((formData.get("milestoneId") as string) ?? "").trim();
  const token = ((formData.get("token") as string) ?? "").trim();

  const [milestone, project] = await Promise.all([
    getMilestone(milestoneId),
    getProjectByClientToken(token),
  ]);

  if (!milestone || !project) redirect(`/project/${token}`);
  if (milestone.payment_status !== "pending") redirect(`/project/${token}`);

  const amount = milestone.amount ?? 0;
  const returnUrl = `${SITE_URL}/project/${token}?payment=success`;
  const chapaKey = process.env.CHAPA_SECRET_KEY;

  if (!chapaKey) {
    // Demo mode — simulate a successful payment
    await markMilestoneFunded(milestoneId, `demo-${milestoneId}`).catch(console.error);
    notifyAdmin(
      `💳 *Payment received (demo mode)*\nProject: ${project.title}\nMilestone: ${milestone.title}\nAmount: ETB ${amount.toLocaleString()}`
    ).catch(() => {});
    redirect(returnUrl);
  }

  // Real Chapa payment initialisation
  const txRef = `heb-${milestoneId}`;
  const nameParts = project.client_name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || firstName;

  const body = {
    amount: String(amount),
    currency: "ETB",
    email: project.client_email,
    first_name: firstName,
    last_name: lastName,
    tx_ref: txRef,
    callback_url: `${SITE_URL}/api/chapa/webhook`,
    return_url: returnUrl,
    "customization[title]": "Milestone Payment",
    "customization[description]": `${milestone.title} — ${project.title}`,
  };

  let checkoutUrl: string | null = null;
  try {
    const res = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chapaKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data: { data?: { checkout_url?: string } } = await res.json();
      checkoutUrl = data?.data?.checkout_url ?? null;
    } else {
      console.error("[Chapa] Initialize failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[Chapa] Network error:", e);
  }

  if (!checkoutUrl) redirect(`/project/${token}?payment=error`);
  redirect(checkoutUrl);
}
