import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Shared: Grid Backdrop ── */
function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100vw",
        minWidth: 1440,
        height: "100vh",
        minHeight: 900,
        background: "#0A0A0A",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* geometric grid */}
      <svg
        width="1440"
        height="900"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {Array.from({ length: 25 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * 60}
            y1={0}
            x2={i * 60}
            y2={900}
            stroke="#2A2A2A"
            strokeOpacity={0.33}
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 60}
            x2={1440}
            y2={i * 60}
            stroke="#2A2A2A"
            strokeOpacity={0.33}
            strokeWidth={0.5}
          />
        ))}
      </svg>
      {children}
    </div>
  );
}

/* ── Shared: Modal Shell ── */
function ModalShell({
  step,
  children,
  footer,
}: {
  step: number;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: 520,
        background: "rgba(18,18,18,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(63,63,63,0.4)",
        borderRadius: 20,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Progress bar */}
      <div
        className="flex"
        style={{ padding: "20px 28px 0", gap: 4 }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i < step ? "#F14F44" : "rgba(63,63,63,0.6)",
            }}
          />
        ))}
      </div>
      {/* Step counter */}
      <div style={{ padding: "10px 28px 0", fontFamily: manrope, fontSize: 10.5, color: "#AEB3BD" }}>
        Step {step} of 6
      </div>
      {/* Content */}
      {children}
      {/* Footer */}
      <div
        style={{
          borderTop: "0.5px solid #2A2A2A",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {footer}
      </div>
    </div>
  );
}

/* ── VARIANT A — Welcome ── */
function VariantA() {
  return (
    <Backdrop>
      <ModalShell
        step={1}
        footer={
          <button
            className="cursor-pointer"
            style={{
              padding: "9px 24px",
              borderRadius: 999,
              border: "none",
              background: "#F14F44",
              fontFamily: manrope,
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Get Started
          </button>
        }
      >
        <div style={{ padding: "24px 28px 20px", textAlign: "center" }}>
          {/* Logo */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #E24C4A, #386BB7)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ fontFamily: sora, fontSize: 22, fontWeight: 700, color: "#fff" }}>A</span>
          </div>

          {/* Title */}
          <div style={{ fontFamily: sora, fontSize: 24, color: "#F5F5F5", marginBottom: 8 }}>
            Welcome to <span style={{ color: "#F14F44" }}>Axiara</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: manrope,
              fontSize: 13,
              color: "#AEB3BD",
              marginBottom: 24,
            }}
          >
            Set up your AI governance platform in under 5 minutes.
          </div>

          {/* Value grid */}
          <div className="flex" style={{ gap: 12 }}>
            {[
              { emoji: "🔍", title: "Discover", sub: "Find shadow AI" },
              { emoji: "🛡️", title: "Govern", sub: "HITL decisions" },
              { emoji: "📊", title: "Report", sub: "Auto-compliance" },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  flex: 1,
                  background: "#1E1E1E",
                  borderRadius: 10,
                  padding: "14px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{card.emoji}</div>
                <div style={{ fontFamily: manrope, fontSize: 12, fontWeight: 600, color: "#F5F5F5", marginBottom: 2 }}>
                  {card.title}
                </div>
                <div style={{ fontFamily: manrope, fontSize: 10.5, color: "#AEB3BD" }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── VARIANT B — Organization ── */
function VariantB() {
  const [companyName, setCompanyName] = useState("");
  const valid = companyName.trim().length >= 3;

  return (
    <Backdrop>
      <ModalShell
        step={2}
        footer={
          <div className="flex items-center justify-between" style={{ width: "100%" }}>
            <button
              className="cursor-pointer"
              style={{
                background: "none",
                border: "none",
                fontFamily: manrope,
                fontSize: 12,
                color: "#AEB3BD",
              }}
            >
              ← Back
            </button>
            <button
              className="cursor-pointer"
              style={{
                padding: "9px 24px",
                borderRadius: 999,
                border: "none",
                background: valid ? "#F14F44" : "#1E1E1E",
                fontFamily: manrope,
                fontSize: 12,
                fontWeight: 500,
                color: valid ? "#fff" : "#AEB3BD",
                transition: "all 0.2s",
              }}
            >
              Continue
            </button>
          </div>
        }
      >
        <div style={{ padding: "20px 28px 20px" }}>
          <div style={{ fontFamily: sora, fontSize: 18, color: "#F5F5F5", marginBottom: 20 }}>
            Organization Profile
          </div>

          <div className="flex flex-col" style={{ gap: 14 }}>
            {/* Company Name */}
            <div>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 4 }}>
                Company Name
              </label>
              <input
                type="text"
                placeholder="PT Example Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: 8,
                  border: "1px solid #3F3F3F",
                  background: "transparent",
                  fontFamily: manrope,
                  fontSize: 13,
                  color: "#F5F5F5",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#F14F44")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
              />
            </div>

            {/* Industry */}
            <div>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 4 }}>
                Industry
              </label>
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid #3F3F3F",
                    background: "transparent",
                    fontFamily: manrope,
                    fontSize: 13,
                    color: "#AEB3BD",
                    outline: "none",
                    appearance: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select industry</option>
                  <option>Financial Services</option>
                  <option>Healthcare</option>
                  <option>Technology</option>
                </select>
                <ChevronDown
                  size={14}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#AEB3BD", pointerEvents: "none" }}
                />
              </div>
            </div>

            {/* Employee Count */}
            <div>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 4 }}>
                Employee Count
              </label>
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid #3F3F3F",
                    background: "transparent",
                    fontFamily: manrope,
                    fontSize: 13,
                    color: "#AEB3BD",
                    outline: "none",
                    appearance: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select range</option>
                  <option>1–50</option>
                  <option>51–200</option>
                  <option>201–1000</option>
                  <option>1000+</option>
                </select>
                <ChevronDown
                  size={14}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#AEB3BD", pointerEvents: "none" }}
                />
              </div>
            </div>

            {/* Primary Jurisdiction */}
            <div>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 4 }}>
                Primary Jurisdiction
              </label>
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid #3F3F3F",
                    background: "transparent",
                    fontFamily: manrope,
                    fontSize: 13,
                    color: "#AEB3BD",
                    outline: "none",
                    appearance: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select country</option>
                  <option>Indonesia</option>
                  <option>Singapore</option>
                  <option>United States</option>
                </select>
                <ChevronDown
                  size={14}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#AEB3BD", pointerEvents: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── VARIANT C — Sensors ── */
