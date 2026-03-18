import { useState } from "react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

type Category = "HITL" | "SENSOR" | "COMPLIANCE" | "DETECTION";

const CATEGORY_COLORS: Record<Category, string> = {
  HITL: "#F14F44",
  SENSOR: "#F5A623",
  COMPLIANCE: "#386BB7",
  DETECTION: "#AEB3BD",
};

interface NotifItem {
  id: number;
  unread: boolean;
  category: Category;
  title: string;
  desc: string;
  time: string;
}

const INITIAL_ITEMS: NotifItem[] = [
  { id: 1, unread: true, category: "HITL", title: "HITL Review Required", desc: "Grammarly AI moved to Under Review after risk score exceeded threshold...", time: "12 min ago" },
  { id: 2, unread: true, category: "HITL", title: "HITL Review Required", desc: "Notion AI has 95 users but no DPA on file. Requires governance decision...", time: "34 min ago" },
  { id: 3, unread: true, category: "SENSOR", title: "Sensor Degradation", desc: "Cloud OAuth (C) uptime dropped to 98.4%. Investigating connectivity...", time: "1 hour ago" },
  { id: 4, unread: false, category: "COMPLIANCE", title: "Compliance Deadline", desc: "POJK 30/2025 report due Jul 31. 127 days remaining...", time: "2 hours ago" },
  { id: 5, unread: false, category: "DETECTION", title: "New Tool Detected", desc: "Cursor detected via MCP + OS Agent vectors. Risk assessment pending...", time: "3 hours ago" },
  { id: 6, unread: false, category: "DETECTION", title: "New Tool Detected", desc: "Perplexity detected via browser extension. 7 users identified...", time: "5 hours ago" },
  { id: 7, unread: false, category: "HITL", title: "Decision Recorded", desc: "Claude approved. Audit trail: HITL-2026-0339.", time: "1 day ago" },
];

export function NotificationCenter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const unreadCount = items.filter((i) => i.unread).length;

  if (!open) return null;

  return (
    <>
      {/* Invisible backdrop to close */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 90 }}
      />

      {/* Panel */}
      <div
        style={{
          position: "absolute",
          top: 42,
          right: 0,
          width: 370,
          maxHeight: 440,
          background: "#111111",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          zIndex: 91,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "14px 16px",
            borderBottom: "0.5px solid #2A2A2A",
            flexShrink: 0,
          }}
        >
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontFamily: sora, fontSize: 14, color: "#F5F5F5" }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span
                style={{
                  background: "rgba(241,79,68,0.18)",
                  color: "#F14F44",
                  fontFamily: manrope,
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: 99,
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setItems((prev) => prev.map((i) => ({ ...i, unread: false })))}
            className="cursor-pointer"
            style={{
              background: "none",
              border: "none",
              fontFamily: manrope,
              fontSize: 11,
              fontWeight: 500,
              color: "#F14F44",
            }}
          >
            Mark all read
          </button>
        </div>

        {/* Items */}
        <div style={{ maxHeight: 360, overflowY: "auto" }}>
          {items.map((item) => {
            const catColor = CATEGORY_COLORS[item.category];
            return (
              <div
                key={item.id}
                style={{
                  padding: "12px 16px",
                  borderBottom: "0.5px solid #2A2A2A",
                  background: item.unread ? "rgba(241,79,68,0.05)" : "transparent",
                  borderLeft: `3px solid ${item.unread ? catColor : "transparent"}`,
                }}
              >
                {/* Category label */}
                <div className="flex items-center" style={{ gap: 5, marginBottom: 3 }}>
                  <span
                    style={{
                      fontFamily: manrope,
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: catColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.category}
                  </span>
                  {item.unread && (
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#F14F44",
                        display: "inline-block",
                      }}
                    />
                  )}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: manrope,
                    fontSize: 12.5,
                    fontWeight: item.unread ? 600 : 400,
                    color: "#F5F5F5",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: manrope,
                    fontSize: 11,
                    color: "#AEB3BD",
                    lineHeight: 1.5,
                    marginTop: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.desc}
                </div>

                {/* Timestamp */}
                <div
                  style={{
                    fontFamily: manrope,
                    fontSize: 10,
                    color: "#AEB3BD",
                    marginTop: 4,
                  }}
                >
                  {item.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}