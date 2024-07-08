import React, { useState } from 'react';
import './Task.css';


import X from '../IMG/TaskIcon/task_5.webp'
import BackButtom from '../IMG/Back.png';
import Icon from '../IMG/TaskIcon/task_2.webp';

const XBord = ({onClose, Basic}) => {
    const X_LINK = 'https://x.com/NazarLymar';

    const X_chek = () => { window.location.href = X_LINK; };
    const [isClosingForAnim, setClosingForAnim] = useState(false);
    const handleCloseAnim = () => {setClosingForAnim(true);};

    function XFirstClick() {
        localStorage.setItem('XVisible', 'false');
        localStorage.setItem('XVisibleClaim', 'true');
    }

    return (
        <div className={`Task_Border ${isClosingForAnim ? 'closing' : ''}`}>
            <div className="BackButtom" onClick={(event) => {onClose(event); handleCloseAnim(event); }}> <img src={BackButtom} alt='BackButtom'/> </div>
                <h1>FOLLOW US IN X</h1> 
            <div className='NameChannelDiv'>
                <img src={Icon} alt='Icon' id="TaskIcon"/>
                <p>BifclifGame</p>
            </div>
            <button onClick={(event) => {XFirstClick(event); X_chek(event); }}> <img src={X} alt='X' id='ButtomIMG'/>SUBSCRIBE</button>
            <img src={Basic} alt='Basic_item'/>
        </div>
    );
};

export default XBord;