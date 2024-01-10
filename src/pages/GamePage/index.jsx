import React from 'react'
import '../../assets/App.css';
import './index.css';
import { Video } from '../../components';

const GamePage = () => {
  return (
    <>
    <Video/>
    <div className='gamePage'>
    <div className='gameHeader'>
    <h1>GamePage</h1>
    </div>
    <p>Where the editor goes</p>
    </div>
    </>
  )
}

export default GamePage