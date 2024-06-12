import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { auth } from '../config/firebase';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
const [currentUser, setCurrenUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrenUser(user);
        setLoading(false);
    })
    return unsubscribe;
},[])

const value = {
    currentUser
}

  return (
    <AuthContext.Provider value={value}>
        {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider