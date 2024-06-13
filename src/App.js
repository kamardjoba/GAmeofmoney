// App.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const updateProfilePhoto = useCallback(async (telegramId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-profile-photo`, { telegramId });
      if (response.data.success) {
        setProfilePhotoUrl(response.data.profilePhotoUrl || defaultIcon);
      } else {
        console.error('Error updating profile photo:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, { params: { userId } });
        const data = response.data;
        if (response.status === 200) {
          setUsername(data.username);
          setCoins(data.coins);
          setProfilePhotoUrl(data.profilePhotoUrl || defaultIcon);
          setReferralCode(data.referralCode);
          setTelegramLink(data.telegramLink);
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

  const saveProgress = useCallback(async () => {
    if (userId) {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
          userId, coins, upgradeCost, upgradeLevel, coinPerClick,
          upgradeCostEnergy, upgradeLevelEnergy, clickLimit, energyNow,
          upgradeCostEnergyTime, valEnergyTime, time
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [userId, coins, upgradeCost, upgradeLevel, coinPerClick,
    upgradeCostEnergy, upgradeLevelEnergy, clickLimit, energyNow,
    upgradeCostEnergyTime, valEnergyTime, time]);

  useEffect(() => {
    const loadAndUpdate = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromURL = urlParams.get('userId');
      setUserId(userIdFromURL);

      if (userIdFromURL) {
        await updateProfilePhoto(userIdFromURL);
        await loadProgress();
      }
      setLoading(false);
    };
    loadAndUpdate().catch(error => console.error('Error loading progress:', error));
  }, [loadProgress, updateProfilePhoto]);

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

  const handleCoinClick = useCallback(async () => {
    if (coinPerClick <= energyNow) {
      setCoins(prevCoins => {
        const newCoins = prevCoins + coinPerClick;
        saveProgressData(newCoins, energyNow - coinPerClick);
        return newCoins;
      });
      setEnergyNow(prevEnergyNow => prevEnergyNow - coinPerClick);
    }
  }, [coinPerClick, energyNow]);

  const CoinPerClickUpgrade = useCallback(async () => {
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
  }, [coins, upgradeCost]);

  const EnergyUpgrade = useCallback(async () => {
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
  }, [coins, upgradeCostEnergy]);

  const EnergyTimeUpgrade = useCallback(async () => {
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
  }, [coins, upgradeCostEnergyTime]);

  const handleOpenShop = useCallback(() => {
    setIsShopOpen(true);
  }, []);

  const handleCloseShop = useCallback(async () => {
    await saveProgress();
    setIsShopOpen(false);
  }, [saveProgress]);

  const handleOpenRef = useCallback(() => {
    setIsRefOpen(true);
  }, []);

  const handleCloseRef = useCallback(async () => {
    await saveProgress();
    setIsRefOpen(false);
  }, [saveProgress]);

  const handleOpenEarn = useCallback(() => {
    setIsEarnOpen(true);
  }, []);

  const handleCloseEarn = useCallback(async () => {
    await saveProgress();
    setIsEarnOpen(false);
  }, [saveProgress]);

  const handleOpenMiniGame = useCallback(() => {
    setIsMiniGameOpen(true);
  }, []);

  const handleCloseMiniGame = useCallback(async () => {
    await saveProgress();
    setIsMiniGameOpen(false);
  }, [saveProgress]);

  const handleCheckSubscription = useCallback(async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, { userId });
      const data = response.data;
      if (response.status === 200 && data.isSubscribed && !data.hasCheckedSubscription) {
        setCoins(prevCoins => prevCoins + 5000); // Начисляем 5000 монет при первой подписке
      }
      return data;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { success: false, message: 'Произошла ошибка при проверке подписки.' };
    }
  }, []);

  const saveProgressData = useCallback(async (newCoins = coins, newEnergyNow = energyNow) => {
    await saveProgress();
  }, [coins, energyNow, saveProgress]);

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
            <Ref
                onClose={handleCloseRef}
                userId={userId}
                telegramLink={telegramLink}
            />
        )}

        {isEarnOpen && (
            <Earn
                onClose={handleCloseEarn}
                userId={userId}
                onCheckSubscription={handleCheckSubscription}
            />
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
