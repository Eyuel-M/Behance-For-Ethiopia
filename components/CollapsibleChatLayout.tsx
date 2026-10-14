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
  const [open, setOpen] = useState(true);

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

      {/* ── Sidebar ── */}
      <div style={{
        flexShrink: 0,
        width: open ? 400 : "100%",
        minWidth: open ? 300 : "unset",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        borderRight: open ? `1px solid ${sidebarBorder}` : "none",
        backgroundColor: sidebarBg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Sticky toggle bar at top of sidebar */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px 16px",
          backgroundColor: sidebarBg,
          borderBottom: `1px solid ${sidebarBorder}`,
          flexShrink: 0,
        }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              border: "none",
              backgroundColor: open ? accentLight : accent,
              color: open ? accentText : (accent === "#6dcc46" ? "#0d2318" : "#ffffff"),
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 150ms, color 150ms",
            }}
          >
            {open ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Hide chat
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Messages
              </>
            )}
          </button>
        </div>

        {/* Scrollable sidebar content */}
        <div style={{ overflowY: "auto", flex: 1, padding: sidebarPadding }}>
          {sidebar}
        </div>
      </div>

      {/* ── Chat panel (collapses to 0) ── */}
      <div style={{
        flex: 1,
        minWidth: 0,
        maxWidth: open ? "9999px" : 0,
        overflow: "hidden",
        transition: "max-width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: chatPanelBg,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Chat header */}
        <div style={{
          padding: "14px 24px",
          borderBottom: `1px solid ${chatHeaderBorder}`,
          backgroundColor: chatHeaderBg,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}>
          {chatHeaderContent}
          {/* Collapse button */}
          <button
            onClick={() => setOpen(false)}
            title="Hide chat"
            style={{
              marginLeft: "auto",
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat fills remaining height */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {chat}
        </div>
      </div>

    </div>
  );
}
