"use client";

import { useTransition } from "react";
import { deleteDesignerAction } from "@/app/actions/admin-designers";

export default function DeleteDesignerButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    startTransition(() => deleteDesignerAction(id));
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors cursor-pointer"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
