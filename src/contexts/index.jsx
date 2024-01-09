import React, { createContext, useContext, useState } from 'react';

const getToken = () => localStorage.getItem('token');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken);


  return (
    <AuthContext.Provider
      value={{ token, setToken}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
