import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Server-side diagnostic
if (typeof window === "undefined") {
  console.log("[Firebase Init] Initializing on Server...");
  console.log("[Firebase Init] Project ID:", firebaseConfig.projectId ? "FOUND" : "MISSING");
  console.log("[Firebase Init] API Key:", firebaseConfig.apiKey ? "FOUND" : "MISSING");
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app, "moonraker-client-hq");
const auth = getAuth(app);

export { app, db, auth };
