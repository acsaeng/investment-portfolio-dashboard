import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const signUpUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(auth.currentUser);
  await signOutUser();
};

const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async () => {
  await signOut(auth);
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export { resetPassword, signInUser, signOutUser, signUpUser };