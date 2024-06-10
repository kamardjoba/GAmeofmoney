import React, { useState, useEffect } from 'react';
import './ref.css';

const Ref = ({ onClose, userId }) => {
    const [referralLink, setReferralLink] = useState('');
    const [referralCount, setReferralCount] = useState(0);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/username?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReferralLink(data.telegramLink);
                    setReferralCount(data.referralCount);
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
        const telegramShareUrl = `tg://msg_url?url=${encodeURIComponent(referralLink)}&text=Присоединяйся к нашему приложению!`;
        window.open(telegramShareUrl, '_blank');
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
                    <button onClick={handleShareLink}>Поделиться</button> {/* Новая кнопка */}
                </div>
            </div>
            <div className="FrandsBorder">
                <div className='FrendsInfo'>
                    <p>Мои друзья</p>
                </div>
                <div className="FrendsMenu">
                    <p>Количество приглашенных: {referralCount}</p>
                </div>
            </div>
            <div className="zagolovok">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Ref;
