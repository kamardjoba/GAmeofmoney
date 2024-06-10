import React, { useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import Coindiv from './coin';
import Earn from './earn';
import Ref from './ref';
import Shop from './shop';
import MiniGame from './MiniGame';

function App() {
  const [coins, setCoins] = useState(0);
  const [upgrades, setUpgrades] = useState({
    coinPerClick: { level: 1, cost: 10 },
    energy: { level: 1, cost: 100, limit: 1000 },
    energyTime: { level: 1, cost: 200, time: 2000, val: 0.5 }
  });
  const [miniGameState, setMiniGameState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);

  const userId = new URLSearchParams(window.location.search).get('userId');

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load-progress?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setCoins(data.gameProgress.coins || 0);
          setUpgrades(prevUpgrades => ({
            ...prevUpgrades,
            ...data.gameProgress.upgrades,
          }));
          setMiniGameState(data.gameProgress.miniGameState || {});
        } else {
          console.error('Error loading progress:', data.error);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [userId]);

  useEffect(() => {
    const saveProgress = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, coins, upgrades, miniGameState }),
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    const interval = setInterval(saveProgress, 5000); // Сохранение каждые 5 секунд

    return () => clearInterval(interval);
  }, [userId, coins, upgrades, miniGameState]);

  const handleCoinClick = () => {
    setCoins(prevCoins => prevCoins + upgrades.coinPerClick.level);
  };

  const handleUpgrade = (type) => {
    if (coins >= upgrades[type].cost) {
      setCoins(prevCoins => prevCoins - upgrades[type].cost);
      setUpgrades(prevUpgrades => ({
        ...prevUpgrades,
        [type]: {
          ...prevUpgrades[type],
          level: prevUpgrades[type].level + 1,
          cost: Math.floor(prevUpgrades[type].cost * 1.5)
        }
      }));
    }
  };

  return (
      <div className="App">
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <>
              <div className="info">
                <p>Монеты: {coins}</p>
              </div>
              <div className="main">
                <Coindiv onClick={handleCoinClick} coinPerClick={upgrades.coinPerClick.level} energyNow={1000} />
                <ProgressBar current={1000} max={upgrades.energy.limit} />
                <div className="lower">
                  <button onClick={() => setIsShopOpen(true)}>Shop</button>
                  <button onClick={() => setIsEarnOpen(true)}>Earn</button>
                  <button onClick={() => setIsRefOpen(true)}>Ref</button>
                  <button onClick={() => setIsMiniGameOpen(true)}>Play</button>
                </div>
              </div>

              {isShopOpen && (
                  <Shop
                      coins={coins}
                      onUpgrade={handleUpgrade}
                      onClose={() => setIsShopOpen(false)}
                      upgrades={upgrades}
                  />
              )}

              {isEarnOpen && (
                  <Earn
                      onClose={() => setIsEarnOpen(false)}
                      userId={userId}
                      onCheckSubscription={() => {}}
                  />
              )}

              {isRefOpen && (
                  <Ref
                      onClose={() => setIsRefOpen(false)}
                      userId={userId}
                  />
              )}

              {isMiniGameOpen && (
                  <MiniGame
                      onClose={() => setIsMiniGameOpen(false)}
                      miniGameState={miniGameState}
                      onSaveState={setMiniGameState}
                  />
              )}
            </>
        )}
      </div>
  );
}

export default App;