function VariantC() {
  const [active, setActive] = useState([true, true, true, true, true]);
  const toggle = (i: number) => setActive((a) => a.map((v, idx) => (idx === i ? !v : v)));

  const sensors = [
    { emoji: "🌐", label: "Browser Extension", desc: "Monitor web-based AI tools" },
    { emoji: "📡", label: "DNS Monitor", desc: "Track AI domain queries" },
    { emoji: "🔑", label: "Cloud OAuth", desc: "Detect SSO-connected AI apps" },
    { emoji: "💻", label: "OS Agent", desc: "Scan desktop AI applications" },
    { emoji: "🔌", label: "MCP Scanner", desc: "Monitor MCP server connections" },
  ];

  return (
    <Backdrop>
      <ModalShell
        step={3}
        footer={
          <div className="flex items-center justify-between" style={{ width: "100%" }}>
            <button
              className="cursor-pointer"
              style={{
                background: "none",
                border: "none",
                fontFamily: manrope,
                fontSize: 12,
                color: "#AEB3BD",
              }}
            >
              ← Back
            </button>
            <button
              className="cursor-pointer"
              style={{
                padding: "9px 24px",
                borderRadius: 999,
                border: "none",
                background: "#F14F44",
                fontFamily: manrope,
                fontSize: 12,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              Continue
            </button>
          </div>
        }
      >
        <div style={{ padding: "20px 28px 20px" }}>
          <div style={{ fontFamily: sora, fontSize: 18, color: "#F5F5F5", marginBottom: 4 }}>
            Sensor Configuration
          </div>
          <div style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", marginBottom: 18 }}>
            Enable detection vectors to discover AI tools across your organization.
          </div>

          <div className="flex flex-col" style={{ gap: 8 }}>
            {sensors.map((s, i) => {
              const on = active[i];
              return (
                <button
                  key={s.label}
                  onClick={() => toggle(i)}
                  className="flex items-center cursor-pointer"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${on ? "#F14F44" : "rgba(255,255,255,0.06)"}`,
                    background: on ? "rgba(241,79,68,0.08)" : "transparent",
                    textAlign: "left",
                    gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{s.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>{s.desc}</div>
                  </div>
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: on ? "none" : "1px solid #3F3F3F",
                      background: on ? "#F14F44" : "#1E1E1E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.15s",
                    }}
                  >
                    {on && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── VARIANT D — Policy ── */
function VariantD() {
  const [selected, setSelected] = useState(0);
  const policies = [
    { color: "#F5A623", label: "Restricted", desc: "New tools are blocked until reviewed. Recommended for regulated industries.", recommended: true },
    { color: "#386BB7", label: "Under Review", desc: "New tools are flagged but accessible. Best for low-risk organizations.", recommended: false },
    { color: "#AEB3BD", label: "Open", desc: "New tools are allowed. Manual oversight only.", recommended: false },
  ];

  return (
    <Backdrop>
      <ModalShell
        step={4}
        footer={
          <div className="flex items-center justify-between" style={{ width: "100%" }}>
            <button className="cursor-pointer" style={{ background: "none", border: "none", fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>← Back</button>
            <button className="cursor-pointer" style={{ padding: "9px 24px", borderRadius: 999, border: "none", background: "#F14F44", fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#fff" }}>Continue</button>
          </div>
        }
      >
        <div style={{ padding: "20px 28px 20px" }}>
          <div style={{ fontFamily: sora, fontSize: 18, color: "#F5F5F5", marginBottom: 18 }}>Default Policy</div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {policies.map((p, i) => {
              const sel = selected === i;
              return (
                <button
                  key={p.label}
                  onClick={() => setSelected(i)}
                  className="cursor-pointer"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: sel ? `2px solid ${p.color}` : "1px solid #3F3F3F",
                    background: sel ? `${p.color}1A` : "transparent",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: p.color, marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{p.label}</span>
                      {p.recommended && (
                        <span style={{ padding: "1px 6px", borderRadius: 4, background: "rgba(245,166,35,0.12)", fontFamily: manrope, fontSize: 10, fontWeight: 600, color: "#F5A623" }}>Recommended</span>
                      )}
                    </div>
                    <div style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", marginTop: 3 }}>{p.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── VARIANT E — Review ── */
function VariantE() {
  const rows = [
    { label: "Organization:", value: "PT Contoh Fintech Tbk" },
    { label: "Industry:", value: "Financial Services" },
    { label: "Employees:", value: "500" },
    { label: "Jurisdiction:", value: "🇮🇩 Indonesia" },
    { label: "Vectors:", value: "5/5 Active", color: "#2ECC71" },
    { label: "Default Policy:", value: "Restricted", color: "#F5A623" },
  ];

  return (
    <Backdrop>
      <ModalShell
        step={5}
        footer={
          <div className="flex items-center justify-between" style={{ width: "100%" }}>
            <button className="cursor-pointer" style={{ background: "none", border: "none", fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>← Back</button>
            <button className="cursor-pointer" style={{ padding: "9px 24px", borderRadius: 999, border: "none", background: "#F14F44", fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#fff" }}>Launch Axiara</button>
          </div>
        }
      >
        <div style={{ padding: "20px 28px 20px" }}>
          <div style={{ fontFamily: sora, fontSize: 18, color: "#F5F5F5", marginBottom: 16 }}>Review Configuration</div>
          <div style={{ background: "#1E1E1E", borderRadius: 12, padding: 16 }}>
            {rows.map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", lineHeight: 2.0, fontFamily: manrope, fontSize: 12 }}>
                <span style={{ color: "#AEB3BD" }}>{r.label}</span>
                <span style={{ fontWeight: 700, color: r.color || "#F5F5F5" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── VARIANT F — Launch ── */
function VariantF() {
  return (
    <Backdrop>
      <ModalShell
        step={6}
        footer={
          <button className="cursor-pointer" style={{ width: "100%", padding: "10px 24px", borderRadius: 999, border: "none", background: "#F14F44", fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#fff" }}>
            Launch Dashboard
          </button>
        }
      >
        <div style={{ padding: "24px 28px 28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Success circle */}
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "rgba(46,204,113,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16.5L13.5 22L24 10" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontFamily: sora, fontSize: 22, color: "#F5F5F5", marginTop: 16 }}>You're all set!</div>
          <div style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", marginTop: 10, maxWidth: 400 }}>
            Axiara is now monitoring your organization's AI landscape. Detection sensors are active and scanning.
          </div>
          <div style={{ fontFamily: manrope, fontSize: 13, color: "#F14F44", marginTop: 8 }}>
            First discoveries appear within 30 minutes.
          </div>
        </div>
      </ModalShell>
    </Backdrop>
  );
}

/* ── Main Export ── */
export function OnboardingWizardVariants() {
  return (
    <div style={{ display: "flex", overflowX: "auto", background: "#0E0E0E" }}>
      <VariantA />
      <VariantB />
      <VariantC />
      <VariantD />
      <VariantE />
      <VariantF />
    </div>
  );
}