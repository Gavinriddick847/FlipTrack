import React, { useEffect } from "react";

const s = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)",
    zIndex: 300, display: "flex", alignItems: "flex-end",
    justifyContent: "center", animation: "fadeUp .2s ease",
  },
  modal: {
    background: "var(--navy-800)", border: "1px solid var(--border)",
    borderRadius: "20px 20px 0 0", padding: "24px 20px",
    width: "100%", maxWidth: 500, maxHeight: "88vh",
    overflowY: "auto", animation: "slideIn .25s ease",
  },
  title: { fontSize: 17, fontWeight: 600, marginBottom: 4 },
  sub:   { fontSize: 12, color: "var(--text-muted)", marginBottom: 20 },
  group: { marginBottom: 14 },
  label: {
    display: "block", fontSize: 11, color: "var(--text-muted)",
    fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 6,
  },
  input: {
    width: "100%", background: "var(--navy-600)",
    border: "1px solid var(--border)", borderRadius: 9,
    padding: "10px 12px", color: "var(--text-primary)",
    fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none",
  },
  row:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  actions: { display: "flex", gap: 10, marginTop: 20 },
  cancel: {
    background: "var(--navy-600)", border: "1px solid var(--border)",
    borderRadius: 9, padding: "10px 16px", color: "var(--text-secondary)",
    fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
  },
  save: {
    flex: 1, background: "linear-gradient(135deg, var(--teal), #00a896)",
    border: "none", borderRadius: 9, padding: "10px 16px",
    color: "#08131f", fontSize: 14, fontWeight: 600,
    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
  },
  promoteBadge: {
    background: "var(--teal-dim)", border: "1px solid var(--border-teal)",
    borderRadius: 9, padding: "8px 12px", marginBottom: 16,
    fontSize: 12, color: "var(--teal)", display: "flex",
    alignItems: "center", gap: 8,
  },
  feePreview: {
    fontSize: 12, color: "var(--text-muted)",
    fontFamily: "'DM Mono', monospace", minHeight: 18,
    marginTop: -6, marginBottom: 10,
  },
};

export function Modal({ onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>{children}</div>
    </div>
  );
}

export { s as ms };
