import React from 'react';
import '../Css/Mystery_Box.css';
import MysteryImg from '../IMG/MisteryBox.png';

const MysteryBox = () => {
    
    return (
        <div className="Mystery">
            <div className='MysteryBox'>
                <img src={MysteryImg} alt='MysteryImg'/>
                <button onClick={localStorage.setItem('BoxOpen', 'false')}>OPEN</button>
            </div>
        </div>
    );
};

export default MysteryBox;