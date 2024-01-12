import React, { createContext, useContext, useEffect, useState } from 'react';
import io from "socket.io-client"

const getToken = () => localStorage.getItem('token');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken);
  const [socket, setSocket] = useState(io.connect('http://localhost:5000'));

  useEffect(() => {
    // Optionally, perform actions or set state based on the initial socket connection
    // ...

    return () => {
      // Cleanup or disconnect logic if needed
      socket.disconnect();
    };
  }, [socket]);
  
  return (
    <AuthContext.Provider value={{ token, setToken, socket}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
