import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { VideoVs } from "../../components";

const PlayerVsPlayer = () => {
    const [counter, setCounter] = useState(10);
    const [showImage, setShowImage] = useState(true);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
          setCounter(prevCounter => {
            const newCounter = prevCounter - 1;
    
            // Check if the counter reaches 10
            if (newCounter === 0) {
              clearInterval(intervalId); // Stop the interval
              localStorage.setItem("interval", false);
            }
    
            return newCounter;
          });
        }, 1200);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <>
         <VideoVs /> 
        <section id="first">
            <section id="main">
                <div className="player1">
                    <img src={localStorage.getItem("selectedAvatar")}/>
                    <h1>ss{localStorage.getItem("username")}</h1>
                </div> 
                <div className={`player2 ${showImage ? 'slide-in' : ''}`}>
                    <img src={localStorage.getItem("selectedAvatar")}/>
                    <h1>amelia</h1>
                </div>
            </section>
            <div className='title'>
                <h1>The game will start in </h1>
                <p>{counter}</p>
            </div>
        </section>
    </>
  );
};

export default PlayerVsPlayer;
