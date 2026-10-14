"use client";

import { useEffect, useRef, useState, useTransition, useCallback } from "react";
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

// Accepted file types
const ACCEPTED_TYPES = [
  // Design source
  ".ai", ".psd", ".xd", ".sketch", ".fig", ".eps", ".svg",
  ".indd", ".cdr", ".afdesign", ".afpub", ".afphoto",
  // Images
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".tiff", ".bmp", ".heic", ".avif",
  // PDF
  ".pdf",
  // Archives
  ".zip", ".rar", ".7z",
].join(",");

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string | null, name: string | null): string {
  const ext = (name ?? "").split(".").pop()?.toLowerCase() ?? "";
  if (type?.startsWith("image/")) return "🖼";
  if (type === "application/pdf" || ext === "pdf") return "📄";
  if (["zip", "rar", "7z"].includes(ext)) return "🗜";
  if (["ai", "psd", "xd", "sketch", "fig", "indd", "cdr", "afdesign", "afpub", "afphoto"].includes(ext)) return "🎨";
  if (["svg", "eps"].includes(ext)) return "✏";
  return "📎";
}

function isImage(type: string | null, name: string | null): boolean {
  if (type?.startsWith("image/")) return true;
  const ext = (name ?? "").split(".").pop()?.toLowerCase() ?? "";
  return ["png", "jpg", "jpeg", "gif", "webp", "tiff", "bmp", "heic", "avif"].includes(ext);
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

// ── Attachment preview in message bubble ──────────────────────────────────────
function AttachmentBubble({ url, name, size, type, accentColor }: {
  url: string | null;
  name: string | null;
  size: number | null;
  type: string | null;
  accentColor: string;
}) {
  if (!name) return null;
  const img = isImage(type, name) && url;

  if (img) {
    return (
      <a href={url!} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url!}
          alt={name}
          style={{
            maxWidth: 240,
            maxHeight: 180,
            borderRadius: 8,
            display: "block",
            border: "1px solid rgba(0,0,0,0.08)",
            objectFit: "cover",
          }}
        />
        <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}>{name} · {size ? formatBytes(size) : ""}</p>
      </a>
    );
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 6,
      padding: "8px 12px",
      borderRadius: 10,
      backgroundColor: "rgba(0,0,0,0.04)",
      border: "1px solid rgba(0,0,0,0.08)",
      maxWidth: 280,
    }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>{getFileIcon(type, name)}</span>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{size ? formatBytes(size) : "—"}</p>
      </div>
      {url && (
        <a
          href={url}
          download={name}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "auto",
            flexShrink: 0,
            color: accentColor,
            display: "flex",
            alignItems: "center",
          }}
          title="Download"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>
      )}
    </div>
  );
}

