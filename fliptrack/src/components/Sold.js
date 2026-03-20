import React from "react";
import { Pill, SectionHeader, Empty } from "./UI";
import { fmtMoney } from "../utils";

function SoldCard({ item, delay }) {
  const profit = item.price - item.cost - (item.fees || 0);
  const roi    = item.cost > 0 ? ((profit / item.cost) * 100).toFixed(1) : "0.0";

  return (
    <div style={{
      background: "var(--navy-700)", border: "1px solid var(--border)",
      borderRadius: 13, padding: "14px 16px", marginBottom: 10,
      animation: `fadeUp .35s ease ${delay}s both`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{item.name}</div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{item.id} · {item.date}</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
          {fmtMoney(item.price)}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        <Pill type="cat">{item.cat}</Pill>
        <Pill type="platform">{item.platform}</Pill>
        <Pill type="sold">● sold</Pill>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, marginTop: 8, borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          Cost {fmtMoney(item.cost)} · Fee {fmtMoney(item.fees || 0)} · ROI {roi}%
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: profit >= 0 ? "var(--green)" : "var(--red)" }}>
          {profit >= 0 ? "+" : "-"}{fmtMoney(profit)}
        </span>
      </div>
    </div>
  );
}

export default function Sold({ sold }) {
  const totalNet = sold.reduce((s, i) => s + (i.price - i.cost - (i.fees || 0)), 0);

  return (
    <div>
      <SectionHeader
        title="Sold Items"
        right={
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, color: "var(--green)" }}>
            {fmtMoney(totalNet)} net
          </div>
        }
      />
      {sold.length === 0
        ? <Empty icon="✅" text="No sold items" sub="Mark listings as sold to track profit" />
        : sold.map((s, i) => <SoldCard key={s.id} item={s} delay={i * 0.05} />)
      }
    </div>
  );
}
