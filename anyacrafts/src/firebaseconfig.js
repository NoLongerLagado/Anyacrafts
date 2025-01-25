// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyB-CUWSirtX8mYiN5Vnnw1i6lE-2pR70zE",
  authDomain: "anyauserlogin.firebaseapp.com",
  databaseURL: "https://anyauserlogin-default-rtdb.firebaseio.com",
  projectId: "anyauserlogin",  // Keep this the same for now
  storageBucket: "anyauserlogin.appspot.com",
  messagingSenderId: "517177106831",
  appId: "1:517177106831:web:30277b80f7059b4eedebfa",
  measurementId: "G-QGL1QPJHQJ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Add Firestore initialization

// Other Firebase services
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, database, auth, db };  // Export Firestore as well
