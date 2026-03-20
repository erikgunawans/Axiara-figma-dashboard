import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Shield, Lock, Fingerprint, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../components/AppContext";
import logoImg from "figma:asset/e36e006ed674caca4c383e7161bab0eb1df34dd9.png";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const tenants = [
  { id: "axiara", label: "axiara.ai", domain: "axiara.ai" },
  { id: "acme", label: "Acme Corp", domain: "acme.com" },
  { id: "globex", label: "Globex Inc", domain: "globex.io" },
];

/* ── Floating particle ───────────────────────────── */
function Particle({ i }: { i: number }) {
  const size = 2 + Math.random() * 3;
  const dur = 12 + Math.random() * 18;
  const delay = Math.random() * 8;
  const left = Math.random() * 100;
  const startTop = 60 + Math.random() * 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.6, 0], y: -300 - Math.random() * 200 }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${startTop}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: i % 3 === 0
          ? "rgba(226,76,74,0.4)"
          : i % 3 === 1
          ? "rgba(56,107,183,0.35)"
          : "rgba(255,255,255,0.15)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Animated mesh blob ───────────────────────────── */
function MeshBlob({
  color,
  size,
  top,
  left,
  animName,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  animName: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        animation: `${animName} 20s ease-in-out infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { t, theme } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [mfaCode, setMfaCode] = useState(["", "", "", "", "", ""]);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [activeTenant, setActiveTenant] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const tenantRef = useRef<HTMLDivElement>(null);
  const mfaRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [mfaCountdown, setMfaCountdown] = useState(30);

  // Close tenant dropdown on outside click
  useEffect(() => {
    if (!tenantOpen) return;
    const handler = (e: MouseEvent) => {
      if (tenantRef.current && !tenantRef.current.contains(e.target as Node)) {
        setTenantOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tenantOpen]);

  // MFA countdown
  useEffect(() => {
    if (step !== "mfa") return;
    const timer = setInterval(() => {
      setMfaCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("mfa");
      setMfaCountdown(30);
      setTimeout(() => mfaRefs.current[0]?.focus(), 200);
    }, 1400);
  };

  const handleMfaInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...mfaCode];
    newCode[index] = value;
    setMfaCode(newCode);
    if (value && index < 5) {
      mfaRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newCode.every((d) => d !== "")) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    }
  };

  const handleMfaKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !mfaCode[index] && index > 0) {
      mfaRefs.current[index - 1]?.focus();
    }
  };

  const isDark = theme === "dark";
  const cardBg = isDark ? "rgba(10,10,10,0.85)" : "rgba(255,255,255,0.92)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const inputBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const inputFocusBorder = "rgba(241,79,68,0.4)";
  const subtleBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: 800,
        background: isDark ? "#050507" : "#F0F0F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: manrope,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes loginFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 20px) scale(0.95); }
        }
        @keyframes loginFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 35px) scale(1.05); }
          66% { transform: translate(25px, -20px) scale(0.97); }
        }
        @keyframes loginFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 25px) scale(1.03); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Ambient mesh blobs */}
      <MeshBlob color="rgba(226,76,74,0.12)" size={600} top="-10%" left="-5%" animName="loginFloat1" />
      <MeshBlob color="rgba(56,107,183,0.1)" size={500} top="50%" left="65%" animName="loginFloat2" />
      <MeshBlob color="rgba(226,76,74,0.06)" size={400} top="70%" left="20%" animName="loginFloat3" />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Particle key={i} i={i} />
      ))}

      {/* Main login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 440,
          background: cardBg,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRadius: 24,
          border: `1px solid ${cardBorder}`,
          boxShadow: isDark
            ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 32px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
          padding: "40px 36px 36px",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Top gradient accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, #E24C4A, #386BB7)",
            opacity: 0.7,
            borderRadius: "24px 24px 0 0",
          }}
        />

        {/* Logo + heading */}
        <div className="flex flex-col items-center" style={{ marginBottom: 32 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img src={logoImg} alt="axiara.ai" style={{ height: 44, marginBottom: 20 }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: sora,
              fontSize: 22,
              fontWeight: 700,
              color: t.textPrimary,
              letterSpacing: "-0.04em",
              margin: 0,
              textAlign: "center",
            }}
          >
            {step === "credentials" ? "Welcome back" : "Two-factor authentication"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontFamily: manrope,
              fontSize: 13.5,
              color: t.textMuted,
              marginTop: 8,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {step === "credentials"
              ? "Sign in to your AI governance dashboard"
              : "Enter the 6-digit code from your authenticator app"}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {step === "credentials" ? (
            <motion.form
              key="cred"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Tenant selector */}
              <div ref={tenantRef} style={{ position: "relative" }}>
                <label style={{ fontFamily: manrope, fontSize: 11, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "block" }}>
                  Organization
                </label>
                <button
                  type="button"
                  onClick={() => setTenantOpen((v) => !v)}
                  className="flex items-center w-full cursor-pointer"
                  style={{
                    height: 46,
                    borderRadius: 12,
                    border: `1px solid ${tenantOpen ? inputFocusBorder : inputBorder}`,
                    background: inputBg,
                    padding: "0 14px",
                    gap: 10,
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: "linear-gradient(135deg, #E24C4A, #386BB7)",
                    }}
                  >
                    <span style={{ fontFamily: sora, fontSize: 12, color: "#fff", fontWeight: 700 }}>
                      {tenants[activeTenant].label[0]}
                    </span>
                  </div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: manrope, fontSize: 13.5, fontWeight: 600, color: t.textPrimary }}>
                      {tenants[activeTenant].label}
                    </div>
                    <div style={{ fontFamily: manrope, fontSize: 10.5, color: t.textMuted }}>
                      {tenants[activeTenant].domain}
                    </div>
                  </div>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    style={{
                      color: t.textMuted,
                      transform: tenantOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {tenantOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        background: isDark ? "#111111" : "#FFFFFF",
                        border: `1px solid ${cardBorder}`,
                        borderRadius: 14,
                        padding: 4,
                        zIndex: 20,
                        boxShadow: isDark
                          ? "0 16px 48px rgba(0,0,0,0.5)"
                          : "0 16px 48px rgba(0,0,0,0.1)",
                      }}
                    >
                      {tenants.map((tenant, i) => {
                        const isSel = i === activeTenant;
                        return (
                          <button
                            type="button"
                            key={tenant.id}
                            onClick={() => { setActiveTenant(i); setTenantOpen(false); }}
                            className="flex items-center w-full cursor-pointer"
                            style={{
                              padding: "10px 12px",
                              borderRadius: 10,
                              border: "none",
                              background: isSel ? t.accentSoft : "transparent",
                              gap: 10,
                              transition: "background 0.15s ease",
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = subtleBg; }}
                            onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                          >
                            <div
                              className="flex items-center justify-center shrink-0"
                              style={{ width: 26, height: 26, borderRadius: 6, background: "linear-gradient(135deg, #E24C4A, #386BB7)" }}
                            >
                              <span style={{ fontFamily: sora, fontSize: 11, color: "#fff", fontWeight: 700 }}>{tenant.label[0]}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: manrope, fontSize: 13, fontWeight: isSel ? 600 : 500, color: isSel ? t.accent : t.textPrimary }}>
                                {tenant.label}
                              </div>
                              <div style={{ fontFamily: manrope, fontSize: 10.5, color: t.textMuted }}>{tenant.domain}</div>
                            </div>
                            {isSel && <Check size={14} strokeWidth={2.5} style={{ color: t.accent }} />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: manrope, fontSize: 11, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "block" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@axiara.ai"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                  style={{
                    width: "100%",
                    height: 46,
                    borderRadius: 12,
                    border: `1px solid ${inputBorder}`,
                    background: inputBg,
                    padding: "0 14px",
                    fontFamily: manrope,
                    fontSize: 13.5,
                    color: t.textPrimary,
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = inputFocusBorder;
                    e.target.style.boxShadow = "0 0 0 3px rgba(241,79,68,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <label style={{ fontFamily: manrope, fontSize: 11, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Password
                  </label>
                  <button
                    type="button"
                    className="cursor-pointer"
                    style={{
                      fontFamily: manrope,
                      fontSize: 11,
                      color: t.accent,
                      background: "transparent",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoComplete="current-password"
                    style={{
                      width: "100%",
                      height: 46,
                      borderRadius: 12,
                      border: `1px solid ${inputBorder}`,
                      background: inputBg,
                      padding: "0 44px 0 14px",
                      fontFamily: manrope,
                      fontSize: 13.5,
                      color: t.textPrimary,
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = inputFocusBorder;
                      e.target.style.boxShadow = "0 0 0 3px rgba(241,79,68,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = inputBorder;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="flex items-center justify-center cursor-pointer"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      padding: 4,
                    }}
                  >
                    {showPw ? (
                      <EyeOff size={16} strokeWidth={1.8} style={{ color: t.textMuted }} />
                    ) : (
                      <Eye size={16} strokeWidth={1.8} style={{ color: t.textMuted }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + error */}
              <div className="flex items-center justify-between" style={{ marginTop: -4 }}>
                <label className="flex items-center cursor-pointer" style={{ gap: 8 }}>
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className="flex items-center justify-center"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1.5px solid ${rememberMe ? t.accent : inputBorder}`,
                      background: rememberMe ? t.accentSoft : "transparent",
                      transition: "all 0.15s ease",
                      cursor: "pointer",
                    }}
                  >
                    {rememberMe && <Check size={12} strokeWidth={3} style={{ color: t.accent }} />}
                  </div>
                  <span style={{ fontFamily: manrope, fontSize: 12, color: t.textSecondary }}>
                    Remember me
                  </span>
                </label>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontFamily: manrope,
                      fontSize: 12,
                      color: "#F14F44",
                      background: "rgba(241,79,68,0.08)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      border: "1px solid rgba(241,79,68,0.15)",
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                style={{
                  width: "100%",
                  height: 48,
                  borderRadius: 12,
                  border: "none",
                  background: loading
                    ? "linear-gradient(90deg, #E24C4A88, #386BB788, #E24C4A88)"
                    : "linear-gradient(135deg, #E24C4A, #C43E3C)",
                  backgroundSize: loading ? "200% 100%" : "100% 100%",
                  animation: loading ? "shimmer 1.5s linear infinite" : "none",
                  fontFamily: sora,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 4px 16px rgba(226,76,74,0.3), 0 1px 2px rgba(0,0,0,0.2)",
                  transition: "box-shadow 0.2s ease",
                  marginTop: 4,
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                  />
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} strokeWidth={2} />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center" style={{ gap: 12, margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                <span style={{ fontFamily: manrope, fontSize: 11, color: t.textMuted }}>or continue with</span>
                <div style={{ flex: 1, height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
              </div>

              {/* SSO buttons */}
              <div className="flex" style={{ gap: 10 }}>
                {[
                  { label: "SSO", icon: Shield },
                  { label: "Passkey", icon: Fingerprint },
                  { label: "SAML", icon: Lock },
                ].map(({ label, icon: Icon }) => (
                  <button
                    type="button"
                    key={label}
                    className="flex items-center justify-center cursor-pointer"
                    style={{
                      flex: 1,
                      height: 42,
                      borderRadius: 10,
                      border: `1px solid ${inputBorder}`,
                      background: subtleBg,
                      fontFamily: manrope,
                      fontSize: 12,
                      fontWeight: 500,
                      color: t.textSecondary,
                      gap: 6,
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = t.borderHover;
                      e.currentTarget.style.background = inputBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = inputBorder;
                      e.currentTarget.style.background = subtleBg;
                    }}
                  >
                    <Icon size={14} strokeWidth={1.8} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.form>
          ) : (
            /* ── MFA Step ───────────────────────────────── */
            <motion.div
              key="mfa"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}
            >
              {/* Shield icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200, damping: 15 }}
                className="flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, rgba(226,76,74,0.12), rgba(56,107,183,0.1))",
                  border: `1px solid ${isDark ? "rgba(241,79,68,0.15)" : "rgba(226,76,74,0.12)"}`,
                }}
              >
                <Shield size={28} strokeWidth={1.5} style={{ color: t.accent }} />
              </motion.div>

              {/* 6-digit code inputs */}
              <div className="flex" style={{ gap: 8, justifyContent: "center" }}>
                {mfaCode.map((digit, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { mfaRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleMfaInput(i, e.target.value)}
                    onKeyDown={(e) => handleMfaKeyDown(i, e)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    style={{
                      width: 48,
                      height: 56,
                      borderRadius: 12,
                      border: `1.5px solid ${digit ? "rgba(241,79,68,0.35)" : inputBorder}`,
                      background: digit ? t.accentSoft : inputBg,
                      textAlign: "center",
                      fontFamily: sora,
                      fontSize: 22,
                      fontWeight: 700,
                      color: t.textPrimary,
                      outline: "none",
                      transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                      caretColor: t.accent,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = inputFocusBorder;
                      e.target.style.boxShadow = "0 0 0 3px rgba(241,79,68,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = digit ? "rgba(241,79,68,0.35)" : inputBorder;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                ))}
              </div>

              {/* Timer + resend */}
              <div className="flex flex-col items-center" style={{ gap: 4 }}>
                <span style={{ fontFamily: manrope, fontSize: 12, color: t.textMuted }}>
                  Code expires in{" "}
                  <span style={{ fontFamily: sora, fontWeight: 600, color: mfaCountdown < 10 ? t.accent : t.textSecondary }}>
                    0:{mfaCountdown.toString().padStart(2, "0")}
                  </span>
                </span>
                {mfaCountdown === 0 && (
                  <button
                    type="button"
                    onClick={() => setMfaCountdown(30)}
                    className="cursor-pointer"
                    style={{
                      fontFamily: manrope,
                      fontSize: 12,
                      color: t.accent,
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      marginTop: 4,
                    }}
                  >
                    Resend code
                  </button>
                )}
              </div>

              {/* Verify button */}
              <motion.button
                type="button"
                disabled={loading || mfaCode.some((d) => d === "")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => { setLoading(false); navigate("/"); }, 1000);
                }}
                style={{
                  width: "100%",
                  height: 48,
                  borderRadius: 12,
                  border: "none",
                  background: mfaCode.every((d) => d !== "")
                    ? loading
                      ? "linear-gradient(90deg, #E24C4A88, #386BB788, #E24C4A88)"
                      : "linear-gradient(135deg, #E24C4A, #C43E3C)"
                    : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  backgroundSize: loading ? "200% 100%" : "100% 100%",
                  animation: loading ? "shimmer 1.5s linear infinite" : "none",
                  fontFamily: sora,
                  fontSize: 14,
                  fontWeight: 600,
                  color: mfaCode.every((d) => d !== "") ? "#fff" : t.textMuted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: mfaCode.every((d) => d !== "")
                    ? "0 4px 16px rgba(226,76,74,0.3), 0 1px 2px rgba(0,0,0,0.2)"
                    : "none",
                  transition: "all 0.3s ease",
                  cursor: mfaCode.some((d) => d === "") ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                  />
                ) : (
                  <>
                    Verify & sign in
                    <ArrowRight size={16} strokeWidth={2} />
                  </>
                )}
              </motion.button>

              {/* Back link */}
              <button
                type="button"
                onClick={() => { setStep("credentials"); setMfaCode(["", "", "", "", "", ""]); }}
                className="cursor-pointer"
                style={{
                  fontFamily: manrope,
                  fontSize: 12,
                  color: t.textMuted,
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                ← Back to sign in
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center"
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
            gap: 16,
          }}
        >
          {["Privacy Policy", "Terms of Service", "Help"].map((link) => (
            <button
              key={link}
              className="cursor-pointer"
              style={{
                fontFamily: manrope,
                fontSize: 11,
                color: t.textMuted,
                background: "transparent",
                border: "none",
                padding: 0,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.textSecondary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
            >
              {link}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: "absolute",
          bottom: 28,
          fontFamily: manrope,
          fontSize: 11,
          color: t.textMuted,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Lock size={11} strokeWidth={2} />
        Secured by axiara.ai — Enterprise AI Governance
      </motion.div>
    </div>
  );
}
