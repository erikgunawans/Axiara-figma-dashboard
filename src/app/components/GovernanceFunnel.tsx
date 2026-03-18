import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "./AppContext";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const segments = [
  { label: "Discovered", count: 23, color: "#777", glow: "rgba(120,120,120,0.2)" },
  { label: "Under Review", count: 42, color: "#F5A623", glow: "rgba(245,166,35,0.25)" },
  { label: "Sandbox", count: 6, color: "#386BB7", glow: "rgba(56,107,183,0.25)" },
  { label: "Approved", count: 38, color: "#2ECC71", glow: "rgba(46,204,113,0.25)" },
  { label: "Restricted", count: 18, color: "#E24C4A", glow: "rgba(226,76,74,0.25)" },
  { label: "Banned", count: 5, color: "#F14F44", glow: "rgba(241,79,68,0.25)" },
];

const total = segments.reduce((s, seg) => s + seg.count, 0);

export function GovernanceFunnel() {
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginTop: 20,
        borderRadius: 16,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        padding: "18px 22px",
        background: t.bgCard,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? t.shadowCardHover : t.shadowCard,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Top edge highlight */}
      <div
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: hovered ? t.topHighlightHover : t.topHighlight,
          transition: "background 0.4s ease",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: manrope, fontSize: 10, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          GOVERNANCE PIPELINE
        </span>
        <span style={{ fontFamily: sora, fontSize: 15, color: "#E5E5E5", letterSpacing: "-0.05em" }}>
          Tool Lifecycle Funnel
        </span>
      </div>

      {/* Bar + total */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
        <div
          style={{
            flex: 1,
            height: 36,
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            gap: 2,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {segments.map((seg, i) => {
            const isHov = hoveredSeg === i;
            return (
              <motion.div
                key={seg.label}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredSeg(i)}
                onMouseLeave={() => setHoveredSeg(null)}
                style={{
                  width: `${(seg.count / total) * 100}%`,
                  background: isHov
                    ? `linear-gradient(180deg, ${seg.color}, ${seg.color}cc)`
                    : seg.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: seg.count < 10 ? 28 : undefined,
                  transformOrigin: "left",
                  boxShadow: isHov ? `0 0 20px ${seg.glow}` : "none",
                  transition: "box-shadow 0.25s ease, background 0.2s ease",
                  cursor: "pointer",
                  borderRadius: i === 0 ? "10px 0 0 10px" : i === segments.length - 1 ? "0 10px 10px 0" : 0,
                  opacity: hoveredSeg !== null && !isHov ? 0.5 : 0.85,
                }}
              >
                <span style={{ fontFamily: sora, fontSize: 11, fontWeight: 700, color: "#fff" }}>
                  {seg.count}
                </span>
              </motion.div>
            );
          })}
        </div>
        <span style={{ fontFamily: manrope, fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
          {total} tools
        </span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 14 }}>
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHoveredSeg(i)}
            onMouseLeave={() => setHoveredSeg(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              opacity: hoveredSeg !== null && hoveredSeg !== i ? 0.35 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 3, background: seg.color, flexShrink: 0, opacity: 0.8 }} />
            <span style={{ fontFamily: manrope, fontSize: 11, color: "#666" }}>{seg.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}