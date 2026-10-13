import { type NextRequest } from "next/server";
import crypto from "crypto";
import { getMilestone, getProject, markMilestoneFunded } from "@/lib/supabase/admin-queries";
import { notifyAdmin } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Verify HMAC-SHA256 signature when a webhook secret is configured
  const webhookSecret = process.env.CHAPA_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = request.headers.get("x-chapa-signature") ?? "";
    const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
    if (expected !== signature) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = payload.status as string | undefined;
  const txRef = payload.tx_ref as string | undefined;

  if (status !== "success" || !txRef) {
    return Response.json({ ok: true });
  }

  // tx_ref format: "heb-{milestoneId}"
  const milestoneId = txRef.startsWith("heb-") ? txRef.slice(4) : txRef;

  const milestone = await getMilestone(milestoneId).catch(() => null);
  if (!milestone) return Response.json({ ok: true });

  await markMilestoneFunded(milestoneId, txRef).catch(console.error);

  const project = await getProject(milestone.project_id).catch(() => null);
  const projectTitle = project?.title ?? "Unknown project";
  const amountStr = (payload.amount as string | undefined) ?? String(milestone.amount ?? 0);

  notifyAdmin(
    `💳 *Payment confirmed via Chapa*\nProject: ${projectTitle}\nMilestone: ${milestone.title}\nAmount: ETB ${amountStr}\nRef: ${txRef}`
  ).catch(() => {});

  return Response.json({ ok: true });
}
