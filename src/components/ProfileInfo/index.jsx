import React from "react";
import "./index.css";

const ProfileInfo = ({ xp, wins, losses, sessions }) => {
  return (
    <>
      <div className="profile-info-container">
        <div className="achievements-section">
          <h2>Achievements</h2>
          <p>XP: {xp}</p>
          <p>Wins: {wins}</p>
          <p>Losses: {losses}</p>
        </div>

        <div className="sessions-section">
          <h2>Sessions played</h2>
          {sessions && sessions.length === 0 ? (
            <p>
              Your gaming chair feels neglected. <br />
              No epic gaming tales to share—yet!
            </p>
          ) : (
            <div>
              {sessions &&
                sessions.map((sessionItem) => (
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
    </>
  );
};

export default ProfileInfo;
