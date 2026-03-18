import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SectionHeader, StaggerIn } from "./premium-ui";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const glassCard: React.CSSProperties = {
  background: "rgba(23,23,23,0.68)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: 14,
  border: "1px solid rgba(63,63,63,0.4)",
  marginBottom: 12,
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="cursor-pointer"
      style={{
        width: 36,
        height: 20,
        borderRadius: 10,
        border: "none",
        background: on ? "#F14F44" : "rgba(255,255,255,0.08)",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          background: "#fff",
          position: "absolute",
          top: 2,
          left: on ? 18 : 2,
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

function SettingsRow({
  label,
  desc,
  children,
  last,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "12px 0",
        borderBottom: last ? "none" : "0.5px solid #2A2A2A",
      }}
    >
      <div>
        <div style={{ fontFamily: manrope, fontSize: 13, fontWeight: 500, color: "#F5F5F5" }}>{label}</div>
        {desc && (
          <div style={{ fontFamily: manrope, fontSize: 11, color: "#AEB3BD", marginTop: 1 }}>{desc}</div>
        )}
      </div>
      {children}
    </div>
  );
}

function Section({
  title,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Chev = open ? ChevronDown : ChevronRight;
  return (
    <div style={glassCard}>
      <div
        className="flex items-center justify-between cursor-pointer"
        style={{ padding: "16px 22px" }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <div style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5" }}>{title}</div>
          {badge && (
            <div style={{ fontFamily: manrope, fontSize: 10, color: "#F14F44", marginTop: 2 }}>{badge}</div>
          )}
        </div>
        <Chev size={12} style={{ color: "#AEB3BD" }} />
      </div>
      {open && <div style={{ padding: "0 22px 16px" }}>{children}</div>}
    </div>
  );
}

export function SettingsContent() {
  const [vectors, setVectors] = useState([true, true, true, true, true]);
  const toggleVector = (i: number) => setVectors((v) => v.map((val, idx) => (idx === i ? !val : val)));

  const vectorNames = [
    "Vector A — Browser Extension",
    "Vector B — DNS Monitor",
    "Vector C — Cloud OAuth",
    "Vector D — OS Agent",
    "Vector E — MCP Scanner",
  ];

  const mcpPackages = [
    "@anthropic/claude-mcp",
    "@cursor/mcp-server",
    "@openai/mcp-tools",
    "@github/copilot-mcp",
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 22 }}>
        <SectionHeader tag="CONFIGURATION" title="Platform Settings" />
      </div>

      {/* 2-COL LAYOUT */}
      <StaggerIn delay={0.1}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "start" }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Organization Profile */}
          <Section title="Organization Profile" defaultOpen>
            <SettingsRow label="Company Name">
              <span style={{ fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>PT Contoh Fintech Tbk</span>
            </SettingsRow>
            <SettingsRow label="OJK Registration">
              <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 600, color: "#F14F44" }}>OJK-2026-4821</span>
            </SettingsRow>
            <SettingsRow label="Employees">
              <span style={{ fontFamily: sora, fontSize: 14, fontWeight: 700, color: "#F5F5F5" }}>500</span>
            </SettingsRow>
            <SettingsRow label="Data Residency" last>
              <span style={{ fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>🇮🇩 Indonesia (Jakarta)</span>
            </SettingsRow>
          </Section>

          {/* Detection Vectors */}
          <Section title="Detection Vectors" badge={`${vectors.filter(Boolean).length}/5 Active`} defaultOpen>
            {vectorNames.map((name, i) => (
              <SettingsRow key={name} label={name} last={i === 4}>
                <Toggle on={vectors[i]} onToggle={() => toggleVector(i)} />
              </SettingsRow>
            ))}
          </Section>

          {/* MCP Allowlist */}
          <Section title="MCP Allowlist" badge="12 packages">
            {mcpPackages.map((pkg, i) => (
              <div
                key={pkg}
                className="flex items-center justify-between"
                style={{
                  padding: "7px 0",
                  borderBottom: i < mcpPackages.length - 1 ? "0.5px solid #2A2A2A" : "none",
                }}
              >
                <span style={{ fontFamily: manrope, fontSize: 12, color: "#F5F5F5" }}>{pkg}</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(46,204,113,0.12)",
                    fontFamily: manrope,
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#2ECC71",
                  }}
                >
                  Approved
                </span>
              </div>
            ))}
            <button
              className="cursor-pointer"
              style={{
                marginTop: 12,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(63,63,63,0.4)",
                background: "transparent",
                fontFamily: manrope,
                fontSize: 11,
                color: "#AEB3BD",
              }}
            >
              + Add Package
            </button>
          </Section>

          {/* Webhook Configuration */}
          <Section title="Webhook Configuration" badge="2 active">
            <SettingsRow label="Slack — #ai-alerts" desc="POST notifications on new detections" last={false}>
              <Toggle on={true} onToggle={() => {}} />
            </SettingsRow>
            <SettingsRow label="Jira — Auto-ticket" desc="Create tickets for high-risk findings" last>
              <Toggle on={true} onToggle={() => {}} />
            </SettingsRow>
            <button
              className="cursor-pointer"
              style={{
                marginTop: 12,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(63,63,63,0.4)",
                background: "transparent",
                fontFamily: manrope,
                fontSize: 11,
                color: "#AEB3BD",
              }}
            >
              + Add Webhook
            </button>
          </Section>
        </div>

        {/* RIGHT COLUMN — placeholder */}
        <div>
          {/* Access Control (RBAC) */}
          <Section title="Access Control (RBAC)" badge="5 roles" defaultOpen>
            {[
              { role: "Super Admin", desc: "Full access", count: "2" },
              { role: "DPO", desc: "Compliance + HITL + Reports", count: "1" },
              { role: "CISO", desc: "Discovery + Integrations", count: "1" },
              { role: "IT Admin", desc: "Discovery + Catalog", count: "3" },
              { role: "Viewer", desc: "Read-only", count: "8" },
            ].map((r, i) => (
              <SettingsRow key={r.role} label={r.role} desc={r.desc} last={i === 4}>
                <span style={{ fontFamily: sora, fontSize: 14, fontWeight: 600, color: "#F5F5F5" }}>{r.count}</span>
              </SettingsRow>
            ))}
          </Section>

          {/* Policy and Compliance */}
          <Section title="Policy and Compliance" defaultOpen>
            <SettingsRow label="Default Policy Tier">
              <span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(241,79,68,0.18)", fontFamily: manrope, fontSize: 12, fontWeight: 600, color: "#F14F44" }}>Restricted</span>
            </SettingsRow>
            <SettingsRow label="HITL Mandatory">
              <Toggle on={true} onToggle={() => {}} />
            </SettingsRow>
            <SettingsRow label="Auto-Reports">
              <Toggle on={true} onToggle={() => {}} />
            </SettingsRow>
            <SettingsRow label="Employee Nudges" last>
              <Toggle on={true} onToggle={() => {}} />
            </SettingsRow>
          </Section>

          {/* API Keys */}
          <Section title="API Keys" badge="2 keys">
            {[
              { name: "Production Key", masked: "axr_prod_****...7f2a", created: "Mar 1, 2026", lastUsed: "2h ago" },
              { name: "Staging Key", masked: "axr_stg_****...b3c1", created: "Feb 14, 2026", lastUsed: "5d ago" },
            ].map((k, i) => (
              <div key={k.name} style={{ padding: "8px 0", borderBottom: i === 0 ? "0.5px solid #2A2A2A" : "none" }}>
                <div style={{ fontFamily: manrope, fontSize: 12, fontWeight: 500, color: "#F5F5F5" }}>{k.name}</div>
                <div style={{ fontFamily: manrope, fontSize: 11, fontWeight: 600, color: "#F14F44", marginTop: 2 }}>{k.masked}</div>
                <div style={{ fontFamily: manrope, fontSize: 10.5, color: "#AEB3BD", marginTop: 2 }}>Created: {k.created} · Last used: {k.lastUsed}</div>
              </div>
            ))}
            <button
              className="cursor-pointer"
              style={{ marginTop: 12, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(63,63,63,0.4)", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}
            >
              + Generate Key
            </button>
          </Section>

          {/* SIEM / SOAR */}
          <Section title="SIEM / SOAR" badge="3 connected">
            {[
              { name: "Splunk Enterprise", desc: "Real-time log forwarding" },
              { name: "Jira Cloud", desc: "Ticket auto-creation" },
              { name: "PagerDuty", desc: "P1 incident alerting" },
            ].map((s, i) => (
              <SettingsRow key={s.name} label={s.name} desc={s.desc} last={i === 2}>
                <span style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(46,204,113,0.12)", fontFamily: manrope, fontSize: 10, fontWeight: 600, color: "#2ECC71" }}>Connected</span>
              </SettingsRow>
            ))}
          </Section>
        </div>
      </div>
      </StaggerIn>
    </div>
  );
}