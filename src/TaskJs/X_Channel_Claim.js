import React, { useState } from 'react';
import './Task.css';

import Xclime from '../IMG/TaskIcon/task_5.webp';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.webp';

const XClaimBord = ({onClose, Basic_Claim}) => {

    const X_LINK = 'https://x.com/NazarLymar';

    const X_chek = () => { window.location.href = X_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    function XSrcondClick() {
        localStorage.setItem('XVisibleClaim', 'false');
        localStorage.setItem('XVisibleComplated', 'true');
    }

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ClimeDiv">
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
             <h1>FOLLOW US IN X</h1>  
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame</p>
            </div>
            <button onClick = {X_chek}> <img src={Xclime} alt='Xclime' id='ButtomIMG'/>YOU'RE SUBBED</button>
            <div className='forClaim'>
                <img src={Basic_Claim} alt='Basic_Claim_item' id='ClaimIMG'/>
                <button onClick={(event) => {onClose(event); XSrcondClick(event); }} id="ClaimBTN">CLAIM</button>
            </div>
        </div>
    );
};

export default XClaimBord;