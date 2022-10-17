import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFsK2pQ8l_4TQIfBr2tcwPh5gugYYM87I",
  authDomain: "school-project-45105.firebaseapp.com",
  projectId: "school-project-45105",
  storageBucket: "school-project-45105.appspot.com",
  messagingSenderId: "593553250452",
  appId: "1:593553250452:web:1307333353028842efbc81",
  measurementId: "G-LMGK28X13W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);