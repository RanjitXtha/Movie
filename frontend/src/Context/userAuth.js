import React, { useEffect, createContext, useReducer, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserAuthContext =  createContext();
export const UserAuthProvider = ({children})=>{
    const [username , setUsername] = useState('');
    const [userId , setUserId] = useState('');
   useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const {  userId, username } = decodedToken;
        setUsername(username);
        setUserId(userId);
      }
   },[])

   return(
    <UserAuthContext.Provider value={{username , userId}}>
        {children}
    </UserAuthContext.Provider>
)
   

}

 
    
