"use client";

import { useState, useTransition, useRef } from "react";
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
  const [showNotePrompt, setShowNotePrompt] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  function applyStatus(status: string, revisionNote?: string) {
    setValue(status);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("milestoneId", milestoneId);
      fd.set("projectId", projectId);
      fd.set("status", status);
      if (revisionNote) fd.set("revisionNote", revisionNote);
      await changeMilestoneStatus(fd);
    });
  }

  return (
    <div className="shrink-0">
      <select
        value={value}
        disabled={isPending}
        className={className}
        onChange={(e) => {
          const next = e.target.value;
          if (next === "revision_requested") {
            setPendingStatus(next);
            setShowNotePrompt(true);
          } else {
            applyStatus(next);
          }
        }}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="submitted">Submitted</option>
        <option value="revision_requested">Revision requested</option>
        <option value="accepted">Accepted</option>
      </select>

      {showNotePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowNotePrompt(false)}>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 w-full max-w-sm mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-bold text-zinc-900 mb-1">Revision note</p>
            <p className="text-xs text-zinc-500 mb-3">Explain what needs to be revised. The designer will see this note.</p>
            <textarea
              ref={noteRef}
              rows={3}
              placeholder="e.g. The typography needs more contrast on the dark screens…"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 resize-none mb-3"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                onClick={() => setShowNotePrompt(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                onClick={() => {
                  const note = noteRef.current?.value.trim() ?? "";
                  setShowNotePrompt(false);
                  if (pendingStatus) applyStatus(pendingStatus, note || undefined);
                }}
              >
                Request revision →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
