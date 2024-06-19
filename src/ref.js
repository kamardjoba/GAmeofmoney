// ref.js
import React, { useState, useEffect } from 'react';
import './ref.css';
import defaultIcon from './IMG/avatar.png';
import Ref_Earn_Box from './IMG/box.png';
import Ref_Earn_BoxLeft from './IMG/Znak.png';
import inviteicon from './IMG/Invite.png';

const Ref = ({ onClose, userId, telegramLink }) => {
    const [referralLink] = useState(telegramLink);
    const [referrals, setReferrals] = useState([]);
    const [isClosingRefForAnim, setClosingRefForAnim] = useState(false);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load-progress?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setReferrals(data.referrals);
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

        // Настройка кнопки "Назад" при монтировании компонента
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.BackButton.onClick(() => {
                handleCloseRefAnim(); // Закрываем экран и возвращаемся на главный
                onClose();
            });
        }

        return () => {
            // Скрываем кнопку при размонтировании компонента
            if (window.Telegram.WebApp) {
                window.Telegram.WebApp.BackButton.hide();
            }
        };
    }, [userId, onClose]);

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
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
        window.open(telegramUrl, '_blank');
    };

    const handleCloseRefAnim = () => {
        setClosingRefForAnim(true);
    };

    return (
        <div className={`Ref_Window ${isClosingRefForAnim ? 'closing' : ''}`}>
            <div className="Ref_Earn_BoxBorder">
                <div className='Ref_Earn_Box'>
                    <img src={Ref_Earn_Box} alt='defaultIcon' height={"60%"} />
                </div>
                <div className='Ref_Earn_BoxTitle'>
                    <div className='Ref_Earn_BoxUp'>
                        <p>Пригласить Друга</p>
                    </div>
                    <div className='Ref_Earn_BoxDown'>
                        <div className='Ref_Earn_BoxLeft'>
                            <img src={Ref_Earn_BoxLeft} alt='defaultIcon' height={"50%"} />
                        </div>
                        <div className='Ref_Earn_BoxRight'>
                            <p>Получить <span className="Ref_Earn_Purple">СЮРПРИЗ</span></p>
                            <p>Тебе и твоему</p>
                            <p>ДРУГУ</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="refFrandsBorder">
                <div className='refFrendsInfo'>
                    <p>Мои друзья ({referrals.length})</p>
                </div>
                <div className="refFrendsMenu">
                    {referrals.map((referral, index) => (
                        <div key={index} className='refFrends'>
                            <div className='refFrendsIcon'>
                                <img src={referral.profilePhotoUrl || defaultIcon} alt="Avatar" height={"75%"}/>
                            </div>
                            <div className='refFrendsName'>
                                <p>{referral.username || `user${referral.telegramId}`}</p>
                                <p id="Friends_rank">{referral.rank || 'Новичок'} <span id="Beginner_rank"> ● </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="refthripleBTN">
                <button className="refgo" onClick={handleShareLink}>
                    <p>Поделиться </p>
                    <img src={inviteicon} alt='defaultIcon' height={"110%"}/>
                </button>
                <button className="refgo" id='refgoCopy' onClick={handleCopyLink}>
                    <img src={defaultIcon} alt='defaultIcon' height={"50%"}/>
                    <p>Скопировать</p>
                </button>
            </div>
        </div>
    );
};

export default Ref;
