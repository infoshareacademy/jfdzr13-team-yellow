import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

/* Funkcja ma na celu policzenie ilości dokumentów w danej kolekcji aby upewnić się, czy 
podczas wykonywania funkcji dodających listę dokumentów zostały prawidłowo dodane wszystkie pozycje */

export const getNumberOfDocumentsInCollection = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(`Number of documents in Firebase "${collectionName}" is:`, querySnapshot.size)

    } catch (error) {
        console.error('Error getting number of documents in collection:', error);

    }
}
// getNumberOfDocumentsInCollection("locations")