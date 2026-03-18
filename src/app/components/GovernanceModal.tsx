import { useState } from "react";
import { Check } from "lucide-react";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const stepLabels = ["Action", "Evidence", "Framework", "Confirm"];

const actions = [
  { label: "Approve", desc: "Allow tool with monitoring", color: "#2ECC71" },
  { label: "Restrict", desc: "Limit access with conditions", color: "#F5A623" },
  { label: "Ban", desc: "Block all organizational access", color: "#F14F44" },
  { label: "Sandbox", desc: "Isolate for testing period", color: "#386BB7" },
];

const frameworks = [
  { label: "UU PDP (Indonesia Personal Data Protection)", defaultChecked: true },
  { label: "POJK 30/2025 (Financial AI Regulation)", defaultChecked: true },
  { label: "ISO 42001 (AI Management Systems)", defaultChecked: false },
  { label: "GDPR (EU General Data Protection)", defaultChecked: false },
  { label: "EU AI Act", defaultChecked: false },
];

interface GovernanceModalProps {
  onClose: () => void;
  toolName?: string;
  vendor?: string;
  initialStep?: number;
  inline?: boolean;
}

function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-start justify-center" style={{ marginTop: 20 }}>
      {stepLabels.map((step, i) => {
        const isCompleted = i < activeStep;
        const isActive = i === activeStep;
        return (
          <div key={step} className="flex flex-col items-center">
            <div className="flex items-center">
              {i > 0 && (
                <div style={{ width: 48, height: 2, background: isCompleted || isActive ? (isCompleted ? "#2ECC71" : "#F14F44") : "#1E1E1E" }} />
              )}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: isCompleted ? "#2ECC71" : isActive ? "#F14F44" : "#1E1E1E",
                }}
              >
                {isCompleted ? (
                  <Check size={13} strokeWidth={3} style={{ color: "#fff" }} />
                ) : (
                  <span style={{ fontFamily: manrope, fontSize: 11, fontWeight: 700, color: isActive ? "#fff" : "#AEB3BD" }}>
                    {i + 1}
                  </span>
                )}
              </div>
              {i < stepLabels.length - 1 && (
                <div style={{ width: 48, height: 2, background: isCompleted && i < activeStep - 1 ? "#2ECC71" : i < activeStep ? "#2ECC71" : "#1E1E1E" }} />
              )}
            </div>
            <span style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD", marginTop: 6 }}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

function Checkbox({ checked, onChange, size = 18 }: { checked: boolean; onChange: () => void; size?: number }) {
  return (
    <button
      onClick={onChange}
      className="shrink-0 flex items-center justify-center cursor-pointer"
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        border: checked ? "none" : "1px solid #3F3F3F",
        background: checked ? "#F14F44" : "#1E1E1E",
        transition: "all 0.15s",
      }}
    >
      {checked && <Check size={12} strokeWidth={3} style={{ color: "#fff" }} />}
    </button>
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        gap: 5,
        padding: "3px 9px",
        borderRadius: 999,
        background: `${color}1F`,
        fontFamily: manrope,
        fontSize: 11,
        color,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

export function GovernanceModal({ onClose, toolName = "DeepSeek Chat", vendor = "DeepSeek", initialStep = 0, inline = false }: GovernanceModalProps) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [selected, setSelected] = useState(0);
  const [rationale, setRationale] = useState("");
  const [checkedFrameworks, setCheckedFrameworks] = useState<boolean[]>(frameworks.map((f) => f.defaultChecked));
  const [confirmed, setConfirmed] = useState(false);

  const selectedAction = actions[selected];
  const selectedFrameworkNames = frameworks.filter((_, i) => checkedFrameworks[i]).map((f) => f.label.split(" (")[0]);

  const modalContent = (
    <div
      style={{
        width: 560,
        background: "rgba(18,18,18,0.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 18,
        border: "1px solid rgba(63,63,63,0.4)",
        padding: 28,
        position: "relative",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute flex items-center justify-center cursor-pointer"
        style={{
          top: 20, right: 20, width: 32, height: 32, borderRadius: 8,
          background: "#1E1E1E", border: "none", fontFamily: manrope, fontSize: 14, color: "#AEB3BD",
        }}
      >
        ✕
      </button>

      {/* Header */}
      <span style={{ fontFamily: manrope, fontSize: 11, color: "#F14F44", textTransform: "uppercase", letterSpacing: "0.03em" }}>
        GOVERNANCE DECISION
      </span>
      <div style={{ marginTop: 6 }}>
        <span style={{ fontFamily: sora, fontSize: 18, color: "#F5F5F5" }}>{toolName}</span>
        <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", marginLeft: 10 }}>{vendor}</span>
      </div>

      <StepIndicator activeStep={activeStep} />

      {/* Step 1 */}
      {activeStep === 0 && (
        <div style={{ marginTop: 24 }}>
          <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em" }}>
            Choose governance action
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {actions.map((action, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={action.label}
                  onClick={() => setSelected(i)}
                  className="flex items-center cursor-pointer text-left"
                  style={{
                    padding: "12px 16px", borderRadius: 10, background: "#1E1E1E",
                    border: isSelected ? `1px solid ${action.color}` : "1px solid #3F3F3F",
                    gap: 12, minHeight: 52, transition: "border-color 0.15s",
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: isSelected ? `2px solid ${action.color}` : "2px solid #3F3F3F",
                      transition: "border-color 0.15s",
                    }}
                  >
                    {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: action.color }} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: manrope, fontSize: 13, fontWeight: 500, color: "#F5F5F5" }}>{action.label}</div>
                    <div style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", marginTop: 1 }}>{action.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {activeStep === 1 && (
        <div style={{ marginTop: 24 }}>
          <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em" }}>
            Document your rationale
          </span>
          <div className="flex items-center" style={{ gap: 10, marginTop: 14 }}>
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>Action:</span>
            <Pill label={selectedAction.label} color={selectedAction.color} />
            <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD", marginLeft: 6 }}>Tool: {toolName}</span>
          </div>
          <div style={{ position: "relative", marginTop: 16 }}>
            <textarea
              value={rationale}
              onChange={(e) => { if (e.target.value.length <= 2000) setRationale(e.target.value); }}
              placeholder="Explain the reasoning behind this decision. Reference specific risk factors, business justifications, or compliance requirements..."
              style={{
                width: "100%", height: 140, background: "#111111", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: 14, fontFamily: manrope, fontSize: 13, color: "#F5F5F5",
                resize: "none", outline: "none", transition: "border-color 0.15s", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#F14F44")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            />
            <span style={{ position: "absolute", bottom: 10, right: 14, fontFamily: manrope, fontSize: 10, color: "#AEB3BD" }}>
              {rationale.length}/2000
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 10, marginTop: 10 }}>
            <button className="cursor-pointer" style={{ padding: "5px 10px", borderRadius: 6, border: "1px dashed #3F3F3F", background: "transparent", fontFamily: manrope, fontSize: 11, color: "#AEB3BD" }}>
              📎 Attach file
            </button>
            <span style={{ fontFamily: manrope, fontSize: 10, color: "#AEB3BD" }}>Supported: PDF, DOCX, images</span>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {activeStep === 2 && (
        <div style={{ marginTop: 24 }}>
          <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em" }}>
            Select applicable frameworks
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {frameworks.map((fw, i) => (
              <div
                key={fw.label}
                className="flex items-center cursor-pointer"
                style={{ gap: 10 }}
                onClick={() => {
                  const next = [...checkedFrameworks];
                  next[i] = !next[i];
                  setCheckedFrameworks(next);
                }}
              >
                <Checkbox checked={checkedFrameworks[i]} onChange={() => {}} />
                <span style={{ fontFamily: manrope, fontSize: 13, color: "#F5F5F5" }}>{fw.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {activeStep === 3 && (
        <div style={{ marginTop: 24 }}>
          <span style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.03em" }}>
            Review &amp; confirm
          </span>

          {/* Summary card */}
          <div style={{ background: "#1E1E1E", borderRadius: 10, padding: 16, marginTop: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", alignItems: "center" }}>
              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Tool:</span>
              <span style={{ fontFamily: manrope, fontSize: 13, fontWeight: 700, color: "#F5F5F5" }}>{toolName}</span>

              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Vendor:</span>
              <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>{vendor}</span>

              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Action:</span>
              <div><Pill label={selectedAction.label} color={selectedAction.color} /></div>

              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Frameworks:</span>
              <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>
                {selectedFrameworkNames.length > 0 ? selectedFrameworkNames.join(", ") : "None selected"}
              </span>

              <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>Reviewer:</span>
              <span style={{ fontFamily: manrope, fontSize: 13, color: "#AEB3BD" }}>Data Protection Officer</span>
            </div>
          </div>

          {/* Confirmation checkbox */}
          <div
            className="flex items-start cursor-pointer"
            style={{ gap: 10, marginTop: 16 }}
            onClick={() => setConfirmed(!confirmed)}
          >
            <Checkbox checked={confirmed} onChange={() => {}} />
            <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD", lineHeight: 1.5 }}>
              I confirm this decision complies with organizational governance policies and the selected regulatory frameworks. This action will be logged in the immutable audit trail.
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: 24, borderTop: "0.5px solid #3F3F3F", paddingTop: 20 }}
      >
        <button
          onClick={() => { if (activeStep === 0) onClose(); else setActiveStep(activeStep - 1); }}
          className="cursor-pointer"
          style={{ background: "transparent", border: "none", fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}
        >
          {activeStep === 0 ? "Cancel" : "← Back"}
        </button>

        {activeStep < 3 ? (
          <button
            onClick={() => {
              if (activeStep === 1 && rationale.length === 0) return;
              setActiveStep(activeStep + 1);
            }}
            className="cursor-pointer"
            disabled={activeStep === 1 && rationale.length === 0}
            style={{
              background: activeStep === 1 && rationale.length === 0 ? "#1E1E1E" : "#F14F44",
              border: "none", borderRadius: 999, padding: "10px 20px",
              fontFamily: manrope, fontSize: 12, fontWeight: 500,
              color: activeStep === 1 && rationale.length === 0 ? "#AEB3BD" : "#fff",
              cursor: activeStep === 1 && rationale.length === 0 ? "not-allowed" : "pointer",
              transition: "all 0.15s",
            }}
          >
            Continue →
          </button>
        ) : (
          <button
            className="cursor-pointer"
            disabled={!confirmed}
            style={{
              background: confirmed ? "#2ECC71" : "#1E1E1E",
              border: "none", borderRadius: 999, padding: "10px 20px",
              fontFamily: manrope, fontSize: 12, fontWeight: 500,
              color: confirmed ? "#fff" : "#AEB3BD",
              cursor: confirmed ? "pointer" : "not-allowed",
              transition: "all 0.15s",
            }}
          >
            Submit Decision ✓
          </button>
        )}
      </div>
    </div>
  );

  if (inline) return modalContent;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 100, background: "rgba(23,23,23,0.45)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {modalContent}
    </div>
  );
}