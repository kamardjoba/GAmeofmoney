import React from 'react';
import './earn.css';

const Earn = ({ onClose, userId, onCheckSubscription }) => {
    const handleSubscribe = () => {
        window.open('https://t.me/Clickerroadtomoon', '_blank');
    };

    return (
        <div className="earn">
            <div className="zagolовок">
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
            <button onClick={onClose} className="close-button">Закрыть</button>
        </div>
    );
};

export default Earn;
