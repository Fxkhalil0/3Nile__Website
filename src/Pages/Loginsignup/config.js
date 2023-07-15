// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDk--Ekoj5WXnNd6N-16XjaPAsNd5YusB0",
  authDomain: "nile-1c577.firebaseapp.com",
  projectId: "nile-1c577",
  storageBucket: "nile-1c577.appspot.com",
  messagingSenderId: "769220344438",
  appId: "1:769220344438:web:7b5fe47aa9ce298446bd57",
  measurementId: "G-56L17GBYFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
