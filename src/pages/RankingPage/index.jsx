import React from 'react'
import './index.css';
import { Video } from '../../components';
import { Leaderboard } from "flywheel-leaderboard";

const RankingPage = () => {
  const data = 
  [
    {
      name: 'Alessia',
      username: '@alefin',
      users: 40,
      XP: 5,
    },
    {
      name: 'Emma',
      username: '@emmaemma',
      users: 105000,
      XP: 4,
    },
    {
      name: 'Khider',
      username: '@akhiderkhider',
      users: 50000,
      XP: 40,

    },
    {
      name: 'Sara',
      username: '@sarasara',
      users: 40000,
      XP:30,
    },
    {
      name: 'Jarvis',
      username: '@0JAJAJA',
      users: 40000,
      XP:30,
    },
    {
      name: 'Ashraf',
      username: '@0ASHSHSH',
      users: 40000,
      XP:30,
    }
  ]
  return (
    <>
    <Video/>
    <div className='leaderPage'>
    <div className='leaderHeader'>
    <h1>LeaderBoard</h1>
    </div>
    <Leaderboard 
      className='leaderboard' 
      scoringMetric="users" //the property you wanna rank your data by (required)
      id="name" //the property you wanna id each item in your data by (required)
      cell2="username" 
      cell3="users" 
      cell5="XP" 
      items={data} //the data you wanna use for your board. e.g. db response. (required)
      > 
    </Leaderboard>
    </div>
    </>
  )
}

export default RankingPage