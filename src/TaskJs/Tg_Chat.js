import React, { useState } from 'react';
import './Task.css';

import Rire from '../IMG/Rire_item.png';
import Tg from '../IMG/TaskIcon/task_4.png';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const TgChatBord = ({onClose}) => {
    
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`}>
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
            <h1>FOLLOW US IN <br/> TELEGRAM CHAT</h1>
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame CHAT</p>
            </div>
            <button> <img src={Tg} alt='Tg' id='ButtomIMG'/>SUBSCRIBE</button>
            <img src={Rire} alt='Rire_item'/>
        </div>
    );
};

export default TgChatBord;
