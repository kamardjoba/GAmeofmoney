import React, { useState, useEffect } from 'react';
import '../Css/earn.css';
import axios from 'axios';
import gray_8nogIcon from '../IMG/gray_8nog.png';
import znakLogo from '../IMG/Znak.png';
import Task_1 from '../IMG/TaskIcon/task_1.webp';
import Task_2 from '../IMG/TaskIcon/task_2.webp';
import Task_3 from '../IMG/TaskIcon/task_3.webp';
import Task_4 from '../IMG/TaskIcon/task_4.webp';
import Task_5 from '../IMG/TaskIcon/task_5.webp';

import Epic from '../IMG/Card/Epic_item.png';
import Epic_Claim from '../IMG/Card/Epic_Claim.png';
import Rire from '../IMG/Card/Rire_item.png';
import Rare_Claim from '../IMG/Card/Rare_Clime.png';
import Basic from '../IMG/Card/Basic_item.png';
import Basic_Claim from '../IMG/Card/Basic_Claim.png';

import TgChannelClaimBord from '../TaskJs/Tg_Channel_Claim';
import TgChannelComplated from '../TaskJs/Tg_Channel_Complated';
import TgChannelBord from '../TaskJs/Tg_Channel';

import TgChatBord from '../TaskJs/Tg_Chat';
import TgClaim from '../TaskJs/Tg_Chat_Claim';
import TgChatComplated from '../TaskJs/Tg_Chat_Complated';

import XBord from '../TaskJs/X_Channel';
import XClaimBord from '../TaskJs/X_Channel_Claim';
import XComplated from '../TaskJs/X_Comlated';

