// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAxXs01IEMWXSQ1tcsAq3zufIT5N0Oico",
  authDomain: "defrr-398521.firebaseapp.com",
  projectId: "defrr-398521",
  storageBucket: "defrr-398521.appspot.com",
  messagingSenderId: "507089454572",
  appId: "1:507089454572:web:9f702ff2e5ad08e3c1ecc9",
  measurementId: "G-X70JHKWN8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

initializeApp(firebaseConfig);