import React from 'react'
import { Video } from '../../components';
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import TestPage2 from '../TestPage2';

const socket = io.connect("http://localhost:5000")

const TestPage = () => {

    const [username, setUsername] = useState("");
    const [homePageVisibility, setHomePageVisibility] = useState(true);
    const [message, setMessage] =  useState("");
    const [room, setRoom] = useState()

    const joinRoom = () => {
        socket.emit("join_room", {username}, (data) => {
            setRoom(data.room)
            setHomePageVisibility(false)
        })
    }

    const sendMessage = (username) => {
        let current_room = localStorage.getItem("current_room")
        console.log(current_room)
        socket.emit("send_message", {message, current_room, username})
    };

    useEffect(() => {
        const handleReceiveData = (data) => {
            console.log(data.room);
            setRoom(data.room)
            localStorage.setItem("current_room", data.room)
        };
        
        socket.on('receiveData', handleReceiveData);
    
        return () => {
          // Clean up the event listener when the component is unmounted
          socket.off('receiveData', handleReceiveData);
        };
      }, [socket]);
 
      socket.on("message", data => {
        console.log(data.name + data.message)
      })

  return (
    <div>
        <Video/>
            { homePageVisibility && (<>
                <input placeholder='Username...' onChange={ e => {
                    setUsername(e.target.value)
                }}/>
                    <button onClick={joinRoom}>Join Room</button>
            </>)
            }
        <TestPage2 sendMessage={sendMessage} socket={socket} message={message} setMessage={setMessage} room={room} username={username}/>

    </div>
  )
}

export default TestPage
