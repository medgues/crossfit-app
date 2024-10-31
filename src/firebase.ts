import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
} from "./components/config/constants";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
};
// Initialize Firebase only if it hasn't been initialized yet
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get a reference to the database service
const db = getFirestore(app);

export { db };
