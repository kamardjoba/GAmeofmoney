// App.js
import React, { useState, useEffect, useCallback } from 'react';
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
import axios from 'axios';

function App() {
  const [coins, setCoins] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [upgradeLevel, setUpgradeLevel] = useState(1);
  const [coinPerClick, setCoinPerClick] = useState(1);
  const [upgradeCostEnergy, setUpgradeCostEnergy] = useState(100);
  const [upgradeLevelEnergy, setUpgradeLevelEnergy] = useState(1);
  const [clickLimit, setClickLimit] = useState(1000);
  const [energyNow, setEnergyNow] = useState(1000);
  const [upgradeCostEnergyTime, setUpgradeCostEnergyTime] = useState(200);
  const [valEnergyTime, setValEnergyTime] = useState(0.5);
  const [time, setTime] = useState(2000);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(defaultIcon);
  const [referralCode, setReferralCode] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Загрузка прогресса
  const loadProgress = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, {
          params: { userId }
        });
        const data = response.data;
        if (response.status === 200) {
          setUsername(data.username);
          setCoins(data.coins);
          setProfilePhotoUrl(data.profilePhotoUrl || defaultIcon);
          setReferralCode(data.referralCode);
          setTelegramLink(data.telegramLink);
          // Устанавливаем прогресс игры из данных пользователя
          setUpgradeCost(data.upgradeCost);
          setUpgradeLevel(data.upgradeLevel);
          setCoinPerClick(data.coinPerClick);
          setClickLimit(data.clickLimit);
          setUpgradeCostEnergy(data.upgradeCostEnergy);
          setUpgradeLevelEnergy(data.upgradeLevelEnergy);
          setEnergyNow(data.energyNow);
          setValEnergyTime(data.valEnergyTime);
          setTime(data.time);
          setUpgradeCostEnergyTime(data.upgradeCostEnergyTime);
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [userId]);

  // Сохранение прогресса
  const saveProgress = useCallback(async () => {
    if (userId) {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
          userId,
          coins,
          upgradeCost,
          upgradeLevel,
          coinPerClick,
          upgradeCostEnergy,
          upgradeLevelEnergy,
          clickLimit,
          energyNow,
          upgradeCostEnergyTime,
          valEnergyTime,
          time
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [userId, coins, upgradeCost, upgradeLevel, coinPerClick, upgradeCostEnergy, upgradeLevelEnergy, clickLimit, energyNow, upgradeCostEnergyTime, valEnergyTime, time]);

  // Загрузка данных при открытии
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromURL = urlParams.get('userId');
    setUserId(userIdFromURL);

    if (userIdFromURL) {
      loadProgress().catch((error) => console.error('Error loading progress:', error));
    }
  }, [loadProgress]);

  // Обновление энергии с интервалом
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyNow((prevEnergyNow) => {
        if (prevEnergyNow < clickLimit) {
          return prevEnergyNow + valEnergyTime;
        } else {
          return prevEnergyNow;
        }
      });
    }, time);

    return () => {
      clearInterval(interval);
    };
  }, [clickLimit, time, valEnergyTime]);

  // Обработка клика по монете
  const handleCoinClick = async () => {
    if (coinPerClick <= energyNow) {
      setCoins(prevCoins => {
        const newCoins = prevCoins + coinPerClick;
        saveProgressData(newCoins, energyNow - coinPerClick);
        return newCoins;
      });
      setEnergyNow(prevEnergyNow => prevEnergyNow - coinPerClick);
    }
  };

  // Улучшение монет за клик
  const CoinPerClickUpgrade = async () => {
    if (coins >= upgradeCost) {
      setCoins(prevCoins => {
        const newCoins = prevCoins - upgradeCost;
        saveProgressData(newCoins);
        return newCoins;
      });
      setCoinPerClick(prevCoinPerClick => prevCoinPerClick + 1);
      setUpgradeLevel(prevUpgradeLevel => prevUpgradeLevel + 1);
      setUpgradeCost(prevUpgradeCost => Math.floor(prevUpgradeCost * 1.5));
    }
  };

  // Улучшение энергии
  const EnergyUpgrade = async () => {
    if (coins >= upgradeCostEnergy) {
      setCoins(prevCoins => {
        const newCoins = prevCoins - upgradeCostEnergy;
        saveProgressData(newCoins);
        return newCoins;
      });
      setClickLimit(prevClickLimit => prevClickLimit * 2);
      setUpgradeLevelEnergy(prevUpgradeLevelEnergy => prevUpgradeLevelEnergy + 1);
      setUpgradeCostEnergy(prevUpgradeCostEnergy => Math.floor(prevUpgradeCostEnergy * 1.5));
    }
  };

  // Улучшение времени восстановления энергии
  const EnergyTimeUpgrade = async () => {
    if (coins >= upgradeCostEnergyTime) {
      setCoins(prevCoins => {
        const newCoins = prevCoins - upgradeCostEnergyTime;
        saveProgressData(newCoins);
        return newCoins;
      });
      setValEnergyTime(prevValEnergyTime => prevValEnergyTime * 2);
      setTime(prevTime => prevTime / 2);
      setUpgradeCostEnergyTime(prevUpgradeCostEnergyTime => Math.floor(prevUpgradeCostEnergyTime * 1.5));
    }
  };

  // Открытие/закрытие модальных окон
  const handleOpenShop = () => {
    setIsShopOpen(true);
  };

  const handleCloseShop = async () => {
    await saveProgress().catch((error) => console.error('Error saving progress:', error));
    setIsShopOpen(false);
  };

  const handleOpenRef = () => {
    setIsRefOpen(true);
  };

  const handleCloseRef = async () => {
    await saveProgress().catch((error) => console.error('Error saving progress:', error));
    setIsRefOpen(false);
  };

  const handleOpenEarn = () => {
    setIsEarnOpen(true);
  };

  const handleCloseEarn = async () => {
    await saveProgress().catch((error) => console.error('Error saving progress:', error));
    setIsEarnOpen(false);
  };

  const handleOpenMiniGame = () => {
    setIsMiniGameOpen(true);
  };

  const handleCloseMiniGame = async () => {
    await saveProgress().catch((error) => console.error('Error saving progress:', error));
    setIsMiniGameOpen(false);
  };

  // Проверка подписки
  const handleCheckSubscription = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, { userId });
      const data = response.data;
      if (response.status === 200 && data.isSubscribed) {
        setCoins(prevCoins => prevCoins + 50000); // Начисляем 50000 монет
        alert('Вы успешно подписались и получили 50000 монет!');
      } else {
        alert('Вы еще не подписаны на канал.');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  // Функция для сохранения данных
  const saveProgressData = async (newCoins = coins, newEnergyNow = energyNow) => {
    await saveProgress().catch((error) => console.error('Error saving progress:', error));
  };

  return (
      <div className="App">
        {loading ? <div>Loading...</div> : (
            <>
              <div className="info">
                <img src={profilePhotoUrl} alt="Profile" className="profile-icon" />
                <p>{username}</p>
                <img src={logo} alt="Bifclif" />
              </div>
              <div className="main">
                <div className="mainInfo">
                  <div className="halfBox">
                    <div className="halfBoxDiv">
                      <p>Монет за клик</p>
                      <p>+{coinPerClick} <img src={coinIcon} alt="Coin" className="coin-image" /></p>
                    </div>
                  </div>
                  <div className="halfBox">
                    <div className="halfBoxDiv">
                      <p>Энергия</p>
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
                      <p>Заработать</p>
                      <p>💸</p>
                    </div>
                    <div className="BTNLOW" onClick={handleOpenShop}>
                      <p>Магазин</p>
                      <p>🛒</p>
                    </div>
                    <div className="BTNLOW" onClick={handleOpenRef}>
                      <p>Реф</p>
                      <p>👥</p>
                    </div>
                    <div className="BTNLOW" onClick={handleOpenMiniGame}>
                      <p>Играть</p>
                      <p>🚀</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )}

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
                onClose={handleCloseShop}
                onUpgrade={CoinPerClickUpgrade}
                onUpgradeEnergy={EnergyUpgrade}
                onUpgradeEnergyTime={EnergyTimeUpgrade}
            />
        )}

        {isRefOpen && (
            <Ref onClose={handleCloseRef} userId={userId} />
        )}

        {isEarnOpen && (
            <Earn onClose={handleCloseEarn} userId={userId} onCheckSubscription={handleCheckSubscription} />
        )}

        {isMiniGameOpen && (
            <MiniGame onClose={handleCloseMiniGame} />
        )}

        <div className="referral-section">
          <p>Ваш реферальный код: {referralCode}</p>
          <p>Поделитесь этой ссылкой, чтобы пригласить друзей:</p>
          <p>{telegramLink}</p>
        </div>
      </div>
  );
}

export default App;
