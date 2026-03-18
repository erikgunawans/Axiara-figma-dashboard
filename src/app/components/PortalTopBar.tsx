import { ChevronDown, Sun, Moon, Search, Bell } from "lucide-react";
import { useApp } from "./AppContext";

export function PortalTopBar() {
  const { theme, toggleTheme, t } = useApp();

  return (
    <header
      className="flex items-center justify-between"
      style={{
        height: 60,
        padding: "0 28px",
        background: t.bgSidebar,
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      {/* Left */}
      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 17,
          color: t.textPrimary,
          letterSpacing: "-0.05em",
        }}
      >
        Approved AI Catalog
      </span>

      {/* Spacer */}
      <div />

      {/* Right icons */}
      <div className="flex items-center" style={{ gap: 8 }}>
        <button
          className="flex items-center cursor-pointer"
          style={{
            gap: 4, padding: "5px 12px", borderRadius: 999,
            border: `1px solid ${t.borderSubtle}`, background: "transparent",
            fontFamily: "'Manrope', sans-serif", fontSize: 11.5, color: t.textSecondary,
          }}
        >
          Employee
          <ChevronDown size={14} strokeWidth={1.8} style={{ color: t.textMuted }} />
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center cursor-pointer"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.borderSubtle}`, background: "transparent" }}
        >
          {theme === "dark" ? (
            <Sun size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
          ) : (
            <Moon size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
          )}
        </button>

        <button
          className="flex items-center justify-center cursor-pointer"
          style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.borderSubtle}`, background: "transparent", fontFamily: "'Manrope', sans-serif", fontSize: 11.5, color: t.textSecondary }}
        >
          EN
        </button>

        <button
          className="flex items-center justify-center cursor-pointer relative"
          style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.borderSubtle}`, background: "transparent", gap: 4 }}
        >
          <Search size={14} strokeWidth={1.8} style={{ color: t.textMuted }} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, color: t.textMuted, opacity: 0.6 }}>⌘K</span>
        </button>

        <button
          className="flex items-center justify-center cursor-pointer relative"
          style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.borderSubtle}`, background: "transparent" }}
        >
          <Bell size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
          <span
            className="absolute"
            style={{ top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: "#F14F44", animation: "pulse 2s infinite" }}
          />
        </button>

        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #E24C4A, #386BB7)", padding: 1.5 }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: "100%", height: "100%", borderRadius: "50%", background: t.bgSidebar, fontFamily: "'Sora', sans-serif", fontSize: 11, color: t.textPrimary, fontWeight: 600 }}
          >
            DP
          </div>
        </div>
      </div>
    </header>
  );
}
