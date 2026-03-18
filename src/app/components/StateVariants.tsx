const sora = "'Sora', sans-serif";
const manrope = "'Manrope', sans-serif";

const shimmerBg = "linear-gradient(90deg, #1E1E1E 25%, #2A2A2A 50%, #1E1E1E 75%)";
const shimmerStyle = (w: number | string, h: number): React.CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 6,
  background: shimmerBg,
  backgroundSize: "200% 100%",
  animation: "shimmer 1.8s ease-in-out infinite",
});

/* ── Variant 1: Skeleton ── */
export function SkeletonLoadingState() {
  return (
    <div style={{ width: "100%" }}>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: "#121212",
              border: "0.5px solid #3F3F3F",
              borderRadius: 14,
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={shimmerStyle("60%", 10)} />
            <div style={shimmerStyle("40%", 32)} />
            <div style={shimmerStyle("50%", 10)} />
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            background: "#1E1E1E",
            display: "flex",
            alignItems: "center",
            padding: "11px 14px",
            gap: 14,
          }}
        >
          {[120, 140, 100, 80, 110].map((w, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={shimmerStyle(w, 10)} />
            </div>
          ))}
        </div>
        {/* Rows */}
        {[0, 1, 2, 3, 4].map((r) => (
          <div
            key={r}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "11px 14px",
              gap: 14,
              borderTop: "0.5px solid #2A2A2A",
            }}
          >
            {[100, 140, 70, 60, 120, 90].map((w, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={shimmerStyle(w, 12)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Variant 2: Empty ── */
export function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px",
        width: "100%",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: "rgba(241,79,68,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="#AEB3BD" strokeWidth="1.5" />
          <circle cx="10.5" cy="12" r="1" fill="#AEB3BD" />
          <circle cx="17.5" cy="12" r="1" fill="#AEB3BD" />
          <path d="M10 18.5C10.8 17.3 12.3 16.5 14 16.5C15.7 16.5 17.2 17.3 18 18.5" stroke="#AEB3BD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ fontFamily: sora, fontSize: 16, color: "#F5F5F5", marginTop: 16, marginBottom: 6 }}>
        No results found
      </div>
      <div
        style={{
          fontFamily: manrope,
          fontSize: 13,
          color: "#AEB3BD",
          lineHeight: 1.6,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        Try adjusting your search criteria or clearing filters.
      </div>
      <button
        className="cursor-pointer"
        style={{
          background: "none",
          border: "none",
          fontFamily: manrope,
          fontSize: 13,
          fontWeight: 600,
          color: "#F14F44",
          textDecoration: "underline",
          marginTop: 12,
        }}
      >
        Clear all filters
      </button>
    </div>
  );
}

/* ── Variant 3: Error ── */
export function ErrorState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 24px",
        border: "1px solid rgba(241,79,68,0.3)",
        borderRadius: 14,
        background: "rgba(241,79,68,0.06)",
        width: "100%",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "rgba(241,79,68,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9.5" stroke="#F14F44" strokeWidth="1.5" />
          <line x1="11" y1="7" x2="11" y2="12.5" stroke="#F14F44" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="11" cy="15.5" r="0.9" fill="#F14F44" />
        </svg>
      </div>

      <div style={{ fontFamily: sora, fontSize: 15, color: "#F5F5F5", marginTop: 14 }}>
        Something went wrong
      </div>
      <div
        style={{
          fontFamily: manrope,
          fontSize: 12,
          color: "#AEB3BD",
          maxWidth: 360,
          textAlign: "center",
          marginTop: 6,
        }}
      >
        Unable to load data. This may be a temporary issue.
      </div>
      <button
        className="cursor-pointer"
        style={{
          background: "#F14F44",
          border: "none",
          fontFamily: manrope,
          fontSize: 11,
          color: "#fff",
          borderRadius: 999,
          padding: "7px 22px",
          marginTop: 14,
        }}
      >
        Retry
      </button>
    </div>
  );
}