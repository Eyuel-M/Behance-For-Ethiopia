"use client";

import { useRef, useState } from "react";

type Option = { value: string; label: string };

export default function AutoSubmitSelect({
  name,
  defaultValue,
  options,
  className,
  autoSubmit = true,
}: {
  name: string;
  defaultValue: string;
  options: Option[];
  className?: string;
  autoSubmit?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLSelectElement>(null);

  return (
    <select
      ref={ref}
      name={name}
      value={value}
      className={className}
      onChange={(e) => {
        setValue(e.target.value);
        if (autoSubmit) ref.current?.form?.requestSubmit();
      }}
    >
      {options.map(({ value: v, label }) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}
