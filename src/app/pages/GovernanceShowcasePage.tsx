import { GovernanceModal } from "../components/GovernanceModal";

export function GovernanceShowcasePage() {
  return (
    <div
      style={{
        width: "100vw",
        minWidth: 1440,
        height: "100vh",
        minHeight: 900,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: "40px 28px",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Variant A — Step 3 */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: -28,
            left: 0,
            fontFamily: "'Sora', sans-serif",
            fontSize: 11,
            color: "#AEB3BD",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Variant A — Step 3: Framework
        </span>
        <GovernanceModal
          onClose={() => {}}
          toolName="DeepSeek Chat"
          vendor="DeepSeek"
          initialStep={2}
          inline
        />
      </div>

      {/* Variant B — Step 4 */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: -28,
            left: 0,
            fontFamily: "'Sora', sans-serif",
            fontSize: 11,
            color: "#AEB3BD",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Variant B — Step 4: Confirm
        </span>
        <GovernanceModal
          onClose={() => {}}
          toolName="DeepSeek Chat"
          vendor="DeepSeek"
          initialStep={3}
          inline
        />
      </div>
    </div>
  );
}