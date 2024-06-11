import React from 'react';
import './earn.css';

const Earn = ({ onClose, userId, onCheckSubscription }) => {
    const handleSubscribe = () => {
        window.open('https://t.me/Clickerroadtomoon', '_blank');
    };

    return (
        <div className="earn">
            <div className="zagolovok">
                <p>Награди</p>
            </div>

            <div className="EarnBorder">
                <div className="EarnMenu">

                    <div className="Zadanie">
                        <div className="zg">
                            <h1>Подписатся на tg-канал</h1>
                        </div>
                        <p>Награда: 10000</p>
                        <button onClick={handleSubscribe}>Подписаться</button>
                        <button onClick={() => onCheckSubscription(userId)}>Проверить</button>
                    </div>
                </div>

            </div>
            <div className="zagolovok">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );

};

export default Earn;
