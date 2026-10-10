"use client";

import { useState, useTransition } from "react";
import { changeProjectStatus } from "@/app/actions/admin-projects";
import { PROJECT_STATUS_LABELS, type ProjectStatus } from "@/lib/supabase/project-types";

export default function ProjectStatusSelect({
  projectId,
  currentStatus,
  className,
}: {
  projectId: string;
  currentStatus: ProjectStatus;
  className?: string;
}) {
  const [value, setValue] = useState<ProjectStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      className={className}
      onChange={(e) => {
        const next = e.target.value as ProjectStatus;
        setValue(next);
        startTransition(async () => {
          const fd = new FormData();
          fd.set("projectId", projectId);
          fd.set("status", next);
          fd.set("notes", "");
          await changeProjectStatus(fd);
        });
      }}
    >
      {(Object.entries(PROJECT_STATUS_LABELS) as [ProjectStatus, string][]).map(([s, label]) => (
        <option key={s} value={s}>{label}</option>
      ))}
    </select>
  );
}
