import { Search, MoreHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { GovernanceModal } from "./GovernanceModal";
import { AnimatedKPI, GlassCard, SectionHeader, AnimatedTable, HoverTableRow, StaggerIn, CardHeader, InfoTooltip } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

// Heatmap data: 7 days × 24 hours, values 0-3 for intensity
const heatmapData: number[][] = (() => {
  const d: number[][] = [];
  for (let day = 0; day < 7; day++) {
    const row: number[] = [];
    for (let h = 0; h < 24; h++) {
      const isTueThu = day >= 1 && day <= 3;
      const isMorning = h >= 9 && h <= 11;
      const isAfternoon = h >= 14 && h <= 16;
      if (isTueThu && (isMorning || isAfternoon)) {
        row.push(Math.random() > 0.3 ? 3 : 2);
      } else if ((day >= 1 && day <= 4) && ((h >= 8 && h <= 12) || (h >= 13 && h <= 17))) {
        row.push(Math.random() > 0.5 ? 2 : 1);
      } else if (h >= 7 && h <= 19) {
        row.push(Math.random() > 0.6 ? 1 : 0);
      } else {
        row.push(0);
      }
    }
    d.push(row);
  }
  return d;
})();

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatColors = ["rgba(241,79,68,0)", "rgba(241,79,68,0.12)", "rgba(241,79,68,0.35)", "rgba(241,79,68,0.8)"];

interface ToolRow {
  tool: string;
  vendor: string;
  vectors: number;
  risk: string;
  riskColor: string;
  status: string;
  statusColor: string;
  users: number;
  residency: string;
  cost: string;
  firstSeen: string;
}

const tableData: ToolRow[] = [
  { tool: "DeepSeek Chat", vendor: "DeepSeek", vectors: 3, risk: "Critical", riskColor: "#F14F44", status: "Discovered", statusColor: "#AEB3BD", users: 47, residency: "CN", cost: "$0", firstSeen: "3d ago" },
  { tool: "Claude Enterprise", vendor: "Anthropic", vectors: 2, risk: "Low", riskColor: "#386BB7", status: "Approved", statusColor: "#2ECC71", users: 89, residency: "US", cost: "$2,400/mo", firstSeen: "2w ago" },
  { tool: "Midjourney", vendor: "Midjourney Inc.", vectors: 4, risk: "Medium", riskColor: "#F5A623", status: "Under Review", statusColor: "#F5A623", users: 23, residency: "US", cost: "$600/mo", firstSeen: "5d ago" },
  { tool: "Jasper AI", vendor: "Jasper", vectors: 3, risk: "High", riskColor: "#F14F44", status: "Restricted", statusColor: "#F14F44", users: 12, residency: "US", cost: "$1,200/mo", firstSeen: "1w ago" },
  { tool: "Perplexity Pro", vendor: "Perplexity AI", vectors: 2, risk: "Medium", riskColor: "#F5A623", status: "Discovered", statusColor: "#AEB3BD", users: 31, residency: "US", cost: "$800/mo", firstSeen: "1d ago" },
  { tool: "Runway ML", vendor: "Runway", vectors: 5, risk: "High", riskColor: "#F14F44", status: "Banned", statusColor: "#F14F44", users: 8, residency: "US", cost: "$450/mo", firstSeen: "4d ago" },
  { tool: "Otter.ai", vendor: "Otter", vectors: 1, risk: "Low", riskColor: "#386BB7", status: "Approved", statusColor: "#2ECC71", users: 56, residency: "US", cost: "$1,800/mo", firstSeen: "3w ago" },
];

const columns = ["Tool", "Vendor", "Vectors", "Risk", "Status", "Users", "Residency", "Cost", "First Seen", "Actions"];

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: 999,
        background: `${color}1F`,
        fontFamily: manrope,
        fontSize: 11,
        color,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      className="flex items-center cursor-pointer"
      style={{
        gap: 4,
        padding: "7px 14px",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "transparent",
        fontFamily: manrope,
        fontSize: 12,
        color: "#666",
      }}
    >
      {label}
      <ChevronDown size={12} strokeWidth={2} style={{ color: "#666" }} />
    </button>
  );
}

