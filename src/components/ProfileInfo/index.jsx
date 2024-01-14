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
    <h1>Your Profile</h1>
    <p>Username: {profileInfo.username}</p>
    <div className="achievements-section">
      <p>XP: {profileInfo.xp}</p>
      <p>Wins: {profileInfo.wins}</p>
      <p>Losses: {profileInfo.losses}</p>
    </div>
    <h2>Rank:</h2>
    <div>
      {profileInfo.rank.map((rankItem) => (
        <p key={rankItem.id}>
          {rankItem.name} (Min XP: {rankItem.min_xp}, Max XP: {rankItem.max_xp})
        </p>
      ))}
    </div>
    <div>
    <h2>Sessions:</h2>
    {profileInfo.sessions.length === 0 ? (
        <p>Your gaming chair feels neglected. No epic gaming tales to share—yet!</p>
      ) : (
    <div>
      {profileInfo.sessions.map((sessionItem) => (
        <p key={sessionItem.id}>
          {/* Display session details */}
          <p>Session ID: {sessionItem.id}</p>
          {/* Add other session details as needed */}
        </p>
      ))}
      </div> 
     )}
    </div>
  </div>
);
};

export default ProfileInfo;