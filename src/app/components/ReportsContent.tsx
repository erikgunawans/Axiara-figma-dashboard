import { SectionHeader, GlassCard } from "./premium-ui";

const manrope = "'Manrope', sans-serif";
const sora = "'Sora', sans-serif";

const badgeStyles: Record<string, { color: string; bg: string }> = {
  Ready: { color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  "Auto-Updated": { color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  Scheduled: { color: "#386BB7", bg: "rgba(56,107,183,0.12)" },
  "Coming Soon": { color: "#AEB3BD", bg: "rgba(174,179,189,0.12)" },
  Roadmap: { color: "#AEB3BD", bg: "rgba(174,179,189,0.12)" },
};

const cards = [
  { icon: "📋", title: "POJK 30/2025 Semester Report", desc: "Mandatory biannual report on AI tool governance for OJK-regulated financial institutions.", deadline: "Jul 31, 2026", badge: "Ready", cta: true },
  { icon: "📄", title: "RoPA (Record of Processing)", desc: "Auto-maintained log of all AI processing activities and data flows per UU PDP requirements.", deadline: "Active / Ongoing", badge: "Auto-Updated", cta: false },
  { icon: "📊", title: "Weekly Executive Summary", desc: "Automated digest of key metrics, new detections, and governance decisions for leadership.", deadline: "Every Monday", badge: "Scheduled", cta: false },
  { icon: "🛡️", title: "HITL Decision Register", desc: "Complete audit trail of all human-in-the-loop governance decisions with evidence chain.", deadline: "On-Demand", badge: "Ready", cta: true },
  { icon: "🔧", title: "ISO 42001 Gap Analysis", desc: "Automated assessment of AI management system maturity against ISO 42001 controls.", deadline: "Q4 2026", badge: "Coming Soon", cta: false },
  { icon: "🚩", title: "EU AI Act Conformity", desc: "Risk classification and conformity assessment for AI systems under the EU AI Act.", deadline: "Q1 2027", badge: "Roadmap", cta: false },
];

export function ReportsContent() {
  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 22 }}>
        <SectionHeader tag="COMPLIANCE REPORTS" title="Regulatory Report Center" />
      </div>

      {/* CARD GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {cards.map((card, i) => (
          <GlassCard
            key={card.title}
            delay={0.05 + i * 0.07}
            style={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>{card.icon}</div>
            <div style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em", marginBottom: 6 }}>
              {card.title}
            </div>
            <div style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", lineHeight: 1.6, flex: 1, marginBottom: 10 }}>
              {card.desc}
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>{card.deadline}</span>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: badgeStyles[card.badge].bg,
                  fontFamily: manrope,
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: badgeStyles[card.badge].color,
                }}
              >
                {card.badge}
              </span>
            </div>
            {card.cta && (
              <button
                className="cursor-pointer"
                style={{
                  marginTop: 12,
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #E24C4A, #386BB7)",
                  position: "relative",
                  fontFamily: manrope,
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#fff",
                  alignSelf: "flex-start",
                }}
              >
                <span style={{ position: "absolute", inset: 1.5, borderRadius: 999, background: "#0A0A0A", zIndex: 0 }} />
                <span style={{ position: "relative", zIndex: 1 }}>Generate</span>
              </button>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}