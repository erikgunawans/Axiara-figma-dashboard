import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { AnimatedKPI, GlassCard, SectionHeader, StaggerIn, useCountUp, CardHeader, InfoTooltip } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const barData = [
  { month: "Jul", approved: 38200, shadow: 5400 },
  { month: "Aug", approved: 39800, shadow: 6100 },
  { month: "Sep", approved: 41500, shadow: 6800 },
  { month: "Oct", approved: 42100, shadow: 7200 },
  { month: "Nov", approved: 43200, shadow: 6400 },
  { month: "Dec", approved: 41540, shadow: 6360 },
];

const sparklinePoints = [
  [0, 18], [12, 14], [24, 16], [36, 10], [48, 12], [60, 8], [72, 5], [80, 2],
];

function Sparkline() {
  const h = 22;
  const path = sparklinePoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  return (
    <svg width={80} height={h} viewBox={`0 0 80 ${h}`} fill="none" style={{ overflow: "visible" }}>
      <path d={path} stroke="#F14F44" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={80} cy={2} r={3} fill="#F14F44" style={{ animation: "sparkPulse 2s ease-in-out infinite", color: "#F14F44" }} />
      <circle cx={80} cy={2} r={1.5} fill="#fff" opacity={0.8} />
    </svg>
  );
}

const duplicateGroups = [
  { tools: ["Grammarly", "ProWritingAid", "Hemingway"], savings: "$4,200/yr" },
  { tools: ["ChatGPT", "Claude", "Gemini"], savings: "$8,400/yr" },
];

const zombies = [
  { name: "Adobe Firefly", days: 142, cost: "$1,200/yr" },
  { name: "Jasper AI", days: 98, cost: "$2,400/yr" },
  { name: "Copy.ai", days: 112, cost: "$960/yr" },
];

