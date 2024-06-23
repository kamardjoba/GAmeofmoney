import React from 'react';
import '../Css/Mystery_Box.css';
import MysteryImg from '../IMG/MisteryBox.png';

const MysteryBox = ({onClose}) => {
    
    return (
        <div className="Mystery">
            <div onClick={onClose} className='MysteryBox'>
                <img src={MysteryImg} alt='MysteryImg'/>
                <button>OPEN</button>
            </div>
        </div>
    );
};

export default MysteryBox;
