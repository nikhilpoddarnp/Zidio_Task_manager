// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "zidiotaskmanager.firebaseapp.com",
  projectId: "zidiotaskmanager",
  storageBucket: "zidiotaskmanager.firebasestorage.app",
  messagingSenderId: "686007689377",
  appId: "1:686007689377:web:ca8e515da28f8710e350e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);