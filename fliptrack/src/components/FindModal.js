import React, { useState } from "react";
import { Modal, ms } from "./Modal";
import { CATEGORIES, genId, today } from "../utils";

export default function FindModal({ onSave, onClose }) {
  const [form, setForm] = useState({ name: "", cost: "", cat: "Electronics", notes: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function save() {
    if (!form.name.trim()) return;
    onSave({
      id:    genId("F"),
      name:  form.name.trim(),
      cost:  parseFloat(form.cost) || 0,
      cat:   form.cat,
      notes: form.notes.trim(),
      date:  today(),
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div style={ms.title}>Log a Find</div>
      <div style={ms.sub}>Record something you've sourced</div>

      <div style={ms.group}>
        <label style={ms.label}>ITEM NAME</label>
        <input style={ms.input} placeholder="e.g. Vintage Starter Jacket"
          value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>

      <div style={ms.row}>
        <div style={ms.group}>
          <label style={ms.label}>PAID (COST)</label>
          <input style={ms.input} type="number" placeholder="0.00" step="0.01"
            value={form.cost} onChange={(e) => set("cost", e.target.value)} />
        </div>
        <div style={ms.group}>
          <label style={ms.label}>CATEGORY</label>
          <select style={{ ...ms.input, cursor: "pointer" }} value={form.cat} onChange={(e) => set("cat", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={ms.group}>
        <label style={ms.label}>NOTES</label>
        <input style={ms.input} placeholder="Condition, size, source…"
          value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </div>

      <div style={ms.actions}>
        <button style={ms.cancel} onClick={onClose}>Cancel</button>
        <button style={ms.save} onClick={save}>Save Find</button>
      </div>
    </Modal>
  );
}
