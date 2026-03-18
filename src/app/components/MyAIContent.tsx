import { useState } from "react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const tabs = ["Catalog", "Request a Tool", "My AI"];

const activeTools = [
  { name: "ChatGPT Enterprise", queries: 142, lastActive: "2h ago" },
  { name: "GitHub Copilot", queries: 87, lastActive: "1d ago" },
  { name: "Grammarly Business", queries: 34, lastActive: "3d ago" },
  { name: "Notion AI", queries: 12, lastActive: "5d ago" },
];

const card: React.CSSProperties = {
  background: "#111111",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 14,
  padding: "18px 22px",
};

export function MyAIContent({ onTabChange }: { onTabChange?: (tab: number) => void }) {
  const [activeTab, setActiveTab] = useState(2);

  const handleTab = (i: number) => {
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
        My AI Dashboard
      </div>

      {/* Tabs */}
      <div className="flex" style={{ gap: 24, marginTop: 16, borderBottom: "1px solid rgba(63,63,63,0.3)" }}>
        {tabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={tab}
              onClick={() => handleTab(i)}
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

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 20 }}>
        {/* My Tools */}
        <div style={card}>
          <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.03em" }}>MY TOOLS</span>
          <div style={{ fontFamily: sora, fontSize: 30, fontWeight: 700, color: "#F5F5F5", marginTop: 8 }}>4</div>
        </div>

        {/* Compliance Score */}
        <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.03em" }}>COMPLIANCE SCORE</span>
          <div style={{ position: "relative", width: 80, height: 80, marginTop: 10, alignSelf: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `conic-gradient(#2ECC71 0% 87%, #1E1E1E 87% 100%)`,
              }}
            />
            <div
              className="flex items-center justify-center"
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#0A0A0A",
              }}
            >
              <span style={{ fontFamily: sora, fontSize: 18, fontWeight: 700, color: "#F5F5F5" }}>87%</span>
            </div>
          </div>
        </div>

        {/* AUP Status */}
        <div style={card}>
          <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.03em" }}>AUP STATUS</span>
          <div style={{ marginTop: 12 }}>
            <span
              className="inline-flex items-center"
              style={{
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(46,204,113,0.12)",
                fontFamily: manrope,
                fontSize: 11,
                fontWeight: 600,
                color: "#2ECC71",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ECC71", flexShrink: 0 }} />
              Acknowledged
            </span>
          </div>
        </div>

        {/* Pending Requests */}
        <div style={card}>
          <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.03em" }}>PENDING REQUESTS</span>
          <div style={{ fontFamily: sora, fontSize: 30, fontWeight: 700, color: "#F5A623", marginTop: 8 }}>1</div>
        </div>
      </div>

      {/* Tool List */}
      <div style={{ ...card, marginTop: 20 }}>
        <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", textTransform: "uppercase", letterSpacing: "0.03em" }}>ACTIVE TOOLS</span>
        <div style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em", marginTop: 4 }}>
          Your Approved AI Tools
        </div>

        <div style={{ marginTop: 14 }}>
          {activeTools.map((tool, i) => (
            <div
              key={tool.name}
              className="flex items-center justify-between"
              style={{
                padding: "11px 14px",
                borderTop: i > 0 ? "0.5px solid #2A2A2A" : "none",
              }}
            >
              <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 500, color: "#F5F5F5", minWidth: 180 }}>
                {tool.name}
              </span>
              <div className="flex items-center" style={{ gap: 24 }}>
                <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{tool.queries} queries</span>
                <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", minWidth: 50 }}>{tool.lastActive}</span>
              </div>
              <span
                className="inline-flex items-center"
                style={{
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "rgba(46,204,113,0.12)",
                  fontFamily: manrope,
                  fontSize: 11,
                  color: "#2ECC71",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ECC71", flexShrink: 0 }} />
                Approved
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}