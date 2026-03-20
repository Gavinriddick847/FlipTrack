import React, { useState, useEffect, useCallback } from "react";
import {
  collection, onSnapshot, addDoc, deleteDoc,
  doc, updateDoc, query, orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

import Dashboard   from "./components/Dashboard";
import Finds       from "./components/Finds";
import Listings    from "./components/Listings";
import Sold        from "./components/Sold";
import FindModal   from "./components/FindModal";
import ListingModal from "./components/ListingModal";
import SoldModal   from "./components/SoldModal";
import { Spinner } from "./components/UI";
import { calcFee } from "./utils";

// ─── Firestore collection refs ─────────────────────────────
const COL = {
  finds:    collection(db, "finds"),
  listings: collection(db, "listings"),
  sold:     collection(db, "sold"),
  revenue:  collection(db, "revenue"),
};

function useCollection(col) {
  const [data, setData]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(col, (snap) => {
      setData(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
      setLoading(false);
    });
    return unsub;
  }, []); // eslint-disable-line

  return [data, loading];
}

// ─── Styles ────────────────────────────────────────────────
const S = {
  app:  { display: "flex", flexDirection: "column", minHeight: "100vh" },
  nav: {
    background: "rgba(8,13,26,0.92)", backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)", padding: "14px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 200,
  },
  navLogo:  { display: "flex", alignItems: "center", gap: 10 },
  navIcon: {
    width: 34, height: 34, background: "linear-gradient(135deg, var(--teal), #00a896)",
    borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, flexShrink: 0,
  },
  navTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: ".5px", color: "#fff" },
  liveBadge: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" },
  liveDot: { width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s ease infinite" },
  tabs: {
    display: "flex", background: "var(--navy-800)",
    borderBottom: "1px solid var(--border)", padding: "0 16px", gap: 4, overflowX: "auto",
  },
  content: { flex: 1, padding: "20px 16px", maxWidth: 680, margin: "0 auto", width: "100%" },
};

function Tab({ label, count, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: "12px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer",
      color: active ? "var(--teal)" : "var(--text-muted)",
      borderBottom: `2px solid ${active ? "var(--teal)" : "transparent"}`,
      transition: "all .2s", whiteSpace: "nowrap", userSelect: "none",
    }}>
      {label}
      {count != null && (
        <span style={{
          background: "var(--teal-dim)", color: "var(--teal)",
          borderRadius: 10, padding: "1px 7px",
          fontSize: 10, fontFamily: "'DM Mono', monospace", marginLeft: 5,
        }}>{count}</span>
      )}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");

  const [finds,    findsLoading]    = useCollection(COL.finds);
  const [listings, listingsLoading] = useCollection(COL.listings);
  const [sold,     soldLoading]     = useCollection(COL.sold);
  const [revenue,  revenueLoading]  = useCollection(COL.revenue);

  // Modal state
  const [showFindModal,    setShowFindModal]    = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [listingPrefill,   setListingPrefill]   = useState({});
  const [soldTarget,       setSoldTarget]       = useState(null);

  const loading = findsLoading || listingsLoading || soldLoading || revenueLoading;

  // ── FINDS ──────────────────────────────────────────────
  const addFind = useCallback(async (find) => {
    await addDoc(COL.finds, find);
  }, []);

  const deleteFind = useCallback(async (id) => {
    const item = finds.find((f) => f.id === id);
    if (item) await deleteDoc(doc(db, "finds", item._docId));
  }, [finds]);

  // ── LISTINGS ───────────────────────────────────────────
  const addListing = useCallback(async (listing) => {
    const { _findId, ...rest } = listing;
    await addDoc(COL.listings, rest);
    // Remove find if this was a promotion
    if (_findId) {
      const find = finds.find((f) => f.id === _findId);
      if (find) await deleteDoc(doc(db, "finds", find._docId));
    }
    setTab("listings");
  }, [finds]);

  const deleteListing = useCallback(async (id) => {
    const item = listings.find((l) => l.id === id);
    if (item) await deleteDoc(doc(db, "listings", item._docId));
  }, [listings]);

  // ── SOLD ───────────────────────────────────────────────
  const markSold = useCallback(async (soldItem) => {
    const listing = listings.find((l) => l.id === soldTarget?.id);
    if (!listing) return;

    // Add to sold collection
    await addDoc(COL.sold, soldItem);

    // Remove from listings
    await deleteDoc(doc(db, "listings", listing._docId));

    // Update monthly revenue bucket
    const curMonth = new Date().toLocaleString("default", { month: "short" });
    const existing = revenue.find((r) => r.month === curMonth);
    if (existing) {
      await updateDoc(doc(db, "revenue", existing._docId), { val: existing.val + soldItem.price });
    } else {
      await addDoc(COL.revenue, { month: curMonth, val: soldItem.price });
    }

    setSoldTarget(null);
    setTab("sold");
  }, [listings, revenue, soldTarget]);

  // ── PROMOTE handler ────────────────────────────────────
  function handlePromote(find) {
    setListingPrefill({ name: find.name, cat: find.cat, cost: find.cost, _fromFind: true, _findId: find.id });
    setShowListingModal(true);
  }

  // Sort revenue by approximate month order
  const sortedRevenue = [...revenue].sort((a, b) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return (
    <div style={S.app}>
      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navLogo}>
          <div style={S.navIcon}>↗</div>
          <div style={S.navTitle}>
            FLIP<span style={{ color: "var(--teal)" }}>TRACK</span>
          </div>
        </div>
        <div style={S.liveBadge}>
          <span style={S.liveDot} />
          LIVE
        </div>
      </nav>

      {/* TABS */}
      <div style={S.tabs}>
        <Tab label="Dashboard" active={tab === "dashboard"} onClick={() => setTab("dashboard")} />
        <Tab label="Finds"    count={finds.length}    active={tab === "finds"}    onClick={() => setTab("finds")} />
        <Tab label="Listings" count={listings.length} active={tab === "listings"} onClick={() => setTab("listings")} />
        <Tab label="Sold"     count={sold.length}     active={tab === "sold"}     onClick={() => setTab("sold")} />
      </div>

      {/* CONTENT */}
      <div style={S.content}>
        {loading ? <Spinner /> : (
          <>
            {tab === "dashboard" && (
              <Dashboard finds={finds} listings={listings} sold={sold} revenue={sortedRevenue} />
            )}
            {tab === "finds" && (
              <Finds
                finds={finds}
                onAddFind={() => setShowFindModal(true)}
                onPromote={handlePromote}
                onDelete={deleteFind}
              />
            )}
            {tab === "listings" && (
              <Listings
                listings={listings}
                onAddListing={() => { setListingPrefill({}); setShowListingModal(true); }}
                onMarkSold={(l) => setSoldTarget(l)}
                onDelete={deleteListing}
              />
            )}
            {tab === "sold" && <Sold sold={sold} />}
          </>
        )}
      </div>

      {/* MODALS */}
      {showFindModal && (
        <FindModal onSave={addFind} onClose={() => setShowFindModal(false)} />
      )}
      {showListingModal && (
        <ListingModal
          prefill={listingPrefill}
          onSave={addListing}
          onClose={() => { setShowListingModal(false); setListingPrefill({}); }}
        />
      )}
      {soldTarget && (
        <SoldModal
          listing={soldTarget}
          onSave={markSold}
          onClose={() => setSoldTarget(null)}
        />
      )}
    </div>
  );
}
