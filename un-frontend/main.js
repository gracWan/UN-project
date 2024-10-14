// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6EH6nqgYZrYYKLOH3OxadRPzm42sJMGE",
  authDomain: "un-ewaste.firebaseapp.com",
  projectId: "un-ewaste",
  storageBucket: "un-ewaste.appspot.com",
  messagingSenderId: "286496706953",
  appId: "1:286496706953:web:db0e49b67a67a1007dd158",
  measurementId: "G-85LTFEM2HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

