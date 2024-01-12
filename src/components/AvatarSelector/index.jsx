import React from 'react';

const AvatarSelector = ({ avatars, onSelectAvatar, selectedAvatar }) => {
  return (
    <div className="avatar-selector">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
          onClick={() => onSelectAvatar(avatar)}
        />
      ))}
    </div>
  );
};

export default AvatarSelector;

