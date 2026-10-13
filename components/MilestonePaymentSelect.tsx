"use client";

import { useState, useTransition } from "react";
import { changeMilestonePayment } from "@/app/actions/admin-projects";

const PAYMENT_LABELS: Record<string, string> = {
  pending: "Payment pending",
  funded:  "Funded (held)",
  released: "Released",
};

const PAYMENT_COLORS: Record<string, string> = {
  pending:  "bg-zinc-100 text-zinc-500 border-zinc-200",
  funded:   "bg-blue-50 text-blue-700 border-blue-100",
  released: "bg-green-50 text-green-700 border-green-100",
};

export default function MilestonePaymentSelect({
  milestoneId,
  projectId,
  currentPaymentStatus,
}: {
  milestoneId: string;
  projectId: string;
  currentPaymentStatus: string;
}) {
  const [value, setValue] = useState(currentPaymentStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={isPending}
      className={`text-xs rounded-lg border px-2 py-1 outline-none cursor-pointer font-semibold ${PAYMENT_COLORS[value] ?? PAYMENT_COLORS.pending}`}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
        startTransition(async () => {
          const fd = new FormData();
          fd.set("milestoneId", milestoneId);
          fd.set("projectId", projectId);
          fd.set("paymentStatus", next);
          await changeMilestonePayment(fd);
        });
      }}
    >
      <option value="pending">{PAYMENT_LABELS.pending}</option>
      <option value="funded">{PAYMENT_LABELS.funded}</option>
      <option value="released">{PAYMENT_LABELS.released}</option>
    </select>
  );
}
