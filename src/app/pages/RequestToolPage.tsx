import { useNavigate } from "react-router";
import { PortalSidebar } from "../components/PortalSidebar";
import { PortalTopBar } from "../components/PortalTopBar";
import { RequestToolContent } from "../components/RequestToolContent";
import { useApp } from "../components/AppContext";

export function RequestToolPage() {
  const navigate = useNavigate();
  const { t } = useApp();

  const handleTabChange = (tab: number) => {
    if (tab === 0) navigate("/portal");
    if (tab === 2) navigate("/portal/my-ai");
  };

  return (
    <div
      className="flex"
      style={{
        width: "100vw",
        minWidth: 1440,
        height: "100vh",
        minHeight: 800,
        background: t.bg,
        fontFamily: "'Manrope', sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>

      <PortalSidebar activeNav={1} />

      <div className="flex flex-col flex-1" style={{ marginLeft: 236 }}>
        <PortalTopBar />
        <main className="flex-1" style={{ padding: 28, background: t.bg, overflowY: "auto" }}>
          <RequestToolContent onTabChange={handleTabChange} />
        </main>
      </div>
    </div>
  );
}