import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDetY54WCH4LVrfj5vzGP14drYO3gmztDY",
  authDomain: "game-achievement-tracker-939c0.firebaseapp.com",
  projectId: "game-achievement-tracker-939c0",
  storageBucket: "game-achievement-tracker-939c0.firebasestorage.app",
  messagingSenderId: "300102242412",
  appId: "1:300102242412:web:0bb1fa193ba8800293c849",
  measurementId: "G-2HRZTHV1ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;