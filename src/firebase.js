// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu5UrdRmWSDbfo30AW3yMUV29UAYTdaHA",
  authDomain: "friendo-news.firebaseapp.com",
  projectId: "friendo-news",
  storageBucket: "friendo-news.firebasestorage.app",
  messagingSenderId: "832167601759",
  appId: "1:832167601759:web:5dd6458d375e5049869dea",
  measurementId: "G-MP06L77SEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export{db};