const Earn = ({ onClose, onCheckSubscription, onCheckChatSubscription, userId, 
                isVisibleClaim, setVisibleClaim, isVisibleComplated, isVisibleChanel, 
                isVisibleChat, isVisibleClaimChat, setVisibleClaimChat, isVisibleChatComplated}) => {
    const [isClosingEarnForAnim, setClosingEarnForAnim] = useState(false);
    const handleCloseEarnAnim = () => { setClosingEarnForAnim(true); };

    const [Tg_Channel_Const, Set_Tg_Channel] = useState(false);
    const Tg_Channel_Open = () => { Set_Tg_Channel(true) };
    const Tg_Channel_Close = () => { setTimeout(() => { Set_Tg_Channel(false); }, 190); };

    const [Tg_Channel_Complated_Const, Set_Tg_Channel_Complated] = useState(false);
    const Tg_Channel_Complated_Open = () => { Set_Tg_Channel_Complated(true) };
    const Tg_Channel_Complated_Close = () => { setTimeout(() => { Set_Tg_Channel_Complated(false); }, 190); };

    const [Tg_Channel_Claim_Const, Set_Tg_Channel_Claim] = useState(false);
    const Tg_Channel_Claim_Open = () => { Set_Tg_Channel_Claim(true) };
    const Tg_Channel_Claim_Close = () => { setTimeout(() => { Set_Tg_Channel_Claim(false); }, 190); };
    
    const [Tg_Chat_Const, Set_Tg_Chat] = useState(false);
    const Tg_Chat_Open = () => { Set_Tg_Chat(true) };
    const Tg_Chat_Close = () => { setTimeout(() => { Set_Tg_Chat(false); }, 190); };

    const [Tg_Chat_Claim_Const, Set_Tg_Chat_Claim_Const] = useState(false);
    const Tg_Chat_Claim_Open = () => { Set_Tg_Chat_Claim_Const(true) };
    const Tg_Chat_Claim_Close = () => { setTimeout(() => { Set_Tg_Chat_Claim_Const(false); }, 190); };

    const [Tg_Chat_Complated_Const, Set_Tg_Chat_Complated] = useState(false);
    const Tg_Chat_Complated_Open = () => { Set_Tg_Chat_Complated(true) };
    const Tg_Chat_Complated_Close = () => { setTimeout(() => { Set_Tg_Chat_Complated(false); }, 190); };

    const [X_Const, set_X_Chat] = useState(false);
    const X_Open = () => { set_X_Chat(true) };
    const X_Close = () => { setTimeout(() => { set_X_Chat(false); }, 190); };

    const [X_Const_Claim, Set_X_Const_Claim] = useState(false);
    const X_Const_Claim_Open = () => { Set_X_Const_Claim(true) };
    const X_Const_ClaimClose = () => { setTimeout(() => { Set_X_Const_Claim(false); }, 190); };

    const [XComplated_Const, Set_XComplated_Const] = useState(false);
    const XComplated_Open = () => { Set_XComplated_Const(true) };
    const XComplated_Close = () => { setTimeout(() => { Set_XComplated_Const(false); }, 190); };

    if (!localStorage.getItem('XVisible')) {localStorage.setItem('XVisible', 'true');}
    if (!localStorage.getItem('XVisibleClaim')) {localStorage.setItem('XVisibleClaim', 'false');}
    if (!localStorage.getItem('XVisibleComplated')) {localStorage.setItem('XVisibleComplated', 'false');}
    const XVisibleComplated = localStorage.getItem('XVisibleComplated') === 'true';
    const XVisibleClaim = localStorage.getItem('XVisibleClaim') === 'true';
    const XVisible = localStorage.getItem('XVisible') === 'true';

    // useEffect(() => {
    //     const checkSubscriptionOnMount = async () => {
    //         const data = await onCheckSubscription(userId);
    //         if (data.isSubscribed) {
    //             if(isVisibleComplated === false){
    //                 setVisibleClaim(true);
    //             }
    //             localStorage.setItem('VisibleChanel', 'false');            
    //         } 
    //     };
    //     checkSubscriptionOnMount();
    // }, [onCheckSubscription, userId, setVisibleClaim, isVisibleComplated, isVisibleChanel]);

    useEffect(() => {
        const checkChatSubscriptionOnMount = async () => {
            const data = await onCheckChatSubscription(userId);
            if (data.isSubscribed) {
                if(isVisibleChatComplated === false){
                    setVisibleClaimChat(true);
                }
                localStorage.setItem('VisibleChat', 'false');
            }
        };
        checkChatSubscriptionOnMount();
    }, [onCheckChatSubscription, userId,  setVisibleClaimChat, isVisibleChatComplated, isVisibleChat]);

    useEffect(() => {
        const checkSubscriptionOnMount = async () => {
            const response = await axios.post('/check-subscription', { userId });
            const data = response.data;
            if (data.isSubscribed && !data.hasCheckedSubscription) {
                setVisibleClaim(true);
            }
        };
        checkSubscriptionOnMount();
    }, [userId, setVisibleClaim]);

    return (
        <div className={`Ref_Earn_Shop_Window ${isClosingEarnForAnim ? 'closing' : ''}`} id="EarnWindow">

            {Tg_Channel_Const && isVisibleChanel && (
                <TgChannelBord onClose={Tg_Channel_Close}
                Epic={Epic} />
            )}
            {Tg_Channel_Claim_Const && isVisibleClaim && (
                <TgChannelClaimBord onClose={Tg_Channel_Claim_Close}
                    setVisibleClaim={setVisibleClaim} 
                    Epic_Claim={Epic_Claim}/>
            )}
            {Tg_Channel_Complated_Const && isVisibleComplated && (
                <TgChannelComplated onClose={Tg_Channel_Complated_Close} />
            )}
            {Tg_Chat_Const && isVisibleChat && (
                <TgChatBord onClose={Tg_Chat_Close}
                Rire={Rire} />
            )}
            {Tg_Chat_Claim_Const && isVisibleClaimChat &&(
                <TgClaim onClose={Tg_Chat_Claim_Close} 
                setVisibleClaimChat={setVisibleClaimChat}
                Rare_Claim={Rare_Claim}/>
                
            )}
            {Tg_Chat_Complated_Const && isVisibleChatComplated &&(
                <TgChatComplated onClose={Tg_Chat_Complated_Close} />
            )}
            {X_Const && XVisible && (
                <XBord onClose={X_Close}
                Basic={Basic} />
            )}
            {X_Const_Claim && XVisibleClaim && (
                <XClaimBord onClose={X_Const_ClaimClose} 
                Basic_Claim={Basic_Claim}/>
            )}
             {XComplated_Const && XVisibleComplated && (
                <XComplated onClose={XComplated_Close} />
            )}

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
                            <img src={znakLogo} alt='znakLogo'/>
                        </div>
                        <div className='Ref_Earn_BoxRight'>
                            <p>COMPLATE WEEKLY</p>
                            <p>TASKS AND <span className="Ref_Earn_Purple">EARN</span></p>
                            <p className="Ref_Earn_Purple" >MORE ITEMS</p>
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
                        <div id="BigTask" className="Task" onClick={(event) => { Tg_Channel_Claim_Open(event); Tg_Channel_Open(event); Tg_Channel_Complated_Open(event); onCheckSubscription(event);}}>
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM</p>
                            <p>CHANNEL</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHANNEL</p>
                        </div>
                    </div>
                    <div className="TaskBorder">
                        <div className="Task" onClick={(event) => { X_Open(event); X_Const_Claim_Open(event); XComplated_Open(event);}}>
                            <div className='TaskText'>
                                <p>FOLLOW US</p>
                                <p>IN X</p>
                            </div>
                            <div className='TaskIMG'>
                                <img id="x" src={Task_5} alt='Task_5' height={"90%"} />
                            </div>
                        </div>
                        <div id="BigTask" className="Task" onClick={(event) => { Tg_Chat_Open(event); Tg_Chat_Claim_Open(event); Tg_Chat_Complated_Open(event);}}>
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM CHAT</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHAT</p>
                        </div>
                    </div>
                </div>
            </div>
            <button id='CloseDebug' onClick={(event) => { onClose(event); handleCloseEarnAnim(event);}}>X</button>
        </div>
    );
};

export default Earn;
