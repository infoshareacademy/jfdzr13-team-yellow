import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, createContext, useContext } from "react";
import { auth, db } from "../config/firebase";
import Spinner from '../components/Spinner/Spinner';


const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrenUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setCurrenUser({
            uid: user.uid,
            email: user.email,
            ...userDocSnap.data()
          });
        } else {
          console.error("Brak danych użytkownika w Firestore.");
        }
      } else {
        setCurrenUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Funkcja wylogowania
  const logout = async () => {
    await signOut(auth);
  };

  // Funkcja usuwania konta
  const deleteAccount = async () => {
    if (currentUser) {
      await deleteUser(currentUser);
    }
  };

  const value = {
    currentUser,
    logout,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
