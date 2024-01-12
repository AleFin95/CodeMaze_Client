import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client"

import './index.css'
import { Video } from '../../components';
import myImage from '../../assets/bg.jpg'; // Adjust the path based on your directory structure
import { useAuth } from '../../contexts';

let user_rooms = {
    
}

export const HomePage = () => {
	const { socket } = useAuth()
	const [room, setRoom] = useState()
	const [username, setUsername] = useState("");
	const [isSolo, setIsSolo] = useState();
	const navigateTo = useNavigate();

	

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

	const joinRoom = (e) => {
		e.preventDefault()
		socket.connect()
		socket.emit("join_room", {username})
	}

	const soloRoom = () => {
		setIsSolo(true)
		soloRoom2();
	}

	const soloRoom2 = () => {
		navigateTo('/game', {
			state: {
					room: "room",
					username: username,
					isSolo: true
				}
		}
	);
	}

	useEffect(() => {
		const handleReceiveData = (data) => {
				console.log(data);
				setRoom(data.room)
				// user_rooms[data.name] = data.room
				setIsSolo(false)
				battleRoom(data)
		};
		
		socket.on('receiveData', handleReceiveData);

		return () => {
			socket.off('receiveData', handleReceiveData);
		};
	}, [socket]);

	const battleRoom = (data) => {
		navigateTo('/game', {
			state: {
					room: data.room,
					username: data.name,
					user_rooms: user_rooms,
					isSolo: false
				}
		}
	);
	}


  const styles = {
    backgroundImage: `url(${myImage})`,
    marginTop: "1.5em",
    padding: "20px",
    borderRadius: "30px",
    marginRight: "400px",
    marginLeft: "400px",
    marginBottom: "0em",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "flex-start",
    backgrounSize: "cover",
    backgroundPosition:  "center center",
  };

  return (
    <>
  <Video/>
    <section id="page">
      <section data-testid="top" id="top" style={styles} >
        <div className="message">
          <h1>Level Up your coding game</h1>
          <ul role="list" className="fa-ul">
            <li> <i className="fa fa-arrow-circle-right circle fa-2x" aria-hidden="true"></i>Play with your friends! </li>
            <li> <i className="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i>Multiple programming languages to choose from! </li>
          </ul>
        </div>
      </section>
      <section id="middle">
        <h2>Start your coding journey now!</h2>
        <div className="buttons">
          <button className="button1" onClick={joinRoom}>1 Vs 1</button>
          <button className="button2" onClick={soloRoom}>Solo mode</button>
        </div>
      </section>
    </section> 
    </>
  )
}

export default HomePage
