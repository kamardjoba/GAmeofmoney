import React, { useState } from 'react';
import './Task.css';

import Epic_Claim from '../IMG/Epic_Claim.png';
import Tg from '../IMG/TaskIcon/task_4.png';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const TgChannelClaimBord = ({onClose, setisVisibleComplated}) => {

    
    const TG_CHANNEL_LINK = "https://t.me/GOGOGOGOGOGOGOGgogogooo"; 

    const Tg_Channel_Open_chek = () => { window.location.href = TG_CHANNEL_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

      
    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ClimeDiv">
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
             <h1>FOLLOW US IN <br/> TELEGRAM CHANNEL</h1>  
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame CHANNEL</p>
            </div>
            <button onClick={Tg_Channel_Open_chek}> <img src={Tg} alt='Tg' id='ButtomIMG'/>YOU'RE SUBBED</button>
            <div className='forClaim'>
                <img src={Epic_Claim} alt='Epic_Claim_item' id='ClaimIMG'/>
                <button id="ClaimBTN" onClick={(event) => {localStorage.setItem('VisibleClaim', false); setisVisibleComplated(true); }}>CLAIM</button>
            </div>
        </div>
    );
};

export default TgChannelClaimBord;