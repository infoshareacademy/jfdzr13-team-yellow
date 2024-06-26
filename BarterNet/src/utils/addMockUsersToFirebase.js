import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { mockUsers } from "./db";

export const addMockUsersToFirebase = async () => {
  try {
    for (let i = 0; i < mockUsers.length; i++) {
      const mUser = mockUsers[i];
      let userId;

      // Check if user already exists by email in Firestore
      const q = query(collection(db, "users"), where("email", "==", mUser.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User already exists, get their userId
        userId = querySnapshot.docs[0].id;
      } else {
        // Create new user in Firebase Auth and get userId
        const userCredential = await createUserWithEmailAndPassword(auth, mUser.email, mUser.password);
        userId = userCredential.user.uid;

        // Create user document
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, {
          email: mUser.email,
          firstName: mUser.firstName,
          lastName: mUser.lastName,
          city: mUser.city,
          phone: mUser.phone,
          description: mUser.description
        });
      }

      // Add listings to the user document
      const listingsCollectionRef = collection(db, "users", userId, "listings");
      for (let listing of mUser.listings) {
        listing.userId = userId;
        await setDoc(doc(listingsCollectionRef), listing);
      }
    }
    console.log("Users and listings added to Firebase successfully.");
  } catch (error) {
    console.error("Error adding users to Firebase: ", error);
  }
};
