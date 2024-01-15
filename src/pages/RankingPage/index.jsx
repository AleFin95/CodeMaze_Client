import React, { useEffect, useState } from 'react';
import './index.css';
import { Video } from '../../components';
import { Leaderboard } from "flywheel-leaderboard";

const RankingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await fetch('https://codemaze-api.onrender.com/users/leaderboard', options);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const leaderboardData = await response.json();
        setData(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
    <Video/>
    <div className='leaderPage'>
    <div className='leaderHeader'>
    <h1>LeaderBoard</h1>
    </div>
    <Leaderboard
          className='leaderboard'
          cell2="username"
          cell3="xp"
          cell4="wins" 
          cell5="losses"
          items={data.map((item, index) => ({ ...item, key: index.toString() }))}
        >
    </Leaderboard>
    </div>
    </>
  )
}

export default RankingPage
