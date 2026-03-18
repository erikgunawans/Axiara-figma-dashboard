import { ChevronUp, AlertTriangle, ArrowRight } from "lucide-react";
import { AnimatedKPI, GlassCard, SectionHeader, StaggerIn, HoverTableRow } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const departments = [
  { name: "Engineering", count: 423, color: "#F14F44" },
  { name: "Marketing", count: 312, color: "#386BB7" },
  { name: "Sales", count: 189, color: "#F5A623" },
  { name: "Support", count: 178, color: "#2ECC71" },
  { name: "HR", count: 145, color: "#9B59B6" },
];

const tools = [
  { name: "ChatGPT", count: 124 },
  { name: "Copilot", count: 201 },
  { name: "Claude", count: 89 },
  { name: "Notion AI", count: 95 },
  { name: "Grammarly", count: 178 },
];

const destinations = [
  { name: "🇺🇸 US — OpenAI", alert: true },
  { name: "🇺🇸 US — Anthropic", alert: false },
  { name: "🇸🇬 SG — Microsoft", alert: false },
  { name: "🇺🇸 US — Notion", alert: true },
  { name: "🇮🇩 ID — Self-Hosted", alert: false },
];

export function DataFlowsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* SECTION HEADER */}
      <div className="flex items-start justify-between">
        <SectionHeader tag="AXIARA TRACE" title="Data Flow Map" />
        <button
          className="cursor-pointer"
          style={{
            padding: "7px 16px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            position: "relative",
            fontFamily: manrope,
            fontSize: 11,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
          <span style={{ position: "relative", zIndex: 1 }}>View Cross-Border</span>
        </button>
      </div>

      {/* KPI ROW */}
      <div className="flex" style={{ gap: 12, marginBottom: 2 }}>
        <AnimatedKPI label="PII FLOWS TRACKED" value={1247} delay={0.05} sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>+89 this week</span></>} />
        <AnimatedKPI label="CROSS-BORDER TRANSFERS" value={34} delay={0.1} sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>requiring assessment</span>} />
        <AnimatedKPI label="DATA DESTINATIONS" value={18} delay={0.15} sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>countries</span>} />
      </div>

      {/* FLOW TOPOLOGY CARD */}
      <GlassCard delay={0.2} style={{ padding: "20px 22px" }}>
        <div style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.03em" }}>
          FLOW TOPOLOGY
        </div>
        <div style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", marginTop: 4, marginBottom: 16 }}>
          Department → AI Tool → Data Destination
        </div>

        <div className="flex" style={{ gap: 2 }}>
          {/* DEPARTMENTS */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginBottom: 10 }}>
              DEPARTMENTS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
              {departments.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between"
                  style={{
                    padding: "7px 10px",
                    borderRadius: 10,
                    background: `${d.color}26`,
                    border: `1px solid ${d.color}4D`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = `0 0 12px ${d.color}33`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span style={{ fontFamily: manrope, fontSize: 12, fontWeight: 600, color: d.color }}>{d.name}</span>
                  <span style={{ fontFamily: manrope, fontSize: 11, color: d.color }}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow arrows */}
          <div className="flex flex-col items-center justify-center" style={{ width: 32, gap: 4, opacity: 0.25 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 16, height: 1, background: "#AEB3BD", margin: "12px 0" }} />
            ))}
          </div>

          {/* AI TOOLS */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginBottom: 10 }}>
              AI TOOLS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
              {tools.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between"
                  style={{
                    padding: "7px 10px",
                    borderRadius: 10,
                    background: "#1E1E1E",
                    border: "0.5px solid #3F3F3F",
                    transition: "border-color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(241,79,68,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <span style={{ fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#F5F5F5" }}>{t.name}</span>
                  <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow arrows */}
          <div className="flex flex-col items-center justify-center" style={{ width: 32, gap: 4, opacity: 0.25 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 16, height: 1, background: "#AEB3BD", margin: "12px 0" }} />
            ))}
          </div>

          {/* DESTINATIONS */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginBottom: 10 }}>
              DESTINATIONS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
              {destinations.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between"
                  style={{
                    padding: "7px 10px",
                    borderRadius: 10,
                    background: d.alert ? "rgba(241,79,68,0.1)" : "#1E1E1E",
                    border: d.alert ? "1px solid rgba(241,79,68,0.5)" : "0.5px solid #3F3F3F",
                    transition: "transform 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#F5F5F5" }}>{d.name}</span>
                  {d.alert && <AlertTriangle size={12} style={{ color: "#F14F44" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ACT 2 — CROSS-BORDER EXPOSURE */}
      <GlassCard delay={0.3} style={{ padding: "20px 22px" }}>
        <div style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.03em" }}>
          CROSS-BORDER EXPOSURE
        </div>
        <div style={{ fontFamily: sora, fontSize: 14, color: "#F5F5F5", marginTop: 4, marginBottom: 12 }}>
          Transfer Alerts
        </div>

        {[
          { route: "🇮🇩 → 🇺🇸", tool: "ChatGPT", dataType: "Customer PII", status: "Requires Assessment", badge: "Under Review", badgeColor: "#F5A623" },
          { route: "🇮🇩 → 🇺🇸", tool: "Notion AI", dataType: "Employee Data", status: "Requires Assessment", badge: "Under Review", badgeColor: "#F5A623" },
          { route: "🇮🇩 → 🇺🇸", tool: "Midjourney", dataType: "Trade Secrets", status: "Blocked", badge: "Banned", badgeColor: "#F14F44" },
        ].map((row, i) => (
          <HoverTableRow
            key={i}
            className="flex items-center"
            style={{
              gap: 14,
              padding: "9px 0",
              borderBottom: i < 2 ? "0.5px solid #2A2A2A" : "none",
            }}
          >
            <span style={{ fontSize: 16 }}>{row.route}</span>
            <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{row.tool}</span>
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.dataType}</span>
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.status}</span>
            <div style={{ flex: 1 }} />
            <span className="flex items-center" style={{ gap: 6, padding: "4px 10px", borderRadius: 999, background: `${row.badgeColor}1F`, fontFamily: manrope, fontSize: 11, fontWeight: 600, color: row.badgeColor }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.badgeColor }} />
              {row.badge}
            </span>
          </HoverTableRow>
        ))}
      </GlassCard>

      {/* ACT 3 — ACTION ITEMS */}
      <GlassCard delay={0.35} style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: sora, fontSize: 16, color: "#F5F5F5" }}>
            2 cross-border assessments required
          </div>
          <div style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", marginTop: 3 }}>
            ChatGPT and Notion AI require UU PDP cross-border transfer assessments before continued use.
          </div>
        </div>
        <button
          className="flex items-center cursor-pointer"
          style={{
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
          <span style={{ position: "relative", zIndex: 1, fontFamily: manrope, fontSize: 11, color: "#fff" }}>
            Generate Assessments
          </span>
          <span className="flex items-center justify-center" style={{ position: "relative", zIndex: 1, width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}>
            <ArrowRight size={11} style={{ color: "#fff" }} />
          </span>
        </button>
      </GlassCard>
    </div>
  );
}