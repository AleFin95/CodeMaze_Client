import React, { createContext, useContext, useState } from 'react';

const getToken = () => localStorage.getItem('token');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, selectedAvatar, setSelectedAvatar}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
