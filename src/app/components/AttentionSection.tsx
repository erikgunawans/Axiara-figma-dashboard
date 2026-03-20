import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Trophy, Medal, Award } from "lucide-react";
import { useApp } from "./AppContext";
import { CardHeader } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Hover glass card ──────────────────────────────────── */
function GlassHoverCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const { t } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        padding: "20px 22px",
        background: t.bgCard,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? t.shadowCardHover : t.shadowCard,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: hovered ? t.topHighlightHover : t.topHighlight,
          transition: "background 0.4s ease",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Animated progress bar ─────────────────────────────── */
function GlowBar({ pct, color, glowColor, delay }: { pct: number; color: string; glowColor: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useApp();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), delay * 1000);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} style={{ height: 7, borderRadius: 4, background: t.barTrack, overflow: "hidden", position: "relative" }}>
      <div
        style={{
          height: "100%",
          borderRadius: 4,
          background: `linear-gradient(90deg, ${color}bb, ${color})`,
          width: `${width}%`,
          transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: width > 0 ? `0 0 16px ${glowColor}, 0 0 4px ${glowColor}` : "none",
        }}
      />
    </div>
  );
}

const frameworks = [
  { name: "POJK 30/2025", pct: 94, color: "#2ECC71", glow: "rgba(46,204,113,0.3)" },
  { name: "UU PDP", pct: 88, color: "#2ECC71", glow: "rgba(46,204,113,0.3)" },
  { name: "ISO 42001", pct: 62, color: "#F5A623", glow: "rgba(245,166,35,0.3)" },
];

const departments = [
  { rank: 1, name: "Finance", score: 98 },
  { rank: 2, name: "Legal", score: 96 },
  { rank: 3, name: "Engineering", score: 82 },
  { rank: 4, name: "Marketing", score: 74 },
  { rank: 5, name: "Sales", score: 71 },
];

function scoreColor(s: number) {
  if (s >= 80) return "#2ECC71";
  if (s >= 60) return "#F5A623";
  return "#F14F44";
}

const medalConfig: Record<number, { icon: typeof Trophy; color: string; bg: string }> = {
  1: { icon: Trophy, color: "#FFD700", bg: "rgba(255,215,0,0.06)" },
  2: { icon: Medal, color: "#C0C0C0", bg: "rgba(192,192,192,0.05)" },
  3: { icon: Award, color: "#CD7F32", bg: "rgba(205,127,50,0.05)" },
};

export function AttentionSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        marginTop: 20,
      }}
    >
      {/* Left — Compliance Frameworks */}
      <GlassHoverCard delay={0.45}>
        <CardHeader
          tag="COMPLIANCE"
          title="Framework Coverage"
          info="Shows your organization's compliance coverage across key regulatory frameworks. Bars indicate percentage of requirements met for each framework."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 18 }}>
          {frameworks.map((f, i) => (
            <div key={f.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: manrope, fontSize: 13, color: "#ccc" }}>{f.name}</span>
                <span style={{ fontFamily: sora, fontSize: 13, color: "#E5E5E5" }}>{f.pct}%</span>
              </div>
              <GlowBar pct={f.pct} color={f.color} glowColor={f.glow} delay={0.5 + i * 0.15} />
            </div>
          ))}
        </div>
      </GlassHoverCard>

      {/* Right — Leaderboard */}
      <GlassHoverCard delay={0.5}>
        <CardHeader
          tag="DEPARTMENTS"
          title="Compliance Leaderboard"
          info="Ranks departments by their AI governance compliance score. Top performers earn medals. Scores below 80 may require remediation."
        />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 14 }}>
          {departments.map((d, i) => {
            const medal = medalConfig[d.rank];
            const isHov = hoveredRow === i;
            return (
              <div
                key={d.rank}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 8px",
                  borderBottom: i < departments.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  borderRadius: 10,
                  background: isHov ? "rgba(255,255,255,0.02)" : "transparent",
                  transition: "background 0.2s ease",
                  cursor: "default",
                  position: "relative",
                }}
              >
                {/* Rank medal or number */}
                {medal ? (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: medal.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                      flexShrink: 0,
                    }}
                  >
                    <medal.icon size={14} strokeWidth={2} style={{ color: medal.color }} />
                  </div>
                ) : (
                  <span
                    style={{
                      fontFamily: sora,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#333",
                      width: 28,
                      textAlign: "center",
                      marginRight: 10,
                      flexShrink: 0,
                    }}
                  >
                    #{d.rank}
                  </span>
                )}

                <span style={{ fontFamily: manrope, fontSize: 13, color: "#ccc", flex: 1 }}>
                  {d.name}
                </span>

                {/* Score bar */}
                <div style={{ width: 60, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.04)", marginRight: 10 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      background: scoreColor(d.score),
                      opacity: 0.8,
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: sora,
                    fontSize: 15,
                    fontWeight: 700,
                    color: scoreColor(d.score),
                    minWidth: 28,
                    textAlign: "right",
                    opacity: 0.9,
                  }}
                >
                  {d.score}
                </span>
              </div>
            );
          })}
        </div>
      </GlassHoverCard>
    </div>
  );
}