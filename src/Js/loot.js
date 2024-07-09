import React, { useState, useEffect } from 'react';
import '../Css/loot.css';
import axios from 'axios';
import Craft from './craft';
import znakLogo from '../IMG/Znak.png';
import Loot_Znak from '../IMG/Loot_ZNAK.png';


const Loot = ({ onClose, handleCheckboxChange, userId }) => {
    const [isClosingLootForAnim, setClosingLootForAnim] = useState(false);
    const handleCloseLootAnim = () => { setClosingLootForAnim(true); };

    const [isCraftOpen, setisCraftOpen] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const response = await axios.get(`/load-progress?userId=${userId}`);
            setCards(response.data.cards || []);
        };
        fetchCards();
    }, [userId]);

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
                            <p>COMPLATE WEEKLY</p>
                            <p>TASKS AND <span className="Ref_Earn_Purple">EARN</span></p>
                            <p className="Ref_Earn_Purple">MORE ITEMS</p>
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
                    {cards.map((card, index) => (
                        <div key={index} className="Loot_Card" id='Basic_item_card'>
                            <img src={card} alt={`Card ${index}`} />
                        </div>
                    ))}
                </div>    
            </div>
            <button id='CloseDebug' onClick={(event) => { onClose(event); handleCloseLootAnim(event); }}>X</button>
            {isCraftOpen && <Craft />}
        </div>
    );
};

export default Loot;
