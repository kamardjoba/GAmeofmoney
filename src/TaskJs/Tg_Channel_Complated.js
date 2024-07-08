import React, { useState } from 'react';
import './Task.css';

import Tg from '../IMG/TaskIcon/task_4.webp';
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.webp';

const TgChannelComplated = ({onClose}) => {

    const TG_CHANNEL_LINK = "https://t.me/GOGOGOGOGOGOGOGgogogooo"; 

    const Tg_Channel_Open_chek = () => { window.location.href = TG_CHANNEL_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`} id="ComplatedDiv">
            <div className="BackButtom" id='ComplatedEnd' onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
             <h1>FOLLOW US IN <br/> TELEGRAM CHANNEL</h1>  
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame CHANNEL</p>
            </div>
            <button onClick={Tg_Channel_Open_chek} id='ComplatedBTN'> <img src={Tg} alt='Tg' id='ButtomIMG'/>YOU'RE SUBBED</button>
        </div>
    );
};

export default TgChannelComplated;