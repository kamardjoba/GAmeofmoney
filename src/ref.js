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
        if (navigator.share) {
            navigator.share({
                title: 'Пригласить Друга',
                text: 'Присоединяйся к нашему приложению и получай бонусы!',
                url: referralLink
            })
                .then(() => console.log('Ссылка успешно отправлена'))
                .catch(err => console.error('Ошибка при отправке ссылки:', err));
        } else {
            alert('Ваш браузер не поддерживает функцию общего доступа. Скопируйте ссылку вручную.');
        }
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
            <div className="zagolовок">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Ref;
