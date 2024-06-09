import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { mockUsers } from "./db";

export const addMockUsersToFirebase = async () => {
    try {
        for (let i = 0; i < mockUsers.length; i++) {
            const mUser = mockUsers[i];
            const userCredential = await createUserWithEmailAndPassword(auth, mUser.email, mUser.password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                email: mUser.email,
                firstName: mUser.firstName,
                lastName: mUser.lastName,
                city: mUser.city,
                phone: mUser.phone,
                description: mUser.description,
                listings: mUser.listings
            });
        }

        console.log("Wszyscy użytkownicy zostali dodani do Firebase Authentication i Firestore.");
    } catch (error) {
        console.error('Error adding users to Firebase:', error);
    }
};


addMockUsersToFirebase();