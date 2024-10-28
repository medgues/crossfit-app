import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAX4SD3aO-MgOXaMdEpxq-kWlqx9O4yrKA",
  authDomain: "dz-fit-games.firebaseapp.com",
  projectId: "dz-fit-games",
  storageBucket: "dz-fit-games.appspot.com",
  messagingSenderId: "9962282549",
  appId: "1:9962282549:web:7a0f32d14af5dc8a31db7c",
  databaseURL: "https://dz-fit-games-default-rtdb.firebaseio.com",
};

// Initialize Firebase only if it hasn't been initialized yet
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get a reference to the database service
const db = getFirestore(app);

export { db };
