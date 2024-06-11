// App.js
import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import defaultIcon from './IMG/N.png';
import logo from './IMG/b.png';
import coinIcon from './IMG/CU.png';
import BB from './IMG/BB.png';
import ProgressBar from './ProgressBar';
import Shop from './shop';
import Coindiv from './coin';
import Ref from './ref';
import Earn from './earn';
import MiniGame from './MiniGame';
import { debounce } from 'lodash';

// Initial state for useReducer
const initialState = {
  coins: 0,
  upgradeCost: 10,
  upgradeLevel: 1,
  coinPerClick: 1,
  upgradeCostEnergy: 100,
  upgradeLevelEnergy: 1,
  clickLimit: 1000,
  energyNow: 1000,
  upgradeCostEnergyTime: 200,
  valEnergyTime: 0.5,
  time: 2000,
  isShopOpen: false,
  isRefOpen: false,
  isEarnOpen: false,
  isMiniGameOpen: false,
  username: '',
  profilePhotoUrl: defaultIcon,
  referralCode: '',
  telegramLink: '',
  loading: true,
  userId: null,
};

// Reducer function for useReducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload };
    case 'INCREMENT_COINS':
      return { ...state, coins: state.coins + action.payload };
    case 'DECREMENT_COINS':
      return { ...state, coins: state.coins - action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'TOGGLE_SHOP':
      return { ...state, isShopOpen: !state.isShopOpen };
    case 'TOGGLE_REF':
      return { ...state, isRefOpen: !state.isRefOpen };
    case 'TOGGLE_EARN':
      return { ...state, isEarnOpen: !state.isEarnOpen };
    case 'TOGGLE_MINI_GAME':
      return { ...state, isMiniGameOpen: !state.isMiniGameOpen };
    default:
      return state;
  }
}

