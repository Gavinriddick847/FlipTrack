import React, { useState } from "react";
import { Modal, ms } from "./Modal";
import { PLATFORMS, calcFee, fmtMoney, genId, today } from "../utils";

export default function SoldModal({ listing, onSave, onClose }) {
  const [price,    setPrice]    = useState(String(listing.price));
  const [platform, setPlatform] = useState(listing.platform);

  const p   = parseFloat(price) || 0;
  const fee = calcFee(platform, p);
  const net = p - listing.cost - fee;

  function save() {
    onSave({
      id:       genId("S"),
      name:     listing.name,
      cat:      listing.cat,
      cost:     listing.cost,
      price:    p,
      platform,
      date:     today(),
      fees:     fee,
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div style={ms.title}>Mark as Sold</div>
      <div style={ms.sub}>Confirm the sale details for {listing.name}</div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>FINAL SALE PRICE</label>
          <input style={ms.input} type="number" step="0.01"
            value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>PLATFORM</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {PLATFORMS.map((pl) => <option key={pl}>{pl}</option>)}
          </select>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: -4, marginBottom: 14 }}>
        ~{fmtMoney(fee)} platform fee · net{" "}
        <span style={{ color: net >= 0 ? "var(--green)" : "var(--red)" }}>{fmtMoney(net)}</span>
      </div>

      <div style={ms.actions}>
        <button style={ms.cancel} onClick={onClose}>Cancel</button>
        <button style={ms.save} onClick={save}>Confirm Sale</button>
      </div>
    </Modal>
  );
}
