import React from 'react'
import './index.css'
import { useState, useEffect } from 'react';
import image from '../../assets/Versus1.png'

const PlayerVsPlayer = () => {


    const imageStyle = {
        width: "350px",
        height: "400px",
    }

    const imageOpacity = {
        opacity: "1",
        transition: "opacity 1s ease", /* Adjust the duration and easing function as needed */
    }
    const [showImage, setShowImage] = useState(false);
    const [showImage2, setShowImage2] = useState(false);
    const [startTimer , setStartTimer] = useState(true);
    const [zoomOn, setZoomOn] = useState(false);

    useEffect(() => {
      // Set a timeout to change the state after 2000 milliseconds (2 seconds)
      const timeoutId = setTimeout(() => {
        setShowImage(true);
        setShowImage2(true);
        setStartTimer(true);
      }, 500);
      
      // Clear the timeout when the component unmounts or when the image is displayed
      return () =>clearTimeout(timeoutId);
                   
    }, []); // Empty dependency array ensures the effect runs only once (on mount)
  
    const [counter, setCounter] = useState(10);
 
   
    useEffect(() => { 
        if(startTimer){
        const intervalId = setInterval(() => {
          setCounter(prevCounter => {
            const newCounter = prevCounter - 1;
    
            // Check if the counter reaches 10
            if (newCounter === 0) {
              clearInterval(intervalId); // Stop the interval
              localStorage.setItem("interval", false);
              //setZoomOn(true);
            }
    
            return newCounter;
          });
        }, 1000);
    
        return () => clearInterval(intervalId);
         }
      }, [startTimer]);
   
    return (
        <> 
        <section id="first">
            <section id="main">
                <div className="player1">
                    <img src={localStorage.getItem("selectedAvatar")}/>
                    <h1>{localStorage.getItem("username")}</h1>
                </div> 
                <div  className={`image-container ${showImage ? 'show' : ''}${zoomOn ? 'zoom-in' : ''}`}>
                    <img src={image} alt="Displayed Image" style={imageStyle} />
                </div>
                <div className={`image-container2 ${showImage ? 'slide-in' : ''}`}>
                    <img src={localStorage.getItem("selectedAvatar")}/>
                    <h1>{localStorage.getItem("username")}</h1>
                </div> 
            </section>
            <div className='title'>
                <h1>The game will start in:</h1>
                <p>{counter}</p>
            </div>
        </section>
        </>
  )
}

export default PlayerVsPlayer