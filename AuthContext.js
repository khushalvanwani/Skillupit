// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Create the context
export const AuthContext = createContext();

// 2. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // store user object
  const [token, setToken] = useState(null);    // store token
  const [loading, setLoading] = useState(true);

  // On mount, try to load user & token from storage
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        console.log("Error loading auth from storage:", err);
      }
      setLoading(false);
    };
    loadStoredAuth();
  }, []);

  // Login function: Save user/token to state and AsyncStorage
  const login = async (user, token) => {
  setUser(user);
  setToken(token);

  if (token && token.length > 0) {
    await AsyncStorage.setItem('token', token);
  } else {
    await AsyncStorage.removeItem('token');
  }
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

  // Logout function: Remove from state and AsyncStorage
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Helper hook for easy access
export const useAuth = () => useContext(AuthContext);