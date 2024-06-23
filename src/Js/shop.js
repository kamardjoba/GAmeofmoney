import React, { useState } from 'react';
import '../Css/shop.css';
import money from '../IMG/money.jpg';
import znakLogo from '../IMG/Znak.png';

const Shop = ({onClose}) => {

  const [isClosingShopForAnim, setClosingShopForAnim] = useState(false);
  const handleCloseShopAnim = () => {setClosingShopForAnim(true);};
  
  return (
      <div className={`Ref_Earn_Shop_Window ${isClosingShopForAnim ? 'closing' : ''}`} id="ShopWindow">
        <div className="Ref_Earn_BoxBorder">
          <div className='Ref_Earn_Box'>
            <img src={money} alt='money' height={"70%"}/>
          </div>
          <div className='Ref_Earn_BoxTitle'>
            <div className='Ref_Earn_BoxUp'>
              <p>GIRL FAKE PNG</p>
            </div>
            <div className='Ref_Earn_BoxDown'>
              <div className='Ref_Earn_BoxLeft'>
                <img src={znakLogo} alt='znakLogo' height={"50%"}/>
              </div>
              <div className='Ref_Earn_BoxRight'>
                <p>SPEND <span className="Ref_Earn_Purple">YOUR MONEY</span></p>
                <p>FOR OUR ITEMS IN</p>
                <p>STORE</p>
              </div>
            </div>
          </div>
        </div>
        <button id='CloseDebug' onClick={(event) => {onClose(event); handleCloseShopAnim(event); }}>X</button>
        <div className='ShopMenu'>

        </div>
      </div>
  );
};

export default Shop;
