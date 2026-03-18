import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { SkeletonLoadingState, EmptyState, ErrorState } from "../components/StateVariants";

const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

export function StateVariantsPage() {
  return (
    <div
      className="flex"
      style={{
        width: "100vw",
        minWidth: 1440,
        minHeight: 900,
        background: "#0A0A0A",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <Sidebar activeNav="Overview" />
      <div className="flex flex-col" style={{ flex: 1, minWidth: 0 }}>
        <TopBar title="State Variants" />

        <main
          style={{
            flex: 1,
            padding: "20px 28px 28px",
            overflowY: "auto",
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          {/* Variant 1 — Skeleton */}
          <section style={{ flex: 1.4, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <VariantLabel label="Variant 1" sublabel="Skeleton Loading" />
            <div
              style={{
                background: "rgba(18,18,18,0.65)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(63,63,63,0.4)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <SkeletonLoadingState />
            </div>
          </section>

          {/* Variant 2 — Empty */}
          <section style={{ flex: 0.8, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <VariantLabel label="Variant 2" sublabel="Empty State" />
            <div
              style={{
                background: "rgba(18,18,18,0.65)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(63,63,63,0.4)",
                borderRadius: 16,
                padding: 0,
              }}
            >
              <EmptyState />
            </div>
          </section>

          {/* Variant 3 — Error */}
          <section style={{ flex: 0.8, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <VariantLabel label="Variant 3" sublabel="Error State" />
            <div
              style={{
                background: "rgba(18,18,18,0.65)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(63,63,63,0.4)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <ErrorState />
            </div>
          </section>
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

function VariantLabel({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      <span
        style={{
          fontFamily: sora,
          fontSize: 11,
          color: "#F14F44",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: manrope, fontSize: 12, color: "#AEB3BD" }}>
        {sublabel}
      </span>
    </div>
  );
}