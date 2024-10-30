import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDvbtZACPq1YnEQSi9Q787yFbD3aK5AyX8",
  authDomain: "taskr-5499f.firebaseapp.com",
  projectId: "taskr-5499f",
  storageBucket: "taskr-5499f.appspot.com",
  messagingSenderId: "330100530107",
  appId: "1:330100530107:web:0d57597045168ca35a029e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // If using Firestore

export default app;

