"use client"
import {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, signOut} from 'firebase/auth';
import {app} from '@/app/firebase'; // adjust the import based on your file structure

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser])

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth); // Signs out the user
      // Perform additional cleanup if necessary
    } catch (error) {
      console.error("Logout failed", error);
      // Handle errors (e.g., show a notification to the user)
    }
  };

  const value = {
    currentUser,
    auth,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
