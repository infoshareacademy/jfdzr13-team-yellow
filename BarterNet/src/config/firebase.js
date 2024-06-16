// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_keiawzEDEHqWxW7VkHPAVXV_5hJdP5Q",
  authDomain: "barternet-yt.firebaseapp.com",
  projectId: "barternet-yt",
  storageBucket: "barternet-yt.appspot.com",
  messagingSenderId: "165713835473",
  appId: "1:165713835473:web:cf07171e3843e0c5171cf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };