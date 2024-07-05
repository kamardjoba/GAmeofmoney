import React, { useState } from 'react';
import './Task.css';

import Xclime from '../IMG/TaskIcon/task_5.png';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const XComplated = ({onClose}) => {
  
    const X_LINK = 'https://x.com/NazarLymar';

    const X_chek = () => { window.location.href = X_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ComplatedDiv">
            <div className="BackButtom" id='ComplatedEnd' onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
             <h1>FOLLOW US IN X</h1>  
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame</p>
            </div>
            <button onClick = {X_chek} id='ComplatedBTN'> <img src={Xclime} alt='Xclime' id='ButtomIMG'/>YOU'RE SUBBED</button>
        </div>
    );
};

export default XComplated;