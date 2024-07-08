import React, { useState, useEffect, useCallback } from 'react';
import '../Css/App.css';
import axios from 'axios';

import avatar       from '../IMG/Avatars/avatar.png';
import ink          from '../IMG/ink.png';
import earnIcon     from '../IMG/earn.png';

import ProgressBar  from './ProgressBar';
import Shop         from './shop';
import Coindiv      from './coin';
import Ref          from './ref';
import Earn         from './earn';
import MysteryBox   from './Mystery_Box';
import Loot         from './loot';

import MainLogo     from '../IMG/All_Logo/mainLogo.png';
import InviteLogo   from '../IMG/All_Logo/inviteLogo.png';
import ShopLogo     from '../IMG/All_Logo/shopLogo.png';
import LootLogo     from '../IMG/All_Logo/lootLogo.png';
import EarnLogo     from '../IMG/All_Logo/earnLogo.png';
import CraftLogo    from '../IMG/All_Logo/craftLogo.png';
import Logo         from '../IMG/All_Logo/bitclifLogo.png';
import inviteIcon   from '../IMG/LowerIcon/Invite_Icon.webp';
import lootIcon     from '../IMG/LowerIcon/Loot_Icon.webp';
import p2eIcon      from '../IMG/LowerIcon/P2E_Icon.webp';
import shopIcon     from '../IMG/LowerIcon/Shop_Icon.webp';
import coinImage    from '../IMG/88nog.png';

function App() {
  const [coins, setcoins] = useState(0);
  const [energyNow, setEnergyNow] = useState(100);
  const coinPerClick = 1;
  const clickLimit = 100;
  const time = 2000;
  const [isClosingAppForAnim, setClosingAppForAnim] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isRefOpen, setIsRefOpen] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [isBoxOpen, setisBoxOpen] = useState(false);
  const [isLootOpen, setisLootOpen] = useState(false);

  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isInviteLogoVisible, setisInviteLogoVisible] = useState(false);
  const [isEarnLogoVisible, setisEarnLogoVisible] = useState(false);
  const [isShopLogoVisible, setisShopLogoVisible] = useState(false);
  const [isLootLogoVisible, setisLootLogoVisible] = useState(false);
  const [isCraftLogoVisible, setisCraftLogoVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [userId, setUserId] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(avatar);
  const [referralCode, setReferralCode] = useState('');
  

  if (!localStorage.getItem('VisibleChanel')) {localStorage.setItem('VisibleChanel', 'true');}
  if (!localStorage.getItem('VisibleComplated')) {localStorage.setItem('VisibleComplated', 'false');}
  const isVisibleChanel = localStorage.getItem('VisibleChanel') === 'true';
  const isVisibleComplated = localStorage.getItem('VisibleComplated') === 'true';
  const[isVisibleClaim, setVisibleClaim] = useState(false);

  if (!localStorage.getItem('VisibleChat')) {localStorage.setItem('VisibleChat', 'true');}
  if (!localStorage.getItem('VisibleChatComplated')) {localStorage.setItem('VisibleChatComplated', 'false');}
  const isVisibleChat = localStorage.getItem('VisibleChat') === 'true';
  const isVisibleChatComplated = localStorage.getItem('VisibleChatComplated') === 'true';
  const[isVisibleClaimChat, setVisibleClaimChat] = useState(false);    

  if (!localStorage.getItem('XVisible')) {localStorage.setItem('XVisible', 'true');}
  if (!localStorage.getItem('XVisibleClaim')) {localStorage.setItem('XVisibleClaim', 'false');}
  if (!localStorage.getItem('XVisibleComplated')) {localStorage.setItem('XVisibleComplated', 'false');}
  const XVisibleComplated = localStorage.getItem('XVisibleComplated') === 'true';
  const XVisibleClaim = localStorage.getItem('XVisibleClaim') === 'true';
  const XVisible = localStorage.getItem('XVisible') === 'true';

  const loadProgress = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromURL = urlParams.get('userId');
      if (userIdFromURL) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, { params: { userId: userIdFromURL } });
        const data = response.data;
        if (response.status === 200) {
          setUsername(data.first_name);
          setReferralCode(data.referralCode);
          setTelegramLink(data.telegramLink);
          setEnergyNow(data.energyNow);
          setProfilePhotoUrl(data.profilePhotoUrl || avatar);
          setcoins(data.coins);
        } else {
          console.error('Error fetching user data:', data.error);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  }, []);
  
  useEffect(() => {
    const loadAndUpdate = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromURL = urlParams.get('userId');
      setUserId(userIdFromURL);

      if (userIdFromURL) {
        await loadProgress();
      }
    };
    loadAndUpdate().catch(error => console.error('Error loading progress:', error));
  }, [loadProgress]);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
    }
  }, []);

  const handleBackButtonSetup = useCallback((onClick) => {
    if (window.Telegram.WebApp) {
      const backButton = window.Telegram.WebApp.BackButton;
      backButton.show();
      backButton.offClick(); // Сбрасываем предыдущие обработчики
      backButton.onClick(onClick); // Устанавливаем новый
    }
  }, []);

  const handleCheckSubscription = useCallback(async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, { userId });
      const data = response.data;
      if (response.status === 200 && data.isSubscribed) {
        if (!data.hasCheckedSubscription) {
          setcoins(prevCoins => prevCoins + 5000);
        }
        return data;
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { success: false, message: 'Ошибка при проверке подписки.' };
    }
  }, []);

  const handleCheckChatSubscription = useCallback(async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-chat-subscription`, { userId });
      const data = response.data;
      if (response.status === 200 && data.isSubscribed) {
        if (!data.hasCheckedChatSubscription) {
          setcoins(prevCoins => prevCoins + 5000);
        }
        return data;
      }
    } catch (error) {
      console.error('Error checking chat subscription:', error);
      return { success: false, message: 'Ошибка при проверке подписки.' };
    }
  }, []);
  

  const saveProgressData = useCallback(async (newCoins, newEnergyNow) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save-progress`, {
        userId, coins: newCoins, energyNow: newEnergyNow, coinPerClick,
        clickLimit, time
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [userId, coinPerClick, clickLimit, time]);

  const handleCoinClick = useCallback(async () => {
    if (coinPerClick <= energyNow) {
      const newCoins = coins + coinPerClick;
      const newEnergyNow = energyNow - coinPerClick;

      setcoins(newCoins);
      setEnergyNow(newEnergyNow);

      await saveProgressData(newCoins, newEnergyNow);
    }
  }, [coins, energyNow, coinPerClick, saveProgressData]);

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



  const checkSubscriptionOnReturn = useCallback(async () => {
    if (userId) {
      const data = await handleCheckSubscription(userId);
      if (data.isSubscribed) {
        if (!isVisibleComplated) {
          setVisibleClaim(true);
        }
        localStorage.setItem('VisibleChanel', 'false');
      }
    }
  }, [userId, handleCheckSubscription, isVisibleComplated]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSubscriptionOnReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkSubscriptionOnReturn]);


//________________________________________________________________________________________________________

  const CheckChatSubscriptionOnReturn = useCallback(async () => {
    if (userId) {
      const data = await handleCheckChatSubscription(userId);
      if (data.isSubscribed) {
        if (!isVisibleChatComplated) {
          setVisibleClaimChat(true);
        }
        localStorage.setItem('VisibleChat', 'false');
      }
    }
  }, [userId, handleCheckChatSubscription, isVisibleChatComplated]);

  useEffect(() => {
    const handleVisibilityChangeChat = () => {
      if (document.visibilityState === 'visible') {
        CheckChatSubscriptionOnReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChangeChat);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChangeChat);
    };
  }, [CheckChatSubscriptionOnReturn]);
  
