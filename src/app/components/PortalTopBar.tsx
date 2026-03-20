import { NotificationCenter } from "./NotificationCenter";
import { ChevronDown, Sun, Moon, Bell, Check, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useApp } from "./AppContext";

const dateOptions = ["7D", "30D", "QTR", "SEM", "YTD"];

const roleOptions = [
  { label: "Employee", desc: "Standard Employee" },
  { label: "Manager", desc: "Team Manager" },
  { label: "IT Admin", desc: "IT Administrator" },
  { label: "DPO", desc: "Data Protection Officer" },
];

const langOptions = [
  { code: "en" as const, label: "English", flag: "EN" },
  { code: "id" as const, label: "Bahasa Indonesia", flag: "ID" },
];

export function PortalTopBar({ title = "Approved AI Catalog" }: { title?: string }) {
  const [activePill, setActivePill] = useState("30D");
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, lang, setLang, t } = useApp();

  // Close dropdowns on outside click
  useEffect(() => {
    if (!roleOpen && !langOpen) return;
    const handler = (e: MouseEvent) => {
      if (roleOpen && roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (langOpen && langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [roleOpen, langOpen]);

  const activeLang = langOptions.find((l) => l.code === lang) || langOptions[0];

  return (
    <>
    <header
      className="flex items-center justify-between"
      style={{
        height: 60,
        padding: "0 28px",
        background: t.bgSidebar,
        borderBottom: `1px solid ${t.border}`,
        position: "relative",
      }}
    >
      {/* Subtle gradient border at bottom */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, rgba(226,76,74,0.1), rgba(56,107,183,0.08), transparent 60%)",
          opacity: t.meshOpacity,
        }}
      />

      {/* Left — Page title */}
      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 17,
          color: t.textPrimary,
          letterSpacing: "-0.05em",
        }}
      >
        {title}
      </span>

      {/* Center - Date pills */}
      <div className="flex items-center" style={{ gap: 4 }}>
        {dateOptions.map((d) => {
          const isActive = d === activePill;
          return (
            <button
              key={d}
              onClick={() => setActivePill(d)}
              className="cursor-pointer"
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                border: `1px solid ${isActive ? "rgba(241,79,68,0.25)" : t.borderSubtle}`,
                background: isActive ? t.accentSoft : "transparent",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 11.5,
                color: isActive ? t.accent : t.textMuted,
                transition: "all 0.2s ease",
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center" style={{ gap: 8 }}>
        {/* Role selector */}
        <div ref={roleRef} className="relative">
          <button
            onClick={() => { setRoleOpen((v) => !v); setLangOpen(false); }}
            className="flex items-center cursor-pointer"
            style={{
              gap: 4,
              padding: "6px 14px",
              borderRadius: 999,
              border: `1px solid ${roleOpen ? t.borderHover : t.borderSubtle}`,
              background: roleOpen ? t.bgCardHover : "transparent",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11.5,
              color: t.textSecondary,
              transition: "all 0.2s ease",
            }}
          >
            {roleOptions[activeRole].label}
            <ChevronDown
              size={13}
              strokeWidth={1.8}
              style={{
                color: t.textMuted,
                transition: "transform 0.2s ease",
                transform: roleOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Role Dropdown */}
          {roleOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                width: 260,
                background: t.bgCard,
                border: `1px solid ${t.borderSubtle}`,
                borderRadius: 14,
                padding: "6px",
                zIndex: 100,
                boxShadow: theme === "dark"
                  ? "0 12px 40px rgba(0,0,0,0.5)"
                  : "0 12px 40px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{
                padding: "8px 12px 6px",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                color: t.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Switch Role View
              </div>
              {roleOptions.map((role, i) => {
                const isSelected = i === activeRole;
                return (
                  <button
                    key={role.label}
                    onClick={() => { setActiveRole(i); setRoleOpen(false); }}
                    className="flex items-center w-full cursor-pointer"
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: isSelected ? t.accentSoft : "transparent",
                      border: "none",
                      gap: 10,
                      transition: "background 0.15s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = t.bgCardHover; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = isSelected ? t.accentSoft : "transparent"; }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 13,
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? t.accent : t.textPrimary,
                      }}>
                        {role.label}
                      </div>
                      <div style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 11,
                        color: t.textMuted,
                        marginTop: 1,
                      }}>
                        {role.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} strokeWidth={2.5} style={{ color: t.accent, flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Language toggle */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => { setLangOpen((v) => !v); setRoleOpen(false); }}
            className="flex items-center cursor-pointer"
            style={{
              gap: 5,
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${langOpen ? t.borderHover : t.borderSubtle}`,
              background: langOpen ? t.bgCardHover : "transparent",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11.5,
              color: t.textSecondary,
              transition: "all 0.2s ease",
            }}
          >
            <Globe size={13} strokeWidth={1.8} style={{ color: t.textMuted }} />
            {activeLang.flag}
            <ChevronDown
              size={12}
              strokeWidth={1.8}
              style={{
                color: t.textMuted,
                transition: "transform 0.2s ease",
                transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Language Dropdown */}
          {langOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                width: 220,
                background: t.bgCard,
                border: `1px solid ${t.borderSubtle}`,
                borderRadius: 14,
                padding: "6px",
                zIndex: 100,
                boxShadow: theme === "dark"
                  ? "0 12px 40px rgba(0,0,0,0.5)"
                  : "0 12px 40px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{
                padding: "8px 12px 6px",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                color: t.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Language
              </div>
              {langOptions.map((opt) => {
                const isSelected = opt.code === lang;
                return (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setLangOpen(false); }}
                    className="flex items-center w-full cursor-pointer"
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: isSelected ? t.accentSoft : "transparent",
                      border: "none",
                      gap: 10,
                      transition: "background 0.15s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = t.bgCardHover; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = isSelected ? t.accentSoft : "transparent"; }}
                  >
                    <span style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: isSelected ? t.accent : t.textMuted,
                      width: 28,
                    }}>
                      {opt.flag}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 13,
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? t.accent : t.textPrimary,
                      }}>
                        {opt.label}
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} strokeWidth={2.5} style={{ color: t.accent, flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center cursor-pointer"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            border: `1px solid ${t.borderSubtle}`,
            background: "transparent",
            transition: "all 0.2s ease",
          }}
        >
          {theme === "dark" ? (
            <Sun size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
          ) : (
            <Moon size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
          )}
        </button>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="flex items-center justify-center cursor-pointer relative"
            style={{
              width: 34, height: 34, borderRadius: 9,
              border: `1px solid ${t.borderSubtle}`,
              background: "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <Bell size={15} strokeWidth={1.7} style={{ color: t.textMuted }} />
            <span
              className="absolute"
              style={{
                top: 6, right: 6, width: 6, height: 6, borderRadius: "50%",
                background: "#F14F44",
                boxShadow: "0 0 8px rgba(241,79,68,0.5)",
                animation: "pulse 2s infinite",
              }}
            />
          </button>
          <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* Avatar */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            padding: 1.5,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: t.bgSidebar,
              fontFamily: "'Sora', sans-serif", fontSize: 11,
              color: t.textPrimary, fontWeight: 600,
            }}
          >
            {roleOptions[activeRole].label.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
