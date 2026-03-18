import { useState, useEffect } from "react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const tabs = ["Catalog", "Request a Tool", "My AI"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  background: "#111111",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 10,
  paddingLeft: 16,
  paddingRight: 16,
  fontFamily: manrope,
  fontSize: 13,
  color: "#F5F5F5",
  outline: "none",
  transition: "border-color 0.15s",
};

const fieldBase: React.CSSProperties = {
  width: "100%",
  background: "#111111",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 10,
  padding: "10px 16px",
  fontFamily: manrope,
  fontSize: 13,
  color: "#F5F5F5",
  outline: "none",
};

const glassCard: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.06)",
  padding: "20px 22px",
  background: "#111111",
};

const riskFactors = [
  "Data residency: US servers",
  "SSO integration: Available",
  "PDP compliance: Partial",
];

export function RequestToolContent({ onTabChange }: { onTabChange?: (tab: number) => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [urlFocused, setUrlFocused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 65) {
          clearInterval(timer);
          return 65;
        }
        return p + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    onTabChange?.(i);
  };

  return (
    <div>
      {/* Header */}
      <span style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.03em" }}>
        EMPLOYEE PORTAL
      </span>
      <div style={{ fontFamily: sora, fontSize: 22, color: "#F5F5F5", letterSpacing: "-0.05em", marginTop: 4 }}>
        Request a Tool
      </div>

      {/* Tabs */}
      <div className="flex" style={{ gap: 24, marginTop: 16, borderBottom: "1px solid rgba(63,63,63,0.3)", paddingBottom: 0 }}>
        {tabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(i)}
              className="cursor-pointer"
              style={{
                background: "transparent",
                border: "none",
                fontFamily: manrope,
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? "#F14F44" : "#AEB3BD",
                paddingBottom: 12,
                borderBottom: isActive ? "2px solid #F14F44" : "2px solid transparent",
                marginBottom: -1,
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* URL Input */}
      <div className="flex" style={{ gap: 10, marginTop: 20 }}>
        <input
          type="text"
          placeholder="Paste tool URL or search by name..."
          defaultValue="https://notion.so/product/ai"
          style={{
            ...inputStyle,
            flex: 1,
            borderColor: urlFocused ? "#F14F44" : "rgba(255,255,255,0.06)",
          }}
          onFocus={() => setUrlFocused(true)}
          onBlur={() => setUrlFocused(false)}
        />
        <button
          className="cursor-pointer shrink-0"
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            background: "#F14F44",
            border: "none",
            fontFamily: manrope,
            fontSize: 12,
            fontWeight: 500,
            color: "#fff",
          }}
        >
          Submit
        </button>
      </div>

      {/* Screening Progress */}
      <div style={{ marginTop: 20 }}>
        <div style={{ height: 6, borderRadius: 3, background: "#1E1E1E", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 3,
              background: "linear-gradient(90deg, #E24C4A, #386BB7)",
              width: `${progress}%`,
              transition: "width 0.3s ease-out",
            }}
          />
        </div>
        <span style={{ fontFamily: manrope, fontSize: 13, color: "#F5A623", marginTop: 8, display: "block" }}>
          Analyzing risk vectors...
        </span>
      </div>

      {/* Result Card */}
      <div style={{ ...glassCard, marginTop: 16 }}>
        {/* Tool info */}
        <div>
          <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5" }}>Notion AI</span>
          <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", marginLeft: 12 }}>Notion Labs</span>
        </div>

        {/* Risk meter */}
        <div style={{ marginTop: 14 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
            <span style={{ fontFamily: manrope, fontSize: 12, color: "#F5A623" }}>Medium Risk</span>
            <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>55%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "#1E1E1E" }}>
            <div style={{ height: "100%", borderRadius: 2, background: "#F5A623", width: "55%" }} />
          </div>
        </div>

        {/* Risk factors */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
          {riskFactors.map((f) => (
            <div key={f} className="flex items-center" style={{ gap: 8 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#AEB3BD", flexShrink: 0 }} />
              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Form fields */}
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Business justification */}
          <div>
            <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 6 }}>
              Business Justification
            </label>
            <textarea
              placeholder="Describe why your team needs this tool..."
              style={{
                ...fieldBase,
                height: 100,
                resize: "none",
              }}
            />
          </div>

          {/* Department & Urgency row */}
          <div className="flex" style={{ gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 6 }}>
                Department
              </label>
              <select
                style={{
                  ...fieldBase,
                  height: 42,
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23AEB3BD' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: 36,
                }}
                defaultValue=""
              >
                <option value="" disabled>Select department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="legal">Legal</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", display: "block", marginBottom: 6 }}>
                Urgency
              </label>
              <select
                style={{
                  ...fieldBase,
                  height: 42,
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23AEB3BD' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: 36,
                }}
                defaultValue=""
              >
                <option value="" disabled>Select urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: 4 }}>
            <button
              className="cursor-pointer"
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                background: "transparent",
                border: "1.5px solid transparent",
                backgroundImage: "linear-gradient(#171717, #171717), linear-gradient(135deg, #E24C4A, #386BB7)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                fontFamily: manrope,
                fontSize: 12.5,
                fontWeight: 500,
                color: "#F5F5F5",
              }}
            >
              Submit Request →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}