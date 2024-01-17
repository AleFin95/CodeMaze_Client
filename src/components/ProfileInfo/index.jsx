import React, { useState, useEffect } from "react";
import "./index.css";

const ProfileInfo = ({ wins, losses, sessions, userId }) => {
  const [isLarge, setIsLarge] = useState(false);
  const [opponentsAvatars, setOpponentsAvatars] = useState([]);

  const handleToggleSize = () => {
    setIsLarge(!isLarge);
  };

  useEffect(() => {
    const fetchOpponentsAvatars = async () => {
      const opponentsUsernames = sessions.map(
        (sessionItem) =>
          sessionItem.users.find((user) => user.id !== userId).username
      );

      const avatarsResponse = await fetch(`/users/avatars`, {
        method: "POST", // Assuming you need to send a list of usernames in the request body
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernames: opponentsUsernames }),
      });

      const avatarsData = await avatarsResponse.json();
      setOpponentsAvatars(avatarsData);
    };

    fetchOpponentsAvatars();
  }, [sessions, userId]);

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
                    <td>
                      {sessionItem.winner[0].username}

                      {opponentsAvatars[index] && (
                        <img
                          src={opponentsAvatars[index].avatar}
                          alt="Opponent Avatar"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </td>
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
