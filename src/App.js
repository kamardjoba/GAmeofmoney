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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/username?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setCoins(data.coins);
          setProfilePhotoUrl(data.profilePhotoUrl || defaultIcon);
          setReferralCode(data.referralCode);
          setTelegramLink(data.telegramLink);
          // Устанавливаем прогресс игры из данных пользователя
          const { upgrades } = data.gameProgress;
          setUpgradeLevel(upgrades.coinPerClick.level);
          setUpgradeCost(upgrades.coinPerClick.cost);
          setCoinPerClick(upgrades.coinPerClick.level);
          setClickLimit(upgrades.energy.limit);
          setUpgradeLevelEnergy(upgrades.energy.level);
          setUpgradeCostEnergy(upgrades.energy.cost);
          setValEnergyTime(upgrades.energyTime.val);
          setTime(upgrades.energyTime.time);
          setUpgradeCostEnergyTime(upgrades.energyTime.cost);
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
        const upgrades = {
          coinPerClick: { level: upgradeLevel, cost: upgradeCost },
          energy: { level: upgradeLevelEnergy, cost: upgradeCostEnergy, limit: clickLimit },
          energyTime: { level: upgradeLevelEnergy, cost: upgradeCostEnergyTime, time, val: valEnergyTime }
        };
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            coins,
            upgrades,
            miniGameState: {} // Замените на текущее состояние мини-игры
          }),
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [userId, coins, upgradeLevel, upgradeCost, upgradeLevelEnergy, upgradeCostEnergy, clickLimit, upgradeCostEnergyTime, valEnergyTime, time]);

  // Загружаем данные при открытии
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    setUserId(userId);

    if (userId) {
      loadProgress();
    }
  }, [userId, loadProgress]);

  // Сохраняем данные при закрытии окна
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        await saveProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [saveProgress]);

  // Обновление энергии с интервалом
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyNow((prevEnergyNow) => {
        if (prevEnergyNow < clickLimit) {
          return prevEnergyNow + valEnergyTime; // Изменено
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
  const handleCoinClick = () => {
    if (coinPerClick <= energyNow) {
      setCoins(prevCoins => prevCoins + coinPerClick);
      setEnergyNow(prevEnergyNow => prevEnergyNow - coinPerClick);
    }
  };

  // Улучшение монет за клик
  const CoinPerClickUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins(prevCoins => prevCoins - upgradeCost);
      setCoinPerClick(prevCoinPerClick => prevCoinPerClick + 1);
      setUpgradeLevel(prevUpgradeLevel => prevUpgradeLevel + 1);
      setUpgradeCost(prevUpgradeCost => Math.floor(prevUpgradeCost * 1.5));
    }
  };

  // Улучшение энергии
  const EnergyUpgrade = () => {
    if (coins >= upgradeCostEnergy) {
      setCoins(prevCoins => prevCoins - upgradeCostEnergy);
      setClickLimit(prevClickLimit => prevClickLimit * 2);
      setUpgradeLevelEnergy(prevUpgradeLevelEnergy => prevUpgradeLevelEnergy + 1);
      setUpgradeCostEnergy(prevUpgradeCostEnergy => Math.floor(prevUpgradeCostEnergy * 1.5));
    }
  };

  // Улучшение времени восстановления энергии
  const EnergyTimeUpgrade = () => {
    if (coins >= upgradeCostEnergyTime) {
      setCoins(prevCoins => prevCoins - upgradeCostEnergyTime);
      setValEnergyTime(prevValEnergyTime => prevValEnergyTime * 2);
      setTime(prevTime => prevTime / 2);
      setUpgradeCostEnergyTime(prevUpgradeCostEnergyTime => Math.floor(prevUpgradeCostEnergyTime * 1.5));
    }
  };

  // Открытие/закрытие модальных окон
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

  const handleOpenMiniGame = () => {
    setIsMiniGameOpen(true);
  };

  const handleCloseMiniGame = () => {
    setIsMiniGameOpen(false);
  };

  // Проверка подписки
  const handleCheckSubscription = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok && data.isSubscribed) {
        setCoins(prevCoins => prevCoins + 50000); // Начисляем 50000 монет
        alert('Вы успешно подписались и получили 50000 монет!');
      } else {
        alert('Вы еще не подписаны на канал.');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
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
