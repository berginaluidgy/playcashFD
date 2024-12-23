import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAfPxHFns7aRN_08UJ-LQwbLNE3Elub5BY",
    authDomain: "playcash-a5812.firebaseapp.com",
    projectId: "playcash-a5812",
    storageBucket: "playcash-a5812.firebasestorage.app",
    messagingSenderId: "937214348294",
    appId: "1:937214348294:web:46748f06859fc55c808787",
    measurementId: "G-C1T4DCJPDY"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
