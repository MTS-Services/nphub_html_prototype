import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from './firebase-init.js';

async function testWrite() {
  try {
    await addDoc(collection(db, "test_collection"), { test: "hello", timestamp: Date.now() });
    console.log("Test document written!");
  } catch (e) {
    console.error("Test write error:", e);
  }
}

testWrite();import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { db } from './firebase-init.js';

async function testWrite() {
  try {
    await addDoc(collection(db, "test_collection"), { test: "hello", timestamp: Date.now() });
    console.log("Test document written!");
  } catch (e) {
    console.error("Test write error:", e);
  }
}

testWrite();