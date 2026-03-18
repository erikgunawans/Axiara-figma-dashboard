import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useApp } from "./AppContext";

export function DashboardShell({
  children,
  activeNav = 0,
  title = "Overview",
}: {
  children: React.ReactNode;
  activeNav?: number;
  title?: string;
}) {
  const { sidebarCollapsed, t } = useApp();
  const sidebarW = sidebarCollapsed ? 68 : 236;

  return (
    <div
      className="flex"
      style={{
        width: "100vw",
        minWidth: 1440,
        height: "100vh",
        minHeight: 900,
        background: t.bg,
        fontFamily: "'Manrope', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes sparkPulse {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 4px currentColor; }
          50% { opacity: 1; box-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
        }
        @keyframes meshFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(1.03); }
          66% { transform: translate(20px, -15px) scale(0.98); }
        }
      `}</style>

      {/* Ambient mesh gradient — warm blob top-left */}
      <div
        style={{
          position: "fixed",
          top: -80, left: 180, width: 800, height: 600,
          background: "radial-gradient(ellipse at center, rgba(226,76,74,0.07) 0%, rgba(241,79,68,0.03) 30%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
          animation: "meshFloat 20s ease-in-out infinite",
          filter: "blur(40px)",
          opacity: t.meshOpacity,
        }}
      />

      {/* Ambient mesh gradient — cool blob bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: -120, right: -60, width: 700, height: 500,
          background: "radial-gradient(ellipse at center, rgba(56,107,183,0.06) 0%, rgba(56,107,183,0.02) 35%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
          animation: "meshFloat2 25s ease-in-out infinite",
          filter: "blur(50px)",
          opacity: t.meshOpacity,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "fixed", inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat", backgroundSize: "256px 256px",
          pointerEvents: "none", zIndex: 0,
          opacity: t.noiseOpacity,
        }}
      />

      <Sidebar activeNav={activeNav} />

      <div
        className="flex flex-col flex-1"
        style={{
          marginLeft: sidebarW,
          position: "relative", zIndex: 1,
          transition: "margin-left 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <TopBar title={title} />
        <main className="flex-1" style={{ padding: "28px 28px 40px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
