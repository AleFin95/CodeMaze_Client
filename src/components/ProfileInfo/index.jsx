import React, { useState } from "react";
import "./index.css";

const ProfileInfo = ({ wins, losses, sessions, userId }) => {
  const [isLarge, setIsLarge] = useState(false);

  const handleToggleSize = () => {
    setIsLarge(!isLarge);
  };
  return (
    <>
      <section id="sec-session">
        <div className="session-main">
          <div
            className={`sessions-section ${
              isLarge ? "large-table" : "small-table"
            }`}
          >
            <h1 id="sessionsH1">Match History</h1>
            {sessions.length === 0 ? (
              <p id="font-profile">
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
                      <th>Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((sessionItem) => (
                      <tr key={sessionItem.id}>
                        <td>
                          {sessionItem.problem[0] &&
                            sessionItem.problem[0].title}
                        </td>
                        <td>
                          {sessionItem.users &&
                            sessionItem.users
                              .filter((user) => user.id !== userId)
                              .map((user) => user.username)
                              .join(", ")}
                        </td>
                        <td>
                          {sessionItem.winner[0] &&
                          sessionItem.winner[0].id === userId
                            ? "Win"
                            : "Loss"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="achievements-section">
          <h2>Wins: {wins}</h2>
          <h2>Losses: {losses}</h2>
        </div>
      </section>
    </>
  );
};

export default ProfileInfo;
