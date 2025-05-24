// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKuyb7rvYEzzp8E-nBD78Vvps6IkXTyTk",
  authDomain: "abc-shop-54a9d.firebaseapp.com",
  projectId: "abc-shop-54a9d",
  storageBucket: "abc-shop-54a9d.appspot.com",
  messagingSenderId: "840210649996",
  appId: "1:840210649996:web:67874b82202fadd60cbca9",
  measurementId: "G-FSKT7SE170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, app };