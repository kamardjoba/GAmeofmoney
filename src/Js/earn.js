import React, { useState, useEffect } from 'react';
import '../Css/earn.css';
import gray_8nogIcon from '../IMG/gray_8nog.png';
import znakLogo from '../IMG/Znak.png';
import Task_1 from '../IMG/TaskIcon/task_1.png';
import Task_2 from '../IMG/TaskIcon/task_2.png';
import Task_3 from '../IMG/TaskIcon/task_3.png';
import Task_4 from '../IMG/TaskIcon/task_4.png';
import Task_5 from '../IMG/TaskIcon/task_5.png';
import TgChannelClaimBord from '../TaskJs/Tg_Channel_Claim';
import TgChannelComplated from '../TaskJs/Tg_Channel_Complated';
import TgChannelBord from '../TaskJs/Tg_Channel';
import TgChatBord from '../TaskJs/Tg_Chat';
import XBord from '../TaskJs/X_Channel';

const Earn = ({ onClose, isVisibleClaim, isVisibleChanel, setVisibleClaim, isVisibleComplated, setVisibleChanel, setisVisibleComplated, onCheckSubscription, userId }) => {
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

    const [X_Const, set_X_Chat] = useState(false);
    const X_Open = () => { set_X_Chat(true) };
    const X_Close = () => { setTimeout(() => { set_X_Chat(false); }, 190); };

    useEffect(() => {
        const checkSubscriptionOnMount = async () => {
            const data = await onCheckSubscription(userId);
            if (data.isSubscribed) {
                setVisibleClaim(true);
                setVisibleChanel(false);
            } 
        };
        checkSubscriptionOnMount();
    }, [onCheckSubscription, userId, setVisibleClaim, setVisibleChanel]);

    return (
        <div className={`Ref_Earn_Shop_Window ${isClosingEarnForAnim ? 'closing' : ''}`} id="EarnWindow">
            {Tg_Channel_Const && isVisibleChanel && (
                <TgChannelBord onClose={Tg_Channel_Close} />
            )}
            {Tg_Channel_Claim_Const && isVisibleClaim && (
                <TgChannelClaimBord onClose={Tg_Channel_Claim_Close}
                    setisVisibleComplated={setisVisibleComplated}
                    setVisibleClaim={setVisibleClaim} />
            )}
            {Tg_Channel_Complated_Const && isVisibleComplated && (
                <TgChannelComplated onClose={Tg_Channel_Complated_Close} />
            )}
            {Tg_Chat_Const && (
                <TgChatBord onClose={Tg_Chat_Close} />
            )}
            {X_Const && (
                <XBord onClose={X_Close} />
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
                            <img src={znakLogo} alt='znakLogo' height={"50%"} />
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
                        <div id="BigTask" className="Task" onClick={(event) => { Tg_Channel_Claim_Open(event); Tg_Channel_Open(event); Tg_Channel_Complated_Open(event);}}>
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM</p>
                            <p>CHANNEL</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHANNEL</p>
                        </div>
                    </div>
                    <div className="TaskBorder">
                        <div className="Task" onClick={X_Open}>
                            <div className='TaskText'>
                                <p>FOLLOW US</p>
                                <p>IN X</p>
                            </div>
                            <div className='TaskIMG'>
                                <img id="x" src={Task_5} alt='Task_5' height={"90%"} />
                            </div>
                        </div>
                        <div id="BigTask" className="Task" onClick={Tg_Chat_Open}>
                            <p>FOLLOW US IN</p>
                            <p>TELEGRAM CHAT</p>
                            <img src={Task_4} alt='Task_4' height={"35%"} />
                            <p id='littleEarn_p'>BitclifGame CHAT</p>
                        </div>
                    </div>
                </div>
            </div>
            <button id='CloseDebug' onClick={(event) => { onClose(event); handleCloseEarnAnim(event); onCheckSubscription(event); }}>X</button>
        </div>
    );
};

export default Earn;
