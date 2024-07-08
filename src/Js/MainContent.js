import React, { useState, useCallback } from 'react';
import Coindiv from './coin';
import Shop from './shop';
import Ref from './ref';
import Earn from './earn';
import MysteryBox from './Mystery_Box';
import Loot from './loot';
import ProgressBar from './ProgressBar';

import Logo from '../IMG/All_Logo/bitclifLogo.webp';
import MainLogo from '../IMG/All_Logo/mainLogo.webp';
import InviteLogo from '../IMG/All_Logo/inviteLogo.webp';
import ShopLogo from '../IMG/All_Logo/shopLogo.webp';
import LootLogo from '../IMG/All_Logo/lootLogo.webp';
import EarnLogo from '../IMG/All_Logo/earnLogo.webp';
import CraftLogo from '../IMG/All_Logo/craftLogo.webp';
import inviteIcon from '../IMG/LowerIcon/Invite_Icon.webp';
import lootIcon from '../IMG/LowerIcon/Loot_Icon.webp';
import p2eIcon from '../IMG/LowerIcon/P2E_Icon.webp';
import shopIcon from '../IMG/LowerIcon/Shop_Icon.webp';
import coinImage from '../IMG/8nog.webp';
import ink from '../IMG/ink.webp';
import earnIcon from '../IMG/earn.webp';

const MainContent = ({ coins, energyNow, username, telegramLink, userId, profilePhotoUrl, referralCode }) => {
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

    const handleBackButtonSetup = useCallback((onClick) => {
        if (window.Telegram.WebApp) {
            const backButton = window.Telegram.WebApp.BackButton;
            backButton.show();
            backButton.offClick(); // Сбрасываем предыдущие обработчики
            backButton.onClick(onClick); // Устанавливаем новый
        }
    }, []);

    const handleOpenShop = useCallback(() => {
        setIsShopOpen(true);
        setisShopLogoVisible(true);
        setIsLogoVisible(false);
        setClosingAppForAnim(true);
        handleBackButtonSetup(() => {
            setisShopLogoVisible(false);
            setIsLogoVisible(true);
            setClosingAppForAnim(false);
            setTimeout(() => { setIsShopOpen(false); }, 150);
            if (window.Telegram.WebApp.BackButton.isVisible) {
                window.Telegram.WebApp.BackButton.hide();
            }
        });
    }, [handleBackButtonSetup]);

    const handleCloseShop = () => {
        setisShopLogoVisible(false);
        setIsLogoVisible(true);
        setClosingAppForAnim(false);
        setTimeout(() => { setIsShopOpen(false); }, 150);
        if (window.Telegram.WebApp.BackButton.isVisible) {
            window.Telegram.WebApp.BackButton.hide();
        }
    };

    const handleOpenRef = useCallback(() => {
        setIsRefOpen(true);
        setisInviteLogoVisible(true);
        setIsLogoVisible(false);
        setClosingAppForAnim(true);
        handleBackButtonSetup(() => {
            setTimeout(() => { setIsRefOpen(false); }, 150);
            setisInviteLogoVisible(false);
            setIsLogoVisible(true);
            setClosingAppForAnim(false);
            if (window.Telegram.WebApp.BackButton.isVisible) {
                window.Telegram.WebApp.BackButton.hide();
            }
        });
    }, [handleBackButtonSetup]);

    const handleCloseRef = () => {
        setisInviteLogoVisible(false);
        setIsLogoVisible(true);
        setClosingAppForAnim(false);
        setTimeout(() => { setIsRefOpen(false); }, 150);
        if (window.Telegram.WebApp.BackButton.isVisible) {
            window.Telegram.WebApp.BackButton.hide();
        }
    };

    const handleOpenEarn = useCallback(() => {
        setIsEarnOpen(true);
        setisEarnLogoVisible(true);
        setIsLogoVisible(false);
        setClosingAppForAnim(true);
        handleBackButtonSetup(() => {
            setIsLogoVisible(true);
            setisEarnLogoVisible(false);
            setClosingAppForAnim(false);
            setTimeout(() => { setIsEarnOpen(false); }, 150);
            if (window.Telegram.WebApp.BackButton.isVisible) {
                window.Telegram.WebApp.BackButton.hide();
            }
        });
    }, [handleBackButtonSetup]);

    const handleCloseEarn = () => {
        setIsLogoVisible(true);
        setisEarnLogoVisible(false);
        setClosingAppForAnim(false);
        setTimeout(() => { setIsEarnOpen(false); }, 150);
        if (window.Telegram.WebApp.BackButton.isVisible) {
            window.Telegram.WebApp.BackButton.hide();
        }
    };

    const handleOpenLoot = useCallback(() => {
        setisLootLogoVisible(true);
        setIsLogoVisible(false);
        setisLootOpen(true);
        setClosingAppForAnim(true);
        handleBackButtonSetup(() => {
            setisLootLogoVisible(false);
            setisCraftLogoVisible(false);
            setIsLogoVisible(true);
            setClosingAppForAnim(false);
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
        setClosingAppForAnim(false);
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

    const handleCloseBox = () => { setisBoxOpen(false) };
    const handleOpenBox = () => { setisBoxOpen(true) };

    const handleCoinClick = useCallback(async () => {
        // Логика обработки клика по монете
    }, []);

    return (
        <div>
            <div className="info">
                <img src={Logo} alt="Logo" height={"55%"} />
                <p> {username} </p>
                <img id="pngavatar" src={profilePhotoUrl} alt="Bifclif" />
            </div>
            <div className="logo">
                <img src={MainLogo} alt="MainLogo" className={isLogoVisible ? 'fade-in' : 'fade-out'} />
                <img src={InviteLogo} alt="InviteLogo" className={isInviteLogoVisible ? 'fade-in' : 'fade-out'} />
                <img src={EarnLogo} alt="EarnLogo" className={isEarnLogoVisible ? 'fade-in' : 'fade-out'} />
                <img src={ShopLogo} alt="ShopLogo" className={isShopLogoVisible ? 'fade-in' : 'fade-out'} />
                <img src={LootLogo} alt="LootLogo" className={isLootLogoVisible ? 'fade-in' : 'fade-out'} />
                <img src={CraftLogo} alt="CraftLogo" className={isCraftLogoVisible ? 'fade-in' : 'fade-out'} />
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
                <Coindiv coinImage={coinImage} onClick={handleCoinClick} coinPerClick={1} energyNow={energyNow} ink={ink}/>
                <div className="Progress">
                    <div className="userStatus">
                        <p>Beginner &gt; </p>
                    </div>
                    <ProgressBar current={energyNow} max={100} />
                    <div className="energy">
                        <img src={ink} alt='ink' height={"70%"} />
                        <p id="odstup">{energyNow}/100</p>
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
                <MysteryBox onClose={handleCloseBox} />
            )}
            {isShopOpen && (
                <Shop onClose={handleCloseShop} />
            )}
            {isRefOpen && (
                <Ref onClose={handleCloseRef} ink={ink} userId={userId} telegramLink={telegramLink} openBox={handleOpenBox} />
            )}
            {isEarnOpen && (
                <Earn onClose={handleCloseEarn} userId={userId} />
            )}
            {isLootOpen && (
                <Loot onClose={handleCloseLoot} handleCheckboxChange={handleCheckboxChange} />
            )}
            <div className="referral-section">
                <p>Ваш реферальный код: {referralCode}</p>
            </div>
        </div>
    );
};

export default MainContent;
