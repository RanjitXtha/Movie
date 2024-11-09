import React, { useEffect, createContext, useReducer, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserAuthContext =  createContext();
export const UserAuthProvider = ({children})=>{
    const [username , setUsername] = useState('')
   useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
      
        const { username } = decodedToken;
        setUsername(username)
      }
   },[username])

   return(
    <UserAuthContext.Provider value={{username}}>
        {children}
    </UserAuthContext.Provider>
)
   

}

 
    
