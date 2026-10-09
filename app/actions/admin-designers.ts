"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createDesigner,
  updateDesigner,
  deleteDesigner,
} from "@/lib/supabase/admin-queries";

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function parseForm(formData: FormData) {
  return {
    name: (formData.get("name") as string).trim(),
    category: formData.get("category") as string,
    skills: (formData.get("skills") as string).split(",").map((s) => s.trim()).filter(Boolean),
    experience: parseInt(formData.get("experience") as string, 10),
    location: (formData.get("location") as string).trim(),
    rate: parseInt(formData.get("rate") as string, 10),
    bio: (formData.get("bio") as string).trim(),
    available: formData.get("available") === "true",
    avatarColor: "bg-stone-200",
    avatarText: "text-stone-800",
    portfolio: [],
    rating: 0,
  };
}

export async function createDesignerAction(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  try {
    const data = parseForm(formData);
    await createDesigner({ ...data, slug: slugify(data.name) });
  } catch (e) {
    return (e as Error).message;
  }
  revalidatePath("/admin/designers");
  revalidatePath("/(public)/designers");
  redirect("/admin/designers");
}

export async function updateDesignerAction(
  id: string,
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  try {
    const data = parseForm(formData);
    await updateDesigner(id, { ...data, slug: slugify(data.name) });
  } catch (e) {
    return (e as Error).message;
  }
  revalidatePath("/admin/designers");
  revalidatePath("/(public)/designers");
  redirect("/admin/designers");
}

export async function deleteDesignerAction(id: string): Promise<void> {
  await deleteDesigner(id);
  revalidatePath("/admin/designers");
  revalidatePath("/(public)/designers");
}
