import React, { useState } from 'react';
import './Task.css';

import Rare_Claim from '../IMG/Rare_Clime.png';
import Tg from '../IMG/TaskIcon/task_4.webp';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.webp';

const TgClaim = ({onClose, setVisibleClaimChat}) => {

    const TG_CHAT_LINK = 'https://t.me/Bitclif_game';

    const Tg_Chat_Open_chek = () => { window.location.href = TG_CHAT_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ClimeDiv">
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
            <h1>FOLLOW US IN <br/> TELEGRAM CHAT</h1>
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame CHAT</p>
            </div>
            <button onClick={Tg_Chat_Open_chek}>  <img src={Tg} alt='Tg' id='ButtomIMG'/>YOU'RE SUBBED</button>
            <div className='forClaim'>
                <img src={Rare_Claim} alt='Rare_Claim_item' id='ClaimIMG'/>
                <button id="ClaimBTN"  onClick={(event) => {setVisibleClaimChat(false); localStorage.setItem('VisibleChatComplated', 'true'); }}>CLAIM</button>
            </div>
        </div>
    );
};

export default TgClaim;