import { auth, database } from '@/config/firebase';
import { FIREBASE_COLLECTIONS } from '@/utils/endpoints';
import { doc, setDoc } from 'firebase/firestore';

const saveUserData = async (firstName, lastName, email, dob, gender) => {
  await setDoc(doc(database, FIREBASE_COLLECTIONS.USERS, auth.currentUser.uid), {
    firstName,
    lastName,
    email,
    dob,
    gender,
  });
};

export { saveUserData };
