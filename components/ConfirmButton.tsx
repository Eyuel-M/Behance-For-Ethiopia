"use client";

import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  message: string;
}

export default function ConfirmButton({ message, onClick, ...rest }: Props) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
        onClick?.(e);
      }}
    />
  );
}
