// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5hlORki0NrM5acn2722ybP8aGqAeVHHA",
  authDomain: "tshimologong-admin.firebaseapp.com",
  projectId: "tshimologong-admin",
  storageBucket: "tshimologong-admin.appspot.com",
  messagingSenderId: "727016916598",
  appId: "1:727016916598:web:19a32d0eb3708333ce4157",
  measurementId: "G-E67REQYDQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);