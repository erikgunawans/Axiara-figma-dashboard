import { useApp, darkColors } from "./AppContext";
import { useNavigate } from "react-router";
import { LayoutGrid, ShieldCheck, GitBranch, BarChart3, Layers, Search, DollarSign, Plug, Settings, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { useState, useEffect } from "react";
import logoImg from "figma:asset/e36e006ed674caca4c383e7161bab0eb1df34dd9.png";

const navItems = [
  { icon: LayoutGrid, label: "Overview" },
  { icon: ShieldCheck, label: "HITL Audit" },
  { icon: GitBranch, label: "Data Flows" },
  { icon: BarChart3, label: "Reports" },
  { icon: Layers, label: "Catalog" },
  { icon: Search, label: "Discovery" },
  { icon: DollarSign, label: "Costs" },
  { icon: Plug, label: "Integrations" },
  { icon: Settings, label: "Settings" },
];

const navRoutes: Record<number, string> = {
  0: "/", 1: "/hitl-audit", 2: "/data-flows", 3: "/reports",
  4: "/catalog", 5: "/discovery", 6: "/costs", 7: "/integrations", 8: "/settings",
};

export function Sidebar({ activeNav = 0 }: { activeNav?: number }) {
  const [activeIndex, setActiveIndex] = useState(activeNav);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useApp();

  // Sidebar always uses dark theme colors
  const t = darkColors;

  const w = sidebarCollapsed ? 68 : 236;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
    <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col"
      style={{
        width: w,
        background: t.bgSidebar,
        borderRight: `1px solid ${t.border}`,
        zIndex: 50,
        transition: "width 0.25s cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
      }}
    >
      {/* Gradient accent line on the right edge (dark only) */}
      {!sidebarCollapsed && (
        <div
          style={{
            position: "absolute",
            right: 0, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(180deg, rgba(226,76,74,0.15) 0%, rgba(56,107,183,0.1) 50%, transparent 100%)",
            opacity: t.meshOpacity,
          }}
        />
      )}

      {/* Logo */}
      <div
        className="flex items-center gap-[10px]"
        style={{
          minHeight: 60,
          padding: sidebarCollapsed ? "18px 0" : "18px 22px",
          justifyContent: sidebarCollapsed ? "center" : "flex-start",
          overflow: "hidden",
        }}
      >
        {sidebarCollapsed ? (
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            }}
          >
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, color: "#fff", fontWeight: 700 }}>A</span>
          </div>
        ) : (
          <img src={logoImg} alt="axiara.ai" style={{ height: 36 }} />
        )}
      </div>

      {/* Search (hidden when collapsed) */}
      {!sidebarCollapsed && (
        <div style={{ padding: "0 14px 14px" }}>
          <div
            onClick={() => setCmdOpen(true)}
            className="flex items-center cursor-pointer"
            style={{
              height: 36, borderRadius: 10,
              border: `1px solid ${t.borderSubtle}`,
              background: t.bgCardHover,
              padding: "0 12px", gap: 8,
              transition: "all 0.2s ease",
            }}
          >
            <Search size={13} strokeWidth={1.8} style={{ color: t.textMuted, flexShrink: 0 }} />
            <input
              placeholder="Search…"
              readOnly
              onClick={() => setCmdOpen(true)}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontFamily: "'Manrope', sans-serif", fontSize: 12, color: t.textSecondary, cursor: "pointer",
              }}
            />
            <kbd
              style={{
                fontFamily: "'Manrope', sans-serif", fontSize: 9, color: t.textMuted,
                background: t.bgCardHover, borderRadius: 5, padding: "2px 6px", lineHeight: 1,
                border: `1px solid ${t.borderSubtle}`,
              }}
            >
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      {/* Search icon when collapsed */}
      {sidebarCollapsed && (
        <div className="flex justify-center" style={{ padding: "0 0 10px" }}>
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${t.borderSubtle}`,
              background: t.bgCardHover,
            }}
          >
            <Search size={15} strokeWidth={1.8} style={{ color: t.textMuted }} />
          </button>
        </div>
      )}

      {/* Section label */}
      {!sidebarCollapsed && (
        <div style={{
          padding: "4px 22px 8px",
          fontFamily: "'Manrope', sans-serif", fontSize: 9.5,
          color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          Navigation
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col" style={{ padding: sidebarCollapsed ? "0 6px" : "0 8px", gap: 2 }}>
        {navItems.map((item, i) => {
          const isActive = i === activeIndex;
          const isHovered = hoveredNav === i;
          return (
            <button
              key={item.label}
              title={sidebarCollapsed ? item.label : undefined}
              onClick={() => { setActiveIndex(i); if (navRoutes[i]) navigate(navRoutes[i]); }}
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              className="flex items-center w-full text-left cursor-pointer"
              style={{
                padding: sidebarCollapsed ? "10px 0" : "10px 14px",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                gap: sidebarCollapsed ? 0 : 10,
                borderRadius: 10,
                background: isActive ? t.accentSoft : isHovered ? t.bgCardHover : "transparent",
                transition: "all 0.2s ease",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Active glow bar */}
              {isActive && !sidebarCollapsed && (
                <span
                  style={{
                    position: "absolute", left: 0, top: "18%", bottom: "18%", width: 2.5,
                    borderRadius: "0 3px 3px 0",
                    background: "linear-gradient(180deg, #E24C4A, #386BB7)",
                    boxShadow: `0 0 12px ${t.accentGlow}`,
                  }}
                />
              )}
              {/* Active dot when collapsed */}
              {isActive && sidebarCollapsed && (
                <span
                  style={{
                    position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%", background: t.accent,
                    boxShadow: `0 0 6px ${t.accentGlow}`,
                  }}
                />
              )}
              <item.icon
                size={sidebarCollapsed ? 20 : 17}
                strokeWidth={1.7}
                style={{
                  color: isActive ? t.accent : isHovered ? t.textSecondary : t.textMuted,
                  flexShrink: 0, transition: "color 0.2s ease",
                }}
              />
              {!sidebarCollapsed && (
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? t.accent : isHovered ? t.textPrimary : t.textSecondary,
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Portal Button */}
      {!sidebarCollapsed && (
        <div style={{ margin: "0 8px 10px" }}>
          <button
            onClick={() => navigate("/portal")}
            className="w-full cursor-pointer"
            style={{
              padding: "10px 14px", borderRadius: 10,
              border: `1px solid ${t.borderSubtle}`,
              background: "linear-gradient(135deg, rgba(226,76,74,0.05), rgba(56,107,183,0.05))",
              fontFamily: "'Manrope', sans-serif", fontSize: 11, color: t.textSecondary,
              transition: "all 0.2s ease",
            }}
          >
            Employee Portal →
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div style={{ margin: sidebarCollapsed ? "0 6px 4px" : "0 8px 4px" }}>
        <button
          title={sidebarCollapsed ? "Logout" : undefined}
          onClick={() => navigate("/login")}
          className="w-full flex items-center cursor-pointer"
          style={{
            padding: sidebarCollapsed ? "10px 0" : "10px 14px",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
            gap: sidebarCollapsed ? 0 : 10,
            borderRadius: 10,
            background: "transparent",
            border: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.bgCardHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut size={sidebarCollapsed ? 20 : 17} strokeWidth={1.7} style={{ color: t.textMuted, flexShrink: 0 }} />
          {!sidebarCollapsed && (
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13.5, fontWeight: 500, color: t.textSecondary, whiteSpace: "nowrap" }}>
              Logout
            </span>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <div
        onClick={toggleSidebar}
        className="flex items-center justify-center cursor-pointer"
        style={{
          padding: 12,
          borderTop: `1px solid ${t.border}`,
          fontFamily: "'Manrope', sans-serif", fontSize: 11, color: t.textMuted,
          transition: "color 0.2s ease", gap: 6,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = t.textSecondary)}
        onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
      >
        {sidebarCollapsed ? (
          <ChevronsRight size={16} strokeWidth={1.8} />
        ) : (
          <>
            <ChevronsLeft size={14} strokeWidth={1.8} />
            <span>Collapse</span>
          </>
        )}
      </div>
    </aside>
    </>
  );
}