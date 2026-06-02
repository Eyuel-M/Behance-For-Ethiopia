import { supabase } from "./server";
import type { Designer } from "@/lib/types";

export type InquiryRow = {
  id: string;
  business_name: string;
  email: string;
  phone: string | null;
  budget: string;
  description: string;
  created_at: string;
};

export async function getAllInquiries(): Promise<InquiryRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as InquiryRow[];
}

export type DesignerInput = Omit<Designer, "id" | "reviewCount" | "photoUrl"> & {
  reviewCount?: number;
};

export async function createDesigner(input: DesignerInput): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("designers").insert({
    name: input.name,
    slug: input.slug,
    category: input.category,
    skills: input.skills,
    experience: input.experience,
    location: input.location,
    rate: input.rate,
    rating: input.rating,
    review_count: input.reviewCount ?? 0,
    bio: input.bio,
    available: input.available,
    avatar_color: input.avatarColor,
    avatar_text: input.avatarText,
    portfolio: input.portfolio,
  });
  if (error) throw new Error(error.message);
}

export async function updateDesigner(id: string, input: Partial<DesignerInput>): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase
    .from("designers")
    .update({
      name: input.name,
      slug: input.slug,
      category: input.category,
      skills: input.skills,
      experience: input.experience,
      location: input.location,
      rate: input.rate,
      bio: input.bio,
      available: input.available,
      avatar_color: input.avatarColor,
      avatar_text: input.avatarText,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteDesigner(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured.");
  const { error } = await supabase.from("designers").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
