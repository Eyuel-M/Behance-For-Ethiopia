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
  extraFields?: Record<string, string>;
  dark?: boolean;
  variant?: "compact" | "fiverr";
};

const ROLE_COLORS: Record<MessageAuthor, string> = {
  admin:        "#6dcc46",
  client:       "#6dcc46",
  professional: "#3b82f6",
};

const ROLE_LABELS: Record<MessageAuthor, string> = {
  admin:        "Team",
  client:       "Client",
  professional: "Designer",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function ProjectChat({
  projectId,
  viewerRole,
  viewerName,
  initialMessages,
  sendAction,
  extraFields,
  dark = false,
  variant = "compact",
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages.length]);

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

  // ── Fiverr variant ─────────────────────────────────────────────────────────
  if (variant === "fiverr") {
    const accentColor = ROLE_COLORS[viewerRole];
    const accentLight = viewerRole === "professional" ? "#dbeafe" : "#dcfce7";
    const accentText = viewerRole === "professional" ? "#1d4ed8" : "#15803d";
    const sendBtnBg = isPending || !text.trim() ? (viewerRole === "professional" ? "#bfdbfe" : "#bbf7d0") : accentColor;
    const sendBtnColor = viewerRole === "professional" ? "#1e40af" : "#064e3b";

    return (
      <div style={{
        border: "none",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        {/* Message list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {initialMessages.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 600, margin: 0 }}>No messages yet</p>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Start the conversation below.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {initialMessages.map((msg) => {
                const isMine = msg.author === viewerRole;
                const roleColor = ROLE_COLORS[msg.author];
                const roleLight = msg.author === "professional" ? "#dbeafe" : "#dcfce7";
                const roleText = msg.author === "professional" ? "#1d4ed8" : "#15803d";

                return (
                  <div key={msg.id} style={{ display: "flex", flexDirection: isMine ? "row-reverse" : "row", alignItems: "flex-end", gap: 10 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      backgroundColor: isMine ? accentLight : roleLight,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800, color: isMine ? accentText : roleText, flexShrink: 0,
                    }}>
                      {getInitials(msg.author_name)}
                    </div>

                    {/* Bubble */}
                    <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: isMine ? "flex-end" : "flex-start", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexDirection: isMine ? "row-reverse" : "row" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: roleColor }}>{msg.author_name}</span>
                        <span style={{ fontSize: 11, color: "#9ca3af" }}>· {ROLE_LABELS[msg.author]}</span>
                        <span style={{ fontSize: 10, color: "#d1d5db" }}>
                          {new Date(msg.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div style={{
                        padding: "10px 14px",
                        borderRadius: isMine ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                        backgroundColor: isMine ? accentLight : "#f3f4f6",
                        border: isMine ? `1px solid ${roleColor}30` : "1px solid #e5e7eb",
                      }}>
                        <p style={{ margin: 0, fontSize: 14, color: "#1f2937", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fafafa", padding: "14px 20px", flexShrink: 0 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); }
                }}
                placeholder="Type a message… (Enter to send)"
                disabled={isPending}
                rows={2}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                  color: "#111827",
                  fontSize: 14,
                  outline: "none",
                  resize: "none",
                  lineHeight: 1.5,
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                disabled={isPending || !text.trim()}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: sendBtnBg,
                  color: sendBtnColor,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: isPending || !text.trim() ? "not-allowed" : "pointer",
                  transition: "background 150ms",
                  flexShrink: 0,
                  height: 46,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {isPending ? "…" : (
                  <>
                    Send
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── Compact variant (default) ───────────────────────────────────────────────
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
