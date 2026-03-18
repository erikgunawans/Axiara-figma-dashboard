import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useApp, type ThemeColors } from "./AppContext";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Animated counter hook ─────────────────────────────── */
export function useCountUp(target: number, decimals = 0, duration = 1200) {
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

/* helper to access theme without hook (for non-component callers) */
function useT(): ThemeColors {
  const { t } = useApp();
  return t;
}

/* ── Stagger wrapper ─────────────────────────────────── */
export function StaggerIn({
  children,
  delay = 0,
  y = 20,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Glass card with gradient border hover ─────────────── */
export function GlassCard({
  children,
  style,
  delay = 0,
  glowColor,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  glowColor?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        padding: "20px 22px",
        background: t.bgCard,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? glowColor
            ? `${t.shadowCardHover}, 0 4px 20px ${glowColor}`
            : t.shadowCardHover
          : t.shadowCard,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s ease, box-shadow 0.4s ease",
        ...style,
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
      {children}
    </motion.div>
  );
}

/* ── KPI card with animated counter ────────────────────── */
export function AnimatedKPI({
  label,
  value,
  suffix,
  prefix,
  color,
  sub,
  delay = 0,
  format,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  sub?: React.ReactNode;
  delay?: number;
  format?: (v: number) => string;
}) {
  const counter = useCountUp(value, value % 1 !== 0 ? 1 : 0, 1200);
  const [hovered, setHovered] = useState(false);
  const t = useT();
  const displayColor = color || t.textPrimary;

  const displayValue = format
    ? format(counter.value)
    : `${prefix || ""}${counter.value.toLocaleString()}${suffix || ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        background: t.bgCard,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? t.shadowCardHover : t.shadowCard,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: hovered ? t.topHighlightHover : t.topHighlight,
          transition: "background 0.4s ease",
        }}
      />
      <div
        style={{
          fontFamily: manrope, fontSize: 10, color: t.textLabel,
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
      <div className="flex items-end justify-between" style={{ marginTop: 10 }} ref={counter.ref}>
        <span style={{ fontFamily: sora, fontSize: 30, fontWeight: 700, color: displayColor, lineHeight: 1 }}>
          {displayValue}
        </span>
        {sub && (
          <div className="flex items-center" style={{ gap: 3 }}>
            {sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Hover table row ──────────────────────────────────── */
export function HoverTableRow({
  children,
  style,
  onClick,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const t = useT();

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: hovered ? t.bgHoverRow : "transparent",
        transition: "background 0.2s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated progress bar with glow ───────────────────── */
export function GlowBar({
  pct,
  color,
  delay = 0,
  height = 6,
}: {
  pct: number;
  color: string;
  delay?: number;
  height?: number;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();

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
    <div
      ref={ref}
      style={{
        height, borderRadius: height / 2,
        background: t.barTrack,
        overflow: "hidden", position: "relative",
      }}
    >
      <div
        style={{
          height: "100%", borderRadius: height / 2,
          background: `linear-gradient(90deg, ${color}bb, ${color})`,
          width: `${width}%`,
          transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: width > 0 ? `0 0 16px ${color}44, 0 0 6px ${color}33` : "none",
        }}
      />
    </div>
  );
}

/* ── Section header with stagger ───────────────────────── */
export function SectionHeader({
  tag,
  title,
  delay = 0,
}: {
  tag: string;
  title: string;
  delay?: number;
}) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        style={{
          fontFamily: manrope, fontSize: 10, color: t.accent,
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}
      >
        {tag}
      </div>
      <div style={{ fontFamily: sora, fontSize: 22, color: t.textPrimary, marginTop: 4 }}>
        {title}
      </div>
    </motion.div>
  );
}

/* ── Animated table wrapper ────────────────────────────── */
export function AnimatedTable({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 16,
        border: `1px solid ${t.border}`,
        overflow: "hidden",
        background: t.bgCard,
        boxShadow: t.shadowCard,
      }}
    >
      {children}
    </motion.div>
  );
}
