import React from "react";
import { Pill, SectionHeader, BtnPrimary, BtnTealOutline, BtnDanger, BtnEdit, Empty } from "./UI";
import { fmtMoney } from "../utils";

function ListingCard({ listing, onMarkSold, onEdit, onDelete, delay }) {
  const shipping = listing.shipping || 0;
  const fees     = listing.fees     || 0;
  const net      = listing.price - listing.cost - shipping - fees;

  return (
    <div style={{
      background: "var(--navy-700)", border: "1px solid var(--border)",
      borderRadius: 13, padding: "14px 16px", marginBottom: 10,
      animation: `fadeUp .35s ease ${delay}s both`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{listing.name}</div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{listing.id} · {listing.date}</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
          {fmtMoney(listing.price)}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        <Pill type="cat">{listing.cat}</Pill>
        <Pill type="platform">{listing.platform}</Pill>
        <Pill type="active">● active</Pill>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, marginTop: 8, borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          Cost {fmtMoney(listing.cost)}
          {shipping > 0 && <> · Ship {fmtMoney(shipping)}</>}
          {fees > 0     && <> · Fees {fmtMoney(fees)}</>}
        </span>
        <span style={{ fontSize: 13, color: net >= 0 ? "var(--green)" : "var(--red)" }}>
          {fees > 0 || shipping > 0 ? `Net ${fmtMoney(net)}` : "No fees entered"}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        <BtnTealOutline onClick={onMarkSold}>Mark Sold</BtnTealOutline>
        <BtnEdit onClick={onEdit}>Edit</BtnEdit>
        <BtnDanger onClick={onDelete}>Remove</BtnDanger>
      </div>
    </div>
  );
}

export default function Listings({ listings, onAddListing, onMarkSold, onEdit, onDelete }) {
  return (
    <div>
      <SectionHeader
        title="Active Listings"
        right={<BtnPrimary onClick={onAddListing}>+ New Listing</BtnPrimary>}
      />
      {listings.length === 0
        ? <Empty icon="🏷️" text="No active listings" sub="Add a listing or promote a find" />
        : listings.map((l, i) => (
            <ListingCard
              key={l.id} listing={l} delay={i * 0.05}
              onMarkSold={() => onMarkSold(l)}
              onEdit={() => onEdit(l)}
              onDelete={() => onDelete(l.id)}
            />
          ))
      }
    </div>
  );
}
