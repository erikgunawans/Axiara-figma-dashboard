import { useNavigate } from "react-router";
import { PortalSidebar } from "../components/PortalSidebar";
import { PortalTopBar } from "../components/PortalTopBar";
import { ToolCatalog } from "../components/ToolCatalog";
import { useApp } from "../components/AppContext";

export function EmployeePortal() {
  const navigate = useNavigate();
  const { t, sidebarCollapsed } = useApp();
  const sidebarW = sidebarCollapsed ? 68 : 236;

  const handleTabChange = (tab: number) => {
    if (tab === 1) navigate("/portal/request");
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

      <PortalSidebar activeNav={0} />

      <div
        className="flex flex-col flex-1"
        style={{
          marginLeft: sidebarW,
          transition: "margin-left 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <PortalTopBar title="Approved AI Catalog" />
        <main className="flex-1" style={{ padding: 28, background: t.bg, overflowY: "auto" }}>
          <ToolCatalog onTabChange={handleTabChange} />
        </main>
      </div>
    </div>
  );
}
