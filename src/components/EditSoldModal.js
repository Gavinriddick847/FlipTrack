import React, { useState } from "react";
import { Modal, ms } from "./Modal";
import { CATEGORIES, PLATFORMS, fmtMoney } from "../utils";

export default function EditSoldModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     item.name     || "",
    price:    String(item.price    ?? ""),
    cost:     String(item.cost     ?? ""),
    shipping: String(item.shipping ?? ""),
    fees:     String(item.fees     ?? ""),
    cat:      item.cat      || "Electronics",
    platform: item.platform || "eBay",
    date:     item.date     || "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const price    = parseFloat(form.price)    || 0;
  const cost     = parseFloat(form.cost)     || 0;
  const shipping = parseFloat(form.shipping) || 0;
  const fees     = parseFloat(form.fees)     || 0;
  const net      = price - cost - shipping - fees;

  function save() {
    if (!form.name.trim() || !price) return;
    onSave({
      ...item,
      name:     form.name.trim(),
      price,
      cost,
      shipping,
      fees,
      cat:      form.cat,
      platform: form.platform,
      date:     form.date,
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div style={ms.title}>Edit Sold Item</div>
      <div style={ms.sub}>Update details for {item.name}</div>

      <div style={ms.group}>
        <label style={ms.label}>ITEM NAME</label>
        <input style={ms.input} value={form.name}
          onChange={(e) => set("name", e.target.value)} />
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>SALE PRICE</label>
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

      <div style={ms.group}>
        <label style={ms.label}>SALE DATE</label>
        <input style={ms.input} type="date" value={form.date}
          onChange={(e) => set("date", e.target.value)} />
      </div>

      {price > 0 && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: -4, marginBottom: 10 }}>
          Net{" "}
          <span style={{ color: net >= 0 ? "var(--green)" : "var(--red)" }}>{fmtMoney(net)}</span>
        </div>
      )}

      <div style={ms.actions}>
        <button style={ms.cancel} onClick={onClose}>Cancel</button>
        <button style={ms.save} onClick={save}>Save Changes</button>
      </div>
    </Modal>
  );
}
