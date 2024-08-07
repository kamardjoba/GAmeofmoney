import React, { useState } from 'react';
import '../Css/loot.css';
import Craft from './craft'
import znakLogo from '../IMG/Znak.png';
import Loot_Znak from '../IMG/Loot_ZNAK.png';
import Zmk from '../IMG/Card/Card_Zmk.webp';
import Znk from '../IMG/Card/Card_Znk.webp';
import Card_Smart_Octo from '../IMG/Card/Card_Smart_Octo.webp';
import Card_Developer from '../IMG/Card/Card_Developer.webp';
import Card_Brain from '../IMG/Card/Card_Brain.webp';
import Card_Scroll from '../IMG/Card/Card_Scroll.webp';
import Card_Octopus from '../IMG/Card/Card_Octopus.webp';

const Loot = ({ onClose, handleCheckboxChange, cardUrls }) => {
  const [isClosingLootForAnim, setClosingLootForAnim] = useState(false);
  const handleCloseLootAnim = () => { setClosingLootForAnim(true); };
  const [isCraftOpen, setisCraftOpen] = useState(false);

  const handleCheckboxChangeDiv = (event) => {
    setisCraftOpen(event.target.checked);
  };

  return (
    <div className={`Ref_Earn_Shop_Window ${isClosingLootForAnim ? 'closing' : ''}`} id='LootWindow'>
      <div className="Ref_Earn_BoxBorder">
        <div className='Ref_Earn_Box'>
          <img src={Loot_Znak} alt='Loot_Znak' height={"80%"} />
        </div>
        <div className='Ref_Earn_BoxTitle'>
          <div className='Ref_Earn_BoxUp'>
            <p>WEEKLY TASKS</p>
          </div>
          <div className='Ref_Earn_BoxDown'>
            <div className='Ref_Earn_BoxLeft'>
              <img src={znakLogo} alt='znakLogo' height={"50%"} />
            </div>
            <div className='Ref_Earn_BoxRight'>
              <p>COMPLETE WEEKLY</p>
              <p>TASKS AND <span className="Ref_Earn_Purple">EARN</span></p>
              <p className="Ref_Earn_Purple">MORE ITEMS </p>
            </div>
          </div>
        </div>
      </div>

      <div className='SWITCHBTN'>
        <button>MISSED ITEMS</button>
        <input id="checkbox_toggle" type="checkbox" className="check" onChange={(event) => { handleCheckboxChangeDiv(event); handleCheckboxChange(event); }} />
        <div className="checkbox">
          <label className="slide" htmlFor="checkbox_toggle">
            <label className="toggle" htmlFor="checkbox_toggle"></label>
            <label className="text" htmlFor="checkbox_toggle" id="LootTxt">LOOT </label>
            <label className="text" htmlFor="checkbox_toggle" id="CraftTxt">CRAFT</label>
          </label>
        </div>
      </div>
      <div className='Loot_Wnd'>
        <div className="Loot_Scroll_Menu">
          <div className="Loot_Card" id='Basic_item_card'>
            <img src={Card_Scroll} alt='Card_Scroll' />
          </div>

          <div className="Loot_Card" id='Basic_item_card'>
            <img src={Card_Octopus} alt='Card_Octopus' />
          </div>

          <div className="Loot_Card" id="Epic_item_card">
            <img src={Card_Developer} alt='Card_Developer' />
          </div>

          <div className="Loot_Card" id="Rare_item_card">
            <img src={Card_Brain} alt='Card_Brain' />
          </div>

          <div className="Loot_Card" id="Rare_item_card">
            <img src={Card_Smart_Octo} alt='Card_Smart_Octo' />
          </div>

          <div className="Loot_Card">
            <img src={Znk} alt='Znk' />
          </div>

          <div className="Loot_Card">
            <img src={Zmk} alt='Zmk' />
          </div>  

          {cardUrls.map((cardUrl, index) => (
            <div key={index} className="Loot_Card" id='Epic_item_card'>
              <img src={cardUrl} alt={`Card ${index}`} />
            </div>
          ))}
        </div>
      </div>

      <button id='CloseDebug' onClick={(event) => { onClose(event); handleCloseLootAnim(event); }}>X</button>

      {isCraftOpen && (
        <Craft />
      )}
    </div>
  );
};

export default Loot;
