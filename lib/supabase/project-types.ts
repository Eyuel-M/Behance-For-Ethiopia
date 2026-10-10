// Shared types for project management — used by admin queries and client views

export type BriefStatus =
  | "new"
  | "needs_clarification"
  | "qualified"
  | "declined"
  | "scoping"
  | "quote_sent"
  | "awaiting_agreement"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "approved"
  | "conditionally_approved"
  | "waitlisted"
  | "rejected";

export type ProjectStatus =
  | "ready_to_start"
  | "in_progress"
  | "submitted_for_review"
  | "revision_requested"
  | "change_requested"
  | "accepted"
  | "completed"
  | "disputed"
  | "cancelled";

export type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "submitted"
  | "revision_requested"
  | "accepted";

export const BRIEF_STATUS_LABELS: Record<BriefStatus, string> = {
  new: "New",
  needs_clarification: "Needs clarification",
  qualified: "Qualified",
  declined: "Declined",
  scoping: "Scoping",
  quote_sent: "Quote sent",
  awaiting_agreement: "Awaiting agreement",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const BRIEF_STATUS_COLORS: Record<BriefStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  needs_clarification: "bg-orange-50 text-orange-700 border-orange-100",
  qualified: "bg-green-50 text-green-700 border-green-100",
  declined: "bg-red-50 text-red-700 border-red-100",
  scoping: "bg-purple-50 text-purple-700 border-purple-100",
  quote_sent: "bg-amber-50 text-amber-700 border-amber-100",
  awaiting_agreement: "bg-yellow-50 text-yellow-700 border-yellow-100",
  in_progress: "bg-green-50 text-green-700 border-green-100",
  completed: "bg-zinc-100 text-zinc-600 border-zinc-200",
  cancelled: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  reviewing: "Reviewing",
  approved: "Approved",
  conditionally_approved: "Conditional",
  waitlisted: "Waitlisted",
  rejected: "Rejected",
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: "bg-blue-50 text-blue-700 border-blue-100",
  reviewing: "bg-purple-50 text-purple-700 border-purple-100",
  approved: "bg-green-50 text-green-700 border-green-100",
  conditionally_approved: "bg-amber-50 text-amber-700 border-amber-100",
  waitlisted: "bg-yellow-50 text-yellow-700 border-yellow-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  ready_to_start: "Ready to start",
  in_progress: "In progress",
  submitted_for_review: "Submitted for review",
  revision_requested: "Revision requested",
  change_requested: "Change requested",
  accepted: "Accepted",
  completed: "Completed",
  disputed: "Disputed",
  cancelled: "Cancelled",
};

export const MILESTONE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  pending: "Pending",
  in_progress: "In progress",
  submitted: "Submitted",
  revision_requested: "Revision needed",
  accepted: "Accepted",
};

export const MILESTONE_STATUS_COLORS: Record<MilestoneStatus, string> = {
  pending: "bg-zinc-100 text-zinc-500 border-zinc-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-100",
  submitted: "bg-amber-50 text-amber-700 border-amber-100",
  revision_requested: "bg-orange-50 text-orange-700 border-orange-100",
  accepted: "bg-green-50 text-green-700 border-green-100",
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  ready_to_start: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-green-50 text-green-700 border-green-100",
  submitted_for_review: "bg-amber-50 text-amber-700 border-amber-100",
  revision_requested: "bg-orange-50 text-orange-700 border-orange-100",
  change_requested: "bg-purple-50 text-purple-700 border-purple-100",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
  completed: "bg-zinc-100 text-zinc-600 border-zinc-200",
  disputed: "bg-red-50 text-red-700 border-red-100",
  cancelled: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export type ClientBriefRow = {
  id: string;
  service_mode: string;
  category: string;
  design_types: string;
  project_description: string;
  timeline: string;
  budget: string;
  references: string | null;
  contact_name: string;
  business_name: string;
  email: string;
  phone: string;
  engagement_type: string;
  worked_with_designer: string;
  hear_about_us: string;
  additional_notes: string | null;
  status: BriefStatus;
  admin_notes: string | null;
  created_at: string;
};

export type DesignerApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  specialty: string;
  experience: string;
  skills: string;
  tools: string;
  portfolio_url: string;
  availability: string;
  hourly_rate: string;
  can_work_on_site: string;
  bio: string;
  why_join: string;
  worked_with_ethiopian_biz: string;
  social_url: string | null;
  work_samples: string | null; // JSON array of public image URLs
  status: ApplicationStatus;
  reviewer_notes: string | null;
  created_at: string;
};

export type ClientProposalRow = {
  id: string; // UUID — also the URL token
  project_id: string;
  designer_application_ids: string[]; // 1–3 designer IDs (order = label A/B/C)
  selected_designer_id: string | null;
  status: "pending" | "viewed" | "selected";
  created_at: string;
  selected_at: string | null;
};

export type DesignerFeedbackRow = {
  id: string; // UUID — also the public token in the feedback URL
  designer_application_id: string;
  project_title: string | null;
  client_name: string | null;
  client_email: string | null;
  quality_rating: number | null; // 1–5
  communication_rating: number | null; // 1–5
  delivery_rating: number | null; // 1–5, on-time
  would_rehire: "yes" | "maybe" | "no" | null;
  comments: string | null;
  status: "pending" | "submitted";
  created_at: string;
  submitted_at: string | null;
};

export type ProjectRow = {
  id: string;
  brief_id: string | null;
  title: string;
  client_name: string;
  client_email: string;
  client_business: string;
  assigned_professional_ids: string[];
  service_mode: string;
  category: string;
  deliverables: string;
  exclusions: string | null;
  assumptions: string | null;
  acceptance_criteria: string | null;
  revision_limit: number;
  status: ProjectStatus;
  deadline: string | null;
  budget: string;
  manager_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type MilestoneRow = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: MilestoneStatus;
  payment_condition: string | null;
  sort_order: number;
  created_at: string;
};

export type ProjectNoteRow = {
  id: string;
  project_id: string;
  author: string;
  content: string;
  is_internal: boolean;
  created_at: string;
};
