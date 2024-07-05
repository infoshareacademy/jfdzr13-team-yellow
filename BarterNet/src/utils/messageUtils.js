import {
  collection,
  addDoc,
  getDocs,
  query,
  Timestamp,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const addMessage = async (senderId, senderName, recipientId, recipientEmail, message, senderEmail) => {
  try {
    const messagesRef = collection(db, "users", recipientId, "messages");
    await addDoc(messagesRef, {
      senderId,
      senderName,
      senderEmail,
      recipientEmail,
      message,
      timestamp: Timestamp.now(),
      isRead: false,
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
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return messages;
  } catch (error) {
    console.error("Błąd podczas pobierania wiadomości: ", error);
    throw new Error(error.message);
  }
};

export const getUnreadMessagesCount = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "messages"), where("isRead", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Błąd podczas pobierania liczby nieprzeczytanych wiadomości: ", error);
    throw new Error(error.message);
  }
};

export const markMessageAsRead = async (userId, messageId) => {
  try {
    const messageRef = doc(db, "users", userId, "messages", messageId);
    await updateDoc(messageRef, {
      isRead: true,
    });
  } catch (error) {
    console.error("Błąd podczas oznaczania wiadomości jako przeczytanej: ", error);
    throw new Error(error.message);
  }
};
