import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Video } from '../../components';
import { useAuth } from '../../contexts';
import './index.css';

let user_rooms = {};

export const HomePage = () => {
  const { socket } = useAuth();
  const [room, setRoom] = useState();
  const [username, setUsername] = useState('');
  const [isSolo, setIsSolo] = useState();
  const [roomData, setRoomData] = useState();
  const navigateTo = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user);
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    socket.connect();
    socket.emit('join_room', { username });
  };

  const soloRoom = () => {
    setIsSolo(true);
    soloRoom2();
  };

  const soloRoom2 = () => {
    navigateTo('/game', {
      state: {
        room: 'room',
        username: username,
        isSolo: true,
        roomData: 'roomData'
      }
    });
  };

  useEffect(() => {
    const handleReceiveData = (data) => {
      console.log('data :', data);
      setRoomData(data);
      console.log('roomData homepage : ', roomData);
      setRoom(data.room);
      // user_rooms[data.name] = data.room
      setIsSolo(false);
      battleRoom(data);
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
        roomData: data,
        isSolo: false
      }
    });
  };

  const styles = {
    fontFamily: " 'Lemon', serif",
    marginTop: '1.5em',
    padding: '10px',
    borderRadius: '30px',
    marginRight: '200px',
    marginLeft: '200px',
    marginBottom: '0em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const h2Styles = {
    fontSize: '40px',
    fontFamily: "'Lemon', serif",
    marginBottom: '1em',
    marginTop: '1em'
  };

  const button = {
    backgroundColor: '#7df59b',
    border: 'solid 5px #1e943b',
    outline: 'none',
    cursor: 'pointer',
    padding: '30px',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontFamily: "'Lemon', serif",
    borderRadius: '40px',
    boxShadow:
      '0px 4px 6px rgba(0, 0, 0, 0.1)' /* Adding a subtle shadow for depth ,
    /*transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; */
  };

  const list = {
    fontSize: '40px',
    color: '#4bf275',
    animation: 'arrowBounce 2s infinite'
  };

  const handle1 = () => {
    localStorage.setItem('mode', true);
  };
  const handle2 = () => {
    localStorage.setItem('mode', false);
  };

  return (
    <>
      <Video />
      <section id='page'>
        <section data-testid='top' id='top' style={styles}>
          <h1 style={h2Styles}>Start your coding journey now!</h1>
          <div className='message'>
            <ul className='fa-ul'>
              <li data-testid='list1'>
                <i
                  style={list}
                  data-testid='icon1'
                  className='fa fa-arrow-circle-right circle fa-2x'
                  aria-hidden='true'
                ></i>
                Play with your friends!
              </li>
              <li data-testid='list2'>
                <i
                  style={list}
                  data-testid='icon2'
                  className='fa fa-arrow-circle-right fa-2x'
                  aria-hidden='true'
                ></i>
                Multiple programming languages to choose from!
              </li>
            </ul>
          </div>
          <div className='buttons'>
            <Link id='link1' to='/game'>
              <button
                data-testid='button1'
                style={button}
                className='button1'
                onClick={joinRoom}
              >
                1 Vs 1
              </button>
            </Link>
            <button
              data-testid='button2'
              style={button}
              className='button2'
              onClick={soloRoom}
            >
              Solo mode
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default HomePage;
