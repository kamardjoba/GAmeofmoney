import React from 'react';
import './earn.css';

const Earn = ({ onClose, userId, onCheckSubscription }) => {
    const handleSubscribe = () => {
        window.open('https://t.me/ваш_канал', '_blank');
    };

    return (
        <div className="earn">
            <div className="zagolovок">
                <p>Заработать</p>
            </div>
            <div className="earn-border">
                <div className="earn-info">
                    <p>Подписаться на наш Telegram канал</p>
                </div>
                <div className="earn-menu">
                    <button onClick={handleSubscribe}>Подписаться</button>
                    <button onClick={() => onCheckSubscription(userId)}>Проверить</button>
                </div>
            </div>
            <div className="zagolovок">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Earn;
