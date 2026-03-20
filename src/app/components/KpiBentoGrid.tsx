import React from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useApp } from "./AppContext";
import { InfoTooltip } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Animated counter hook ─────────────────────────────── */
function useCountUp(target: number, decimals = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setValue(parseFloat((ease * target).toFixed(decimals)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return { value, ref };
}

/* ── Sparkline with pulse dot ──────────────────────────── */
function Sparkline({
  color,
  direction,
}: {
  color: string;
  direction: "up" | "down";
}) {
  const pts =
    direction === "up"
      ? "0,18 12,16 24,14 36,10 48,12 60,6 72,4 80,2"
      : "0,4 12,6 24,5 36,10 48,12 60,14 72,16 80,18";
  const fillPts = `${pts} 80,22 0,22`;
  const endY = direction === "up" ? 2 : 18;

  return (
    <svg width={80} height={26} style={{ marginTop: 10, overflow: "visible" }}>
      <defs>
        <linearGradient id={`sp-${color}-${direction}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#sp-${color}-${direction})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.8}
      />
      <circle
        cx={80}
        cy={endY}
        r={3}
        fill={color}
        style={{
          animation: "sparkPulse 2s ease-in-out infinite",
          color: color,
        }}
      />
      <circle cx={80} cy={endY} r={1.5} fill="#fff" opacity={0.7} />
    </svg>
  );
}

/* ── Hover card wrapper ────────────────────────────────── */
function HoverCard({
  children,
  style,
  delay = 0,
  glowColor,
  gradient,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  delay?: number;
  glowColor?: string;
  gradient?: boolean;
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
        ...style,
        background: t.bgCard,
        borderRadius: 16,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? glowColor
            ? `${t.shadowCardHover}, 0 4px 20px ${glowColor}`
            : t.shadowCardHover
          : t.shadowCard,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s ease, box-shadow 0.4s ease",
        cursor: "default",
      }}
    >
      {/* Top edge gradient highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: gradient ? 0 : "10%",
          right: gradient ? 0 : "10%",
          height: 1,
          background: gradient
            ? "linear-gradient(90deg, #E24C4A44, #386BB733, transparent)"
            : hovered ? t.topHighlightHover : t.topHighlight,
          transition: "background 0.4s ease",
        }}
      />
      {children}
    </motion.div>
  );
}

export function KpiBentoGrid() {
  const compliance = useCountUp(94.2, 1, 1400);
  const totalTools = useCountUp(147, 0, 1200);
  const shadowAI = useCountUp(38, 0, 1000);
  const hitl = useCountUp(7, 0, 800);
  const agents = useCountUp(482, 0, 1300);
  const { t, theme } = useApp();

  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}
      >
        <span
          style={{
            fontFamily: manrope,
            fontSize: 10,
            color: "#F14F44",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          DASHBOARD
        </span>
        <span
          style={{
            fontFamily: sora,
            fontSize: 22,
            color: t.textPrimary,
            letterSpacing: "-0.05em",
          }}
        >
          Overview
        </span>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 14,
        }}
      >
        {/* Card 1 — Hero, spans 2 cols */}
        <HoverCard
          delay={0.05}
          glowColor="rgba(226,76,74,0.08)"
          gradient
          style={{
            gridColumn: "span 2",
            minHeight: 160,
          }}
        >
          {/* Gradient border glow on left edge */}
          <div
            style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0, width: 2.5,
              background: "linear-gradient(180deg, #E24C4A, #386BB7)",
              borderRadius: "16px 0 0 16px",
              boxShadow: "0 0 20px rgba(226,76,74,0.15)",
            }}
          />
          {/* Subtle inner glow */}
          <div
            style={{
              position: "absolute", top: 0, left: 0, width: 200, height: 200,
              background: "radial-gradient(ellipse at top left, rgba(226,76,74,0.04), transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                fontFamily: manrope,
                fontSize: 10,
                color: "#F14F44",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              COMPLIANCE POSTURE
            </span>
            <InfoTooltip text="Overall compliance score across all tracked regulatory frameworks. Higher is better — 90%+ indicates strong governance posture." />
          </div>

          <div ref={compliance.ref}>
            <span
              style={{
                fontFamily: sora,
                fontSize: 44,
                fontWeight: 700,
                background: theme === "dark" ? "linear-gradient(135deg, #F5F5F5, #999)" : "linear-gradient(135deg, #1A1A1A, #666)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.03em",
                marginTop: 6,
                display: "block",
              }}
            >
              {compliance.value}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <ArrowUp size={11} strokeWidth={2.5} style={{ color: "#2ECC71" }} />
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#2ECC71" }}>+1.8%</span>
            <span style={{ fontFamily: manrope, fontSize: 13, color: t.textMuted }}>vs last quarter</span>
          </div>
          <p
            style={{
              fontFamily: manrope, fontSize: 13, color: t.textMuted,
              marginTop: 14, maxWidth: 360, lineHeight: 1.5,
            }}
          >
            All 6 compliance frameworks tracked. POJK 30/2025 audit closes in 12 days.
          </p>
        </HoverCard>

        {/* Card 2 — Total AI Tools */}
        <HoverCard delay={0.1} style={{}}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                fontFamily: manrope, fontSize: 10, color: t.textLabel,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              TOTAL AI TOOLS
            </span>
            <InfoTooltip text="Total number of AI tools discovered and tracked across your organization, including approved, restricted, and shadow tools." />
          </div>
          <div ref={totalTools.ref}>
            <span
              style={{
                fontFamily: sora, fontSize: 30, fontWeight: 700,
                color: t.textPrimary, marginTop: 10, display: "block",
              }}
            >
              {totalTools.value}
            </span>
          </div>
          <Sparkline color="#2ECC71" direction="up" />
          <span style={{ fontFamily: manrope, fontSize: 13, color: t.textMuted, marginTop: 8 }}>
            +12 this month
          </span>
        </HoverCard>

        {/* Card 3 — Shadow AI */}
        <HoverCard delay={0.15} style={{}}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                fontFamily: manrope, fontSize: 10, color: t.textLabel,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              SHADOW AI
            </span>
            <InfoTooltip text="Unapproved AI tools detected in use by employees. These bypass governance controls and may pose compliance or data risks." />
          </div>
          <div ref={shadowAI.ref}>
            <span
              style={{
                fontFamily: sora, fontSize: 30, fontWeight: 700,
                color: t.textPrimary, marginTop: 10, display: "block",
              }}
            >
              {shadowAI.value}
            </span>
          </div>
          <Sparkline color="#F14F44" direction="down" />
          <span style={{ fontFamily: manrope, fontSize: 13, color: t.textMuted, marginTop: 8 }}>
            -5 ungoverned
          </span>
        </HoverCard>

        {/* Card 4 — HITL Pending */}
        <HoverCard delay={0.2} style={{}}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                fontFamily: manrope, fontSize: 10, color: t.textLabel,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              HITL PENDING
            </span>
            <InfoTooltip text="Human-in-the-loop decisions awaiting review. These require manual approval from a DPO, CISO, or designated reviewer." />
          </div>
          <div ref={hitl.ref}>
            <span
              style={{
                fontFamily: sora, fontSize: 30, fontWeight: 700,
                color: t.textPrimary, marginTop: 10, display: "block",
              }}
            >
              {hitl.value}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
            <span
              style={{
                width: 7, height: 7, borderRadius: "50%", background: "#F5A623",
                flexShrink: 0, animation: "sparkPulse 2s ease-in-out infinite", color: "#F5A623",
              }}
            />
            <span style={{ fontFamily: manrope, fontSize: 13, color: t.textMuted }}>+3 actions</span>
          </div>
        </HoverCard>

        {/* Card 5 — Agents Online */}
        <HoverCard delay={0.25} style={{}}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                fontFamily: manrope, fontSize: 10, color: t.textLabel,
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}
            >
              AGENTS ONLINE
            </span>
            <InfoTooltip text="Active AI agents currently running in production. Monitors uptime and availability of deployed autonomous agents." />
          </div>
          <div ref={agents.ref}>
            <span
              style={{
                fontFamily: sora, fontSize: 30, fontWeight: 700,
                color: t.textPrimary, marginTop: 10, display: "block",
              }}
            >
              {agents.value}
              <span style={{ fontSize: 18, fontWeight: 500, color: t.textMuted }}>/500</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 14 }}>
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#2ECC71" }}>96.4% uptime</span>
          </div>
        </HoverCard>
      </div>
    </div>
  );
}
