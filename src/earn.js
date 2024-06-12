// earn.js
import React, { useState } from 'react';
import './earn.css';
const REACT_APP_CHANNEL_NAME = "GOGOGOGOGOGOGOGgogogooo"
const Earn = ({ onClose, userId, onCheckSubscription }) => {
    const [message, setMessage] = useState('');

    const handleSubscriptionCheck = async () => {
        try {
            const result = await onCheckSubscription();
            setMessage(result);
        } catch (error) {
            setMessage('Произошла ошибка при проверке подписки.');
        }
    };

    return (
        <div className="earn">
            <div className="zagolovok">
                <p>Заработать</p>
            </div>
            <div className="earn-content">
                <p>Подпишитесь на наш Telegram канал и получите 5000 монет!</p>
                <a href={`https://t.me/${REACT_APP_CHANNEL_NAME}`} target="_blank" rel="noopener noreferrer">Подписаться на канал</a>
                <button onClick={handleSubscriptionCheck}>Проверить Подписку</button>
                <p>{message}</p>
            </div>
            <button onClick={onClose} className="close-button">Закрыть</button>
        </div>
    );
};

export default Earn;
