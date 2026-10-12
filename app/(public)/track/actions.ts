"use server";

import { getClientBriefs } from "@/lib/supabase/admin-queries";

export interface BriefSummary {
  id: string;
  category: string;
  business_name: string | null;
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; description: string; color: string }> = {
  new:                { label: "Received",           description: "Your brief has been received and is in the queue for review.", color: "#6e7bcc" },
  needs_clarification:{ label: "Needs Clarification", description: "We have a few questions before we can proceed. Check your email.", color: "#f5a623" },
  qualified:          { label: "Qualified",           description: "Your brief passed our review. We're now finding the right designers to match you with.", color: "#6dcc46" },
  in_progress:        { label: "In Progress",         description: "Your project is active and work is underway. You'll receive milestone updates by email.", color: "#2dccaa" },
  completed:          { label: "Completed",           description: "Your project has been marked complete. Thank you for working with us.", color: "#6dcc46" },
  declined:           { label: "Declined",            description: "We weren't able to proceed with this brief. Contact us to discuss alternatives.", color: "#e85555" },
  cancelled:          { label: "Cancelled",           description: "This brief was cancelled. Contact us if you'd like to reopen it.", color: "#999" },
  archived:           { label: "Archived",            description: "This brief has been archived. Contact us if you'd like to reopen it.", color: "#999" },
};

export async function lookupBriefsByEmail(email: string): Promise<(BriefSummary & { statusLabel: string; statusDescription: string; statusColor: string })[]> {
  const all = await getClientBriefs();
  return all
    .filter((b) => b.email.toLowerCase().trim() === email.toLowerCase().trim())
    .map((b) => {
      const meta = STATUS_LABELS[b.status] ?? { label: b.status, description: "", color: "#999" };
      return {
        id: b.id,
        category: b.category,
        business_name: b.business_name,
        status: b.status,
        created_at: b.created_at,
        statusLabel: meta.label,
        statusDescription: meta.description,
        statusColor: meta.color,
      };
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