//______________________________________________________________________________________________

  const handleCloseAppAnim = () => { setClosingAppForAnim(true); };
  const handleOpenAppAnim = () => { setClosingAppForAnim(false); };
  const handleCloseBox = () => { setisBoxOpen(false) };
  const handleOpenBox = () => { setisBoxOpen(true) };

  const handleOpenShop = useCallback(() => {
    setIsShopOpen(true);
    setisShopLogoVisible(true);
    setIsLogoVisible(false);
    handleCloseAppAnim();
    handleBackButtonSetup(() => {
      setisShopLogoVisible(false);
      setIsLogoVisible(true);
      handleOpenAppAnim();
      setTimeout(() => { setIsShopOpen(false); }, 150);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  const handleCloseShop = () => {
    setisShopLogoVisible(false);
    setIsLogoVisible(true);
    handleOpenAppAnim();
    setTimeout(() => { setIsShopOpen(false); }, 150);
    if (window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  };

  const handleOpenRef = useCallback(() => {
    setIsRefOpen(true);
    setisInviteLogoVisible(true);
    setIsLogoVisible(false);
    handleCloseAppAnim();
    handleBackButtonSetup(() => {
      setTimeout(() => { setIsRefOpen(false); }, 150);
      setisInviteLogoVisible(false);
      setIsLogoVisible(true);
      handleOpenAppAnim();
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  const handleCloseRef = () => {
    setisInviteLogoVisible(false);
    setIsLogoVisible(true);
    handleOpenAppAnim();
    setTimeout(() => { setIsRefOpen(false); }, 150);
    if (window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  };

  const handleOpenEarn = useCallback(() => {
    setIsEarnOpen(true);
    setisEarnLogoVisible(true);
    setIsLogoVisible(false);
    handleCloseAppAnim();
    handleBackButtonSetup(() => {
      setIsLogoVisible(true);
      setisEarnLogoVisible(false);
      handleOpenAppAnim();
      setTimeout(() => { setIsEarnOpen(false); }, 150);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  const handleCloseEarn = () => {
    setIsLogoVisible(true);
    setisEarnLogoVisible(false);
    handleOpenAppAnim();
    setTimeout(() => { setIsEarnOpen(false); }, 150);
    if (window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  };

  const handleOpenLoot = useCallback(() => {
    setisLootLogoVisible(true);
    setIsLogoVisible(false);
    setisLootOpen(true);
    handleCloseAppAnim();
    handleBackButtonSetup(() => {
      setisLootLogoVisible(false);
      setisCraftLogoVisible(false);
      setIsLogoVisible(true);
      handleOpenAppAnim();
      setTimeout(() => { setisLootOpen(false); }, 150);
      if (window.Telegram.WebApp.BackButton.isVisible) {
        window.Telegram.WebApp.BackButton.hide();
      }
    });
  }, [handleBackButtonSetup]);

  const handleCloseLoot = () => {
    setisLootLogoVisible(false);
    setisCraftLogoVisible(false);
    setIsLogoVisible(true);
    handleOpenAppAnim();
    setTimeout(() => { setisLootOpen(false); }, 150);
    if (window.Telegram.WebApp.BackButton.isVisible) {
      window.Telegram.WebApp.BackButton.hide();
    }
  };

  const handleCheckboxChange = (event) => {
    const LogoVisible = !event.target.checked;
    setisLootLogoVisible(LogoVisible);
    setisCraftLogoVisible(!LogoVisible);
  };

  return (
    <div className="App">
   
          <div className="info">
            <img src={Logo} alt="Logo" height={"55%"} />
            <p> {username} </p>
            <img id="pngavatar" src={profilePhotoUrl} alt="Bifclif" />
          </div>
          <div className="logo">

            <img src={MainLogo}
              alt="MainLogo"
              height={"95%"}
              className={isLogoVisible ? 'fade-in' : 'fade-out'} />

            <img src={InviteLogo}
              alt="InviteLogo"
              height={"92%"}
              className={isInviteLogoVisible ? 'fade-in' : 'fade-out'} />

            <img src={EarnLogo}
              alt="EarnLogo"
              height={"85%"}
              className={isEarnLogoVisible ? 'fade-in' : 'fade-out'} />

            <img src={ShopLogo}
              alt="ShopLogo"
              height={"92%"}
              className={isShopLogoVisible ? 'fade-in' : 'fade-out'} />

            <img src={LootLogo}
              alt="LootLogo"
              height={"85%"}
              className={isLootLogoVisible ? 'fade-in' : 'fade-out'} />

            <img src={CraftLogo}
              alt="CraftLogo"
              height={"90%"}
              className={isCraftLogoVisible ? 'fade-in' : 'fade-out'} />

          </div>
          <div className='BackGround_Div'></div>
          <div className={`main ${isClosingAppForAnim ? 'closing' : ''}`}>
            <div className="mainInfo">
              <div className="BorderMainInfo">
                <div id="left_thriple" className="tripleBox">
                  <p>LVL.1</p>
                  <p id="nonBold"> <img src={ink} alt='ink' />{coins}/300</p>
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
            <Coindiv onClick={handleCoinClick} coinPerClick={coinPerClick} energyNow={energyNow} coinImage={coinImage} ink={ink}/>
            <div className="Progress">
              <div className="userStatus">
                <p>Beginner &gt; </p>
              </div>
              <ProgressBar current={energyNow} max={clickLimit} />
              <div className="energy">
                <img src={ink} alt='ink' height={"70%"} />
                <p id="odstup">{energyNow}/{clickLimit}</p>
                <img onClick={handleOpenEarn} id="kalendar" src={earnIcon} alt='earnIcon' height={"65%"} />
                <p onClick={handleOpenEarn}>EARN</p>
              </div>
            </div>
            <div className="lower">

              <div className="lowerDown">
                <div className='BTN' onClick={(event) => { handleOpenShop(event); localStorage.clear(); }}>
                  <div className="BTNLOW">
                    <img src={shopIcon} alt='shopIcon' />
                  </div>
                  <p>SHOP</p>
                </div>
                <div className='BTN' onClick={handleOpenRef}>
                  <div className="BTNLOW">
                    <img src={inviteIcon} alt='inviteIcon' />
                  </div>
                  <p>INVITE</p>
                </div>
                <div className='BTN'>
                  <div className="BTNLOW" onClick={handleOpenLoot}>
                    <img src={lootIcon} alt='lootIcon' />
                  </div>
                  <p>LOOT</p>
                </div>
                <div className='BTN'>
                  <div className="BTNLOW">
                    <img src={p2eIcon} alt='p2eIcon' />
                  </div>
                  <p>P2E</p>
                </div>
              </div>
            </div>
          </div>

          {isBoxOpen && (
            <MysteryBox
              onClose={handleCloseBox}
            />
          )}

          {isShopOpen && (
            <Shop
              onClose={handleCloseShop}
            />
          )}

          {isRefOpen && (
            <Ref
              onClose={handleCloseRef}
              userId={userId}
              telegramLink={telegramLink}
              openBox={handleOpenBox}
            />
          )}

          {isEarnOpen && (
            <Earn
              onClose={handleCloseEarn}
              userId={userId}
              onCheckSubscription={handleCheckSubscription}
              onCheckChatSubscription={handleCheckChatSubscription}
              isVisibleClaim={isVisibleClaim}
              setVisibleClaim={setVisibleClaim}
              isVisibleComplated={isVisibleComplated}
              isVisibleChanel={isVisibleChanel}
              XVisibleComplated={XVisibleComplated}
              XVisibleClaim={XVisibleClaim}
              XVisible={XVisible}
              isVisibleChat={isVisibleChat}
              isVisibleChatComplated={isVisibleChatComplated}
              isVisibleClaimChat={isVisibleClaimChat}
              setVisibleClaimChat={setVisibleClaimChat}
            />
          )}

          {isLootOpen && (
            <Loot
              onClose={handleCloseLoot}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
          <div className="referral-section">
            <p>Ваш реферальный код: {referralCode}</p>
          </div>
   
     
    </div>
  );
}
export default App;