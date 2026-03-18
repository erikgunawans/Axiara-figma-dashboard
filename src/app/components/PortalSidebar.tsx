import { Layers, PlusCircle, Bot, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const navItems = [
  { icon: Layers, label: "Catalog" },
  { icon: PlusCircle, label: "Request a Tool" },
  { icon: Bot, label: "My AI" },
];

export function PortalSidebar({ activeNav = 0 }: { activeNav?: number }) {
  const [activeIndex, setActiveIndex] = useState(activeNav);
  const navigate = useNavigate();

  const handleNavClick = (i: number) => {
    setActiveIndex(i);
    if (i === 0) navigate("/portal");
    if (i === 1) navigate("/portal/request");
    if (i === 2) navigate("/portal/my-ai");
  };

  return (
    <aside
      className="fixed left-0 top-0 flex flex-col"
      style={{
        width: 236,
        height: 800,
        background: "#0E0E0E",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-[10px]"
        style={{ minHeight: 60, padding: "18px 22px" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, #E24C4A, #386BB7)",
          }}
        >
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 15,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            A
          </span>
        </div>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, letterSpacing: "-0.05em" }}>
          <span style={{ color: "#F5F5F5" }}>axiara</span>
          <span style={{ color: "#F14F44" }}>.ai</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col" style={{ padding: "10px 6px", gap: 1 }}>
        {navItems.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(i)}
              className="flex items-center gap-[10px] w-full text-left cursor-pointer"
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                background: isActive ? "rgba(241,79,68,0.1)" : "transparent",
                transition: "background 0.15s",
              }}
            >
              <item.icon
                size={18}
                strokeWidth={1.8}
                style={{ color: isActive ? "#F14F44" : "#AEB3BD", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#F14F44" : "#AEB3BD",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Back to Admin */}
      <div style={{ margin: "0 6px 8px" }}>
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          style={{
            padding: "9px 16px",
            borderRadius: 8,
            border: "1px solid #F14F44",
            background: "transparent",
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            color: "#F14F44",
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.8} />
          Back to Admin
        </button>
      </div>

      {/* Collapse */}
      <div
        className="flex items-center justify-center cursor-pointer"
        style={{
          padding: 10,
          borderTop: "0.5px solid rgba(63,63,63,0.4)",
          fontFamily: "'Manrope', sans-serif",
          fontSize: 11,
          color: "#AEB3BD",
        }}
      >
        ◂ Collapse
      </div>
    </aside>
  );
}