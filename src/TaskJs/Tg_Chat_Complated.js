import React, { useState } from 'react';
import './Task.css';


import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.png';

const TgChatComplated = ({onClose}) => {

    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ComplatedDiv">
            <div className="BackButtom" id='ComplatedEnd' onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
             <h1>FOLLOW US IN <br/> TELEGRAM CHAT</h1>  
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame CHAT</p>
            </div>
            <button id='ComplatedBTN'> <img src={Task_4} alt='Tg' id='ButtomIMG'/>YOU'RE SUBBED</button>
        </div>
    );
};

export default TgChatComplated;