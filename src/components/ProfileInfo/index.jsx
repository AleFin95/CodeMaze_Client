import React from 'react';
import './index.css'; 

const ProfileInfo = ({ xp, wins, losses, rank, sessions }) => {
  return (
    <div className="centered-boxes">
    <div className="profile-info-container">

      <div className="achievements-section">
        <h2>Achievements</h2>
        <p>XP: {xp}</p>
        <p>Wins: {wins}</p>
        <p>Losses: {losses}</p>
      </div>

      <div className="rank-section">
        <h2>Rank</h2>
        {rank.map((rankItem) => (
          <p key={rankItem.id}>
            {rankItem.name} (Min XP: {rankItem.min_xp}, Max XP: {rankItem.max_xp})
          </p>
        ))}
      </div>

      <div className="sessions-section">
        <h2>Sessions played</h2>
        {sessions.length === 0 ? (
          <p>Your gaming chair feels neglected. No epic gaming tales to share—yet!</p>
        ) : (
          <div>
            {sessions.map((sessionItem) => (
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
    </div>
  );
};

export default ProfileInfo;
