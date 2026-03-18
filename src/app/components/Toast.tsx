import { useState, useEffect, useCallback } from "react";

const manrope = "'Manrope', sans-serif";

interface ToastData {
  id: number;
  message: string;
  auditId: string;
}

let toastIdCounter = 0;
let globalAddToast: ((t: Omit<ToastData, "id">) => void) | null = null;

export function showToast(message: string, auditId: string) {
  globalAddToast?.({ message, auditId });
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([
    { id: -1, message: "Decision recorded: ChatGPT → Restrict", auditId: "HITL-2026-0387" },
  ]);

  const addToast = useCallback((t: Omit<ToastData, "id">) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  useEffect(() => {
    globalAddToast = addToast;
    return () => { globalAddToast = null; };
  }, [addToast]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 24,
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    // Enter animation
    const enterTimer = setTimeout(() => setPhase("visible"), 10);
    // Start exit after 5s
    const exitTimer = setTimeout(() => setPhase("exit"), 5000);
    return () => { clearTimeout(enterTimer); clearTimeout(exitTimer); };
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(onDismiss, 320);
      return () => clearTimeout(t);
    }
  }, [phase, onDismiss]);

  const handleDismiss = () => setPhase("exit");

  return (
    <div
      style={{
        maxWidth: 360,
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        pointerEvents: "auto",
        opacity: phase === "enter" ? 0 : phase === "exit" ? 0 : 1,
        transform: phase === "enter" ? "translateX(24px)" : phase === "exit" ? "translateX(24px)" : "translateX(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Success icon */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          background: "rgba(46,204,113,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5L6.5 11.5L12.5 4.5"
            stroke="#2ECC71"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: manrope,
            fontSize: 13,
            fontWeight: 600,
            color: "#F5F5F5",
          }}
        >
          {toast.message}
        </div>
        <div
          style={{
            fontFamily: manrope,
            fontSize: 11,
            color: "#F14F44",
            marginTop: 2,
          }}
        >
          {toast.auditId}
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="cursor-pointer"
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          marginLeft: 8,
          color: "#AEB3BD",
          fontSize: 12,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}