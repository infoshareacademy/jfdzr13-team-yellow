import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getCollectionDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

export const getAdDetails = async (userId, adId) => {
  try {
    const adRef = doc(db, 'users', userId, 'listings', adId);
    const adSnap = await getDoc(adRef);

    if (!adSnap.exists()) {
      throw new Error('Ogłoszenie nie istnieje.');
    }

    const adDetails = adSnap.data();

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('Użytkownik nie istnieje.');
    }

    const userDetails = userSnap.data();

    return { adDetails, userDetails };
  } catch (error) {
    console.error('Error getting ad details:', error);
    throw error;
  }
};