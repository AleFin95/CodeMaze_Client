import React from "react";
import "./index.css";

const ProfileInfo = ({ wins, losses, sessions }) => {
  return (
    <>
      <section id="sec-session">
        <div className="sessions-section">
          <h1 id="sessionsH1">Sessions played</h1>
          {sessions.length === 0 ? (
            <p id="font-profile">
              Your gaming chair feels neglected. <br />
              No epic gaming tales to share—yet!
            </p>
          ) : (
            <div>
              {sessions.map((sessionItem) => (
                <p id="font-profile" key={sessionItem.id}>
                  <p id="font-profile">Session ID: {sessionItem.id}</p>
                </p>
              ))}
            </div>
          )}
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
