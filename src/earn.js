import React, { useState, useEffect } from 'react';
import './earn.css';
import gray_8nogIcon from './IMG/gray_8nog.png';
import znakLogo from './IMG/Znak.png';
import Task_1 from './IMG/TaskIcon/task_1.png';
import Task_2 from './IMG/TaskIcon/task_2.png';
import Task_3 from './IMG/TaskIcon/task_3.png';
import Task_4 from './IMG/TaskIcon/task_4.png';
import Task_5 from './IMG/TaskIcon/task_5.png';

const REACT_APP_CHANNEL_NAME = "Your_Telegram_Channel_Name"; // Замените на ваше имя канала

const Earn = ({ onClose, userId, onCheckSubscription }) => {
    const [message, setMessage] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
    const [isClosingEarnForAnim, setClosingEarnForAnim] = useState(false);

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

    const handleFollowClick = () => {
        const telegramLink = `https://t.me/${REACT_APP_CHANNEL_NAME}`;
        window.open(telegramLink, '_blank');
    };

    const handleSubscriptionCheck = async () => {
        if (hasCheckedSubscription) {
            setMessage('Вы уже проверяли подписку и получили свои монеты.');
            return;
        }
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

    const handleCloseEarnAnim = () => {
        setClosingEarnForAnim(true);
    };

    return (
        <div className={`Earn_Window ${isClosingEarnForAnim ? 'closing' : ''} ${isSubscribed ? 'subscribed' : ''}`}>
            <div className="Ref_Earn_BoxBorder">
                <div className='Ref_Earn_Box'>
                    <img src={gray_8nogIcon} alt='gray_8nogIcon' height={"80%"} />
                </div>
                <div className='Ref_Earn_BoxTitle'>
                    <div className='Ref_Earn_BoxUp'>
                        <p>WEEKLY TASKS</p>
                    </div>
                    <div className='Ref_Earn_BoxDown'>
                        <div className='Ref_Earn_BoxLeft'>
                            <img src={znakLogo} alt='znakLogo' height={"50%"} />
                        </div>
                        <div className='Ref_Earn_BoxRight'>
                            <p>COMPLETE WEEKLY</p>
                            <p>TASKS AND <span className="Ref_Earn_Purple">EARN</span></p>
                            <p className="Ref_Earn_Purple">MORE ITEMS</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ScrollBorder">
                <div className="EarnSkrollMenu">
                    <div className="TaskBorder">
                        <div className="Task">
                            <div className='TaskText'>
                                <p>LEVEL UP </p>
                                <p>TO LEVEL 3</p>
                            </div>
                            <div className='TaskIMG'>
                                <img src={Task_1} alt='Task_1' height={"90%"} />
                            </div>
                        </div>
                        <div id="BigTask" className="Task">
                            <p>CHANGE AVATAR</p>
                            <p>ADD "BITCLIF" TO</p>
                            <p>NICKNAME</p>
                            <img src={Task_2} alt='Task_2' height={"35%"} />
                            <p id='littleEarn_p'>Name | Bitclif</p>
                        </div>
                    </div>

                    <div className="TaskBorder">
                        <div className="Task">
                            <div className='TaskText'>
                                <p>INVITE 3</p>
                                <p>FRIENDS</p>
                            </div>
                            <div className='TaskIMG'>
                                <img src={Task_3} alt='Task_3' height={"120%"} />
                            </div>
                        </div>
                        <div id="BigTask" className="Task">
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM</p>
                            <p>CHANNEL</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHANNEL</p>
                            <button onClick={handleFollowClick} className="follow-btn">
                                Подписаться на канал
                            </button>
                        </div>
                    </div>

                    <div className="TaskBorder">
                        <div className="Task">
                            <div className='TaskText'>
                                <p>FOLLOW US</p>
                                <p>IN X</p>
                            </div>
                            <div className='TaskIMG'>
                                <img id="x" src={Task_5} alt='Task_5' height={"90%"} />
                            </div>
                        </div>
                        <div id="BigTask" className="Task">
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM CHAT</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHAT</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="earn-content">
                <p>Подпишитесь на наш Telegram канал и получите 5000 монет!</p>
                <button
                    onClick={handleSubscriptionCheck}
                    disabled={isSubscribed || isChecking}
                    className="check-btn"
                >
                    Проверить Подписку {isSubscribed ? '✔️' : ''}
                </button>
                <p>{message}</p>
            </div>

            <button id='CloseDebug' onClick={(event) => { onClose(event); handleCloseEarnAnim(event); }}>X</button>
        </div>
    );
};

export default Earn;
