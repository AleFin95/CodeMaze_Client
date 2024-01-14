import React, { useState } from 'react';
import './index.css';
import { useAuth } from '../../contexts'
import { AvatarModal, ProfileInfo} from '../../components';

const ProfilePage = () => {
  const { selectedAvatar, setAvatar } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatars = [
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Midnight&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Mittens&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Max&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Oscar&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sassy&radius=45&backgroundType=solid,gradientLinear"
  ];
  const handleEditAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAvatarSelection = (avatar) => {
    console.log('Selected avatar:', avatar);
    setAvatar(avatar);
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="profile-container">
    <div className="avatar-section">
  {selectedAvatar && (
    <img
      src={selectedAvatar}
      alt="Selected Avatar"
      className="avatar selected"
    />
  )}
  <button className="edit-avatar-btn" onClick={handleEditAvatarClick}>
    Edit Avatar
  </button>
</div>

      <AvatarModal
  isOpen={isModalOpen}
  onClose={handleModalClose}
  avatars={avatars}
  onSelectAvatar={handleAvatarSelection}
/>

      <div className="user-info">
        <ProfileInfo/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;