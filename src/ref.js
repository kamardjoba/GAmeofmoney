// ref.js
import React, { useState, useEffect } from 'react';
import './ref.css';
import defaultIcon from './IMG/ink.png';

const Ref = ({ onClose, userId, telegramLink }) => {
    const [referralLink] = useState(telegramLink);
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load-progress?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReferrals(data.referrals);
                } else {
                    console.error('Error fetching referral data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching referral data:', error);
            }
        };

        if (userId) {
            fetchReferralData().catch(error => console.error('fetchReferralData error:', error));
        }
    }, [userId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                alert('Ссылка скопирована в буфер обмена!');
            })
            .catch(err => {
                console.error('Ошибка копирования ссылки:', err);
            });
    };

    const handleShareLink = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
        window.open(telegramUrl, '_blank');
    };



    return (
        <div className="ref">
            <div className="zagolovok">
                <p>Рефералы</p>
            </div>
            <div className="SendBorder">
                <div className='SendInfo'>
                    <p>Пригласить Друга</p>
                </div>
                <div className="sendMenu">
                    <p className="referral-link">{referralLink}</p>
                    <button onClick={handleCopyLink}>Скопировать Ссылку</button>
                    <button onClick={handleShareLink}>Поделиться</button>
                </div>
            </div>
            <div className="FrandsBorder">
                <div className='FrendsInfo'>
                    <p>Мои друзья ({referrals.length})</p>
                </div>
                <div className="FrendsMenu">
                    {referrals.map((referral, index) => (
                        <div key={index} className="Frends">
                            <div className="FrendsAvatar">
                                <img src={referral.profilePhotoUrl || defaultIcon} alt="Avatar" />
                            </div>
                            <p>{referral.username || `user${referral.telegramId}`}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="zagolовок">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Ref;