// earn.js
import React, { useState } from 'react';
import './earn.css';

const CHANNEL_NAME = "GOGOGOGOGOGOGOGgogogooo";
const Earn = ({ onClose, userId }) => {
    const [message, setMessage] = useState('');

    const handleCheckSubscription = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
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
                <a href={`https://t.me/${CHANNEL_NAME}`} target="_blank" rel="noopener noreferrer">Подписаться на канал</a>
                <button onClick={handleCheckSubscription}>Проверить Подписку</button>
                <p>{message}</p>
            </div>
            <button onClick={onClose} className="close-button">Закрыть</button>
        </div>
    );
};

export default Earn;
