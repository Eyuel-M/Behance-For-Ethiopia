"use client";

import { useState, useTransition } from "react";
import { changeMilestoneStatus } from "@/app/actions/admin-projects";

export default function MilestoneStatusSelect({
  milestoneId,
  projectId,
  currentStatus,
  className,
}: {
  milestoneId: string;
  projectId: string;
  currentStatus: string;
  className?: string;
}) {
  const [value, setValue] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      className={className}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
        startTransition(async () => {
          const fd = new FormData();
          fd.set("milestoneId", milestoneId);
          fd.set("projectId", projectId);
          fd.set("status", next);
          await changeMilestoneStatus(fd);
        });
      }}
    >
      <option value="pending">Pending</option>
      <option value="in_progress">In progress</option>
      <option value="submitted">Submitted</option>
      <option value="revision_requested">Revision requested</option>
      <option value="accepted">Accepted</option>
    </select>
  );
}
