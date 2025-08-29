import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { saveUserData } from './users';

type Gender = 'male' | 'female' | 'other';

const signUpUser = async (firstName: string, lastName: string, email: string, password: string, dob: string, gender: Gender): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
  await saveUserData(firstName, lastName, email, dob, gender);

  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
};

const signInUser = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export { resetPassword, signInUser, signOutUser, signUpUser };
