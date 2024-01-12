import React from 'react'
import { Video } from '../../components';
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const TestPage2 = ({sendMessage, leaveRoom, socket, message, setMessage, room, username}) => {

    // const [messageReceived, setMessageReceived] = useState("");
    // const [user, setUser] = useState("")

    // socket.on("get_message", (data) => {
    //     setMessageReceived(data.message)
    // })

  return (
    <>
        {/* <input placeholder='Message...' onChange={e => {
            setMessage(e.target.value)
        }}/>
        <button onClick={ () => {sendMessage(username)}}>Send Message</button>
        <h1 className='getMsg' style={{color:"red"}}>Message : {messageReceived}</h1>
        <button onClick={ () => {leaveRoom()}}>Leave</button> */}
    </>
  )
}

export default TestPage2