const debouncedSaveProgress = debounce(async (state) => {
  if (state.userId) {
    try {
      const upgrades = {
        coinPerClick: { level: state.upgradeLevel, cost: state.upgradeCost },
        energy: { level: state.upgradeLevelEnergy, cost: state.upgradeCostEnergy, limit: state.clickLimit },
        energyTime: { level: state.upgradeLevelEnergy, cost: state.upgradeCostEnergyTime, time: state.time, val: state.valEnergyTime }
      };
      const data = {
        userId: state.userId,
        coins: state.coins,
        upgrades,
        miniGameState: {} // Replace with the current mini-game state
      };

      const url = `${process.env.REACT_APP_BACKEND_URL}/save-progress`;
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }
}, 300);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveProgress = useCallback(() => {
    const progressState = {
      userId: state.userId,
      coins: state.coins,
      upgradeLevel: state.upgradeLevel,
      upgradeCost: state.upgradeCost,
      upgradeLevelEnergy: state.upgradeLevelEnergy,
      upgradeCostEnergy: state.upgradeCostEnergy,
      clickLimit: state.clickLimit,
      upgradeCostEnergyTime: state.upgradeCostEnergyTime,
      valEnergyTime: state.valEnergyTime,
      time: state.time
    };
    debouncedSaveProgress(progressState);
  }, [
    state.userId,
    state.coins,
    state.upgradeLevel,
    state.upgradeCost,
    state.upgradeLevelEnergy,
    state.upgradeCostEnergy,
    state.clickLimit,
    state.upgradeCostEnergyTime,
    state.valEnergyTime,
    state.time
  ]);

  const loadProgress = useCallback(async () => {
    if (state.userId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load-progress?userId=${state.userId}`);
        const data = await response.json();
        if (response.ok) {
          const gameProgress = data.gameProgress || {};
          const upgrades = gameProgress.upgrades || {};

          dispatch({
            type: 'SET_STATE',
            payload: {
              username: data.username || '',
              coins: data.coins || 0,
              profilePhotoUrl: data.profilePhotoUrl || defaultIcon,
              referralCode: data.referralCode || '',
              telegramLink: data.telegramLink || '',
              upgradeLevel: upgrades.coinPerClick?.level || 1,
              upgradeCost: upgrades.coinPerClick?.cost || 10,
              coinPerClick: upgrades.coinPerClick?.level || 1,
              clickLimit: upgrades.energy?.limit || 1000,
              upgradeLevelEnergy: upgrades.energy?.level || 1,
              upgradeCostEnergy: upgrades.energy?.cost || 100,
              valEnergyTime: upgrades.energyTime?.val || 0.5,
              time: upgrades.energyTime?.time || 2000,
              upgradeCostEnergyTime: upgrades.energyTime?.cost || 200
            }
          });
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.userId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    dispatch({ type: 'SET_STATE', payload: { userId } });

    if (userId) {
      loadProgress().catch((error) => console.error('Error loading progress:', error));
    }
  }, [loadProgress]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [saveProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'SET_STATE',
        payload: {
          energyNow: Math.min(state.energyNow + state.valEnergyTime, state.clickLimit)
        }
      });
    }, state.time);

    return () => clearInterval(interval);
  }, [state.clickLimit, state.time, state.valEnergyTime, state.energyNow]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
      dispatch({ type: 'SET_STATE', payload: savedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  const handleCoinClick = useCallback(() => {
    if (state.coinPerClick <= state.energyNow) {
      dispatch({ type: 'INCREMENT_COINS', payload: state.coinPerClick });
      dispatch({ type: 'SET_STATE', payload: { energyNow: state.energyNow - state.coinPerClick } });
    }
  }, [state.coinPerClick, state.energyNow]);

  const CoinPerClickUpgrade = useCallback(() => {
    if (state.coins >= state.upgradeCost) {
      dispatch({ type: 'DECREMENT_COINS', payload: state.upgradeCost });
      dispatch({
        type: 'SET_STATE',
        payload: {
          coinPerClick: state.coinPerClick + 1,
          upgradeLevel: state.upgradeLevel + 1,
          upgradeCost: Math.floor(state.upgradeCost * 1.5)
        }
      });
    }
  }, [state.coins, state.upgradeCost, state.coinPerClick, state.upgradeLevel]);

  const EnergyUpgrade = useCallback(() => {
    if (state.coins >= state.upgradeCostEnergy) {
      dispatch({ type: 'DECREMENT_COINS', payload: state.upgradeCostEnergy });
      dispatch({
        type: 'SET_STATE',
        payload: {
          clickLimit: state.clickLimit * 2,
          upgradeLevelEnergy: state.upgradeLevelEnergy + 1,
          upgradeCostEnergy: Math.floor(state.upgradeCostEnergy * 1.5)
        }
      });
    }
  }, [state.coins, state.upgradeCostEnergy, state.clickLimit, state.upgradeLevelEnergy]);

  const EnergyTimeUpgrade = useCallback(() => {
    if (state.coins >= state.upgradeCostEnergyTime) {
      dispatch({ type: 'DECREMENT_COINS', payload: state.upgradeCostEnergyTime });
      dispatch({
        type: 'SET_STATE',
        payload: {
          valEnergyTime: state.valEnergyTime * 2,
          time: state.time / 2,
          upgradeCostEnergyTime: Math.floor(state.upgradeCostEnergyTime * 1.5)
        }
      });
    }
  }, [state.coins, state.upgradeCostEnergyTime, state.valEnergyTime, state.time]);

  const handleCheckSubscription = useCallback(async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok && data.isSubscribed) {
        dispatch({ type: 'INCREMENT_COINS', payload: 50000 });
        alert('You have successfully subscribed and received 50000 coins!');
      } else {
        alert('You are not yet subscribed to the channel.');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  }, []);

  const MemoizedProfileInfo = useMemo(() => (
      <ProfileInfo username={state.username} profilePhotoUrl={state.profilePhotoUrl} />
  ), [state.username, state.profilePhotoUrl]);

  const MemoizedCoinInfo = useMemo(() => (
      <CoinInfo coins={state.coins} />
  ), [state.coins]);

  return (
      <div className="App">
        {state.loading ? <div>Loading...</div> : (
            <>
              {MemoizedProfileInfo}
              <div className="main">
                <div className="mainInfo">
                  <div className="halfBox">
                    <div className="halfBoxDiv">
                      <p>Coins per Click</p>
                      <p>+{state.coinPerClick} <img src={coinIcon} alt="Coin" className="coin-image" /></p>
                    </div>
                  </div>
                  <div className="halfBox">
                    <div className="halfBoxDiv">
                      <p>Energy</p>
                      <p>{state.energyNow} / {state.clickLimit} <img src={BB} alt="Battery" className="coin-image" /></p>
                    </div>
                  </div>
                </div>
                {MemoizedCoinInfo}
                <Coindiv onClick={handleCoinClick} coinPerClick={state.coinPerClick} energyNow={state.energyNow} />
                <div className="Progress">
                  <ProgressBar current={state.energyNow} max={state.clickLimit} />
                </div>
                <div className="lower">
                  <div className="lowerDiv">
                    <div className="BTNLOW" onClick={() => dispatch({ type: 'TOGGLE_EARN' })}>
                      <p>Earn</p>
                      <p>💸</p>
                    </div>
                    <div className="BTNLOW" onClick={() => dispatch({ type: 'TOGGLE_SHOP' })}>
                      <p>Shop</p>
                      <p>🛒</p>
                    </div>
                    <div className="BTNLOW" onClick={() => dispatch({ type: 'TOGGLE_REF' })}>
                      <p>Ref</p>
                      <p>👥</p>
                    </div>
                    <div className="BTNLOW" onClick={() => dispatch({ type: 'TOGGLE_MINI_GAME' })}>
                      <p>Play</p>
                      <p>🚀</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )}

        {state.isShopOpen && (
            <Shop
                coins={state.coins}
                coinPerClick={state.coinPerClick}
                upgradeCost={state.upgradeCost}
                upgradeLevel={state.upgradeLevel}
                clickLimit={state.clickLimit}
                upgradeCostEnergy={state.upgradeCostEnergy}
                upgradeLevelEnergy={state.upgradeLevelEnergy}
                upgradeCostEnergyTime={state.upgradeCostEnergyTime}
                valEnergyTime={state.valEnergyTime}
                onClose={() => dispatch({ type: 'TOGGLE_SHOP' })}
                onUpgrade={CoinPerClickUpgrade}
                onUpgradeEnergy={EnergyUpgrade}
                onUpgradeEnergyTime={EnergyTimeUpgrade}
            />
        )}

        {state.isRefOpen && (
            <Ref onClose={() => dispatch({ type: 'TOGGLE_REF' })} userId={state.userId} />
        )}

        {state.isEarnOpen && (
            <Earn onClose={() => dispatch({ type: 'TOGGLE_EARN' })} userId={state.userId} onCheckSubscription={handleCheckSubscription} />
        )}

        {state.isMiniGameOpen && (
            <MiniGame onClose={() => dispatch({ type: 'TOGGLE_MINI_GAME' })} />
        )}

        <div className="referral-section">
          <p>Your referral code: {state.referralCode}</p>
          <p>Share this link to invite friends:</p>
          <p>{state.telegramLink}</p>
        </div>
      </div>
  );
};

const ProfileInfo = React.memo(({ username, profilePhotoUrl }) => (
    <div className="info">
      <img src={profilePhotoUrl} alt="Profile" className="profile-icon" />
      <p>{username}</p>
      <img src={logo} alt="Logo" />
    </div>
));

const CoinInfo = React.memo(({ coins }) => (
    <div className="CoinInfo">
      <img src={coinIcon} alt="Coin" height="90%" />
      <p>{coins}</p>
    </div>
));

export default App;
