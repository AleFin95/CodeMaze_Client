import React from 'react';
import '../../assets/App.css';

const Video= () => {
  return (
    <div className="video">
      <video autoPlay loop muted id="video-background">
      <source src="/backgrounds/background3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;