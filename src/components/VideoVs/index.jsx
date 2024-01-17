import React from "react";
import "../../assets/App.css";

const VideoVs = () => {
  return (
    <div className="video-vs">
      <video autoPlay loop muted id="video-vs-background">
        <source src="/backgrounds/Vs-green.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoVs;
