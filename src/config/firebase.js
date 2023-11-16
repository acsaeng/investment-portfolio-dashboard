import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Add your Firebase SDK configuration parameters here
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore();

export { auth, database };
