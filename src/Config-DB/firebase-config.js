
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAPREKpY4z5_nrGliWnGsk_o4Q64_3k7m4",
  authDomain: "agad-coloc.firebaseapp.com",
  projectId: "agad-coloc",
  storageBucket: "agad-coloc.appspot.com",
  messagingSenderId: "648850997176",
  appId: "1:648850997176:web:5858756f30efdcaaf9d94d",
  measurementId: "G-Z9SH9FYGH5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const imgDB = getStorage(app);

