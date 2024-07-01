import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-6a98f.firebaseapp.com",
  projectId: "real-estate-6a98f",
  storageBucket: "real-estate-6a98f.appspot.com",
  messagingSenderId: "163960750102",
  appId: "1:163960750102:web:8a42049c123be255cd3537"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);