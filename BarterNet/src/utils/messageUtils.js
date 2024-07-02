import {
  collection,
  addDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const addMessage = async (
  senderId,
  senderName,
  recipientId,
  recipientEmail,
  message
) => {
  try {
    const messagesRef = collection(db, "users", recipientId, "messages");
    await addDoc(messagesRef, {
      senderId,
      senderName,
      recipientEmail,
      message,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Błąd podczas dodawania wiadomości: ", error);
    throw new Error(error.message);
  }
};

export const getMessages = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "messages"));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return messages;
  } catch (error) {
    console.error("Błąd podczas pobierania wiadomości: ", error);
    throw new Error(error.message);
  }
};
