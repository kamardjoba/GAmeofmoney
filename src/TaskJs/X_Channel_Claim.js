import React, { useState } from 'react';
import './Task.css';

import Basic_Claim from '../IMG/Basic_Claim.png';
import Xclime from '../IMG/TaskIcon/task_5.png';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const XClaimBord = ({onClose}) => {

    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    function XSrcondClick() {
        localStorage.setItem('XVisibleClaim', 'False');
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
            <button> <img src={Xclime} alt='Xclime' id='ButtomIMG'/>YOU'RE SUBBED</button>
            <div className='forClaim'>
                <img src={Basic_Claim} alt='Basic_Claim_item' id='ClaimIMG'/>
                <button onClick={XSrcondClick} id="ClaimBTN">CLAIM</button>
            </div>
        </div>
    );
};

export default XClaimBord;