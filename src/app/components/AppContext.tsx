import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  t: ThemeColors;
}

export interface ThemeColors {
  // Backgrounds
  bg: string;
  bgSidebar: string;
  bgCard: string;
  bgCardHover: string;
  bgElevated: string;
  bgInput: string;
  bgOverlay: string;
  bgTableHeader: string;
  bgHoverRow: string;
  bgPage: string;

  // Borders
  border: string;
  borderHover: string;
  borderSubtle: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textLabel: string;

  // Accent (unchanged)
  accent: string;
  accentSoft: string;
  accentGlow: string;

  // Shadows
  shadowCard: string;
  shadowCardHover: string;

  // Misc
  topHighlight: string;
  topHighlightHover: string;
  barTrack: string;
  noiseOpacity: number;
  meshOpacity: number;
}

const darkColors: ThemeColors = {
  bg: "#0A0A0A",
  bgSidebar: "#0E0E0E",
  bgCard: "#111111",
  bgCardHover: "rgba(255,255,255,0.02)",
  bgElevated: "#161616",
  bgInput: "#111111",
  bgOverlay: "rgba(0,0,0,0.5)",
  bgTableHeader: "rgba(255,255,255,0.04)",
  bgHoverRow: "rgba(255,255,255,0.02)",
  bgPage: "#0A0A0A",

  border: "rgba(255,255,255,0.04)",
  borderHover: "rgba(255,255,255,0.08)",
  borderSubtle: "rgba(255,255,255,0.06)",

  textPrimary: "#E5E5E5",
  textSecondary: "#999",
  textMuted: "#555",
  textLabel: "#555",

  accent: "#F14F44",
  accentSoft: "rgba(241,79,68,0.08)",
  accentGlow: "rgba(241,79,68,0.4)",

  shadowCard: "0 2px 8px rgba(0,0,0,0.2)",
  shadowCardHover: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",

  topHighlight: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
  topHighlightHover: "linear-gradient(90deg, transparent, rgba(241,79,68,0.2), rgba(56,107,183,0.15), transparent)",
  barTrack: "rgba(255,255,255,0.04)",
  noiseOpacity: 0.5,
  meshOpacity: 1,
};

const lightColors: ThemeColors = {
  bg: "#F5F5F7",
  bgSidebar: "#FFFFFF",
  bgCard: "#FFFFFF",
  bgCardHover: "rgba(0,0,0,0.01)",
  bgElevated: "#F0F0F2",
  bgInput: "#F5F5F7",
  bgOverlay: "rgba(0,0,0,0.2)",
  bgTableHeader: "rgba(0,0,0,0.03)",
  bgHoverRow: "rgba(0,0,0,0.02)",
  bgPage: "#F5F5F7",

  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(0,0,0,0.15)",
  borderSubtle: "rgba(0,0,0,0.1)",

  textPrimary: "#1A1A1A",
  textSecondary: "#555",
  textMuted: "#999",
  textLabel: "#888",

  accent: "#E24C4A",
  accentSoft: "rgba(226,76,74,0.08)",
  accentGlow: "rgba(226,76,74,0.3)",

  shadowCard: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowCardHover: "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",

  topHighlight: "linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)",
  topHighlightHover: "linear-gradient(90deg, transparent, rgba(226,76,74,0.15), rgba(56,107,183,0.1), transparent)",
  barTrack: "rgba(0,0,0,0.06)",
  noiseOpacity: 0,
  meshOpacity: 0.4,
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("axiara-theme") as Theme) || "dark";
    } catch {
      return "dark";
    }
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("axiara-theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleSidebar = () => setSidebarCollapsed((v) => !v);
  const t = theme === "dark" ? darkColors : lightColors;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, sidebarCollapsed, setSidebarCollapsed, toggleSidebar, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