export function DiscoveryContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalTool, setModalTool] = useState<ToolRow | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <AnimatedKPI label="TOTAL DISCOVERED" value={189} delay={0.05} info="Total number of AI tools detected across all discovery vectors." sub={<span style={{ fontFamily: manrope, fontSize: 12, color: "#2ECC71" }}>+23 this month</span>} />
        <AnimatedKPI label="UNGOVERNED" value={38} delay={0.1} info="AI tools in use that have not been classified or assigned a governance status." sub={<Pill label="High Risk" color="#F14F44" />} />
        <AnimatedKPI label="VECTORS ACTIVE" value={5} delay={0.15} info="Number of active detection methods scanning for AI tool usage." sub={<span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>of 8 configured</span>} />
        <AnimatedKPI label="AVG DETECT TIME" value={4.2} suffix="h" delay={0.2} info="Average time from first tool usage to detection by the discovery engine." sub={<span style={{ fontFamily: manrope, fontSize: 12, color: "#2ECC71" }}>-1.3h improvement</span>} />
      </div>

      {/* Heatmap */}
      <GlassCard delay={0.25}>
        <CardHeader tag="ACTIVITY PATTERNS" title="Detection Heatmap — Weekly Activity" info="Shows AI tool usage detection intensity by hour and day of the week. Darker cells indicate higher detection activity." />
        <div className="flex items-center justify-end" style={{ marginTop: 8 }}>
          <div className="flex items-center" style={{ gap: 6 }}>
            <span style={{ fontFamily: manrope, fontSize: 8.5, color: "#555" }}>Low</span>
            {heatColors.map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: i === 0 ? "rgba(255,255,255,0.04)" : c, border: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }} />
            ))}
            <span style={{ fontFamily: manrope, fontSize: 8.5, color: "#555" }}>High</span>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="flex" style={{ marginLeft: 32, gap: 2, marginBottom: 3 }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ width: 16, textAlign: "center", fontFamily: manrope, fontSize: 7.5, color: "#AEB3BD" }}>
                {String(i).padStart(2, "0")}
              </div>
            ))}
          </div>
          {heatmapData.map((row, dayIdx) => (
            <div key={dayIdx} className="flex items-center" style={{ gap: 2, marginBottom: 2 }}>
              <span style={{ width: 28, fontFamily: manrope, fontSize: 8.5, color: "#AEB3BD", textAlign: "right", paddingRight: 4, flexShrink: 0 }}>
                {dayLabels[dayIdx]}
              </span>
              {row.map((val, hIdx) => (
                <div
                  key={hIdx}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    background: val === 0 ? "rgba(255,255,255,0.03)" : heatColors[val],
                    border: val === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    boxShadow: val === 3 ? "0 0 6px rgba(241,79,68,0.3)" : "none",
                    transition: "box-shadow 0.2s ease",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Filter Bar */}
      <StaggerIn delay={0.3}>
        <div className="flex items-center" style={{ gap: 12 }}>
          <div className="relative flex items-center" style={{ width: 360 }}>
            <Search size={15} strokeWidth={1.8} style={{ position: "absolute", left: 12, color: "#AEB3BD" }} />
            <input
              placeholder="Search tools..."
              style={{
                width: "100%",
                height: 38,
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                paddingLeft: 36,
                paddingRight: 14,
                fontFamily: manrope,
                fontSize: 12,
                color: "#F5F5F5",
                outline: "none",
              }}
            />
          </div>
          <FilterChip label="Risk Level" />
          <FilterChip label="Status" />
          <FilterChip label="Vector" />
          <span style={{ marginLeft: "auto", fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>189 tools found</span>
        </div>
      </StaggerIn>

      {/* Data Table */}
      <AnimatedTable delay={0.35}>
        {/* Header */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.4fr 1.1fr 0.7fr 0.8fr 1fr 0.6fr 0.75fr 0.9fr 0.8fr 0.6fr",
            background: "#1E1E1E",
          }}
        >
          {columns.map((col) => (
            <div key={col} style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 10.5, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {tableData.map((row, i) => (
          <HoverTableRow
            key={row.tool}
            className="grid items-center"
            style={{
              gridTemplateColumns: "1.4fr 1.1fr 0.7fr 0.8fr 1fr 0.6fr 0.75fr 0.9fr 0.8fr 0.6fr",
              borderBottom: i < tableData.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, fontWeight: 500, color: "#F5F5F5" }}>{row.tool}</div>
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.vendor}</div>
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, color: "#F14F44", fontWeight: 500 }}>{row.vectors}</div>
            <div style={{ padding: "11px 14px" }}><Pill label={row.risk} color={row.riskColor} /></div>
            <div style={{ padding: "11px 14px" }}><Pill label={row.status} color={row.statusColor} /></div>
            <div style={{ padding: "11px 14px", fontFamily: sora, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{row.users}</div>
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.residency}</div>
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.cost}</div>
            <div style={{ padding: "11px 14px", fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{row.firstSeen}</div>
            <div style={{ padding: "11px 14px" }}>
              <button
                className="flex items-center justify-center cursor-pointer"
                style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={() => setModalTool(row)}
              >
                <MoreHorizontal size={16} strokeWidth={1.8} style={{ color: "#AEB3BD" }} />
              </button>
            </div>
          </HoverTableRow>
        ))}
      </AnimatedTable>

      {/* Pagination */}
      <StaggerIn delay={0.4}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Showing 1–7 of 189</span>
          <div className="flex items-center" style={{ gap: 4 }}>
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className="flex items-center justify-center cursor-pointer"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "none",
                  background: p === currentPage ? "rgba(241,79,68,0.1)" : "rgba(255,255,255,0.04)",
                  fontFamily: manrope,
                  fontSize: 12,
                  fontWeight: 500,
                  color: p === currentPage ? "#F14F44" : "#AEB3BD",
                }}
              >
                {p}
              </button>
            ))}
            <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", padding: "0 4px" }}>…</span>
            <button
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "none",
                background: "rgba(255,255,255,0.04)",
                fontFamily: manrope,
                fontSize: 12,
                color: "#AEB3BD",
              }}
            >
              27
            </button>
          </div>
        </div>
      </StaggerIn>

      {/* Governance Modal */}
      {modalTool && (
        <GovernanceModal
          onClose={() => setModalTool(null)}
          toolName={modalTool.tool}
          vendor={modalTool.vendor}
        />
      )}
    </div>
  );
}