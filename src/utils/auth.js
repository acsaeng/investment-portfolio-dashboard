import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const signUpUser = async (firstName, lastName, email, password, dob, gender) => {
  const database = getFirestore();
  console.log('firstName', firstName);
  await addDoc(collection(database, 'users'), {
    firstName,
    lastName,
    email,
    dob,
    gender,
  });

  await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(auth.currentUser);
};

const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async () => {
  await signOut(auth);
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export { resetPassword, signInUser, signOutUser, signUpUser };
