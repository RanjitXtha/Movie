import React, { useEffect, createContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { userId, username } = decodedToken;
        setUsername(username);
        setUserId(userId);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{ username, setUsername, userId, setUserId }}> 
      {children}
    </UserAuthContext.Provider>
  );
};