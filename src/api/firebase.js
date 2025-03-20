import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'

// Your Firebase config
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app)

export { database, auth };