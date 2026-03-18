import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useApp } from "./AppContext";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Hover glass card ──────────────────────────────────── */
function GlassHoverCard({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
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
        ...style,
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

/* ── Area chart data ───────────────────────────────────── */
const areaData = [
  { month: "Jul", Network: 18, Browser: 12, SSO: 8, API: 5, Manual: 3 },
  { month: "Aug", Network: 22, Browser: 15, SSO: 10, API: 7, Manual: 4 },
  { month: "Sep", Network: 19, Browser: 20, SSO: 12, API: 9, Manual: 5 },
  { month: "Oct", Network: 28, Browser: 18, SSO: 14, API: 11, Manual: 6 },
  { month: "Nov", Network: 32, Browser: 24, SSO: 16, API: 13, Manual: 4 },
  { month: "Dec", Network: 36, Browser: 28, SSO: 19, API: 15, Manual: 7 },
];

const areaKeys = [
  { key: "Network" as const, color: "#386BB7", label: "Network" },
  { key: "Browser" as const, color: "#F14F44", label: "Browser" },
  { key: "SSO" as const, color: "#2ECC71", label: "SSO/OAuth" },
  { key: "API" as const, color: "#F5A623", label: "API Gateway" },
  { key: "Manual" as const, color: "#666", label: "Manual" },
];

function CustomAreaChart() {
  const W = 520, H = 180, padL = 32, padR = 8, padT = 8, padB = 24;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = areaData.length;

  const stacked = areaData.map((d) => {
    let cum = 0;
    const layers: number[] = [];
    for (const ak of areaKeys) {
      cum += d[ak.key];
      layers.push(cum);
    }
    return { month: d.month, layers, total: cum };
  });

  const maxVal = Math.max(...stacked.map((s) => s.total));
  const yScale = (v: number) => padT + plotH - (v / maxVal) * plotH;
  const xScale = (i: number) => padL + (i / (n - 1)) * plotW;

  const areaPaths = areaKeys.map((_ak, ki) => {
    const topPts = stacked.map((s, i) => `${xScale(i)},${yScale(s.layers[ki])}`);
    const botPts = stacked
      .map((s, i) => `${xScale(i)},${yScale(ki === 0 ? 0 : s.layers[ki - 1])}`)
      .reverse();
    return `M${topPts.join(" L")} L${botPts.join(" L")}Z`;
  });

  const linePaths = areaKeys.map((_ak, ki) => {
    const pts = stacked.map((s, i) => `${xScale(i)},${yScale(s.layers[ki])}`);
    return `M${pts.join(" L")}`;
  });

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const colW = plotW / (n - 1);

  return (
    <svg
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        {areaKeys.map((ak) => (
          <linearGradient key={`g-${ak.key}`} id={`cg-${ak.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ak.color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={ak.color} stopOpacity={0.01} />
          </linearGradient>
        ))}
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={`gl-${f}`}
          x1={padL}
          x2={W - padR}
          y1={yScale(f * maxVal)}
          y2={yScale(f * maxVal)}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={0.5}
        />
      ))}
      {/* Areas */}
      {areaPaths.map((d, i) => (
        <path key={`area-${areaKeys[i].key}`} d={d} fill={`url(#cg-${areaKeys[i].key})`} />
      ))}
      {/* Lines */}
      {linePaths.map((d, i) => (
        <path key={`line-${areaKeys[i].key}`} d={d} fill="none" stroke={areaKeys[i].color} strokeWidth={1.5} opacity={0.7} />
      ))}
      {/* Hover columns */}
      {areaData.map((_, i) => (
        <rect
          key={`hov-${i}`}
          x={xScale(i) - colW / 2}
          y={padT}
          width={colW}
          height={plotH}
          fill="transparent"
          onMouseEnter={() => setHoverIdx(i)}
          style={{ cursor: "crosshair" }}
        />
      ))}
      {/* Hover line */}
      {hoverIdx !== null && (
        <>
          <line
            x1={xScale(hoverIdx)}
            x2={xScale(hoverIdx)}
            y1={padT}
            y2={padT + plotH}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          {areaKeys.map((ak, ki) => (
            <circle
              key={`dot-${ak.key}`}
              cx={xScale(hoverIdx)}
              cy={yScale(stacked[hoverIdx].layers[ki])}
              r={3.5}
              fill={ak.color}
              stroke="#111111"
              strokeWidth={1.5}
            />
          ))}
        </>
      )}
      {/* X labels */}
      {areaData.map((d, i) => (
        <text
          key={`xl-${i}`}
          x={xScale(i)}
          y={H - 4}
          textAnchor="middle"
          style={{
            fontFamily: manrope,
            fontSize: 10,
            fill: hoverIdx === i ? "#E5E5E5" : "#444",
            transition: "fill 0.15s",
          }}
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

/* ── Animated Donut ────────────────────────────────────── */
const donutData = [
  { name: "Critical", value: 12, color: "#F14F44" },
  { name: "High", value: 23, color: "#E24C4A" },
  { name: "Medium", value: 38, color: "#F5A623" },
  { name: "Low", value: 41, color: "#386BB7" },
  { name: "Approved", value: 28, color: "#2ECC71" },
];
const donutTotal = donutData.reduce((s, d) => s + d.value, 0);

function AnimatedDonut() {
  const cx = 80, cy = 80, outer = 70, inner = 48;
  const [progress, setProgress] = useState(0);
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setProgress(ease);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  function segmentPath(startDeg: number, endDeg: number, outerR: number, innerR: number) {
    const s1 = (startDeg - 90) * (Math.PI / 180);
    const e1 = (endDeg - 90) * (Math.PI / 180);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    const ox1 = cx + outerR * Math.cos(s1), oy1 = cy + outerR * Math.sin(s1);
    const ox2 = cx + outerR * Math.cos(e1), oy2 = cy + outerR * Math.sin(e1);
    const ix2 = cx + innerR * Math.cos(e1), iy2 = cy + innerR * Math.sin(e1);
    const ix1 = cx + innerR * Math.cos(s1), iy1 = cy + innerR * Math.sin(s1);
    return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${large} 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`;
  }

  let cumulative = 0;
  const totalDegrees = 360 * progress;

  return (
    <svg width={160} height={160} viewBox="0 0 160 160" style={{ overflow: "visible" }}>
      <defs>
        {donutData.map((d) => (
          <filter key={`glow-${d.name}`} id={`dglow-${d.name}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>
      {/* Track ring */}
      <circle cx={cx} cy={cy} r={(outer + inner) / 2} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={outer - inner} />
      {donutData.map((d, i) => {
        const startDeg = (cumulative / donutTotal) * 360;
        cumulative += d.value;
        const endDeg = (cumulative / donutTotal) * 360;
        const clampedEnd = Math.min(endDeg, totalDegrees);
        if (clampedEnd <= startDeg) return null;
        const isHov = hoveredSeg === i;
        const outerR = isHov ? outer + 4 : outer;
        const innerR = isHov ? inner - 2 : inner;
        return (
          <path
            key={`donut-${i}`}
            d={segmentPath(startDeg, clampedEnd, outerR, innerR)}
            fill={d.color}
            filter={isHov ? `url(#dglow-${d.name})` : undefined}
            opacity={hoveredSeg !== null && !isHov ? 0.35 : 0.85}
            onMouseEnter={() => setHoveredSeg(i)}
            onMouseLeave={() => setHoveredSeg(null)}
            style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
          />
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: sora, fontSize: 22, fontWeight: 700, fill: "#E5E5E5" }}>
        {Math.round(donutTotal * progress)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: manrope, fontSize: 10, fill: "#555" }}>
        Total
      </text>
    </svg>
  );
}

export function ChartsSection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 14,
        marginTop: 20,
      }}
    >
      {/* Left — Area Chart */}
      <GlassHoverCard delay={0.35}>
        <span style={{ fontFamily: manrope, fontSize: 10, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          DETECTION TREND
        </span>
        <div style={{ fontFamily: sora, fontSize: 15, color: "#E5E5E5", letterSpacing: "-0.05em", marginTop: 4 }}>
          AI Discovery by Vector (6 Months)
        </div>
        <div style={{ width: "100%", height: 200, marginTop: 12 }}>
          <CustomAreaChart />
        </div>
        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          {areaKeys.map((a) => (
            <div key={a.key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, flexShrink: 0, opacity: 0.8 }} />
              <span style={{ fontFamily: manrope, fontSize: 11, color: "#555" }}>{a.label}</span>
            </div>
          ))}
        </div>
      </GlassHoverCard>

      {/* Right — Donut */}
      <GlassHoverCard delay={0.4} style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: manrope, fontSize: 10, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          RISK MATRIX
        </span>
        <div style={{ fontFamily: sora, fontSize: 15, color: "#E5E5E5", letterSpacing: "-0.05em", marginTop: 4 }}>
          Distribution by Severity
        </div>
        <div style={{ position: "relative", width: "100%", height: 160, marginTop: 8, display: "flex", justifyContent: "center" }}>
          <AnimatedDonut />
        </div>
        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          {donutData.map((d) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: d.color, flexShrink: 0, opacity: 0.8 }} />
                <span style={{ fontFamily: manrope, fontSize: 11, color: "#555" }}>{d.name}</span>
              </div>
              <span style={{ fontFamily: sora, fontSize: 11, color: "#E5E5E5" }}>{d.value}</span>
            </div>
          ))}
        </div>
      </GlassHoverCard>
    </div>
  );
}