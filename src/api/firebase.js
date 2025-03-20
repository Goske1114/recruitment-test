// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Authentication (v9+)
import { getDatabase } from 'firebase/database';

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


// Get Firebase Auth and Firestore (for client-side)
const auth = getAuth(app);
const database = getDatabase(app);


// Exporting for use in your app
export { auth, database };