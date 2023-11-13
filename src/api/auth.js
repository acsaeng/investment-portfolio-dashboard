import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../utils/database';

const signUpUser = async (firstName, lastName, email, password, dob, gender) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(getFirestore(), COLLECTIONS.USER, auth.currentUser.uid), {
    firstName,
    lastName,
    email,
    dob,
    gender,
  });
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
