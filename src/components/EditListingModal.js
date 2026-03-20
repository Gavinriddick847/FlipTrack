import React, { useState } from "react";
import { Modal, ms } from "./Modal";
import { CATEGORIES, PLATFORMS, fmtMoney } from "../utils";

export default function EditListingModal({ listing, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     listing.name     || "",
    price:    String(listing.price    ?? ""),
    cost:     String(listing.cost     ?? ""),
    shipping: String(listing.shipping ?? ""),
    fees:     String(listing.fees     ?? ""),
    cat:      listing.cat      || "Electronics",
    platform: listing.platform || "eBay",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const price    = parseFloat(form.price)    || 0;
  const cost     = parseFloat(form.cost)     || 0;
  const shipping = parseFloat(form.shipping) || 0;
  const fees     = parseFloat(form.fees)     || 0;
  const estNet   = price - cost - shipping - fees;

  function save() {
    if (!form.name.trim() || !price) return;
    onSave({
      ...listing,
      name:     form.name.trim(),
      price,
      cost,
      shipping,
      fees,
      cat:      form.cat,
      platform: form.platform,
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div style={ms.title}>Edit Listing</div>
      <div style={ms.sub}>Update details for {listing.name}</div>

      <div style={ms.group}>
        <label style={ms.label}>ITEM NAME</label>
        <input style={ms.input} value={form.name}
          onChange={(e) => set("name", e.target.value)} />
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>LISTING PRICE</label>
          <input style={ms.input} type="number" step="0.01" value={form.price}
            onChange={(e) => set("price", e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>COST PAID</label>
          <input style={ms.input} type="number" step="0.01" value={form.cost}
            onChange={(e) => set("cost", e.target.value)} />
        </div>
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>SHIPPING COST</label>
          <input style={ms.input} type="number" step="0.01" value={form.shipping}
            onChange={(e) => set("shipping", e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>PLATFORM FEES</label>
          <input style={ms.input} type="number" step="0.01" value={form.fees}
            onChange={(e) => set("fees", e.target.value)} />
        </div>
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>CATEGORY</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={form.cat}
            onChange={(e) => set("cat", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={ms.group}>
          <label style={ms.label}>PLATFORM</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={form.platform}
            onChange={(e) => set("platform", e.target.value)}>
            {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {price > 0 && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: -4, marginBottom: 10 }}>
          Est. net{" "}
          <span style={{ color: estNet >= 0 ? "var(--green)" : "var(--red)" }}>{fmtMoney(estNet)}</span>
        </div>
      )}

      <div style={ms.actions}>
        <button style={ms.cancel} onClick={onClose}>Cancel</button>
        <button style={ms.save} onClick={save}>Save Changes</button>
      </div>
    </Modal>
  );
}
