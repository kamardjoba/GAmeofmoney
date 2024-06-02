import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import coinIcon from './IMG/CU.png';
import Icon from './IMG/N.png';
import logo from './IMG/b.png';
import BB from './IMG/BB.png';
import ProgressBar from './ProgressBar';
import Shop from './shop';
import Coindiv from './coin';
import Ref from './ref';
import Earn from './earn';

// Функция для получения параметра из URL
const getTelegramIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('telegramId');
};

function App() {
  const [clicks, setClicks] = useState(0);
  const [coins, setCoins] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [upgradeLevel, setUpgradeLevel] = useState(1);
  const [coinPerClick, setCoinPerClick] = useState(1);
  const [upgradeCostEnergy, setUpgradeCostEnergy] = useState(100);
  const [upgradeLevelEnergy, setUpgradeLevelEnergy] = useState(1);
  const [clickLimit, setClickLimit] = useState(1000);
  const [energyNow, setEnergyNow] = useState(1000);
  const [upgradeCostEnergyTime, setUpgradeCostEnergyTime] = useState(200);
  const [valEnergyTime, setvalEnergyTime] = useState(0.5);
  const [upgradeEnergyTimeLevel, setupgradeEnergyTimeLevel] = useState(1);
  const [time, setTime] = useState(2000);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [username, setUsername] = useState('');

  const telegramId = getTelegramIdFromUrl();

  const saveProgress = async (progress) => {
    try {
      const response = await axios.post('http://localhost:3000/api/progress', { telegramId, progress });
      console.log('Progress saved:', response.data);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const getProgress = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/progress/${telegramId}`);
      const userData = response.data;
      setClicks(userData.coins);
      setUpgradeLevel(userData.upgradeLevel);
      setCoinPerClick(userData.coinPerClick);
      setClickLimit(userData.clickLimit);
      setEnergyNow(userData.energyNow);
      setUpgradeCost(userData.upgradeCost);
      setUpgradeCostEnergy(userData.upgradeCostEnergy);
      setUpgradeLevelEnergy(userData.upgradeLevelEnergy);
      setUpgradeCostEnergyTime(userData.upgradeCostEnergyTime);
      setvalEnergyTime(userData.valEnergyTime);
      setupgradeEnergyTimeLevel(userData.upgradeEnergyTimeLevel);
      setTime(userData.time);
      setUsername(userData.username); // Установить имя пользователя
    } catch (error) {
      console.error('Error getting progress:', error);
    }
  }, [telegramId]);

  useEffect(() => {
    if (telegramId) {
      getProgress().catch(error => console.error('Error in useEffect:', error));
    }
  }, [telegramId, getProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyNow((energyNow) => {
        if (energyNow < clickLimit) {
          return energyNow + 1;
        } else {
          return energyNow;
        }
      });
    }, time);

    return () => clearInterval(interval);
  }, [clickLimit, time]);

  const handleCoinClick = async () => {
    if (coinPerClick <= energyNow) {
      setCoins(coins + coinPerClick);
      setEnergyNow(energyNow - coinPerClick);
      setClicks(clicks + 1);
      await saveProgress({ coins: coins + coinPerClick, energyNow: energyNow - coinPerClick });
    }
  };

  const CoinPerClickUpgrade = async () => {
    if (coins >= upgradeCost) {
      setCoins(coins - upgradeCost);
      setCoinPerClick(coinPerClick + 1);
      setUpgradeLevel(upgradeLevel + 1);
      setUpgradeCost(Math.floor(upgradeCost * 1.5));
      await saveProgress({
        coins: coins - upgradeCost,
        coinPerClick: coinPerClick + 1,
        upgradeLevel: upgradeLevel + 1,
        upgradeCost: Math.floor(upgradeCost * 1.5)
      });
    }
  };

  const EnergyUpgrade = async () => {
    if (coins >= upgradeCostEnergy) {
      setCoins(coins - upgradeCostEnergy);
      setClickLimit(clickLimit * 2);
      setUpgradeLevelEnergy(upgradeLevelEnergy + 1);
      setUpgradeCostEnergy(Math.floor(upgradeCostEnergy * 1.5));
      await saveProgress({
        coins: coins - upgradeCostEnergy,
        clickLimit: clickLimit * 2,
        upgradeLevelEnergy: upgradeLevelEnergy + 1,
        upgradeCostEnergy: Math.floor(upgradeCostEnergy * 1.5)
      });
    }
  };

  const EnergyTimeUpgrade = async () => {
    if (coins >= upgradeCostEnergyTime) {
      setCoins(coins - upgradeCostEnergyTime);
      setvalEnergyTime(valEnergyTime * 2);
      setupgradeEnergyTimeLevel(upgradeEnergyTimeLevel + 1);
      setTime(time / 2);
      setUpgradeCostEnergyTime(Math.floor(upgradeCostEnergyTime * 1.5));
      await saveProgress({
        coins: coins - upgradeCostEnergyTime,
        valEnergyTime: valEnergyTime * 2,
        upgradeEnergyTimeLevel: upgradeEnergyTimeLevel + 1,
        time: time / 2,
        upgradeCostEnergyTime: Math.floor(upgradeCostEnergyTime * 1.5)
      });
    }
  };

  const handleOpenShop = () => {
    setIsShopOpen(true);
  };

  const handleCloseShop = () => {
    setIsShopOpen(false);
  };

  const handleOpenRef = () => {
    setIsRefOpen(true);
  };

  const handleCloseRef = () => {
    setIsRefOpen(false);
  };

  const handleOpenEarn = () => {
    setIsEarnOpen(true);
  };

  const handleCloseEarn = () => {
    setIsEarnOpen(false);
  };

  return (
      <div className="App">
        <div className="info">
          <img src={Icon} alt="Icon" />
          <p>{username}</p> {/* Отображение имени пользователя */}
          <img src={logo} alt="Bifclif" />
        </div>
        <div className="main">
          <div className="mainInfo">
            <div className="halfBox">
              <div className="halfBoxDiv">
                <p>Coin Per Tap</p>
                <p>+{coinPerClick} <img src={coinIcon} alt="Coin" className="coin-image" /></p>
              </div>
            </div>
            <div className="halfBox">
              <div className="halfBoxDiv">
                <p>Energy</p>
                <p>{clickLimit} / {energyNow}<img src={BB} alt="Battery" className="coin-image" /></p>
              </div>
            </div>
          </div>
          <div className="CoinInfo">
            <img src={coinIcon} alt="Coin" height="90%" />
            <p>{coins}</p>
          </div>
          <Coindiv onClick={handleCoinClick} coinPerClick={coinPerClick} energyNow={energyNow} />
          <div className="Progress">
            <ProgressBar current={energyNow} max={clickLimit} />
          </div>
          <div className="lower">
            <div className="lowerDiv">
              <div className="BTNLOW" onClick={handleOpenEarn}>
                <p>Earn</p>
                <p>💸</p>
              </div>
              <div className="BTNLOW" onClick={handleOpenShop}>
                <p>Shop</p>
                <p>🛒</p>
              </div>
              <div className="BTNLOW" onClick={handleOpenRef}>
                <p>Ref</p>
                <p>👥</p>
              </div>
              <div className="BTNLOW">
                <p>🚀</p>
              </div>
            </div>
          </div>
        </div>

        {isShopOpen && (
            <Shop
                coins={coins}
                coinPerClick={coinPerClick}
                upgradeCost={upgradeCost}
                upgradeLevel={upgradeLevel}
                clickLimit={clickLimit}
                upgradeCostEnergy={upgradeCostEnergy}
                upgradeLevelEnergy={upgradeLevelEnergy}
                upgradeCostEnergyTime={upgradeCostEnergyTime}
                valEnergyTime={valEnergyTime}
                upgradeEnergyTimeLevel={upgradeEnergyTimeLevel}
                onClose={handleCloseShop}
                onUpgrade={CoinPerClickUpgrade}
                onUpgradeEnergy={EnergyUpgrade}
                onUpgradeEnergyTime={EnergyTimeUpgrade}
            />
        )}

        {isRefOpen && (
            <Ref onClose={handleCloseRef} />
        )}

        {isEarnOpen && (
            <Earn onClose={handleCloseEarn} />
        )}
      </div>
  );
}

export default App;
