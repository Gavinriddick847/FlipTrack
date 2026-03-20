import React from "react";

export function Pill({ children, type = "cat" }) {
  const styles = {
    cat:      { background: "rgba(167,139,250,0.1)", color: "var(--purple)",  border: "1px solid rgba(167,139,250,0.2)" },
    platform: { background: "rgba(0,229,200,0.08)",  color: "var(--teal)",    border: "1px solid var(--border-teal)" },
    active:   { background: "rgba(34,211,122,0.1)",  color: "var(--green)",   border: "1px solid rgba(34,211,122,0.2)" },
    sold:     { background: "rgba(245,166,35,0.1)",  color: "var(--amber)",   border: "1px solid rgba(245,166,35,0.2)" },
    find:     { background: "rgba(0,229,200,0.1)",   color: "var(--teal)",    border: "1px solid var(--border-teal)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 9px", borderRadius: 20,
      fontSize: 11, fontFamily: "'DM Mono', monospace",
      ...styles[type],
    }}>
      {children}
    </span>
  );
}

export function StatCard({ label, value, sub, color, accent, delay = 0 }) {
  return (
    <div style={{
      background: accent
        ? "linear-gradient(135deg, var(--navy-700), rgba(0,229,200,0.05))"
        : "var(--navy-700)",
      border: `1px solid ${accent ? "var(--border-teal)" : "var(--border)"}`,
      borderRadius: 14, padding: 16,
      animation: `fadeUp .4s ease ${delay}s both`,
    }}>
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", letterSpacing: "1.5px", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1, color: color || "#fff" }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function SectionHeader({ title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</div>
      {right}
    </div>
  );
}

export function BtnPrimary({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: "linear-gradient(135deg, var(--teal), #00a896)", border: "none",
      borderRadius: 9, padding: "8px 16px", color: "#08131f",
      fontSize: 13, fontWeight: 600, cursor: "pointer",
      fontFamily: "'Outfit', sans-serif", ...style,
    }}>{children}</button>
  );
}

export function BtnTealOutline({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "var(--teal-dim)", border: "1px solid var(--border-teal)",
      borderRadius: 8, padding: "5px 11px", color: "var(--teal)",
      fontSize: 12, fontWeight: 500, cursor: "pointer",
      fontFamily: "'Outfit', sans-serif",
    }}>{children}</button>
  );
}

export function BtnEdit({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
      borderRadius: 8, padding: "5px 10px", color: "var(--text-secondary)",
      fontSize: 11, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
      transition: "all .2s",
    }}>{children}</button>
  );
}

export function BtnDanger({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "rgba(240,82,82,0.12)", border: "1px solid rgba(240,82,82,0.25)",
      borderRadius: 8, padding: "5px 10px", color: "var(--red)",
      fontSize: 11, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
    }}>{children}</button>
  );
}

export function Empty({ icon, text, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14, marginBottom: 4, color: "var(--text-secondary)" }}>{text}</div>
      <div style={{ fontSize: 12 }}>{sub}</div>
    </div>
  );
}

export function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)", fontSize: 13 }}>
      Loading…
    </div>
  );
}
