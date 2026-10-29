"use client";

import { useState, useEffect, type ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  chat: ReactNode;
  chatHeaderContent: ReactNode;
  sidebarBg: string;
  sidebarBorder: string;
  sidebarPadding?: string;
  chatPanelBg: string;
  chatHeaderBg: string;
  chatHeaderBorder: string;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Close mobile sidebar on Escape
  useEffect(() => {
    if (!isMobile) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSidebarOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobile]);

  const accentIsDark = accent === "#6dcc46";
  const toggleIconColor = sidebarOpen ? accentText : (accentIsDark ? "#0d2318" : "#ffffff");

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

      {/* ── Mobile backdrop ── */}
      {isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 30,
            opacity: sidebarOpen ? 1 : 0,
            pointerEvents: sidebarOpen ? "auto" : "none",
            transition: "opacity 300ms ease",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      {isMobile ? (
        // Mobile: absolute overlay sliding in from left
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(88vw, 380px)",
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${sidebarBorder}`,
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
        }}>
          {/* Mobile sidebar header with close button */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: `1px solid ${sidebarBorder}`,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: accent === "#6dcc46" ? "#0d2318" : "#ffffff", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Project Info
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: accent === "#6dcc46" ? "#0d2318" : "#ffffff",
                opacity: 0.6,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: sidebarPadding }}>
            {sidebar}
          </div>
        </div>
      ) : (
        // Desktop: standard flex collapsible sidebar
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
      )}

      {/* ── Chat panel ── */}
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
            aria-label={sidebarOpen ? "Hide project info" : "Show project info"}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              backgroundColor: sidebarOpen ? accentLight : accent,
              color: toggleIconColor,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 150ms, color 150ms",
            }}
          >
            {isMobile && sidebarOpen ? (
              // X icon when mobile sidebar is open
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              // Sidebar layout icon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            )}
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
