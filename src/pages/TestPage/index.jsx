import React from 'react'
import { Video } from '../../components';
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:5000")

const TestPage = () => {

    const [room, setRoom] = useState("");
    const [message, setMessage] =  useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", {room})
        }
    }

    const sendMessage = () => {
        socket.emit("send_message", {message, room})
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message)
        })
    }, [socket])

  return (
    <>
        <Video/>
        <div>TestPage</div>

        <input placeholder='Room Number...' onChange={e => {
            setRoom(e.target.value)
        }}></input>
        <button onClick={joinRoom}>Join Room</button>

        <input placeholder='Username...' onChange={e => {
            setMessage(e.target.value)
        }}/>
        <button onClick={sendMessage}>Send Message</button>

        <h1>Message : </h1>
        {messageReceived}
    </>
  )
}

export default TestPage
