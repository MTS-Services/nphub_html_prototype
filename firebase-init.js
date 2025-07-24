import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2MXxO_4Zayv2g8-Az6G9WOoxF2CdrpJ8",
  authDomain: "np-clinical-hub-prototype.firebaseapp.com",
  projectId: "np-clinical-hub-prototype",
  storageBucket: "np-clinical-hub-prototype.appspot.com", // fixed typo here
  messagingSenderId: "843798932639",
  appId: "1:843798932639:web:fb768c55f404c25c3306aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };