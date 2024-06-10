import React from 'react';
import './coin.css';
import coinImage from './IMG/8nog.png';

const Coindiv = ({ onClick, coinPerClick, energyNow }) => {
    return (
        <div className='Podsos'>
            <img src={coinImage} alt="Coin" height="105%" onClick={onClick} id="omar" />
        </div>
    );
};

export default Coindiv;
