import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../config/firebase";
import Spinner from "../utils/Spinner";
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { auth } from '../config/firebase';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrenUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrenUser(user);
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
