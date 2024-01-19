import React from "react";
import AvatarSelector from "../AvatarSelector";
import "./index.css";

const AvatarModal = ({ isOpen, onClose, avatars, onSelectAvatar }) => {
  return (
    <div className={`avatar-modal ${isOpen ? "open" : ""}`}>
      <AvatarSelector
        avatars={avatars}
        onSelectAvatar={onSelectAvatar}
        selectedAvatar={null}
      />
    </div>
  );
};
export default AvatarModal;
