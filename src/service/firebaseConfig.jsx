// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYrdg7h3tQMIm9fpoWDL2eHcQdnbF12mQ",
  authDomain: "savariai.firebaseapp.com",
  projectId: "savariai",
  storageBucket: "savariai.appspot.com",
  messagingSenderId: "90598038208",
  appId: "1:90598038208:web:d354f26f02fa23c9902b25",
  measurementId: "G-M4C4XN06LB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);