import type { DesignerApplicationRow } from "./supabase/project-types";

// Returns 0–100. Required fields = 60 pts; optional extras = 40 pts.
export function profileCompletion(app: DesignerApplicationRow): number {
  const has = (v: string | null | undefined) => !!v?.trim();
  const hasSamples = (v: string | null) => {
    if (!v) return false;
    try { return (JSON.parse(v) as unknown[]).length > 0; } catch { return false; }
  };

  const checks: [boolean, number][] = [
    // Required
    [has(app.full_name), 5],
    [has(app.email), 5],
    [has(app.phone), 5],
    [has(app.city), 3],
    [has(app.specialty), 5],
    [has(app.experience), 5],
    [has(app.skills), 5],
    [has(app.portfolio_url), 8],
    [has(app.availability), 4],
    [has(app.hourly_rate), 4],
    [has(app.can_work_on_site), 3],
    [(app.bio?.length ?? 0) >= 80, 5],
    [has(app.why_join), 3],
    // Optional — boosts score
    [has(app.social_url), 5],
    [has(app.tools), 5],
    [hasSamples(app.work_samples), 10],
    [has(app.education), 10],
    [has(app.certificates), 10],
  ];

  return checks.reduce((sum, [cond, pts]) => sum + (cond ? pts : 0), 0);
}

export function completionColor(pct: number): string {
  if (pct >= 80) return "#22c55e"; // green-500
  if (pct >= 50) return "#f59e0b"; // amber-400
  return "#ef4444"; // red-500
}
