import { Search, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";
import { AnimatedKPI, SectionHeader, AnimatedTable, HoverTableRow, StaggerIn } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const catalogRows = [
  { tool: "Claude", vendor: "Anthropic", category: "LLM", license: "Enterprise", safety: "A+" as const, status: "Approved" as const, users: 89, dpa: true },
  { tool: "Copilot", vendor: "GitHub", category: "Code Assistant", license: "Business", safety: "A" as const, status: "Approved" as const, users: 201, dpa: true },
  { tool: "ChatGPT Enterprise", vendor: "OpenAI", category: "LLM", license: "Enterprise", safety: "B+" as const, status: "Conditional" as const, users: 124, dpa: true },
  { tool: "Notion AI", vendor: "Notion", category: "Productivity", license: "Business", safety: "B" as const, status: "Pending Review" as const, users: 95, dpa: false },
  { tool: "Canva AI", vendor: "Canva", category: "Design", license: "Teams", safety: "B+" as const, status: "Approved" as const, users: 34, dpa: true },
  { tool: "Grammarly Business", vendor: "", category: "Writing", license: "Enterprise", safety: "C+" as const, status: "Under Review" as const, users: 178, dpa: false },
];

const safetyColors: Record<string, string> = {
  "A+": "#2ECC71", "A": "#2ECC71", "B+": "#F5A623", "B": "#F5A623", "C+": "#F14F44",
};

const statusStyles: Record<string, { color: string; bg: string }> = {
  "Approved": { color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  "Conditional": { color: "#386BB7", bg: "rgba(56,107,183,0.12)" },
  "Pending Review": { color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
  "Under Review": { color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
};

const columns = [
  { label: "Tool", flex: 1.4 },
  { label: "Category", flex: 0.8 },
  { label: "License", flex: 0.7 },
  { label: "Safety", width: 60 },
  { label: "Status", flex: 0.9 },
  { label: "Users", width: 60 },
  { label: "DPA", flex: 0.7 },
];

export function CatalogContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* SECTION HEADER */}
      <div className="flex items-start justify-between" style={{ marginBottom: 22 }}>
        <SectionHeader tag="AXIARA ENABLE" title="Approved AI Catalog" />
        <button
          className="cursor-pointer"
          style={{
            padding: "7px 16px", borderRadius: 999, border: "none",
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            position: "relative", fontFamily: manrope, fontSize: 11, fontWeight: 500, color: "#fff",
          }}
        >
          <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
          <span style={{ position: "relative", zIndex: 1 }}>Add Tool</span>
        </button>
      </div>

      {/* KPI ROW */}
      <div className="flex" style={{ gap: 12, marginBottom: 22 }}>
        <AnimatedKPI label="CATALOG ENTRIES" value={24} delay={0.05} sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>+3 this month</span></>} />
        <AnimatedKPI label="PENDING REQUESTS" value={8} delay={0.1} sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>from employees</span>} />
        <AnimatedKPI label="ADOPTION RATE" value={67} suffix="%" delay={0.15} sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>+4% monthly active</span></>} />
        <AnimatedKPI label="REQUEST CYCLE" value={3.2} suffix="d" delay={0.2} sub={<><TrendingDown size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>-1.1d faster</span></>} />
      </div>

      {/* FILTER BAR */}
      <StaggerIn delay={0.25}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
        <div className="flex items-center" style={{ width: 360, padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "#111111", gap: 8 }}>
          <Search size={15} strokeWidth={1.8} style={{ color: "#AEB3BD", flexShrink: 0 }} />
          <input placeholder="Search tools, categories..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }} />
        </div>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Category <ChevronDown size={13} strokeWidth={1.8} style={{ color: "#AEB3BD" }} />
        </button>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Status <ChevronDown size={13} strokeWidth={1.8} style={{ color: "#AEB3BD" }} />
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>24 tools</span>
      </div>
      </StaggerIn>

      {/* DATA TABLE */}
      <AnimatedTable delay={0.3}>
        <div className="flex items-center" style={{ background: "#1E1E1E", padding: "11px 14px" }}>
          {columns.map((col) => (
            <span key={col.label} style={{ width: "width" in col ? col.width : undefined, flex: "flex" in col ? col.flex : undefined, fontFamily: manrope, fontSize: 10.5, fontWeight: 600, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {col.label}
            </span>
          ))}
        </div>
        {catalogRows.map((row) => (
          <HoverTableRow key={row.tool} className="flex items-center" style={{ padding: "11px 14px", borderBottom: "0.5px solid #2A2A2A" }}>
            <span style={{ flex: 1.4 }}>
              <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 600, color: "#F5F5F5" }}>{row.tool}</span>
              {row.vendor && <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}> ({row.vendor})</span>}
            </span>
            <span style={{ flex: 0.8, fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{row.category}</span>
            <span style={{ flex: 0.7, fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{row.license}</span>
            <span style={{ width: 60, fontFamily: sora, fontSize: 14, color: safetyColors[row.safety] }}>{row.safety}</span>
            <span style={{ flex: 0.9 }}>
              <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 999, background: statusStyles[row.status].bg, fontFamily: manrope, fontSize: 10.5, fontWeight: 600, color: statusStyles[row.status].color }}>
                {row.status}
              </span>
            </span>
            <span style={{ width: 60, fontFamily: sora, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{row.users}</span>
            <span style={{ flex: 0.7, fontFamily: manrope, fontSize: 12, fontWeight: 600, color: row.dpa ? "#2ECC71" : "#F14F44" }}>
              {row.dpa ? "✓ Verified" : "✗ Missing"}
            </span>
          </HoverTableRow>
        ))}
      </AnimatedTable>
    </div>
  );
}