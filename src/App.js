import React, { useState, useEffect } from 'react';
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
  const [valEnergyTime, setvalEnergyTime] = useState(0.5);
  const [upgradeEnergyTimeLevel, setupgradeEnergyTimeLevel] = useState(1);
  const [time, setTime] = useState(2000);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    setUserId(userId);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/username?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setUsername(data.username);
            setCoins(data.coins);
            setReferralCode(data.referralCode);
            setTelegramLink(data.telegramLink);
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
    };

    const interval = setInterval(() => {
      setEnergyNow((prevEnergyNow) => {
        if (prevEnergyNow < clickLimit) {
          return prevEnergyNow + 1;
        } else {
          return prevEnergyNow;
        }
      });
    }, time);

    const saveCoinsInterval = setInterval(async () => {
      if (userId) {
        try {
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-coins`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, coins }),
          });
        } catch (error) {
          console.error('Error updating coins:', error);
        }
      }
    }, 3000);

    fetchUserData();

    return () => {
      clearInterval(interval);
      clearInterval(saveCoinsInterval);
    };
  }, [userId, clickLimit, time, coins]);

  const handleCoinClick = () => {
    if (coinPerClick <= energyNow) {
      setCoins(prevCoins => {
        const newCoins = prevCoins + coinPerClick;
        updateCoinsOnServer(newCoins);
        return newCoins;
      });
      setEnergyNow(prevEnergyNow => prevEnergyNow - coinPerClick);
    }
  };

  const updateCoinsOnServer = async (newCoins) => {
    if (userId) {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-coins`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, coins: newCoins }),
        });
      } catch (error) {
        console.error('Error updating coins:', error);
      }
    }
  };

  const CoinPerClickUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins(prevCoins => prevCoins - upgradeCost);
      setCoinPerClick(prevCoinPerClick => prevCoinPerClick + 1);
      setUpgradeLevel(prevUpgradeLevel => prevUpgradeLevel + 1);
      setUpgradeCost(prevUpgradeCost => Math.floor(prevUpgradeCost * 1.5));
    }
  };

  const EnergyUpgrade = () => {
    if (coins >= upgradeCostEnergy) {
      setCoins(prevCoins => prevCoins - upgradeCostEnergy);
      setClickLimit(prevClickLimit => prevClickLimit * 2);
      setUpgradeLevelEnergy(prevUpgradeLevelEnergy => prevUpgradeLevelEnergy + 1);
      setUpgradeCostEnergy(prevUpgradeCostEnergy => Math.floor(prevUpgradeCostEnergy * 1.5));
    }
  };

  const EnergyTimeUpgrade = () => {
    if (coins >= upgradeCostEnergyTime) {
      setCoins(prevCoins => prevCoins - upgradeCostEnergyTime);
      setvalEnergyTime(prevValEnergyTime => prevValEnergyTime * 2);
      setupgradeEnergyTimeLevel(prevUpgradeEnergyTimeLevel => prevUpgradeEnergyTimeLevel + 1);
      setTime(prevTime => prevTime / 2);
      setUpgradeCostEnergyTime(prevUpgradeCostEnergyTime => Math.floor(prevUpgradeCostEnergyTime * 1.5));
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
                <img src={Icon} alt="Icon" />
                <p>{username}</p>
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
                upgradeEnergyTimeLevel={upgradeEnergyTimeLevel}
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

        <div className="referral-section">
          <p>Your Referral Code: {referralCode}</p>
          <p>Share this link to invite friends:</p>
          <p>{telegramLink}</p>
        </div>
      </div>
  );
}

export default App;
