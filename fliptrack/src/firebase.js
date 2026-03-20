// src/firebase.js
// -----------------------------------------------------------
// STEP 1: Replace these placeholder values with your own
// Firebase project credentials (see setup guide).
// -----------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3b7VgGy028kP4jrMkACIfwKpSCWG8JHo",
  authDomain: "fliptrack-c38d9.firebaseapp.com",
  projectId: "fliptrack-c38d9",
  storageBucket: "fliptrack-c38d9.firebasestorage.app",
  messagingSenderId: "1071650838813",
  appId: "1:1071650838813:web:0d73da564b61b2315de9f4",
  measurementId: "G-LYJS998ZZ3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
