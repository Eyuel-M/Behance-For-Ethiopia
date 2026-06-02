import { supabase } from "./server";
import type { Designer } from "@/lib/types";

// Row shape returned by Supabase (snake_case columns)
type DesignerRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  skills: string[];
  experience: number;
  location: string;
  rate: number;
  rating: number;
  review_count: number;
  bio: string;
  available: boolean;
  photo_url: string | null;
  avatar_color: string;
  avatar_text: string;
  portfolio: Designer["portfolio"];
};

function toDesigner(row: DesignerRow): Designer {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    skills: row.skills,
    experience: row.experience,
    location: row.location,
    rate: row.rate,
    rating: row.rating,
    reviewCount: row.review_count,
    bio: row.bio,
    available: row.available,
    photoUrl: row.photo_url ?? undefined,
    avatarColor: row.avatar_color,
    avatarText: row.avatar_text,
    portfolio: row.portfolio,
  };
}

export async function getAllDesigners(): Promise<Designer[]> {
  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to fetch designers: ${error.message}`);
  return (data as DesignerRow[]).map(toDesigner);
}

export async function getDesignerBySlug(slug: string): Promise<Designer | null> {
  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw new Error(`Failed to fetch designer: ${error.message}`);
  }
  return toDesigner(data as DesignerRow);
}
