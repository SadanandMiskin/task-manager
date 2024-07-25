// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "crud-app-7d10b.firebaseapp.com",
  projectId: "crud-app-7d10b",
  storageBucket: "crud-app-7d10b.appspot.com",
  messagingSenderId: "576897108569",
  appId: "1:576897108569:web:9a40a7644c9b54e8cc3f48",
  measurementId: "G-BTXQ73NCK9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);