// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3dyGM3n0p0FsMYhsUt_g8_bYLAZ7ekQM",
  authDomain: "mobil-1e9eb.firebaseapp.com",
  projectId: "mobil-1e9eb",
  storageBucket: "mobil-1e9eb.firebasestorage.app",
  messagingSenderId: "866228132892",
  appId: "1:866228132892:web:ea004a76fe30b31bbb53d9",
  measurementId: "G-WR11H7RP4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Firebase'i başlat
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;