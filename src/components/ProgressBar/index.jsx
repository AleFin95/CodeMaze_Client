// ProgressBar.jsx

import React from "react";
import "./index.css";

const ProgressBar = ({
  currentXP,
  minXPBronze,
  maxXPBronze,
  minXPSilver,
  maxXPSilver,
  minXPGold,
  maxXPGold,
  minXPlatinum,
  maxXPlatinum,
}) => {
  const calculateProgress = () => {
    if (currentXP < minXPBronze) {
      return 0; // No XP
    } else if (currentXP >= minXPBronze && currentXP <= maxXPBronze) {
      return ((currentXP - minXPBronze) / (maxXPBronze - minXPBronze)) * 25;
    } else if (currentXP >= minXPSilver && currentXP <= maxXPSilver) {
      return (
        25 + ((currentXP - minXPSilver) / (maxXPSilver - minXPSilver)) * 25
      );
    } else if (currentXP >= minXPGold && currentXP <= maxXPGold) {
      return 50 + ((currentXP - minXPGold) / (maxXPGold - minXPGold)) * 25;
    } else if (currentXP >= minXPlatinum && currentXP <= maxXPlatinum) {
      return (
        75 + ((currentXP - minXPlatinum) / (maxXPlatinum - minXPlatinum)) * 25
      );
    } else {
      return 100; // User surpassed the highest rank
    }
  };

  const progress = calculateProgress();

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="bronze-light" style={{ width: "25%" }}></div>
        <div className="silver-light" style={{ width: "25%" }}></div>
        <div className="gold-light" style={{ width: "25%" }}></div>
        <div className="platinum-light" style={{ width: "25%" }}></div>
        <div className="mainbar" style={{ width: `${progress}%` }}></div>
      </div>
      <p style={{ textAlign: "center", marginTop: "5px", fontSize: "14px" }}>
        {currentXP} XP
      </p>
    </div>
  );
};

export default ProgressBar;
