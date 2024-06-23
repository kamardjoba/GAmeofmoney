import React, { useState } from 'react';
import '../Css/loot.css';
import Craft from './craft'

const Loot = ({onClose,handleCheckboxChange}) => {

    const [isClosingLootForAnim, setClosingLootForAnim] = useState(false);
    const handleCloseLootAnim = () => {setClosingLootForAnim(true);};

    const [isCraftOpen, setisCraftOpen] = useState(false);

    const handleCheckboxChangeDiv = (event) => {
        setisCraftOpen(event.target.checked);
      };

    return (
        <div className={`Ref_Earn_Shop_Window ${isClosingLootForAnim ? 'closing' : ''}`} id='LootWindow'>
           <input id="checkbox_toggle" type="checkbox" class="check" onChange={(event) => {handleCheckboxChangeDiv(event); handleCheckboxChange(event); }}/>
                <div class="checkbox">
                    <label class="slide" for="checkbox_toggle">
                    <label class="toggle" for="checkbox_toggle"></label>
                    <label class="text" for="checkbox_toggle" id="LootTxt">LOOT </label>
                    <label class="text" for="checkbox_toggle" id="CraftTxt">CRAFT</label>
                    </label>
                </div>

                <p>Loot</p>
        <button id='CloseDebug' onClick={(event) => {onClose(event); handleCloseLootAnim(event); }}>X</button>

        {isCraftOpen && (
            <Craft/>
        )}

        </div>
    );
};

export default Loot;
