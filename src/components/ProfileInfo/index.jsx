import React, { useEffect, useState } from 'react';

const ProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState({
    id: null,
    username: '',
    xp: 0,
    wins: 0,
    losses: 0,
    rank: [],
    sessions: [],
  });

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
    <div>
      <h1>Your Profile </h1>
      <p>Username: {profileInfo.username}</p>
      <p>XP: {profileInfo.xp}</p>
      <div class="achievements-section">Recent Activity </div>
      <p>Wins: {profileInfo.wins}</p>
      <p>Losses: {profileInfo.losses}</p>
      <h2>Rank:</h2>
      <ul>
        {profileInfo.rank.map((rankItem) => (
          <li key={rankItem.id}>{rankItem.name}</li>
        ))}
      </ul>
      
    </div>
  );
};

export default ProfileInfo;