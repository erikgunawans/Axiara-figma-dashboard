import { Search } from "lucide-react";
import { useState } from "react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const tabs = ["Catalog", "Request a Tool", "My AI"];

interface Tool {
  name: string;
  vendor: string;
  category: string;
  grade: string;
  gradeColor: string;
  description: string;
  status: string;
  statusColor: string;
}

const tools: Tool[] = [
  {
    name: "ChatGPT Enterprise",
    vendor: "OpenAI",
    category: "Conversational AI",
    grade: "A+",
    gradeColor: "#2ECC71",
    description: "Enterprise-grade conversational AI with advanced data privacy controls and audit logging.",
    status: "Approved",
    statusColor: "#2ECC71",
  },
  {
    name: "GitHub Copilot",
    vendor: "GitHub / Microsoft",
    category: "Code Generation",
    grade: "A",
    gradeColor: "#2ECC71",
    description: "AI-powered code completion and generation tool integrated directly into your IDE workflow.",
    status: "Approved",
    statusColor: "#2ECC71",
  },
  {
    name: "Grammarly Business",
    vendor: "Grammarly",
    category: "Writing Assistant",
    grade: "A",
    gradeColor: "#2ECC71",
    description: "AI writing assistant for business communications with enterprise compliance features.",
    status: "Approved",
    statusColor: "#2ECC71",
  },
  {
    name: "Notion AI",
    vendor: "Notion Labs",
    category: "Productivity",
    grade: "B+",
    gradeColor: "#386BB7",
    description: "Integrated AI assistant for document summarization, drafting, and knowledge management.",
    status: "Approved",
    statusColor: "#2ECC71",
  },
  {
    name: "Midjourney",
    vendor: "Midjourney Inc.",
    category: "Image Generation",
    grade: "B",
    gradeColor: "#F5A623",
    description: "AI image generation tool for creative assets. Usage restricted to non-sensitive content only.",
    status: "Conditional",
    statusColor: "#F5A623",
  },
  {
    name: "Canva AI",
    vendor: "Canva",
    category: "Design Assistant",
    grade: "A",
    gradeColor: "#2ECC71",
    description: "AI-powered design tool for marketing materials with brand-safe template enforcement.",
    status: "Approved",
    statusColor: "#2ECC71",
  },
];

function GradeBadge({ grade, color }: { grade: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        background: `${color}1F`,
        fontFamily: sora,
        fontSize: 11,
        fontWeight: 700,
        color,
      }}
    >
      {grade}
    </span>
  );
}

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span
      className="flex items-center"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        background: `${color}1F`,
        fontFamily: manrope,
        fontSize: 11,
        color,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

export function ToolCatalog({ onTabChange }: { onTabChange?: (tab: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);

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
        Approved AI Catalog
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

      {/* Tool Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 14,
          marginTop: 20,
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5" }}>{tool.name}</span>
              <GradeBadge grade={tool.grade} color={tool.gradeColor} />
            </div>
            <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>{tool.vendor}</span>
            <span style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>{tool.category}</span>
            <p
              style={{
                fontFamily: manrope,
                fontSize: 12,
                color: "#AEB3BD",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
              }}
            >
              {tool.description}
            </p>
            <div style={{ marginTop: "auto", paddingTop: 4 }}>
              <StatusBadge status={tool.status} color={tool.statusColor} />
            </div>
          </div>
        ))}

        {/* CTA Card */}
        <div
          style={{
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "transparent",
          }}
        >
          <Search size={24} strokeWidth={1.5} style={{ color: "#AEB3BD" }} />
          <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", textAlign: "center" }}>
            Can't find your tool?
          </span>
          <button
            className="cursor-pointer"
            style={{
              padding: "9px 20px",
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
            Request a Tool →
          </button>
        </div>
      </div>
    </div>
  );
}