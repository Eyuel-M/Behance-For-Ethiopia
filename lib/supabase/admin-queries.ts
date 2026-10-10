import { supabase } from "./server";
import type {
  ClientBriefRow,
  DesignerApplicationRow,
  DesignerFeedbackRow,
  ProjectRow,
  MilestoneRow,
  ProjectNoteRow,
} from "./project-types";

// ─── Client briefs ────────────────────────────────────────────────────────────

const MOCK_BRIEFS: ClientBriefRow[] = [
  {
    id: "mock-brief-1",
    service_mode: "Full-service (end-to-end)",
    category: "Brand Identity",
    design_types: "Logo design, brand guidelines, business card, letterhead",
    project_description: "We are a new coffee export company based in Addis Ababa and need a complete brand identity that reflects our Ethiopian heritage while appealing to international buyers. We want something modern, premium, and memorable.",
    timeline: "3–4 weeks",
    budget: "ETB 25,000–50,000",
    references: "https://behance.net/example1",
    contact_name: "Dawit Alemu",
    business_name: "Habesha Premium Coffee Exports",
    email: "dawit@habeshacoffee.et",
    phone: "+251 91 123 4567",
    engagement_type: "One-time project",
    worked_with_designer: "No, this is our first time",
    hear_about_us: "LinkedIn",
    additional_notes: "We prefer earthy tones — green, brown, gold. Logo should work well on export packaging.",
    status: "new",
    admin_notes: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-brief-2",
    service_mode: "Consultation + freelance hand-off",
    category: "UI/UX Design",
    design_types: "Mobile app UI, user flow diagrams, design system",
    project_description: "We are building a fintech app for micro-lending in rural Ethiopia. Need a clean, simple UI that works well for users with limited smartphone experience. Amharic language support required.",
    timeline: "6–8 weeks",
    budget: "ETB 80,000–120,000",
    references: null,
    contact_name: "Yohannes Tesfaye",
    business_name: "Agar Microfinance Solutions",
    email: "yohannes@agarfinance.et",
    phone: "+251 92 234 5678",
    engagement_type: "Ongoing (monthly retainer)",
    worked_with_designer: "Yes, once or twice",
    hear_about_us: "Word of mouth",
    additional_notes: "App must work offline and handle low-bandwidth connections. Accessibility is a priority.",
    status: "qualified",
    admin_notes: "Strong lead — budget is solid. Assign a UI/UX specialist with fintech experience.",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-brief-3",
    service_mode: "Full-service (end-to-end)",
    category: "Marketing Materials",
    design_types: "Social media templates, brochure, rollup banner, billboard mockup",
    project_description: "Opening our third restaurant location in Bole in two months and need a full marketing push. We already have a logo but need it applied consistently across all materials. Brand colors are red and gold.",
    timeline: "2 weeks",
    budget: "ETB 15,000–25,000",
    references: "https://instagram.com/abyssiniarestaurant",
    contact_name: "Selamawit Girma",
    business_name: "Abyssinia Kitchen",
    email: "sela@abyssiniakitchen.com",
    phone: "+251 91 987 6543",
    engagement_type: "One-time project",
    worked_with_designer: "Yes, multiple times",
    hear_about_us: "Instagram",
    additional_notes: "Deadline is firm — opening is on the 15th. Please confirm availability before accepting.",
    status: "scoping",
    admin_notes: "Tight timeline. Check availability of print designers before assigning.",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-brief-4",
    service_mode: "Full-service (end-to-end)",
    category: "Web Design",
    design_types: "Website redesign (10–15 pages), Webflow build",
    project_description: "Our current website looks outdated and doesn't reflect the quality of our architecture firm. We need a portfolio-focused site that showcases our projects beautifully and converts visitors to enquiries.",
    timeline: "4–6 weeks",
    budget: "ETB 60,000–90,000",
    references: "https://siteinspire.com",
    contact_name: "Biruk Tadesse",
    business_name: "Addis Design Studio",
    email: "biruk@addisdesignstudio.com",
    phone: "+251 93 345 6789",
    engagement_type: "One-time project",
    worked_with_designer: "Yes, once or twice",
    hear_about_us: "Google search",
    additional_notes: "We have high-res photography ready. Prefer Webflow so we can manage content ourselves after handoff.",
    status: "new",
    admin_notes: null,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getClientBriefs(): Promise<ClientBriefRow[]> {
  if (!supabase) return MOCK_BRIEFS;
  const { data, error } = await supabase
    .from("client_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getClientBriefs]", error.message); return []; }
  return data as ClientBriefRow[];
}

export async function getClientBrief(id: string): Promise<ClientBriefRow | null> {
  if (!supabase) return MOCK_BRIEFS.find((b) => b.id === id) ?? null;
  const { data, error } = await supabase
    .from("client_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ClientBriefRow;
}

export async function updateBriefStatus(
  id: string,
  status: string,
  adminNotes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status };
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;
  const { error } = await supabase
    .from("client_applications")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Designer applications ─────────────────────────────────────────────────────

const MOCK_APPLICATIONS: DesignerApplicationRow[] = [
  {
    id: "mock-app-1",
    full_name: "Tigist Bekele",
    email: "tigist.bekele@gmail.com",
    phone: "+251 91 456 7890",
    city: "Addis Ababa",
    specialty: "Brand Identity & Logo Design",
    experience: "6–10 years",
    skills: "Brand identity systems, logo design, typography, packaging design, Figma, Adobe Illustrator",
    tools: "Figma, Illustrator, Photoshop, InDesign",
    portfolio_url: "https://behance.net/tigistbekele",
    availability: "Project-based / Freelance",
    hourly_rate: "ETB 20,000 – 50,000 per project",
    can_work_on_site: "Flexible / Depends on project",
    bio: "I'm a brand identity designer with 8 years of experience helping Ethiopian businesses and startups build memorable visual identities. I've worked with over 40 brands across FMCG, hospitality, and tech sectors, and I specialize in creating brands that feel both globally competitive and deeply rooted in Ethiopian culture.",
    why_join: "I want to connect with more Ethiopian businesses that value strategic design, not just decoration. Hire Ethiopia's Best seems to understand that distinction.",
    worked_with_ethiopian_biz: "Yes, multiple times",
    social_url: "https://linkedin.com/in/tigistbekele",
    work_samples: null,
    status: "pending",
    reviewer_notes: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-app-2",
    full_name: "Natnael Hailu",
    email: "natnael.hailu@design.et",
    phone: "+251 92 567 8901",
    city: "Addis Ababa",
    specialty: "UI/UX Design",
    experience: "3–5 years",
    skills: "User research, Figma prototyping, design systems, mobile-first design, usability testing",
    tools: "Figma, Adobe XD, Maze, Hotjar",
    portfolio_url: "https://natnael.design",
    availability: "Full-time (40 hrs/week)",
    hourly_rate: "ETB 20,000 – 50,000 per project",
    can_work_on_site: "Yes, I can work on-site",
    bio: "Product designer focused on mobile apps and SaaS platforms for the East African market. I've led design at two Addis-based startups and my work has been featured in Google's African tech spotlight. I care deeply about designing for real user contexts — including low-bandwidth and first-time smartphone users.",
    why_join: "Ethiopian businesses deserve design talent that understands local context. I want to be part of building that ecosystem professionally.",
    worked_with_ethiopian_biz: "Currently working with one",
    social_url: "https://linkedin.com/in/natnaelhailu",
    work_samples: null,
    status: "reviewing",
    reviewer_notes: "Strong portfolio. Strong local startup experience. Schedule a call.",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-app-3",
    full_name: "Mekdes Worku",
    email: "mekdes.w@creativeaddis.com",
    phone: "+251 93 678 9012",
    city: "Addis Ababa",
    specialty: "Motion Graphics & Animation",
    experience: "3–5 years",
    skills: "Motion graphics, explainer videos, social media animation, After Effects, Premiere Pro",
    tools: "After Effects, Premiere Pro, Illustrator, Cinema 4D",
    portfolio_url: "[PDF: mekdes_portfolio_2024.pdf]",
    availability: "Part-time (20 hrs/week)",
    hourly_rate: "ETB 5,000 – 20,000 per project",
    can_work_on_site: "Remote only",
    bio: "Motion designer and video editor with 4 years of experience creating engaging content for Ethiopian and Diaspora brands. My animations have been used in YouTube campaigns that collectively reached over 2 million views. I specialize in brand storytelling through motion.",
    why_join: "I want stable, quality clients rather than chasing one-off gigs. The vetting process here means I'll be working with serious businesses.",
    worked_with_ethiopian_biz: "Yes, multiple times",
    social_url: null,
    work_samples: null,
    status: "approved",
    reviewer_notes: "Great reel. Approved for motion graphics and social media animation projects.",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-app-4",
    full_name: "Samuel Fikru",
    email: "samuel.fikru@outlook.com",
    phone: "+251 91 789 0123",
    city: "Dire Dawa",
    specialty: "Print & Marketing Materials",
    experience: "1–2 years",
    skills: "Print layout, brochure design, poster design, InDesign, Canva",
    tools: "InDesign, Photoshop, Illustrator, Canva",
    portfolio_url: "https://drive.google.com/drive/folders/samuel-portfolio",
    availability: "Project-based / Freelance",
    hourly_rate: "Under ETB 5,000 per project",
    can_work_on_site: "Flexible / Depends on project",
    bio: "Junior graphic designer with 2 years of experience focused on print and marketing materials. Based in Dire Dawa and serving clients in the eastern Ethiopia business community. I have designed materials for 12 local businesses including restaurants, clinics, and schools. Eager to grow and take on bigger brand challenges.",
    why_join: "I'm the only professional designer in Dire Dawa I know of and I want access to clients outside my immediate network. I'm hungry to learn and deliver great work.",
    worked_with_ethiopian_biz: "Yes, multiple times",
    social_url: null,
    work_samples: null,
    status: "waitlisted",
    reviewer_notes: "Promising but portfolio needs more depth. Revisit in 3 months.",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getDesignerApplications(): Promise<DesignerApplicationRow[]> {
  if (!supabase) return MOCK_APPLICATIONS;
  const { data, error } = await supabase
    .from("designer_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getDesignerApplications]", error.message); return []; }
  return data as DesignerApplicationRow[];
}

export async function getDesignerApplication(id: string): Promise<DesignerApplicationRow | null> {
  if (!supabase) return MOCK_APPLICATIONS.find((a) => a.id === id) ?? null;
  const { data, error } = await supabase
    .from("designer_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as DesignerApplicationRow;
}

export async function updateApplicationStatus(
  id: string,
  status: string,
  reviewerNotes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status };
  if (reviewerNotes !== undefined) updates.reviewer_notes = reviewerNotes;
  const { error } = await supabase
    .from("designer_applications")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const MOCK_PROJECTS: ProjectRow[] = [
  {
    id: "mock-project-1",
    brief_id: "mock-brief-2",
    title: "Agar Microfinance — Mobile App UI",
    client_name: "Yohannes Tesfaye",
    client_email: "yohannes@agarfinance.et",
    client_business: "Agar Microfinance Solutions",
    assigned_professional_ids: ["mock-app-2"],
    service_mode: "Consultation + freelance hand-off",
    category: "UI/UX Design",
    deliverables: "Mobile app UI, user flow diagrams, design system — Amharic language support required. App must work offline and handle low-bandwidth connections.",
    exclusions: "Development / engineering work",
    assumptions: null,
    acceptance_criteria: "All screens approved by product owner, design system handed off in Figma",
    revision_limit: 2,
    status: "in_progress",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    budget: "ETB 80,000–120,000",
    manager_notes: "Natnael is assigned. Kick-off call done. Wireframes expected by end of week.",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getProjects(): Promise<ProjectRow[]> {
  if (!supabase) return MOCK_PROJECTS;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getProjects]", error.message); return []; }
  return data as ProjectRow[];
}

export async function getProject(id: string): Promise<ProjectRow | null> {
  if (!supabase) return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as ProjectRow;
}

export async function createProject(input: {
  briefId: string | null;
  title: string;
  clientName: string;
  clientEmail: string;
  clientBusiness: string;
  serviceMode: string;
  category: string;
  deliverables: string;
  exclusions?: string;
  assumptions?: string;
  acceptanceCriteria?: string;
  revisionLimit?: number;
  deadline?: string;
  budget: string;
  managerNotes?: string;
}): Promise<string> {
  if (!supabase) {
    console.warn("[createProject] Supabase not configured — project not persisted.");
    return "mock-project-1";
  }
  const { data, error } = await supabase
    .from("projects")
    .insert({
      brief_id: input.briefId,
      title: input.title,
      client_name: input.clientName,
      client_email: input.clientEmail,
      client_business: input.clientBusiness,
      assigned_professional_ids: [],
      service_mode: input.serviceMode,
      category: input.category,
      deliverables: input.deliverables,
      exclusions: input.exclusions || null,
      assumptions: input.assumptions || null,
      acceptance_criteria: input.acceptanceCriteria || null,
      revision_limit: input.revisionLimit ?? 2,
      status: "ready_to_start",
      deadline: input.deadline || null,
      budget: input.budget,
      manager_notes: input.managerNotes || null,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function updateProjectStatus(
  id: string,
  status: string,
  notes?: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const updates: Record<string, string> = { status, updated_at: new Date().toISOString() };
  if (notes !== undefined) updates.manager_notes = notes;
  const { error } = await supabase.from("projects").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Milestones ───────────────────────────────────────────────────────────────

const MOCK_MILESTONES: MilestoneRow[] = [
  {
    id: "mock-ms-1",
    project_id: "mock-project-1",
    title: "Discovery & User Research",
    description: "Interviews with 5 rural users, competitive analysis, accessibility audit",
    due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "accepted",
    payment_condition: "25% on acceptance",
    sort_order: 0,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-ms-2",
    project_id: "mock-project-1",
    title: "Wireframes & User Flows",
    description: "Low-fidelity wireframes for all core screens, Amharic typography exploration",
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in_progress",
    payment_condition: null,
    sort_order: 1,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-ms-3",
    project_id: "mock-project-1",
    title: "High-Fidelity UI & Design System",
    description: "Full Figma designs, component library, light/dark mode, offline-state screens",
    due_date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    payment_condition: "50% on acceptance",
    sort_order: 2,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-ms-4",
    project_id: "mock-project-1",
    title: "Developer Handoff",
    description: "Annotated Figma, asset export, design token documentation",
    due_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    payment_condition: "25% on handoff",
    sort_order: 3,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getProjectMilestones(projectId: string): Promise<MilestoneRow[]> {
  if (!supabase) return MOCK_MILESTONES.filter((m) => m.project_id === projectId);
  const { data, error } = await supabase
    .from("project_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data as MilestoneRow[];
}

export async function addMilestone(input: {
  projectId: string;
  title: string;
  description?: string;
  dueDate?: string;
  paymentCondition?: string;
  sortOrder?: number;
}): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("project_milestones").insert({
    project_id: input.projectId,
    title: input.title,
    description: input.description || null,
    due_date: input.dueDate || null,
    status: "pending",
    payment_condition: input.paymentCondition || null,
    sort_order: input.sortOrder ?? 0,
  });
  if (error) throw new Error(error.message);
}

export async function updateMilestoneStatus(
  id: string,
  status: string
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase
    .from("project_milestones")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Project notes ────────────────────────────────────────────────────────────

const MOCK_NOTES: ProjectNoteRow[] = [
  {
    id: "mock-note-1",
    project_id: "mock-project-1",
    author: "Admin",
    content: "Kick-off call completed. Natnael confirmed scope and timeline. Research phase starts Monday.",
    is_internal: true,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-note-2",
    project_id: "mock-project-1",
    author: "Admin",
    content: "Discovery phase delivered on time. User research report shared with client — positive feedback. Moving to wireframes.",
    is_internal: false,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getProjectNotes(projectId: string): Promise<ProjectNoteRow[]> {
  if (!supabase) return MOCK_NOTES.filter((n) => n.project_id === projectId);
  const { data, error } = await supabase
    .from("project_notes")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) return [];
  return data as ProjectNoteRow[];
}

export async function addProjectNote(input: {
  projectId: string;
  author: string;
  content: string;
  isInternal?: boolean;
}): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("project_notes").insert({
    project_id: input.projectId,
    author: input.author,
    content: input.content,
    is_internal: input.isInternal ?? true,
  });
  if (error) throw new Error(error.message);
}

// ─── Designer feedback ────────────────────────────────────────────────────────

const MOCK_FEEDBACK: DesignerFeedbackRow[] = [
  {
    id: "fb-tigist-001",
    designer_application_id: "mock-app-1",
    project_title: "Brand Identity — Habesha Premium Coffee Exports",
    client_name: "Dawit Alemu",
    client_email: "dawit@habeshacoffee.et",
    quality_rating: 5,
    communication_rating: 4,
    delivery_rating: 5,
    would_rehire: "yes",
    comments: "Tigist delivered a brand that felt authentically Ethiopian and globally professional at the same time. The logo works beautifully on our export packaging. Highly recommend.",
    status: "submitted",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fb-tigist-002",
    designer_application_id: "mock-app-1",
    project_title: "Marketing Materials — Addis Organic Bakery",
    client_name: "Sara Tesfaye",
    client_email: "sara@addisbakery.com",
    quality_rating: 4,
    communication_rating: 5,
    delivery_rating: 3,
    would_rehire: "yes",
    comments: "Excellent quality and she was very communicative throughout the project. Delivery took a bit longer than expected but the end result was worth it.",
    status: "submitted",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fb-tigist-003",
    designer_application_id: "mock-app-1",
    project_title: "Website Redesign — Addis Flowers Import/Export",
    client_name: "Hiwot Bekele",
    client_email: "hiwot@addisflowers.et",
    quality_rating: null,
    communication_rating: null,
    delivery_rating: null,
    would_rehire: null,
    comments: null,
    status: "pending",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    submitted_at: null,
  },
  {
    id: "fb-mekdes-001",
    designer_application_id: "mock-app-3",
    project_title: "Social Media Campaign — EthioTech Solutions",
    client_name: "Yonas Girma",
    client_email: "yonas@ethiotech.et",
    quality_rating: 5,
    communication_rating: 5,
    delivery_rating: 5,
    would_rehire: "yes",
    comments: "Mekdes produced outstanding motion graphics for our product launch. Everything delivered on time and the animations were exactly what we envisioned. Will definitely work together again.",
    status: "submitted",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fb-mekdes-002",
    designer_application_id: "mock-app-3",
    project_title: "Explainer Video — Kifiya Financial Technology",
    client_name: "Nebiat Hailu",
    client_email: "nebiat@kifiya.et",
    quality_rating: 5,
    communication_rating: 4,
    delivery_rating: 4,
    would_rehire: "maybe",
    comments: "Very talented motion designer. The explainer video was polished and professional. One revision round took longer than expected. Overall happy with the result.",
    status: "submitted",
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    submitted_at: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getAllFeedback(): Promise<DesignerFeedbackRow[]> {
  if (!supabase) return MOCK_FEEDBACK;
  const { data, error } = await supabase
    .from("designer_feedback")
    .select("*")
    .eq("status", "submitted");
  if (error) { console.error("[getAllFeedback]", error.message); return []; }
  return data as DesignerFeedbackRow[];
}

export async function getDesignerFeedback(designerApplicationId: string): Promise<DesignerFeedbackRow[]> {
  if (!supabase) return MOCK_FEEDBACK.filter((f) => f.designer_application_id === designerApplicationId);
  const { data, error } = await supabase
    .from("designer_feedback")
    .select("*")
    .eq("designer_application_id", designerApplicationId)
    .order("created_at", { ascending: false });
  if (error) { console.error("[getDesignerFeedback]", error.message); return []; }
  return data as DesignerFeedbackRow[];
}

export async function getFeedbackByToken(token: string): Promise<DesignerFeedbackRow | null> {
  if (!supabase) return MOCK_FEEDBACK.find((f) => f.id === token) ?? null;
  const { data, error } = await supabase
    .from("designer_feedback")
    .select("*")
    .eq("id", token)
    .single();
  if (error) return null;
  return data as DesignerFeedbackRow;
}

export async function createFeedbackRequest(input: {
  designerApplicationId: string;
  projectTitle: string;
  clientName: string;
  clientEmail?: string;
}): Promise<string> {
  const token = crypto.randomUUID();
  if (!supabase) {
    console.warn("[createFeedbackRequest] Supabase not configured — token not persisted:", token);
    return token;
  }
  const { error } = await supabase.from("designer_feedback").insert({
    id: token,
    designer_application_id: input.designerApplicationId,
    project_title: input.projectTitle,
    client_name: input.clientName,
    client_email: input.clientEmail || null,
    status: "pending",
  });
  if (error) throw new Error(error.message);
  return token;
}

export async function submitFeedbackResponse(input: {
  token: string;
  qualityRating: number;
  communicationRating: number;
  deliveryRating: number;
  wouldRehire: "yes" | "maybe" | "no";
  comments: string;
}): Promise<void> {
  if (!supabase) {
    console.warn("[submitFeedbackResponse] Supabase not configured — response not persisted.");
    return;
  }
  const { error } = await supabase
    .from("designer_feedback")
    .update({
      quality_rating: input.qualityRating,
      communication_rating: input.communicationRating,
      delivery_rating: input.deliveryRating,
      would_rehire: input.wouldRehire,
      comments: input.comments,
      status: "submitted",
      submitted_at: new Date().toISOString(),
    })
    .eq("id", input.token);
  if (error) throw new Error(error.message);
}

