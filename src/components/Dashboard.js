import React, { useEffect, useRef } from "react";
import { StatCard } from "./UI";
import { fmtMoney, fmtPct, calcFee } from "../utils";

function RevenueChart({ revenue }) {
  const max = Math.max(...revenue.map((r) => r.val), 1);
  return (
    <div style={{
      background: "var(--navy-700)", border: "1px solid var(--border)",
      borderRadius: 14, padding: 18, marginBottom: 20,
      animation: "fadeUp .4s ease .1s both",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>Monthly Revenue</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>last {revenue.length} months</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: "var(--teal)", textAlign: "right" }}>
          {fmtMoney(revenue[revenue.length - 1]?.val || 0)}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, marginBottom: 4 }}>
        {revenue.map((r, i) => {
          const pct = (r.val / max) * 100;
          const isLast = i === revenue.length - 1;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end" }}>
              <div style={{
                width: "100%", borderRadius: "4px 4px 0 0",
                background: isLast ? "linear-gradient(180deg, var(--teal), #00a896)" : "rgba(255,255,255,0.12)",
                height: `${Math.max(pct, 3)}%`,
                transition: "height .8s cubic-bezier(.34,1.56,.64,1)",
              }} />
              <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{r.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard({ finds, listings, sold, revenue }) {
  const gross  = sold.reduce((s, i) => s + i.price, 0);
  const cost   = sold.reduce((s, i) => s + i.cost, 0);
  const fees   = sold.reduce((s, i) => s + (i.fees || 0), 0);
  const net    = gross - cost - fees;
  const rois   = sold.map((i) => (i.price - i.cost - (i.fees || 0)) / i.cost * 100);
  const avgROI = rois.length ? rois.reduce((a, b) => a + b, 0) / rois.length : 0;
  const activeCost = listings.reduce((s, i) => s + i.cost, 0);
  const findCost   = finds.reduce((s, i) => s + i.cost, 0);
  const invested   = activeCost + findCost;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatCard label="NET PROFIT"     value={`${net < 0 ? "-" : ""}${fmtMoney(net)}`}   sub="after fees & costs"   color={net >= 0 ? "var(--teal)" : "var(--red)"}  accent delay={0} />
        <StatCard label="GROSS REV"      value={fmtMoney(gross)}     sub={`${sold.length} items sold`}   delay={0.05} />
        <StatCard label="TOTAL INVESTED" value={fmtMoney(invested)}  sub="active + finds"               color="var(--amber)" delay={0.1} />
        <StatCard label="AVG ROI"        value={fmtPct(avgROI)}      sub="per sold item"                color={avgROI >= 0 ? "var(--green)" : "var(--red)"} delay={0.15} />
      </div>

      {revenue.length > 0 && <RevenueChart revenue={revenue} />}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <StatCard label="COGS (SOLD)"      value={fmtMoney(cost)}           sub="cost of goods sold"    color="var(--red)"   delay={0.2} />
        <StatCard label="PLATFORM FEES"    value={fmtMoney(fees)}           sub="all platforms"         color="var(--red)"   delay={0.25} />
        <StatCard label="ACTIVE LISTINGS"  value={String(listings.length)}  sub={`${fmtMoney(activeCost)} invested`}          delay={0.3} />
        <StatCard label="FINDS BANKED"     value={String(finds.length)}     sub={`${fmtMoney(findCost)} in stock`}            delay={0.35} />
      </div>
    </div>
  );
}
