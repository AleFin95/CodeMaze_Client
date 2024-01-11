import React from 'react'
import { Video } from '../../components';
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const TestPage2 = ({sendMessage, socket, message, setMessage, room, username}) => {

    const [messageReceived, setMessageReceived] = useState("");
    const [user, setUser] = useState("")

    socket.on("get_message", (data) => {
        setMessageReceived(data.message)
    })

  return (
    <>
        <Video/>
        <div>.</div>

        <input placeholder='Message...' onChange={e => {
            setMessage(e.target.value)
        }}/>
        <button onClick={ () => {sendMessage(username)}}>Send Message</button>
        <h1 className='getMsg'>Message : </h1>
        {messageReceived}
    </>
  )
}

export default TestPage2
