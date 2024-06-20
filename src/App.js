import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios';
import Icon from './IMG/logo.png';
import inviteIcon from './IMG/LowerIcon/Invite_Icon.png';
import lootIcon from './IMG/LowerIcon/Loot_Icon.png';
import p2eIcon from './IMG/LowerIcon/P2E_Icon.png';
import shopIcon from './IMG/LowerIcon/Shop_Icon.png';
import earnIcon from './IMG/earn.png';
import MainLogo from './IMG/mainLogo.png';
import InviteLogo from './IMG/inviteLogo.png';
import EarnLogo from './IMG/earnLogo.png';
import defaultIcon from './IMG/ink.png';
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
  const [telegramLink, setTelegramLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(defaultIcon);
  const [referralCode, setReferralCode] = useState('');

  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isInviteLogoVisible, setisInviteLogoVisible] = useState(false);
  const [isEarnLogoVisible, setisEarnLogoVisible] = useState(false);



  // Функция для загрузки прогресса пользователя
  const loadProgress = useCallback(async () => {
    if (userId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, { params: { userId } });
        const data = response.data;
        if (response.status === 200) {
          setUsername(data.username);
          setCoins(data.coins);
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
          setProfilePhotoUrl(data.profilePhotoUrl || defaultIcon);
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

  // Функция для обновления фото профиля
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

  // Сохранение прогресса пользователя
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

  // Автоматическое восстановление энергии
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

  const saveProgressData = useCallback(async (newCoins = coins, newEnergyNow = energyNow) => {
    await saveProgress();
  }, [coins, energyNow, saveProgress]);

  // Обработка нажатия на монету
  const handleCoinClick = useCallback(async () => {
    if (coinPerClick <= energyNow) {
      setCoins(prevCoins => {
        const newCoins = prevCoins + coinPerClick;
        saveProgressData(newCoins, energyNow - coinPerClick);
        return newCoins;
      });
      setEnergyNow(prevEnergyNow => prevEnergyNow - coinPerClick);
    }
  }, [coinPerClick, energyNow, saveProgressData]);

  // Апгрейд стоимости клика
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
  }, [coins, upgradeCost, saveProgressData]);

  // Апгрейд энергии
  const EnergyUpgrade = useCallback(async () => {
    if (coins >= upgradeCostEnergy) {
      setCoins(prevCoins => {
        const newCoins = prevCoins - upgradeCostEnergy;
        saveProgressData(newCoins);
        return newCoins;
      });
      setClickLimit(prevClickLimit => prevClickLimit * 2);
      setUpgradeLevelEnergy(prevUpgradeLevelEnergy => prevUpgradeLevelEnergy + 1);
      setUpgradeCostEnergy(prevUpgradeCost => Math.floor(prevUpgradeCost * 1.5));
    }
  }, [coins, upgradeCostEnergy, saveProgressData]);

  // Апгрейд времени восстановления энергии
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
  }, [coins, upgradeCostEnergyTime, saveProgressData]);

  // Открытие магазина
  const handleOpenShop = useCallback(() => {
    setIsShopOpen(true);

    // Настройка кнопки "Назад" через Telegram API
    if (window.Telegram.WebApp) {
      if (!window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.show();
      }
      window.Telegram.WebApp.BackButton.offClick(); // Убираем старые обработчики
      window.Telegram.WebApp.BackButton.onClick(() => {
        setIsShopOpen(false);
        if (window.Telegram.WebApp.BackButton.isVisible) {
          window.Telegram.WebApp.BackButton.hide(); // Скрываем кнопку только при закрытии
        }
      });
    }
  }, []);

  // Закрытие магазина
  const handleCloseShop = useCallback(async () => {
    setIsShopOpen(false);
    await saveProgress();

    // Скрытие кнопки "Назад" при закрытии
    if (window.Telegram.WebApp && window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [saveProgress]);

  // Открытие реферального раздела
  const handleOpenRef = useCallback(() => {
    setIsRefOpen(true);
    setisInviteLogoVisible(true);
    setIsLogoVisible(false);

    // Настройка кнопки "Назад" через Telegram API
    if (window.Telegram.WebApp) {
      if (!window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.show();
      }
      window.Telegram.WebApp.BackButton.offClick(); // Убираем старые обработчики
      window.Telegram.WebApp.BackButton.onClick(() => {
        setIsRefOpen(false);
        setisInviteLogoVisible(false);
        setIsLogoVisible(true);
        if (window.Telegram.WebApp.BackButton.isVisible) {
          window.Telegram.WebApp.BackButton.hide(); // Скрываем кнопку только при закрытии
        }
      });
    }
  }, []);

  // Закрытие реферального раздела
  const handleCloseRef = useCallback(async () => {
    setisInviteLogoVisible(false);
    setIsLogoVisible(true);
    setTimeout(() => {
      setIsRefOpen(false);
    }, 190);
    await saveProgress();

    // Скрытие кнопки "Назад" при закрытии
    if (window.Telegram.WebApp && window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [saveProgress]);

  // Открытие раздела заработка
  const handleOpenEarn = useCallback(() => {
    setIsEarnOpen(true);
    setisEarnLogoVisible(true);
    setIsLogoVisible(false);

    // Настройка кнопки "Назад" через Telegram API
    if (window.Telegram.WebApp) {
      if (!window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.show();
      }
      window.Telegram.WebApp.BackButton.offClick(); // Убираем старые обработчики
      window.Telegram.WebApp.BackButton.onClick(() => {
        setIsEarnOpen(false);
        setisEarnLogoVisible(false);
        setIsLogoVisible(true);
        if (window.Telegram.WebApp.BackButton.isVisible) {
          window.Telegram.WebApp.BackButton.hide(); // Скрываем кнопку только при закрытии
        }
      });
    }
  }, []);

  // Закрытие раздела заработка
  const handleCloseEarn = useCallback(async () => {
    setIsLogoVisible(true);
    setisEarnLogoVisible(false);
    setTimeout(() => {
      setIsEarnOpen(false);
    }, 190);
    await saveProgress();

    // Скрытие кнопки "Назад" при закрытии
    if (window.Telegram.WebApp && window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [saveProgress]);

  // Открытие мини-игры
  const handleOpenMiniGame = useCallback(() => {
    setIsMiniGameOpen(true);
  }, []);

  // Закрытие мини-игры
  const handleCloseMiniGame = useCallback(async () => {
    await saveProgress();
    setIsMiniGameOpen(false);
  }, [saveProgress]);

  // Проверка подписки
  const handleCheckSubscription = useCallback(async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, { userId });
      const data = response.data;
      if (response.status === 200 && data.isSubscribed && !data.hasCheckedSubscription) {
        setCoins(prevCoins => prevCoins + 5000);
      }
      return data;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { success: false, message: 'Ошибка при проверке подписки.' };
    }
  }, []);

  return (
      <div className="App">
        {loading ? <div>Loading...</div> : (
            <>
              <div className="info">
                <img src={Icon} alt="Icon" height="55%"/>
                <p>{username}</p>
                <img src={profilePhotoUrl} alt="Avatar" height={"70%"}/>
              </div>
              <div className="logo">
                <img
                    src={MainLogo}
                    alt="Main Logo"
                    height="95%"
                    className={isLogoVisible ? 'fade-in' : 'fade-out'}
                />
                <img
                    src={InviteLogo}
                    alt="Invite Logo"
                    height="85%"
                    className={isInviteLogoVisible ? 'fade-in' : 'fade-out'}
                />
                <img
                    src={EarnLogo}
                    alt="Earn Logo"
                    height="85%"
                    className={isEarnLogoVisible ? 'fade-in' : 'fade-out'}
                />
              </div>
              <div className="main">
                <div className="mainInfo">
                  <div className="BorderMainInfo">
                    <div id="left_thriple" className="tripleBox">
                      <p>LVL.1</p>
                      <p id="nonBold"><img src={Icon} alt="Ink"/> {coins}/300</p>
                    </div>
                    <div className="tripleBox">
                      <p>EARN</p>
                      <p id="nonBold">4/255</p>
                    </div>
                    <div id="right_thriple" className="tripleBox">
                      <p>ITEMS</p>
                      <p id="nonBold">6/255</p>
                      <div className="important">
                        <p>important</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Coindiv onClick={handleCoinClick} coinPerClick={coinPerClick} energyNow={energyNow}/>
                <div className="Progress">
                  <div className="userStatus">
                    <p>Beginner &gt;</p>
                  </div>
                  <ProgressBar current={energyNow} max={clickLimit}/>
                  <div className="energy">
                    <img src={Icon} alt="Ink" height="70%"/>
                    <p id="odstup">{energyNow}/{clickLimit}</p>
                    <img onClick={handleOpenEarn} id="kalendar" src={earnIcon} alt="Earn Icon" height="65%"/>
                    <p onClick={handleOpenEarn}>EARN</p>
                  </div>
                </div>
                <div className="lower">
                  <div className="lowerDown">
                    <div className="BTN" onClick={handleOpenShop}>
                      <div className="BTNLOW">
                        <img src={shopIcon} height="90%" alt="Shop Icon"/>
                      </div>
                      <p>SHOP</p>
                    </div>
                    <div className="BTN" onClick={handleOpenRef}>
                      <div className="BTNLOW">
                        <img src={inviteIcon} height="115%" alt="Invite Icon"/>
                      </div>
                      <p>INVITE</p>
                    </div>
                    <div className="BTN">
                      <div className="BTNLOW">
                        <img src={lootIcon} height="90%" alt="Loot Icon"/>
                      </div>
                      <p>LOOT</p>
                    </div>
                    <div className="BTN" onClick={handleOpenMiniGame}>
                      <div className="BTNLOW">
                        <img src={p2eIcon} height="90%" alt="P2E Icon"/>
                      </div>
                      <p>P2E</p>
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
            <MiniGame onClose={handleCloseMiniGame}/>
        )}
        <div className="referral-section">
          <p>Ваш реферальный код: {referralCode}</p>
        </div>
      </div>
  );
}

export default App;
