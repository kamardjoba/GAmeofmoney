import React, { useState, useEffect } from 'react';
import '../Css/ref.css'
import boxIcon from '../IMG/box.png';
import znakLogo from '../IMG/Znak.png';
import s from '../IMG/s.png'
import ink from '../IMG/ink.png';
import inviteIcon from '../IMG/LowerIcon/Invite_Icon.png';
import avatar from '../IMG/Avatars/avatar.png';
import UIcon from '../IMG/Union.png';

const Ref = ({onClose, openBox,userId, telegramLink}) => {
    const handleCloseRefAnim = () => {setClosingRefForAnim(true);};    
    const [isClosingRefForAnim, setClosingRefForAnim] = useState(false);
    const [referralLink] = useState(telegramLink);
    const [referrals, setReferrals] = useState([]);
    
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

    return (
        <div className={`Ref_Earn_Shop_Window ${isClosingRefForAnim ? 'closing' : ''}`}>
            <div className="Ref_Earn_BoxBorder">
                <div className='Ref_Earn_Box'>
                    <img src={boxIcon} alt='boxIcon' height={"60%"}/>
                </div>
                <div className='Ref_Earn_BoxTitle'>
                    <div className='Ref_Earn_BoxUp'>
                        <p>INVITE A FRIEND</p>
                    </div>
                    <div className='Ref_Earn_BoxDown'>
                        <div className='Ref_Earn_BoxLeft'>
                            <img src={znakLogo} alt='znakLogo' height={"50%"}/>
                        </div>
                        <div className='Ref_Earn_BoxRight'>
                            <p>GET <span className="Ref_Earn_Purple">MYSTERY BOX</span></p>
                            <p>FOR YOU AND YOUR</p>
                            <p>FRIEND</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="refFrandsBorder">
                <div className='refFrendsInfo'>
                    <p>LIST OF YOUR FRIENDS   ({referrals.length})</p>
                    <img src={s} alt='s' height={"40%"}/>
                </div>
                <div className="refFrendsMenu">
                    {referrals.map((referral, index) => (
                        <div key={index} className='refFrends'>
                            <div className='refFrendsIcon'>
                                <img src={referral.profilePhotoUrl || avatar} alt="Avatar" height={"75%"} id='FrendAvatarInvite'/>
                            </div>
                            <div className='refFrendsName'>
                                <p>{referral.first_name || `user${referral.telegramId}`}</p>
                                <p id="Friends_rank">{referral.rank || 'Beginner'} <span id="Beginner_rank"> ● </span></p>
                            </div>
                            <div className='refFrendsIcon'>
                                <img src={boxIcon} alt='boxIcon' height={"65%"} onClick={localStorage.setItem('BoxOpen', 'true')}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="refthripleBTN">
                <button className="refgo" id='refgoEx' onClick={(event) => {onClose(event); handleCloseRefAnim(event); }}>
                    <img src={UIcon} alt='UIcon' height={"70%"}/>
                </button>
                <button className="refgo" onClick={handleShareLink}>
                    <p>INVITE </p>
                    <img src={inviteIcon} alt='inviteIcon' height={"110%"}/>
                </button>
                <button className="refgo" id='refgoCopy' onClick={handleCopyLink}>
                    <img src={ink} alt='ink' height={"50%"}/>
                    <p>COPY</p>
                </button>
            </div>
        </div>
    );
};

export default Ref;