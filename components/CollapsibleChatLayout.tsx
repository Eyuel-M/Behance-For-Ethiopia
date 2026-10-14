"use client";

import { useState, type ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  chat: ReactNode;
  chatHeaderContent: ReactNode;
  // Sidebar styling
  sidebarBg: string;
  sidebarBorder: string;
  sidebarPadding?: string;
  // Chat panel styling
  chatPanelBg: string;
  chatHeaderBg: string;
  chatHeaderBorder: string;
  // Toggle button accent
  accent: string;
  accentLight: string;
  accentText: string;
};

export default function CollapsibleChatLayout({
  sidebar,
  chat,
  chatHeaderContent,
  sidebarBg,
  sidebarBorder,
  sidebarPadding = "28px 24px 40px",
  chatPanelBg,
  chatHeaderBg,
  chatHeaderBorder,
  accent,
  accentLight,
  accentText,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

      {/* ── Sidebar (collapses to 0) ── */}
      <div style={{
        flexShrink: 0,
        maxWidth: sidebarOpen ? 480 : 0,
        width: sidebarOpen ? 400 : 0,
        overflow: "hidden",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1), max-width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        borderRight: sidebarOpen ? `1px solid ${sidebarBorder}` : "none",
        backgroundColor: sidebarBg,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ overflowY: "auto", flex: 1, padding: sidebarPadding, minWidth: 300 }}>
          {sidebar}
        </div>
      </div>

      {/* ── Chat panel (always flex: 1) ── */}
      <div style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: chatPanelBg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Chat header with sidebar toggle */}
        <div style={{
          padding: "14px 16px 14px 12px",
          borderBottom: `1px solid ${chatHeaderBorder}`,
          backgroundColor: chatHeaderBg,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}>
          {/* Sidebar toggle button */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Hide project info" : "Show project info"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              backgroundColor: sidebarOpen ? accentLight : accent,
              color: sidebarOpen ? accentText : (accent === "#6dcc46" ? "#0d2318" : "#ffffff"),
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 150ms, color 150ms",
            }}
          >
            {/* Sidebar layout icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>

          {chatHeaderContent}
        </div>

        {/* Chat fills remaining height */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {chat}
        </div>
      </div>

    </div>
  );
}
