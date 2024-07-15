import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Leaderboard.css';

import ib from '../IMG/Av/IB.png';
import logo from '../IMG/All_Logo/LBoard.png';
// import first from '../IMG/LbBoard/first.png';
// import second from '../IMG/LbBoard/sekond.png';
// import third from '../IMG/LbBoard/last.png';

const REACT_APP_BACKEND_URL = 'https://octiesback-production.up.railway.app';

const Leaderboard = ({ LeaderboardAnim, userId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/leaderboard`);
        if (response.data.success) {
          setLeaderboard(response.data.leaderboard);
        }
      } catch (error) {
        console.error('Ошибка при загрузке лидерборда:', error);
      }
    };

    const fetchUserRank = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/user-rank`, { params: { userId } });
        if (response.data.success) {
          setUserRank(response.data.rank);
        }
      } catch (error) {
        console.error('Ошибка при загрузке позиции пользователя:', error);
      }
    };

    fetchLeaderboard();
    fetchUserRank();
  }, [userId]);

  const getMedal = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className={`Lb_Window ${LeaderboardAnim ? 'fade-out' : ''}`}>
      <div className='lb_Info'>
        <p>Telegram Wall of Fame</p>
      </div>
      
      <div className='Lb_Menu'>
        <div className='LbBorder'>
          <div className='Lb_Logo'>
            <img src={logo} alt='logo'/>
          </div>
          <div className='Lb_Text'>
            <p>🥇The 1st holder will get 400,000 OCTIES</p>
            <p>🥈The 2nd holder will get 250,000 OCTIES</p>
            <p>🥉The 3rd holder will get 100,000 OCTIES</p>
          </div>
        </div>

        <div className='Lb_inside'>
          <div className='LbPhoto'>
            <img src={ib} alt='ib'/><p> Current User <br/><span id='LbColor'>{userRank ? `Rank: ${userRank}` : 'Loading...'}</span></p>
          </div>
        </div>
      
        <div className='Lb_Liders'>
          <p>Top 50 holders</p>
        </div>
        <div className='Lb_list'>
          {leaderboard.map((user, index) => (
            <div key={user._id} className='Lb_Lider'>
              <div className='LbPhotos'>
                <img src={ib} alt='ib'/>
              </div>
              <div className='tt'>
                <p>{user.firstName} ({user.nickname})</p>
                <p id='LbColorr'>{user.coins} OCTIES</p>
              </div>
              <div className='LbPhotos' id="medal">
                <p>{getMedal(index)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
