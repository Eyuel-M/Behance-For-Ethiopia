"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

export async function loginAdmin(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return "Admin credentials are not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local.";
  }

  if (password !== adminPassword) {
    return "Incorrect password.";
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
