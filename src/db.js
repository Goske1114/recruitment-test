// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Authentication (v9+)
import { getDatabase } from 'firebase/database';
import admin from 'firebase-admin';

// Add your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyCDSEwxbJAdAmRlep9gIoggLfJFfh-zt44",
  authDomain: "based-on-firebase.firebaseapp.com",
  databaseURL: "https://based-on-firebase-default-rtdb.firebaseio.com",
  projectId: "based-on-firebase",
  storageBucket: "based-on-firebase.firebasestorage.app",
  messagingSenderId: "14881757925",
  appId: "1:14881757925:web:8c858fc25457e9f192120c",
  measurementId: "G-F9D4Q71Z0S"
};

// Initialize Firebase for the client-side (v9+)
const app = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK for server-side
if (admin.apps.length === 0) {
  admin.initializeApp(); // Only initialize once
}

// Get Firebase Auth and Firestore (for client-side)
const auth = getAuth(app);
const database = getDatabase(app);

// Get Admin Auth and Firestore (for server-side)
const adminAuth = admin.auth();

// Exporting for use in your app
export { auth, adminAuth, database };