export function CostsContent() {
  const heroCounter = useCountUp(284600, 0, 1400);
  const savingsCounter = useCountUp(10260, 0, 1200);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ACT 1 */}
      <SectionHeader tag="AXIARA SPEND" title="Your AI Spend Profile" delay={0} />

      {/* Hero KPI */}
      <GlassCard delay={0.05} glowColor="rgba(226,76,74,0.1)" style={{
        padding: "22px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, rgba(226,76,74,0.06), rgba(56,107,183,0.06))",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Left edge glow */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg, #E24C4A, #386BB7)", borderRadius: "14px 0 0 14px" }} />
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              TOTAL AI SPEND (YTD)
            </div>
            <InfoTooltip text="Total year-to-date expenditure on all AI tools across the organization, including both approved and shadow spending." />
          </div>
          <div ref={heroCounter.ref} style={{ fontFamily: sora, fontSize: 44, fontWeight: 700, color: "#F5F5F5", marginTop: 4, lineHeight: 1 }}>
            ${heroCounter.value.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 16 }}>
          <Sparkline />
          <div className="flex items-center" style={{ gap: 4 }}>
            <TrendingUp size={14} style={{ color: "#F14F44" }} />
            <span style={{ fontFamily: manrope, fontSize: 12, color: "#F14F44" }}>+12% vs last quarter</span>
          </div>
        </div>
      </GlassCard>

      {/* 3 Supporting KPIs */}
      <div style={{ display: "flex", gap: 14 }}>
        <AnimatedKPI label="APPROVED SPEND" value={246340} prefix="$" delay={0.1} color="#2ECC71" info="Total spend on officially approved and governed AI tools across the organization." />
        <AnimatedKPI label="SHADOW SPEND" value={38260} prefix="$" delay={0.15} color="#F14F44" info="Estimated spend on unapproved AI tools discovered through network monitoring and browser analysis." />
        <AnimatedKPI label="COST PER USER" value={47.2} prefix="$" delay={0.2} color="#AEB3BD" info="Average monthly AI tool cost per active employee, calculated across all approved subscriptions." />
      </div>

      {/* Bar Chart */}
      <GlassCard delay={0.25} style={{ padding: "22px 24px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5" }}>Approved vs Shadow Spend (6 Months)</span>
            <InfoTooltip text="Monthly comparison of approved vs. shadow AI spending over the past 6 months. Helps identify trends in ungoverned tool usage." />
          </div>
          <div className="flex items-center" style={{ gap: 16 }}>
            <div className="flex items-center" style={{ gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#386BB7" }} />
              <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>Approved</span>
            </div>
            <div className="flex items-center" style={{ gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F14F44" }} />
              <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>Shadow AI</span>
            </div>
          </div>
        </div>
        <div style={{ background: "#111111", borderRadius: 10, padding: "16px 8px 8px" }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barGap={4} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,63,0.3)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontFamily: manrope, fontSize: 10, fill: "#AEB3BD" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: manrope, fontSize: 10, fill: "#AEB3BD" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontFamily: manrope, fontSize: 11 }}
                labelStyle={{ color: "#F5F5F5" }}
                itemStyle={{ color: "#AEB3BD" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Bar dataKey="approved" fill="#386BB7" radius={[4, 4, 0, 0]} name="Approved" />
              <Bar dataKey="shadow" fill="#F14F44" radius={[4, 4, 0, 0]} name="Shadow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* ACT 2 */}
      <SectionHeader tag="" title="Where Waste Lives" delay={0.3} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Duplicate Tools */}
        <GlassCard delay={0.35} style={{ padding: "22px 24px" }}>
          <CardHeader tag="DUPLICATES" title="Overlapping Tool Licenses" info="Identifies AI tools with overlapping functionality. Consolidating to a single tool per category can yield significant cost savings." />

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 18 }}>
            {duplicateGroups.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center flex-wrap" style={{ gap: 6 }}>
                  {group.tools.map((tool, ti) => (
                    <span key={tool} className="flex items-center" style={{ gap: 6 }}>
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: 999,
                          background: "#1E1E1E",
                          fontFamily: manrope,
                          fontSize: 11,
                          color: "#F5F5F5",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tool}
                      </span>
                      {ti < group.tools.length - 1 && (
                        <span style={{ fontFamily: manrope, fontSize: 14, color: "#AEB3BD" }}>≈</span>
                      )}
                    </span>
                  ))}
                </div>
                <div style={{ fontFamily: manrope, fontSize: 12, color: "#2ECC71", marginTop: 8 }}>
                  Potential savings: {group.savings}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Zombie Licenses */}
        <GlassCard delay={0.4} style={{ padding: "22px 24px" }}>
          <CardHeader tag="INACTIVE" title="Zombie Licenses (No Use >90 Days)" info="AI tool subscriptions with no recorded usage in over 90 days. These are candidates for immediate cancellation to recover costs." />

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 18 }}>
            {zombies.map((z, i) => (
              <div
                key={z.name}
                className="flex items-center justify-between"
                style={{
                  padding: "12px 0",
                  borderTop: i > 0 ? "0.5px solid rgba(63,63,63,0.4)" : "none",
                }}
              >
                <div>
                  <div style={{ fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>{z.name}</div>
                  <div style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", marginTop: 2 }}>
                    Last used: {z.days} days ago — {z.cost}
                  </div>
                </div>
                <button
                  className="cursor-pointer shrink-0"
                  style={{
                    padding: "5px 14px",
                    borderRadius: 999,
                    border: "1px solid #F14F44",
                    background: "transparent",
                    fontFamily: manrope,
                    fontSize: 11,
                    color: "#F14F44",
                  }}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#2ECC71", marginTop: 12 }}>
            Recoverable: $4,560/yr
          </div>
        </GlassCard>
      </div>

      {/* ACT 3 — OPTIMIZATION OPPORTUNITY */}
      <GlassCard delay={0.45} glowColor="rgba(46,204,113,0.08)" style={{
        padding: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            OPTIMIZATION
          </div>
          <div style={{ fontFamily: sora, fontSize: 22, color: "#F5F5F5", marginTop: 6 }}>
            Total Recoverable Savings
          </div>
          <div style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", marginTop: 10, lineHeight: 1.6 }}>
            Based on duplicate license consolidation, zombie license cancellation, and vendor renegotiation opportunities identified across your organization.
          </div>
          <button
            className="cursor-pointer"
            style={{
              marginTop: 20,
              padding: "10px 22px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #E24C4A, #386BB7)",
              position: "relative",
              fontFamily: manrope,
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
            <span style={{ position: "relative", zIndex: 1 }}>Generate Savings Report →</span>
          </button>
        </div>

        <div ref={savingsCounter.ref} style={{ textAlign: "right", flexShrink: 0, marginLeft: 40 }}>
          <div style={{ fontFamily: sora, fontSize: 36, fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
            ${savingsCounter.value.toLocaleString()}
          </div>
          <div style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", marginTop: 6 }}>
            annual recoverable waste
          </div>
          <div style={{ fontFamily: manrope, fontSize: 12, color: "#2ECC71", marginTop: 4 }}>
            82% of current shadow spend
          </div>
        </div>
      </GlassCard>
    </div>
  );
}