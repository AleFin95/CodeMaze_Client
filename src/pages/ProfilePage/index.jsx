import React, { useState, useEffect } from 'react';
import './index.css';
import { useAuth } from '../../contexts'
import { AvatarModal, ProfileInfo} from '../../components';
import profileImage from './assets/game.png';

const ProfilePage = () => {
  const { selectedAvatar, setAvatar } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    id: null,
    username: '',
    xp: 0,
    wins: 0,
    losses: 0,
    rank: [],
    sessions: [],
  });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await fetch(
          'https://codemaze-api.onrender.com/users/profile',
          options
        );

        if (response.status === 200) {
          const data = await response.json();
          setProfileInfo(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch profile info');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="profilepage" style={{ margin: "50px", height: '100vh', backgroundImage: `url(${profileImage})`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover'  }}>
    <div>
    
    <div className="profile-container">
    
      <div className="avatar-section">
        {selectedAvatar && (
          <img src={selectedAvatar} alt="Selected Avatar" className="avatar" />
        )}
      </div>

      <AvatarModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        avatars={avatars}
        onSelectAvatar={handleAvatarSelection}
      />

      <div className="user-info">
      <h1>Username: </h1>
      <p>{profileInfo.username}</p>
      {profileInfo.rank.map((rankItem) => {

      const remainingXP = rankItem.max_xp - profileInfo.xp;
     return (
    <div key={rankItem.id}>
      <p>{rankItem.name}</p>
      <p>Remaining XP to {rankItem.name}: {remainingXP > 0 ? remainingXP : 'Reached'}</p>
      <p>Min XP: {rankItem.min_xp}, Max XP: {rankItem.max_xp}</p>
    </div>
  );
})}
      </div>
      </div>
      <div className='button-section'>
      <button className="edit-avatar-btn" onClick={handleEditAvatarClick}>
       Edit Avatar
     </button>
     </div>
      </div>
      <ProfileInfo
        xp={profileInfo.xp}
        wins={profileInfo.wins}
        losses={profileInfo.losses}
        sessions={profileInfo.sessions}
      />
      </div>

   </>
  );
};

export default ProfilePage;