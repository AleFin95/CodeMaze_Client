import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { VideoVs } from "../../components";
/*import 'animate.css';*/

const PlayerVsPlayer = ({ roomUsers2, onTimeOut }) => {
  const [counter, setCounter] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [secondAnimation, setSecondAnimation] = useState(false);
  const [timerShow, setTimerShow] = useState(false);
  const [newds, setNewds] = useState(true);
  const [enemyName, setEnemyName] = useState();

  /* localStorage.removeItem("interval")
    localStorage.setItem("interval", true);*/

  useEffect(() => {
    // Function to be executed after the component has mounted
    const timeoutId = setTimeout(() => {
      // Update state to add the class after 2 seconds
      setSecondAnimation(true);
    }, 1800); // Set the delay duration (in milliseconds)

    const username = localStorage.getItem("username");

    console.log("roomUsers2: ", roomUsers2);

    for (let i = 0; i < roomUsers2.length; i++) {
      const currentName = roomUsers2[i];
      if (currentName !== username) {
        setEnemyName(currentName);
      }
    }

    // Clean up the timeout when the component is unmounted or when the class is added
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array [] ensures the effect runs only once after mount

  useEffect(() => {
    let timeoutId;
    let intervalId;
    if (secondAnimation) {
      timeoutId = setTimeout(() => {
        // Update state to end the second animation after 2 seconds
        setTimerShow(true);
      }, 1000);
      if (secondAnimation && timerShow) {
        const intervalId = setInterval(() => {
          setCounter((prevCounter) => {
            const newCounter = prevCounter - 1;

            // Check if the counter reaches 0
            if (newCounter === 1) {
              clearInterval(intervalId); // Stop the interval
              localStorage.setItem("interval", false);

              onTimeOut();
            }

            return newCounter;
          });
        }, 1200);
      }

      // Use a function in the return statement to ensure both cleanup functions are called
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }

    localStorage.removeItem("interval");
  }, [
    secondAnimation,
    setSecondAnimation,
    setCounter,
    timerShow,
    setTimerShow,
  ]);

  /*  useEffect(() => {
        
         // Set the delay duration (in milliseconds)
    
        // Clean up the timeout when the component is unmounted or when the div is displayed
        return () => clearTimeout(timeoutId);
      }, [secondAnimation]); // The empty dependency array [] ensures the effect runs only once after mount
    */
  /*  if(newds === false){
          localStorage.removeItem("interval")
        }*/
  //const stop = localStorage.getItem("interval");
  /*console.log("ss",stop)
      console.log(roomData)*/
      const username = localStorage.getItem("username");
      //const myAvatar = //username;
      //const enemyAvatar = ;
      
    return (
        <>
        <VideoVs />

<section id="first">
  <section id="main">
    <div className={`player1 ${secondAnimation ? "show" : ""}`}>
      <img src={localStorage.getItem("selectedAvatar")} />
      <h1>{localStorage.getItem("username")}</h1>
    </div>
    <div className={`player2 ${secondAnimation ? "show" : ""}`}>
      <img src={localStorage.getItem("selectedAvatar")} />
      <h1>{enemyName}</h1>
    </div>
  </section>
  <div className={`title ${timerShow ? "show" : ""}`}>
    <h1>Starting in </h1>
    <p>{counter}</p>
  </div>
</section>
    </>
  );
};

export default PlayerVsPlayer;
