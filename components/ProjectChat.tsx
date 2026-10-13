"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ProjectMessageRow, MessageAuthor } from "@/lib/supabase/project-types";

type Props = {
  projectId: string;
  viewerRole: MessageAuthor;
  viewerName: string;
  initialMessages: ProjectMessageRow[];
  sendAction: (formData: FormData) => Promise<void>;
  // Extra hidden fields to include in form (e.g. token for professional/client)
  extraFields?: Record<string, string>;
  // Dark theme for client/professional portals
  dark?: boolean;
};

const ROLE_COLORS: Record<MessageAuthor, string> = {
  admin:        "#6dcc46",
  client:       "#60a5fa",
  professional: "#f59e0b",
};

const ROLE_LABELS: Record<MessageAuthor, string> = {
  admin:        "Team",
  client:       "Client",
  professional: "Designer",
};

export default function ProjectChat({
  projectId,
  viewerRole,
  viewerName,
  initialMessages,
  sendAction,
  extraFields,
  dark = false,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages.length]);

  // Poll for new messages every 15 seconds
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 15_000);
    return () => clearInterval(id);
  }, [router]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const fd = new FormData();
    fd.set("projectId", projectId);
    fd.set("content", trimmed);
    fd.set("authorName", viewerName);
    if (extraFields) {
      for (const [k, v] of Object.entries(extraFields)) fd.set(k, v);
    }
    setText("");
    startTransition(async () => {
      await sendAction(fd);
      router.refresh();
    });
  }

  const bg = dark ? "rgba(255,255,255,0.04)" : "#f9f9f9";
  const border = dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e4e4e7";
  const labelColor = dark ? "rgba(255,255,255,0.3)" : "#71717a";
  const inputBg = dark ? "rgba(255,255,255,0.06)" : "#ffffff";
  const inputBorder = dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e4e4e7";
  const inputColor = dark ? "#ffffff" : "#111827";
  const bubbleBg = (author: MessageAuthor) =>
    author === viewerRole
      ? dark ? "rgba(109,204,70,0.12)" : "#f0fdf4"
      : dark ? "rgba(255,255,255,0.06)" : "#f4f4f5";
  const bubbleBorder = (author: MessageAuthor) =>
    author === viewerRole
      ? dark ? "1px solid rgba(109,204,70,0.2)" : "1px solid #bbf7d0"
      : dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e4e4e7";

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border, backgroundColor: bg }}>
      {/* Message list */}
      <div style={{ maxHeight: 320, overflowY: "auto", padding: "16px 16px 8px" }}>
        {initialMessages.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: 13, color: labelColor, padding: "24px 0" }}>
            No messages yet — start the conversation.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {initialMessages.map((msg) => {
              const isMine = msg.author === viewerRole;
              return (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isMine ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      backgroundColor: bubbleBg(msg.author),
                      border: bubbleBorder(msg.author),
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13, color: isMine ? (dark ? "#6dcc46" : "#15803d") : labelColor, fontWeight: 600, marginBottom: 2 }}>
                      <span style={{ color: ROLE_COLORS[msg.author], marginRight: 4 }}>●</span>
                      {msg.author_name} · {ROLE_LABELS[msg.author]}
                    </p>
                    <p style={{ margin: 0, fontSize: 14, color: dark ? "rgba(255,255,255,0.85)" : "#111827", lineHeight: 1.5 }}>
                      {msg.content}
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: labelColor }}>
                      {new Date(msg.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      {" · "}
                      {new Date(msg.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: "8px 16px 16px", borderTop: border }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          disabled={isPending}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: inputBorder,
            backgroundColor: inputBg,
            color: inputColor,
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: isPending || !text.trim() ? (dark ? "rgba(109,204,70,0.3)" : "#d1fae5") : "#6dcc46",
            color: dark ? "#0d2318" : "#064e3b",
            fontWeight: 700,
            fontSize: 13,
            cursor: isPending || !text.trim() ? "not-allowed" : "pointer",
            transition: "background 150ms",
          }}
        >
          {isPending ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
