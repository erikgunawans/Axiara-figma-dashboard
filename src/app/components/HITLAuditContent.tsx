import { useState } from "react";
import { Search, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";
import { AnimatedKPI, GlassCard, SectionHeader, AnimatedTable, HoverTableRow, StaggerIn } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const auditRows = [
  { id: "HITL-2026-0341", tool: "ChatGPT", decision: "Approved → Restricted", reviewer: "Budi Santoso (DPO)", date: "2026-03-17", severity: "High" as const, framework: "UU PDP" },
  { id: "HITL-2026-0340", tool: "Jasper AI", decision: "Discovered → Banned", reviewer: "Budi Santoso (DPO)", date: "2026-03-16", severity: "Critical" as const, framework: "POJK" },
  { id: "HITL-2026-0339", tool: "Claude", decision: "Under Review → Approved", reviewer: "Dewi Lestari (CISO)", date: "2026-03-15", severity: "Low" as const, framework: "ISO 42001" },
  { id: "HITL-2026-0338", tool: "Copilot", decision: "Under Review → Approved", reviewer: "Budi Santoso (DPO)", date: "2026-03-14", severity: "Low" as const, framework: "UU PDP" },
  { id: "HITL-2026-0337", tool: "Midjourney", decision: "Conditional → Restricted", reviewer: "Rina Wati (IT)", date: "2026-03-13", severity: "Medium" as const, framework: "POJK" },
  { id: "HITL-2026-0336", tool: "Notion AI", decision: "Discovered → Sandbox", reviewer: "Dewi Lestari (CISO)", date: "2026-03-12", severity: "Medium" as const, framework: "UU PDP" },
  { id: "HITL-2026-0335", tool: "Grammarly", decision: "Approved → Approved", reviewer: "Auto-Renew", date: "2026-03-11", severity: "Low" as const, framework: "ISO 42001" },
];

const severityColors: Record<string, string> = {
  Critical: "#F14F44",
  High: "#E24C4A",
  Medium: "#F5A623",
  Low: "#386BB7",
};

const columns = [
  { label: "Audit ID", width: 120 },
  { label: "Tool", width: undefined },
  { label: "Decision", width: undefined },
  { label: "Reviewer", width: undefined },
  { label: "Date", width: 80 },
  { label: "Severity", width: 80 },
  { label: "Framework", width: 90 },
];

export function HITLAuditContent() {
  const [viewMode, setViewMode] = useState<"Table" | "Timeline">("Table");
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const [activePage, setActivePage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* SECTION HEADER */}
      <div className="flex items-start justify-between" style={{ marginBottom: 22 }}>
        <SectionHeader tag="GOVERNANCE ENGINE" title="Human-in-the-Loop Audit Trail" />
        <div className="flex items-center" style={{ gap: 8 }}>
          <div
            className="flex items-center"
            style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "3px 4px" }}
          >
            {(["Table", "Timeline"] as const).map((mode) => {
              const isActive = viewMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="cursor-pointer"
                  style={{
                    padding: "3px 10px",
                    borderRadius: 5,
                    background: isActive ? "rgba(241,79,68,0.18)" : "transparent",
                    border: "none",
                    fontFamily: manrope,
                    fontSize: 11.5,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#F14F44" : "#AEB3BD",
                    transition: "all 0.15s",
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </div>
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
            <span style={{ position: "relative", zIndex: 1 }}>Export Log</span>
          </button>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="flex" style={{ gap: 12, marginBottom: 22 }}>
        <AnimatedKPI label="TOTAL DECISIONS" value={341} delay={0.05} info="Total governance decisions recorded in the audit trail since system inception." sub={<><ChevronUp size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>+28 this month</span></>} />
        <AnimatedKPI label="PENDING REVIEW" value={7} delay={0.1} info="Number of AI tools awaiting human-in-the-loop governance decisions from designated reviewers." sub={<span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>items awaiting</span>} />
        <AnimatedKPI label="AVG TRIAGE TIME" value={1.8} suffix="h" delay={0.15} info="Average time from tool flagging to a final governance decision by a reviewer." sub={<><TrendingDown size={13} style={{ color: "#2ECC71" }} /><span style={{ fontFamily: manrope, fontSize: 11, color: "#2ECC71" }}>-22% target &lt;2h</span></>} />
      </div>

      {/* FILTER BAR */}
      {viewMode === "Table" && <>
      <StaggerIn delay={0.2}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
        <div
          className="flex items-center"
          style={{ width: 360, background: "#111111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "0 12px", height: 36, gap: 8 }}
        >
          <Search size={14} strokeWidth={1.8} style={{ color: "#AEB3BD", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by ID, tool, reviewer..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}
          />
        </div>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Filter
        </button>
        <button className="flex items-center cursor-pointer" style={{ gap: 4, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
          Sort
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>341 decisions</span>
      </div>
      </StaggerIn>
      </>}

      {/* DATA TABLE */}
      {viewMode === "Table" && (
        <>
      <AnimatedTable delay={0.25}>
        {/* Header */}
        <div className="flex items-center" style={{ background: "#1E1E1E", padding: "11px 14px" }}>
          {columns.map((col) => (
            <span
              key={col.label}
              style={{
                width: col.width,
                flex: col.width ? undefined : 1,
                fontFamily: manrope,
                fontSize: 10.5,
                fontWeight: 600,
                color: "#AEB3BD",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {col.label}
            </span>
          ))}
        </div>

        {/* Rows */}
        {auditRows.map((row, i) => (
          <div key={row.id}>
            <HoverTableRow
              className="flex items-center cursor-pointer"
              onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}
              style={{
                padding: "11px 14px",
                borderBottom: "0.5px solid #2A2A2A",
                background: expandedRow === i ? "rgba(241,79,68,0.03)" : "transparent",
              }}
            >
              <span style={{ width: 120, fontFamily: manrope, fontSize: 12, fontWeight: 700, color: "#F14F44" }}>{row.id}</span>
              <span style={{ flex: 1, fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>{row.tool}</span>
              <span style={{ flex: 1, fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{row.decision}</span>
              <span style={{ flex: 1, fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>{row.reviewer}</span>
              <span style={{ width: 80, fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{row.date.slice(5)}</span>
              <span style={{ width: 80 }}>
                <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, background: `${severityColors[row.severity]}18`, fontFamily: manrope, fontSize: 10.5, fontWeight: 600, color: severityColors[row.severity] }}>
                  {row.severity}
                </span>
              </span>
              <span style={{ width: 90 }}>
                <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, background: "rgba(241,79,68,0.08)", fontFamily: manrope, fontSize: 11, fontWeight: 600, color: "#F14F44" }}>
                  {row.framework}
                </span>
              </span>
            </HoverTableRow>

            {expandedRow === i && (
              <div style={{ background: "#1E1E1E", padding: "16px 20px 16px 50px", borderBottom: "0.5px solid #2A2A2A" }}>
                <div style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 8 }}>
                  EVIDENCE DETAIL
                </div>
                <div style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", maxWidth: 720, lineHeight: 1.65 }}>
                  {i === 0
                    ? "ChatGPT usage exceeded approved data classification tier. Customer PII detected in 3 prompt sessions. Restricting access pending DPA review with OpenAI. Reference: UU PDP Article 14."
                    : i === 1
                    ? "Jasper AI discovered via network telemetry. No procurement record found. Marketing department using personal accounts with company data. Immediate ban enforced per POJK data sovereignty requirements."
                    : i === 2
                    ? "Claude API integration reviewed by CISO. Data processing agreement verified. Approved for internal use with Tier-2 data classification. ISO 42001 alignment confirmed."
                    : i === 3
                    ? "Copilot integration reviewed for code repository access. No PII exposure detected. Approved for engineering team with standard monitoring. UU PDP compliance verified."
                    : i === 4
                    ? "Midjourney usage flagged for potential IP concerns. Conditional approval downgraded to restricted pending legal review of output ownership terms under POJK guidelines."
                    : i === 5
                    ? "Notion AI discovered in product team workspace. Sandboxed for 30-day evaluation period. Data residency verification pending. UU PDP cross-border transfer assessment required."
                    : "Grammarly auto-renewal processed. No policy changes detected. Continued compliance with ISO 42001 data handling requirements. No action needed."}
                </div>
              </div>
            )}
          </div>
        ))}
      </AnimatedTable>

      {/* PAGINATION */}
      <StaggerIn delay={0.3}>
      <div className="flex items-center justify-between" style={{ marginTop: 16 }}>
        <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Showing 1–7 of 341</span>
        <div className="flex items-center" style={{ gap: 4 }}>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 28, height: 28, borderRadius: 6, border: "none",
                background: activePage === p ? "rgba(241,79,68,0.15)" : "#1E1E1E",
                fontFamily: manrope, fontSize: 11.5, fontWeight: activePage === p ? 700 : 500,
                color: activePage === p ? "#F14F44" : "#AEB3BD", transition: "all 0.15s",
              }}
            >
              {p}
            </button>
          ))}
          <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", padding: "0 4px" }}>...</span>
          <button className="flex items-center justify-center cursor-pointer" style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "#1E1E1E", fontFamily: manrope, fontSize: 11.5, color: "#AEB3BD" }}>
            49
          </button>
        </div>
      </div>
      </StaggerIn>
        </>
      )}

      {/* TIMELINE VIEW */}
      {viewMode === "Timeline" && (
        <StaggerIn delay={0.2}>
        <div style={{ paddingLeft: 28, position: "relative" }}>
          <div style={{ position: "absolute", left: 28 + 5, top: 0, bottom: 0, width: 2, background: "rgba(63,63,63,0.6)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { action: "RESTRICTED", color: "#E24C4A", tool: "ChatGPT", id: "HITL-2026-0341", meta: "Budi Santoso (DPO) · UU PDP · Mar 17, 14:23" },
              { action: "BANNED", color: "#F14F44", tool: "Jasper AI", id: "HITL-2026-0340", meta: "Budi Santoso (DPO) · POJK 30/2025 · Mar 16, 09:41" },
              { action: "APPROVED", color: "#2ECC71", tool: "Claude", id: "HITL-2026-0339", meta: "Dewi Lestari (CISO) · ISO 42001 · Mar 15, 11:15" },
              { action: "APPROVED", color: "#2ECC71", tool: "Copilot", id: "HITL-2026-0338", meta: "Budi Santoso (DPO) · UU PDP · Mar 14, 16:02" },
              { action: "RESTRICTED", color: "#E24C4A", tool: "Midjourney", id: "HITL-2026-0337", meta: "Rina Wati (IT Admin) · POJK 30/2025 · Mar 13, 10:30" },
            ].map((entry) => (
              <GlassCard key={entry.id} delay={0.1} style={{ marginLeft: 34, padding: "12px 16px", position: "relative" }}>
                <div style={{ position: "absolute", left: -56, top: 8, width: 12, height: 12, borderRadius: "50%", background: entry.color, border: "2.5px solid #171717", zIndex: 2 }} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <span style={{ fontFamily: manrope, fontSize: 12, fontWeight: 700, color: entry.color }}>{entry.action}</span>
                    <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 600, color: "#F5F5F5" }}>{entry.tool}</span>
                  </div>
                  <span style={{ fontFamily: manrope, fontSize: 10, fontWeight: 600, color: "#F14F44" }}>{entry.id}</span>
                </div>
                <div style={{ fontFamily: manrope, fontSize: 10.5, color: "#AEB3BD", marginTop: 6 }}>{entry.meta}</div>
              </GlassCard>
            ))}
          </div>
        </div>
        </StaggerIn>
      )}
    </div>
  );
}