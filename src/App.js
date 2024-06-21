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
  const [isInviteLogoVisible, setIsInviteLogoVisible] = useState(false);
  const [isEarnLogoVisible, setIsEarnLogoVisible] = useState(false);


  // Функция для загрузки прогресса пользователя
  const loadProgress = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromURL = urlParams.get('userId');
      if (userIdFromURL) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, { params: { userId: userIdFromURL } });
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
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

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
      if (userIdFromURL) {
        await updateProfilePhoto(userIdFromURL);
        await loadProgress();
      }
    };
    loadAndUpdate().catch(error => console.error('Error loading progress:', error));
  }, [loadProgress, updateProfilePhoto]);

  const handleBackButtonSetup = useCallback((onClick) => {
    if (window.Telegram.WebApp) {
      const backButton = window.Telegram.WebApp.BackButton;
      backButton.show();
      backButton.offClick(); // Сбрасываем предыдущие обработчики
      backButton.onClick(onClick); // Устанавливаем новый
    }
  }, []);


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

  const saveProgressData = useCallback(async (newCoins, newEnergyNow) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
        userId, coins: newCoins, energyNow: newEnergyNow,
        upgradeCost, upgradeLevel, coinPerClick,
        upgradeCostEnergy, upgradeLevelEnergy, clickLimit,
        upgradeCostEnergyTime, valEnergyTime, time
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [userId, upgradeCost, upgradeLevel, coinPerClick,
    upgradeCostEnergy, upgradeLevelEnergy, clickLimit,
    upgradeCostEnergyTime, valEnergyTime, time]);

  // Обработка нажатия на монету
  const handleCoinClick = useCallback(async () => {
    if (coinPerClick <= energyNow) {
      const newCoins = coins + coinPerClick;
      const newEnergyNow = energyNow - coinPerClick;

      // Обновляем состояние монет и энергии
      setCoins(newCoins);
      setEnergyNow(newEnergyNow);

      // Сохраняем прогресс с новым значением монет
      await saveProgressData(newCoins, newEnergyNow);
    }
  }, [coins, energyNow, coinPerClick, saveProgressData]);

  // Апгрейд стоимости клика
  const CoinPerClickUpgrade = useCallback(async () => {
    if (coins >= upgradeCost) {
      const newCoins = coins - upgradeCost;
      const newCoinPerClick = coinPerClick + 1;
      const newUpgradeLevel = upgradeLevel + 1;
      const newUpgradeCost = Math.floor(upgradeCost * 1.5);

      setCoins(newCoins);
      setCoinPerClick(newCoinPerClick);
      setUpgradeLevel(newUpgradeLevel);
      setUpgradeCost(newUpgradeCost);

      // Сохраняем прогресс с новыми значениями
      await saveProgressData(newCoins, energyNow);
    }
  }, [coins, upgradeCost, coinPerClick, upgradeLevel, energyNow, saveProgressData]);

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
    handleBackButtonSetup(() => {
      setIsShopOpen(false);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  // Открытие реферального раздела
  const handleOpenRef = useCallback(() => {
    setIsRefOpen(true);
    setIsInviteLogoVisible(true);
    setIsLogoVisible(false);
    handleBackButtonSetup(() => {
      setIsRefOpen(false);
      setIsInviteLogoVisible(false);
      setIsLogoVisible(true);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  // Открытие раздела заработка
  const handleOpenEarn = useCallback(() => {
    setIsEarnOpen(true);
    setIsEarnLogoVisible(true);
    setIsLogoVisible(false);
    handleBackButtonSetup(() => {
      setIsEarnOpen(false);
      setIsEarnLogoVisible(false);
      setIsLogoVisible(true);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  const handleOpenMiniGame = useCallback(() => {
    setIsMiniGameOpen(true);
  }, []);

  // Проверка подписки


  return (
      <div className="App">
        {loading ? <div>Loading...</div> : (
            <>
              <div className="info">
                <img src={Icon} alt="Icon" height={"55%"}/>
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
                onClose={() => setIsShopOpen(false)}
                coins={coins}
                coinPerClick={coinPerClick}
                upgradeCost={upgradeCost}
                upgradeLevel={upgradeLevel}
                clickLimit={clickLimit}
                upgradeCostEnergy={upgradeCostEnergy}
                upgradeLevelEnergy={upgradeLevelEnergy}
                upgradeCostEnergyTime={upgradeCostEnergyTime}
                valEnergyTime={valEnergyTime}
                onUpgrade={CoinPerClickUpgrade}
                onUpgradeEnergy={EnergyUpgrade}
                onUpgradeEnergyTime={EnergyTimeUpgrade}
            />
        )}

        {isRefOpen && (
            <Ref
                onClose={() => setIsRefOpen(false)}
                userId={userId}
                telegramLink={telegramLink}
            />
        )}

        {isEarnOpen && <Earn onClose={() => setIsEarnOpen(false)} />}

        {isMiniGameOpen && <MiniGame onClose={() =>
            setIsMiniGameOpen(false)}
        />}
        <div className="referral-section">
          <p>Ваш реферальный код: {referralCode}</p>
        </div>
      </div>
  );
}

export default App;
