import React, { useState } from 'react';
import './Task.css';

import Basic from '../IMG/Basic_item.png';
import X from '../IMG/TaskIcon/task_5.png'
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const XBord = ({onClose}) => {
    
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`}>
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
                <h1>FOLLOW US IN X</h1> 
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame</p>
            </div>
            <button> <img src={X} alt='X' id='ButtomIMG'/>SUBSCRIBE</button>
            <img src={Basic} alt='Basic_item'/>
        </div>
    );
};

export default XBord;