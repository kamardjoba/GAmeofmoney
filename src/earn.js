// earn.js
import React, { useState, useEffect } from 'react';
import './earn.css';
const REACT_APP_CHANNEL_NAME = "GOGOGOGOGOGOGOGgogogooo";

const Earn = ({ onClose, userId, onCheckSubscription, onConfirmSubscription }) => {
    const [message, setMessage] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            setIsChecking(true);
            try {
                const result = await onCheckSubscription(userId);
                setIsSubscribed(result.isSubscribed);
                setHasCheckedSubscription(result.hasCheckedSubscription);
                setMessage(result.message);
            } catch (error) {
                setMessage('Произошла ошибка при проверке подписки.');
            } finally {
                setIsChecking(false);
            }
        };

        checkSubscription();
    }, [userId, onCheckSubscription]);

    const handleSubscriptionConfirm = async () => {
        setIsChecking(true);
        try {
            const result = await onConfirmSubscription(userId);
            if (result.success) {
                setHasCheckedSubscription(true);
                setMessage(result.message);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('Произошла ошибка при подтверждении подписки.');
        } finally {
            setIsChecking(false);
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
                <button
                    onClick={handleSubscriptionConfirm}
                    disabled={!isSubscribed || hasCheckedSubscription || isChecking}
                >
                    Проверить Подписку {hasCheckedSubscription ? '✔️' : ''}
                </button>
                <p>{message}</p>
            </div>
            <button onClick={onClose} className="close-button">Закрыть</button>
        </div>
    );
};

export default Earn;
