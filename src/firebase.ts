// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtKlDmfG2XB0oYfPMri6GDn8K2ioHYJ3I",
  authDomain: "progressive-quiz.firebaseapp.com",
  projectId: "progressive-quiz",
  storageBucket: "progressive-quiz.appspot.com",
  messagingSenderId: "417148031104",
  appId: "1:417148031104:web:587ad6f8a1a6e05713d665",
  measurementId: "G-4ZXMTPZZRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
