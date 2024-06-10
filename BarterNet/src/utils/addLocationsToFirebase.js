import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { locations } from "./locationsList";

export const addLocationsToFirebase = async () => {
    try {
        const locationsList = collection(db, "locations")
        for (let element of locations) {
            await addDoc(locationsList, element)
        }   
        
    } catch (error) {
        console.error('Error adding users to Firebase:', error);
    }
}

// addLocationsToFirebase()