// ref.js
import React, { useState, useEffect } from 'react';
import './ref.css';
import defaultIcon from './IMG/N.png';

const Ref = ({ onClose, userId, telegramLink }) => {
    const [referralLink] = useState(telegramLink);
    const [referrals, setReferrals] = useState([]);
    const [isReferralUsed] = useState(false); // Добавлено

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load-progress?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReferrals(data.referrals);
                } else {
                    console.error('Ошибка при получении данных рефералов:', data.error);
                }
            } catch (error) {
                console.error('Ошибка при получении данных рефералов:', error);
            }
        };

        if (userId) {
            fetchReferralData();
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
            <div className="zagolовок">
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
            <div className="zagоловок">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
            {isReferralUsed && <p>Вы использовали реферальный код.</p>}
        </div>
    );
};

export default Ref;
