import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const getAccessToken = () => localStorage.getItem("access_token");
const getSelectedAvatar = () => localStorage.getItem("selectedAvatar");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(getAccessToken);
  const [selectedAvatar, setSelectedAvatar] = useState(getSelectedAvatar);
  const [socket, setSocket] = useState(io.connect("http://localhost:4000"));

  const [socket, setSocket] = useState(io.connect("http://localhost:4000"));

  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
    localStorage.setItem("access_token", newAccessToken);
  };

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("selectedAvatar", avatar);
  };

  useEffect(() => {
    setSelectedAvatar(getSelectedAvatar());
  }, [selectedAvatar]);

  // ensures that if you log in with a different user, the avatar will be updated
  useEffect(() => {
    setSelectedAvatar(getSelectedAvatar());
  }, [accessToken]);

  useEffect(() => {
    // Optionally, perform actions or set state based on the initial socket connection
    // ...

    return () => {
      // Cleanup or disconnect logic if needed
      socket.disconnect();
    };
  }, [socket]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        updateAccessToken,
        selectedAvatar,
        setAvatar,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
