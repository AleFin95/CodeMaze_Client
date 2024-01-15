import React, { createContext, useContext, useState, useEffect } from 'react';

const getAccessToken = () => localStorage.getItem('access_token');
const getSelectedAvatar = () => localStorage.getItem('selectedAvatar');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(getAccessToken);
  const [selectedAvatar, setSelectedAvatar] = useState(getSelectedAvatar);

  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
    localStorage.setItem('access_token', newAccessToken);
  };

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('selectedAvatar', avatar);
  };

  useEffect(() => {
    setSelectedAvatar(getSelectedAvatar())
  }, [selectedAvatar]);

  // ensures that if you log in with a different user, the avatar will be updated
  useEffect(() => {
    setSelectedAvatar(getSelectedAvatar());
  }, [accessToken]);
  
  return (
    <AuthContext.Provider
      value={{ accessToken, updateAccessToken, selectedAvatar, setAvatar  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
