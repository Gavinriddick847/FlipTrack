import React, { useState } from "react";
import { Modal, ms } from "./Modal";
import { CATEGORIES, PLATFORMS, fmtMoney, genId, today } from "../utils";

export default function ListingModal({ prefill = {}, onSave, onClose }) {
  const isPromote = !!prefill._fromFind;
  const [form, setForm] = useState({
    name:     prefill.name     || "",
    price:    prefill.price    || "",
    cost:     prefill.cost     != null ? String(prefill.cost) : "",
    shipping: "",
    fees:     "",
    cat:      prefill.cat      || "Electronics",
    platform: prefill.platform || "eBay",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const price    = parseFloat(form.price)    || 0;
  const cost     = parseFloat(form.cost)     || 0;
  const shipping = parseFloat(form.shipping) || 0;
  const fees     = parseFloat(form.fees)     || 0;
  const estNet   = price - cost - shipping - fees;
  const showPrev = price > 0;

  function save() {
    if (!form.name.trim() || !price) return;
    onSave({
      id:       genId("L"),
      name:     form.name.trim(),
      price,
      cost,
      shipping,
      fees,
      cat:      form.cat,
      platform: form.platform,
      date:     today(),
      status:   "active",
      _findId:  prefill._findId || null,
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      {isPromote && (
        <div style={{
          background: "var(--teal-dim)", border: "1px solid var(--border-teal)",
          borderRadius: 9, padding: "8px 12px", marginBottom: 16,
          fontSize: 12, color: "var(--teal)", display: "flex", alignItems: "center", gap: 8,
        }}>
          ↗ Promoting find to listing — review &amp; confirm details
        </div>
      )}
      <div style={ms.title}>{isPromote ? "List This Find" : "New Listing"}</div>
      <div style={ms.sub}>{isPromote ? "Edit any details before listing" : "Add a new active listing"}</div>

      <div style={ms.group}>
        <label style={ms.label}>ITEM NAME</label>
        <input style={ms.input} placeholder="e.g. Sony WH-1000XM4"
          value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>LISTING PRICE</label>
          <input style={ms.input} type="number" placeholder="0.00" step="0.01"
            value={form.price} onChange={(e) => set("price", e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>COST PAID</label>
          <input style={ms.input} type="number" placeholder="0.00" step="0.01"
            value={form.cost} onChange={(e) => set("cost", e.target.value)} />
        </div>
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>SHIPPING COST</label>
          <input style={ms.input} type="number" placeholder="0.00" step="0.01"
            value={form.shipping} onChange={(e) => set("shipping", e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>PLATFORM FEES</label>
          <input style={ms.input} type="number" placeholder="0.00" step="0.01"
            value={form.fees} onChange={(e) => set("fees", e.target.value)} />
        </div>
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>CATEGORY</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={form.cat} onChange={(e) => set("cat", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={ms.group}>
          <label style={ms.label}>PLATFORM</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={form.platform} onChange={(e) => set("platform", e.target.value)}>
            {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {showPrev && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: -4, marginBottom: 10 }}>
          Est. net{" "}
          <span style={{ color: estNet >= 0 ? "var(--green)" : "var(--red)" }}>{fmtMoney(estNet)}</span>
          {(shipping > 0 || fees > 0) && (
            <span> · Ship {fmtMoney(shipping)} · Fees {fmtMoney(fees)}</span>
          )}
        </div>
      )}

      <div style={ms.actions}>
        <button style={ms.cancel} onClick={onClose}>Cancel</button>
        <button style={ms.save} onClick={save}>{isPromote ? "Promote to Listing" : "Save Listing"}</button>
      </div>
    </Modal>
  );
}