// ── File preview chip (before sending) ───────────────────────────────────────
function FileChip({ file, onRemove, accentColor }: { file: File; onRemove: () => void; accentColor: string }) {
  const preview = isImage(file.type, file.name) ? URL.createObjectURL(file) : null;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px 6px 8px",
      borderRadius: 8,
      backgroundColor: "#f3f4f6",
      border: "1px solid #e5e7eb",
      maxWidth: "100%",
      overflow: "hidden",
    }}>
      {preview
        ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" style={{ width: 32, height: 32, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
        )
        : (
          <span style={{ fontSize: 22, flexShrink: 0 }}>{getFileIcon(file.type, file.name)}</span>
        )
      }
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{formatBytes(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        style={{
          flexShrink: 0,
          background: "none",
          border: "none",
          padding: 2,
          cursor: "pointer",
          color: "#9ca3af",
          display: "flex",
          alignItems: "center",
        }}
        title="Remove file"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
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
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages.length]);

  useEffect(() => {
    const id = setInterval(() => router.refresh(), 15_000);
    return () => clearInterval(id);
  }, [router]);

  const validateAndSetFile = useCallback((file: File) => {
    setFileError(null);
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large — maximum 25 MB (this file is ${formatBytes(file.size)})`);
      return;
    }
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    const allowed = ACCEPTED_TYPES.split(",");
    if (!file.type.startsWith("image/") && !file.type.startsWith("application/") && !allowed.includes(ext)) {
      setFileError(`File type not supported. Allowed: images, PDFs, design source files (.ai, .psd, .fig…), archives (.zip, .rar)`);
      return;
    }
    setPendingFile(file);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) validateAndSetFile(f);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed && !pendingFile) return;

    const fd = new FormData();
    fd.set("projectId", projectId);
    fd.set("content", trimmed);
    fd.set("authorName", viewerName);
    if (pendingFile) fd.set("file", pendingFile);
    if (extraFields) {
      for (const [k, v] of Object.entries(extraFields)) fd.set(k, v);
    }

    setText("");
    setPendingFile(null);
    setFileError(null);
    startTransition(async () => {
      await sendAction(fd);
      router.refresh();
    });
  }

  // ── Fiverr variant ────────────────────────────────────────────────────────
  if (variant === "fiverr") {
    const accentColor = ROLE_COLORS[viewerRole];
    const accentLight = viewerRole === "professional" ? "#dbeafe" : "#dcfce7";
    const accentText = viewerRole === "professional" ? "#1d4ed8" : "#15803d";
    const sendBtnBg = isPending || (!text.trim() && !pendingFile)
      ? (viewerRole === "professional" ? "#bfdbfe" : "#bbf7d0")
      : accentColor;
    const sendBtnColor = viewerRole === "professional" ? "#1e40af" : "#064e3b";

    return (
      <div
        style={{
          border: "none",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Drag-over overlay */}
        {dragOver && (
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            border: `2px dashed ${accentColor}`,
            borderRadius: 4,
            pointerEvents: "none",
            gap: 10,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: accentColor }}>Drop file to attach</p>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Max 25 MB · Images, PDFs, design files, archives</p>
          </div>
        )}

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
                        padding: msg.content ? "10px 14px" : "8px 12px",
                        borderRadius: isMine ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                        backgroundColor: isMine ? accentLight : "#f3f4f6",
                        border: isMine ? `1px solid ${roleColor}30` : "1px solid #e5e7eb",
                      }}>
                        {msg.content && (
                          <p style={{ margin: 0, fontSize: 14, color: "#1f2937", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                            {msg.content}
                          </p>
                        )}
                        {msg.attachment_name && (
                          <AttachmentBubble
                            url={msg.attachment_url}
                            name={msg.attachment_name}
                            size={msg.attachment_size}
                            type={msg.attachment_type}
                            accentColor={roleColor}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div style={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fafafa", padding: "12px 20px 14px", flexShrink: 0 }}>
          {/* File attachment preview */}
          {pendingFile && (
            <div style={{ marginBottom: 8 }}>
              <FileChip file={pendingFile} onRemove={() => setPendingFile(null)} accentColor={accentColor} />
            </div>
          )}
          {fileError && (
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#ef4444", fontWeight: 500 }}>{fileError}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* Attach button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach file (max 25 MB)"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  backgroundColor: pendingFile ? accentLight : "#ffffff",
                  color: pendingFile ? accentColor : "#6b7280",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 150ms, color 150ms",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); }
                }}
                placeholder={pendingFile ? "Add a message (optional)… (Enter to send)" : "Type a message… (Enter to send)"}
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
                disabled={isPending || (!text.trim() && !pendingFile)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: sendBtnBg,
                  color: sendBtnColor,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: isPending || (!text.trim() && !pendingFile) ? "not-allowed" : "pointer",
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

          {/* File type hint */}
          <p style={{ margin: "6px 0 0 48px", fontSize: 11, color: "#d1d5db" }}>
            Attach images, PDFs, .ai .psd .fig .xd .sketch .zip and more · Max 25 MB
          </p>
        </div>
      </div>
    );
  }

  // ── Compact variant (default) ──────────────────────────────────────────────
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
                    {msg.content && (
                      <p style={{ margin: 0, fontSize: 14, color: dark ? "rgba(255,255,255,0.85)" : "#111827", lineHeight: 1.5 }}>
                        {msg.content}
                      </p>
                    )}
                    {msg.attachment_name && (
                      <AttachmentBubble
                        url={msg.attachment_url}
                        name={msg.attachment_name}
                        size={msg.attachment_size}
                        type={msg.attachment_type}
                        accentColor={ROLE_COLORS[msg.author]}
                      />
                    )}
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
