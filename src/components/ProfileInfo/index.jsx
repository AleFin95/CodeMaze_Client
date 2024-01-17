import React, { useState, useEffect } from "react";
import "./index.css";

const ProfileInfo = ({ wins, losses, sessions, userId }) => {
  const [isLarge, setIsLarge] = useState(false);
  const [opponentsAvatars, setOpponentsAvatars] = useState([]);

  const handleToggleSize = () => {
    setIsLarge(!isLarge);
  };

  return (
    <>
      <div
        className={`sessions-section ${
          isLarge ? "large-table" : "small-table"
        }`}
      >
        <h1 id="sessionsH1">Match History</h1>
        {sessions.length === 0 ? (
          <p id="font-profile-session">
            Your gaming chair feels neglected. <br />
            No epic gaming tales to share—yet!
          </p>
        ) : (
          <div className="session-table" onClick={handleToggleSize}>
            <table>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Opponent</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((sessionItem) => (
                  <tr key={sessionItem.id}>
                    <td>
                      {sessionItem.problem[0] && sessionItem.problem[0].title}
                    </td>
                    <td>
                      {
                        sessionItem.users.find((user) => user.id !== userId)
                          .username
                      }
                    </td>
                    <td>{sessionItem.winner[0].username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="achievements-section">
        <h2>Wins: {wins}</h2>
        <h2>Losses: {losses}</h2>
      </div>
    </>
  );
};

export default ProfileInfo;
