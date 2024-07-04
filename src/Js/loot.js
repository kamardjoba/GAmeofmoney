import React, { useState } from 'react';
import '../Css/loot.css';
import Craft from './craft'
import znakLogo from '../IMG/Znak.png';
import Loot_Znak from '../IMG/Loot_ZNAK.png';

const Loot = ({onClose,handleCheckboxChange}) => {

    const [isClosingLootForAnim, setClosingLootForAnim] = useState(false);
    const handleCloseLootAnim = () => {setClosingLootForAnim(true);};

    const [isCraftOpen, setisCraftOpen] = useState(false);

    const handleCheckboxChangeDiv = (event) => {
        setisCraftOpen(event.target.checked);
      };

    return (  
        <div className={`Ref_Earn_Shop_Window ${isClosingLootForAnim ? 'closing' : ''}`} id='LootWindow'>

            <div className="Ref_Earn_BoxBorder">
                <div className='Ref_Earn_Box'>
                    <img src={Loot_Znak} alt='Loot_Znak' height={"80%"}/>
                </div>
                <div className='Ref_Earn_BoxTitle'>
                    <div className='Ref_Earn_BoxUp'>
                        <p>WEEKLY TASKS</p>
                    </div>
                    <div className='Ref_Earn_BoxDown'>
                        <div className='Ref_Earn_BoxLeft'>
                            <img src={znakLogo} alt='znakLogo' height={"50%"}/>
                        </div>
                        <div className='Ref_Earn_BoxRight'>
                            <p>COMPLATE WEEKLY</p>
                            <p>TASKS AND <span className="Ref_Earn_Purple">EARN</span></p>
                            <p className="Ref_Earn_Purple" >MORE ITEMS</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='SWITCHBTN'>
            <input id="checkbox_toggle" type="checkbox" class="check" onChange={(event) => {handleCheckboxChangeDiv(event); handleCheckboxChange(event); }}/>
                <div class="checkbox">
                    <label class="slide" for="checkbox_toggle">
                    <label class="toggle" for="checkbox_toggle"></label>
                    <label class="text" for="checkbox_toggle" id="LootTxt">LOOT </label>
                    <label class="text" for="checkbox_toggle" id="CraftTxt">CRAFT</label>
                    </label>
                </div>
            </div>
            <div className='Loot_Wnd'>
                <div className="Loot_Scroll_Menu">

                    <div className="Loot_Card">
                        <p>1</p>
                    </div>
                    <div className="Loot_Card">
                        <p>2</p>
                    </div>
                    <div className="Loot_Card">
                        <p>3</p>
                    </div>
                    <div className="Loot_Card">
                        <p>4</p>
                    </div>
                    <div className="Loot_Card">
                        <p>5</p>
                    </div>

                </div>    
            </div>
                
        <button id='CloseDebug' onClick={(event) => {onClose(event); handleCloseLootAnim(event); }}>X</button>

        {isCraftOpen && (
            <Craft/>
        )}

        </div>
    );
};

export default Loot;