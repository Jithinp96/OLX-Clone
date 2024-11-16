import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwkma7uzBaS0ZzHOb5wZ4oLWVKY6aZwfk",
  authDomain: "react---olx.firebaseapp.com",
  projectId: "react---olx",
  storageBucket: "react---olx.appspot.com",
  messagingSenderId: "462203061662",
  appId: "1:462203061662:web:053e5d2b7b06c11037028f",
  measurementId: "G-ZCJVHRDHYB"
};


const app = initializeApp(firebaseConfig)

export const storage = getStorage(app);
export const db = getFirestore(app);