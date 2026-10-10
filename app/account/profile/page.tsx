import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionApplication } from "@/lib/supabase/admin-queries";
import ProfileForm from "@/components/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("pro_session")?.value;
  if (!token) redirect("/account");

  const app = await getSessionApplication(token);
  if (!app) redirect("/account");

  const existingSamples: string[] = (() => {
    try { return JSON.parse(app.work_samples ?? "[]") as string[]; } catch { return []; }
  })();

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "#f8fafc" }}>

      {/* Top nav */}
      <nav style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", lineHeight: 1 }}>Hire Ethiopia&apos;s Best</p>
              <p style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1, marginTop: 1 }}>Professional account</p>
            </div>
          </div>
          <form action={async () => { "use server"; const c = await cookies(); c.delete("pro_session"); redirect("/account"); }}>
            <button type="submit" style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
              Log out
            </button>
          </form>
        </div>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{app.full_name[0]}</span>
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111827", letterSpacing: "-0.02em", marginBottom: 2 }}>{app.full_name}</h1>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{app.specialty} · {app.city}</p>
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, backgroundColor: app.status === "approved" ? "#dcfce7" : "#fef9c3", border: `1px solid ${app.status === "approved" ? "#bbf7d0" : "#fde68a"}`, color: app.status === "approved" ? "#15803d" : "#92400e" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" }} />
            {app.status === "approved" ? "Active" : app.status === "waitlisted" ? "Waitlisted" : "Under review"}
          </div>
        </div>

        {app.review_requested && (
          <div style={{ marginBottom: 24, padding: "12px 16px", borderRadius: 12, backgroundColor: "#fefce8", border: "1px solid #fde68a", display: "flex", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="8" cy="8" r="7" fill="#fbbf24" />
              <path d="M8 5v4M8 11v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>Profile update under review</p>
              <p style={{ fontSize: 12, color: "#a16207", marginTop: 2 }}>Your recent changes are being reviewed by our team. We&apos;ll notify you once approved.</p>
            </div>
          </div>
        )}

        <ProfileForm app={app} existingSamples={existingSamples} />
      </div>
    </div>
  );
}
