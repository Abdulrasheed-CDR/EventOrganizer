import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhwKDGV4OmnwWKIrrTX-NqKUmt5SDqR9U",
  authDomain: "eventorganizer-6132-lab04.firebaseapp.com",
  projectId: "eventorganizer-6132-lab04",
  storageBucket: "eventorganizer-6132-lab04.firebasestorage.app",
  messagingSenderId: "224188300172",
  appId: "1:224188300172:web:6815d6074e8020607934a9",
  measurementId: "G-B132SB2NHL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot };