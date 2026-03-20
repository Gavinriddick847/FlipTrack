# FlipTrack — Setup & Deployment Guide

A mobile-first flipping tracker. Free to host on Vercel + Firebase.

---

## 1. Firebase Setup (free Spark plan)

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `fliptrack` → disable Google Analytics (optional) → **Create project**
3. In the left sidebar click **Firestore Database** → **Create database**
   - Choose **Start in test mode** (gives you open read/write for 30 days — you can lock it down later)
   - Pick any region → **Enable**
4. In the left sidebar click **Project settings** (gear icon, top left)
5. Scroll down to **Your apps** → click the **</>** (Web) icon
6. Register the app (name it anything, skip Firebase Hosting) → **Register app**
7. Copy the `firebaseConfig` object shown — it looks like:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "fliptrack-xxxxx.firebaseapp.com",
     projectId: "fliptrack-xxxxx",
     storageBucket: "fliptrack-xxxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
8. Open `src/firebase.js` in this project and **replace the placeholder values** with your copied config.

---

## 2. Push to GitHub

1. Create a free account at https://github.com if you don't have one
2. Create a **new repository** (name it `fliptrack`, set to Private)
3. In your project folder run:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fliptrack.git
   git push -u origin main
   ```

---

## 3. Deploy to Vercel (free)

1. Go to https://vercel.com → sign up with your GitHub account
2. Click **Add New Project** → select your `fliptrack` repo → **Import**
3. Framework preset will auto-detect as **Create React App** — leave all settings as-is
4. Click **Deploy**
5. In ~2 minutes you'll get a live URL like `fliptrack-abc123.vercel.app`

That's it. Every time you push to GitHub, Vercel auto-redeploys.

---

## 4. Bookmark as a Home Screen App (feels native)

### iPhone (Safari):
- Open your Vercel URL in Safari
- Tap the **Share** button → **Add to Home Screen**
- It will open full screen with no browser chrome

### Android (Chrome):
- Open your Vercel URL in Chrome
- Tap the three-dot menu → **Add to Home Screen**

---

## 5. Lock down Firestore (optional, after 30 days)

When your test mode expires, update Firestore rules at
https://console.firebase.google.com → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // single-user, no auth needed
    }
  }
}
```

This keeps it open for you alone since no one else knows your project ID.
For extra security later you can add Firebase Auth.

---

## Local Development

```bash
npm install
npm start
```

Opens at http://localhost:3000
