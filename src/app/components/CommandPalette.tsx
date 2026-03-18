import { useState, useEffect, useRef, useCallback } from "react";
import { Search, CornerDownLeft, ArrowRight, Shield, Zap } from "lucide-react";

const manrope = "'Manrope', sans-serif";

interface ResultItem {
  icon: "arrow" | "search" | "shield" | "zap";
  label: string;
  desc: string;
}

interface ResultGroup {
  title: string;
  items: ResultItem[];
}

const ALL_GROUPS: ResultGroup[] = [
  {
    title: "TABS",
    items: [
      { icon: "arrow", label: "Overview", desc: "Dashboard home" },
      { icon: "arrow", label: "Discovery", desc: "AI tool detection" },
      { icon: "arrow", label: "Costs", desc: "Spend analysis" },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      { icon: "search", label: "ChatGPT Enterprise", desc: "OpenAI · Restricted" },
      { icon: "search", label: "Claude", desc: "Anthropic · Approved" },
    ],
  },
  {
    title: "AUDIT RECORDS",
    items: [
      { icon: "shield", label: "HITL-2026-0341", desc: "ChatGPT · Restricted · Mar 17" },
    ],
  },
  {
    title: "ACTIONS",
    items: [
      { icon: "zap", label: "New HITL Review", desc: "Start governance decision" },
      { icon: "zap", label: "Export Report", desc: "Generate compliance report" },
    ],
  },
];

function IconFor({ type, size = 13 }: { type: ResultItem["icon"]; size?: number }) {
  const props = { size, strokeWidth: 1.8, color: "#AEB3BD" };
  switch (type) {
    case "arrow": return <ArrowRight {...props} />;
    case "search": return <Search {...props} />;
    case "shield": return <Shield {...props} />;
    case "zap": return <Zap {...props} />;
  }
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter groups based on query
  const filtered = query.trim()
    ? ALL_GROUPS.map((g) => ({
        ...g,
        items: g.items.filter(
          (it) =>
            it.label.toLowerCase().includes(query.toLowerCase()) ||
            it.desc.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter((g) => g.items.length > 0)
    : ALL_GROUPS;

  // Flat list of all visible items for keyboard nav
  const flatItems = filtered.flatMap((g) => g.items);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Keyboard handler
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      }
    },
    [flatItems.length, onClose]
  );

  // Scroll selected into view
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const el = container.querySelector(`[data-idx="${selectedIdx}"]`) as HTMLElement;
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "18vh",
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKey}
        style={{
          width: 560,
          maxHeight: 420,
          background: "#111111",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
        }}
      >
        {/* Search input row */}
        <div
          className="flex items-center"
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <Search size={14} strokeWidth={2} color="#AEB3BD" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tabs, tools, audit records..."
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontFamily: manrope,
              fontSize: 14,
              color: "#F5F5F5",
              outline: "none",
            }}
          />
          <kbd
            style={{
              background: "#1E1E1E",
              border: "1px solid #3F3F3F",
              borderRadius: 4,
              fontFamily: manrope,
              fontSize: 9,
              color: "#AEB3BD",
              padding: "2px 6px",
              flexShrink: 0,
              lineHeight: 1.4,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div
          ref={resultsRef}
          style={{
            maxHeight: 320,
            overflowY: "auto",
            padding: "6px 0",
          }}
        >
          {filtered.length === 0 && (
            <div
              style={{
                padding: "24px 18px",
                textAlign: "center",
                fontFamily: manrope,
                fontSize: 13,
                color: "#AEB3BD",
              }}
            >
              No results found
            </div>
          )}

          {filtered.map((group) => (
            <div key={group.title}>
              {/* Group header */}
              <div
                style={{
                  padding: "8px 18px 4px",
                  fontFamily: manrope,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#AEB3BD",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {group.title}
              </div>

              {/* Group items */}
              {group.items.map((item) => {
                flatIdx++;
                const idx = flatIdx;
                const isSelected = idx === selectedIdx;

                return (
                  <div
                    key={`${group.title}-${item.label}`}
                    data-idx={idx}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className="flex items-center cursor-pointer"
                    style={{
                      padding: "9px 18px",
                      gap: 10,
                      background: isSelected ? "rgba(241,79,68,0.12)" : "transparent",
                      transition: "background 0.1s",
                    }}
                  >
                    <div style={{ width: 20, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                      <IconFor type={item.icon} />
                    </div>
                    <span
                      style={{
                        fontFamily: manrope,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#F5F5F5",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: manrope,
                        fontSize: 11,
                        color: "#AEB3BD",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      {item.desc}
                    </span>
                    {isSelected && (
                      <CornerDownLeft size={12} strokeWidth={2} color="#AEB3BD" style={{ flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}