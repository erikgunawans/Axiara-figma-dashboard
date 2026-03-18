import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedKPI, GlassCard, SectionHeader, AnimatedTable, HoverTableRow, StaggerIn, GlowBar } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const rows = [
  { name: "Browser Ext (A)", type: "Sensor", status: "Healthy", uptime: "99.97%", uptimeVal: 99.97, lastSync: "2m ago", throughput: "12.4K/d" },
  { name: "DNS Monitor (B)", type: "Sensor", status: "Healthy", uptime: "99.99%", uptimeVal: 99.99, lastSync: "30s ago", throughput: "8.2K/d" },
  { name: "Cloud OAuth (C)", type: "Sensor", status: "Degraded", uptime: "98.40%", uptimeVal: 98.40, lastSync: "14m ago", throughput: "3.1K/d" },
  { name: "OS Agent (D)", type: "Sensor", status: "Healthy", uptime: "99.95%", uptimeVal: 99.95, lastSync: "1m ago", throughput: "5.7K/d" },
  { name: "MCP Scanner (E)", type: "Sensor", status: "Healthy", uptime: "100%", uptimeVal: 100, lastSync: "45s ago", throughput: "2.2K/d" },
  { name: "Splunk Enterprise", type: "SIEM", status: "Connected", uptime: "99.98%", uptimeVal: 99.98, lastSync: "Real-time", throughput: "31.6K/d" },
  { name: "Jira Cloud", type: "Ticketing", status: "Connected", uptime: "99.90%", uptimeVal: 99.90, lastSync: "5m ago", throughput: "42/d" },
  { name: "PagerDuty", type: "SOAR", status: "Connected", uptime: "100%", uptimeVal: 100, lastSync: "On-demand", throughput: "3/d" },
];

const statusStyles: Record<string, { color: string; bg: string }> = {
  Healthy: { color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  Connected: { color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  Degraded: { color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
};

const columns = [
  { label: "Integration", flex: 1.3 },
  { label: "Type", flex: 0.7 },
  { label: "Status", flex: 0.8 },
  { label: "Uptime", width: 80 },
  { label: "Last Sync", flex: 0.8 },
  { label: "Throughput", flex: 0.7 },
];

export function IntegrationsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <div className="flex items-start justify-between" style={{ marginBottom: 22 }}>
        <SectionHeader tag="AXIARA CONNECT" title="Integration Health" />
        <button
          className="cursor-pointer"
          style={{
            padding: "7px 16px", borderRadius: 999, border: "none",
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
            position: "relative", fontFamily: manrope, fontSize: 11, fontWeight: 500, color: "#fff",
          }}
        >
          <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
          <span style={{ position: "relative", zIndex: 1 }}>Configure</span>
        </button>
      </div>

      {/* KPI ROW */}
      <div className="flex" style={{ gap: 12, marginBottom: 22 }}>
        <AnimatedKPI label="SENSORS ACTIVE" value={5} suffix="/5" delay={0.05} sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>100% vectors</span></>} />
        <AnimatedKPI label="SIEM CONNECTED" value={1} delay={0.1} sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>Splunk</span>} />
        <AnimatedKPI label="EVENTS / DAY" value={31.6} suffix="K" delay={0.15} sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>+8% pipeline</span></>} />
        <AnimatedKPI label="WEBHOOK HEALTH" value={100} suffix="%" delay={0.2} sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>all endpoints</span>} />
      </div>

      {/* FILTER BAR */}
      <StaggerIn delay={0.25}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
        <div className="flex items-center" style={{ width: 360, padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "#111111", gap: 8 }}>
          <Search size={15} strokeWidth={1.8} style={{ color: "#AEB3BD", flexShrink: 0 }} />
          <input placeholder="Search integrations..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }} />
        </div>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Category <ChevronDown size={13} strokeWidth={1.8} style={{ color: "#AEB3BD" }} />
        </button>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Status <ChevronDown size={13} strokeWidth={1.8} style={{ color: "#AEB3BD" }} />
        </button>
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
        {rows.map((row) => (
          <HoverTableRow key={row.name} className="flex items-center" style={{ padding: "11px 14px", borderBottom: "0.5px solid #2A2A2A" }}>
            <span style={{ flex: 1.3, fontFamily: manrope, fontSize: 13, fontWeight: 600, color: "#F5F5F5" }}>{row.name}</span>
            <span style={{ flex: 0.7 }}>
              <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, background: "rgba(241,79,68,0.1)", fontFamily: manrope, fontSize: 11, color: "#F14F44" }}>{row.type}</span>
            </span>
            <span style={{ flex: 0.8 }}>
              <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 999, background: statusStyles[row.status].bg, fontFamily: manrope, fontSize: 10.5, fontWeight: 600, color: statusStyles[row.status].color }}>{row.status}</span>
            </span>
            <span style={{ width: 80, fontFamily: sora, fontSize: 13, fontWeight: 600, color: row.uptimeVal >= 99.9 ? "#2ECC71" : "#F5A623" }}>{row.uptime}</span>
            <span style={{ flex: 0.8, fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.lastSync}</span>
            <span style={{ flex: 0.7, fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.throughput}</span>
          </HoverTableRow>
        ))}
      </AnimatedTable>

      {/* BUFFER UTILIZATION */}
      <GlassCard delay={0.35} style={{ marginTop: 18, padding: "20px 22px" }}>
        <div style={{ fontFamily: sora, fontSize: 14, color: "#F5F5F5" }}>
          Buffer Utilization by Vector
        </div>
        <div className="flex" style={{ gap: 14, marginTop: 14 }}>
          {[
            { letter: "A", pct: 12, name: "Browser" },
            { letter: "B", pct: 3, name: "DNS" },
            { letter: "C", pct: 8, name: "OAuth" },
            { letter: "D", pct: 5, name: "OS Agent" },
            { letter: "E", pct: 2, name: "MCP" },
          ].map((v, i) => (
            <div key={v.letter} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontFamily: manrope, fontSize: 10.5, color: "#AEB3BD", marginBottom: 6 }}>
                Vector {v.letter}
              </div>
              <div style={{ height: 56, background: "#1E1E1E", borderRadius: 8, position: "relative", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(v.pct / 100) * 56}px`,
                    borderRadius: "0 0 8px 8px",
                    background: "linear-gradient(to top, #E24C4A, #386BB7)",
                    boxShadow: `0 0 8px rgba(226,76,74,0.3)`,
                    transition: "height 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
              <div style={{ fontFamily: sora, fontSize: 13, fontWeight: 700, color: "#F5F5F5", marginTop: 5 }}>
                {v.pct}%
              </div>
              <div style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD" }}>
                {v.name}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}