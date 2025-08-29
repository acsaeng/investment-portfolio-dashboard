import { auth, database } from '@/config/firebase';
import { FIREBASE_COLLECTIONS } from '@/utils/endpoints';
import { doc, setDoc } from 'firebase/firestore';

type Gender = 'male' | 'female' | 'other';

const saveUserData = async (firstName: string, lastName: string, email: string, dob: string, gender: Gender): Promise<void> => {
  if (auth.currentUser) {
    await setDoc(doc(database, FIREBASE_COLLECTIONS.USERS, auth.currentUser.uid), {
      firstName,
      lastName,
      email,
      dob,
      gender,
    });
  }
};

export { saveUserData };
