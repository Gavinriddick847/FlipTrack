import React from "react";
import { Pill, SectionHeader, BtnPrimary, BtnTealOutline, BtnDanger, Empty } from "./UI";
import { fmtMoney } from "../utils";

function FindCard({ find, onPromote, onDelete, delay }) {
  return (
    <div style={{
      background: "var(--navy-700)", border: "1px solid var(--border)",
      borderRadius: 13, padding: "14px 16px", marginBottom: 10,
      animation: `fadeUp .35s ease ${delay}s both`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3 }}>{find.name}</div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{find.id} · {find.date}</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: "var(--red)", whiteSpace: "nowrap" }}>
          {fmtMoney(find.cost)}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10, alignItems: "center" }}>
        <Pill type="cat">{find.cat}</Pill>
        <Pill type="find">● find</Pill>
        {find.notes && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{find.notes}</span>}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        <BtnTealOutline onClick={onPromote}>→ List This</BtnTealOutline>
        <BtnDanger onClick={onDelete}>Remove</BtnDanger>
      </div>
    </div>
  );
}

export default function Finds({ finds, onAddFind, onPromote, onDelete }) {
  return (
    <div>
      <SectionHeader
        title="Finds"
        right={<BtnPrimary onClick={onAddFind}>+ Add Find</BtnPrimary>}
      />
      {finds.length === 0
        ? <Empty icon="🔍" text="No finds yet" sub="Add items you've sourced and plan to flip" />
        : finds.map((f, i) => (
            <FindCard
              key={f.id} find={f} delay={i * 0.05}
              onPromote={() => onPromote(f)}
              onDelete={() => onDelete(f.id)}
            />
          ))
      }
    </div>
  );
}
