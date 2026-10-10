"use client";

import { useTransition } from "react";

type Props = {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
  className?: string;
};

export default function ConfirmDeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Are you sure? This cannot be undone.",
  className,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(confirmMessage)) return;
    startTransition(() => action());
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={className ?? "text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50"}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
