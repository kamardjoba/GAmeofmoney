import React, { useState, useEffect, useCallback } from 'react';
import loadable from '@loadable/component';
import '../Css/loading.css';
import '../Css/App.css';
import axios from 'axios';

import ink from '../IMG/ink.webp';
import ldink3 from '../IMG/Loading/Ellipse 4.png';
import ldink2 from '../IMG/Loading/Ellipse 3.png';
import ldink1 from '../IMG/Loading/Ellipse 2.png';
import ldink from '../IMG/Loading/Ellipse 1.png';
import ldnimg from '../IMG/Loading/8ldng.png';
import avatar from '../IMG/Avatars/avatar.webp';

import MainLogo from '../IMG/All_Logo/mainLogo.webp';

// Ленивое подгружение основного экрана
const MainContent = loadable(() => import('../Js/MainContent'));

// Ваш компонент загрузочного экрана
function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="ldnUpper">
                <img src={MainLogo} alt='MainLogo'/>
            </div>  
            <div className="ldnLower" >
                <img src={ldnimg} alt='Main'/>
            </div>
            <div className="ink" id="ink1">
                <img src={ldink} alt='ink'/>
            </div>
            <div className="ink" id="ink2">
                <img src={ldink1} alt='ink'/>
            </div>
            <div className="ink" id="ink3">
                <img src={ldink2} alt='ink'/>
            </div>
            <div className="ink" id="ink4">
                <img src={ink} alt='ink'/>
            </div>
            <div className="ink" id="ink5">
                <img src={ldink3} alt='ink'/>
            </div>
            <div className="ink" id="ink6">
                <img src={ink} alt='ink'/>
            </div>
            <div className="ink" id="ink7">
                <img src={ldink3} alt='ink'/>
            </div>
            <div className="ink" id="ink8">
                <img src={ink} alt='ink'/>
            </div>
        </div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState(0);
    const [energyNow, setEnergyNow] = useState(100);
    const [username, setUsername] = useState('');
    const [telegramLink, setTelegramLink] = useState('');
    const [userId, setUserId] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(avatar);
    const [referralCode, setReferralCode] = useState('');

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
                    setCoins(data.coins);
                } else {
                    console.error('Error fetching user data:', data.error);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false); // Завершаем загрузку
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

    return (
        <div className="App">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <MainContent
                    coins={coins}
                    energyNow={energyNow}
                    username={username}
                    telegramLink={telegramLink}
                    userId={userId}
                    profilePhotoUrl={profilePhotoUrl}
                    referralCode={referralCode}
                />
            )}
        </div>
    );
}

export default App;
