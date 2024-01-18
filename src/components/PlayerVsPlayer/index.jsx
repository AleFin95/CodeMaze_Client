import "animate.css";
import React, { useEffect, useState } from "react";
import { VideoVs } from "../../components";
import "./index.css";

const PlayerVsPlayer = ({ roomUsers2, onTimeOut }) => {
  const [counter, setCounter] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [secondAnimation, setSecondAnimation] = useState(false);
  const [timerShow, setTimerShow] = useState(false);
  const [newds, setNewds] = useState(true);
  const [enemyName, setEnemyName] = useState("");
  const [enemyAvatar, setEnemyAvatar] = useState("");

  useEffect(() => {
    // Function to be executed after the component has mounted
    const timeoutId = setTimeout(() => {
      // Update state to add the class after 2 seconds
      setSecondAnimation(true);
    }, 1800); // Set the delay duration (in milliseconds)

    const fetchUsersAvatarData = async (username, enemyName) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username_one: username,
            username_two: enemyName,
          }),
        };
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          options.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        console.log(
          `FETCH USER DATA username: ${username}, enemyname: ${enemyName}`
        );

        const response = await fetch(
          "https://codemaze-api.onrender.com/users/avatars",
          options
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          if (data[0].username !== username) {
            setEnemyAvatar(data[0].avatar);
          } else {
            setEnemyAvatar(data[1].avatar);
          }
        } else {
          throw new Error("Failed to fetch avatar");
        }
      } catch (error) {
        console.error(error);
      }
    };

    console.log("roomUsers2: ", roomUsers2);

    for (let i = 0; i < roomUsers2.length; i++) {
      const currentName = roomUsers2[i];
      if (currentName !== username) {
        setEnemyName(currentName);
        fetchUsersAvatarData(username, currentName);
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

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUsersAvatarData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const options = {
          method: "POST",
          body: JSON.stringify({
            username_one: username,
            username_two: enemyName,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await fetch(
          "https://codemaze-api.onrender.com/users/avatars",
          options
        );

        if (response.status === 200) {
          const data = await response.json();
          setData(data);
          console.log("IM HEREEEEEE");
          console.log("DATAAA", data);
        } else {
          throw new Error("Failed to fetch avatar");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsersAvatarData();
  }, []);

  return (
    <>
      <VideoVs />
      <section id="first">
        <section id="main">
          <div className={`player1 ${secondAnimation ? "show" : ""}`}>
            <img
              aria-label="avatar1"
              src={localStorage.getItem("selectedAvatar")}
            />
            <h1>{localStorage.getItem("username")}</h1>
          </div>
          <div className={`player2 ${secondAnimation ? "show" : ""}`}>
            <img
              aria-label="avatar2"
              src={localStorage.getItem("selectedAvatar")}
            />
            <h1>{enemyName}</h1>
          </div>
        </section>
        <div className={`title ${timerShow ? "show" : ""}`}>
          <h1>Starting in </h1>
          <p data-testid="counter">{counter}</p>
        </div>
      </section>
    </>
  );
};

export default PlayerVsPlayer;
