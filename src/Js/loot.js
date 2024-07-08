import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/loot.css';

const Loot = ({onClose, handleCheckboxChange, userId}) => {
    const [isClosingLootForAnim, setClosingLootForAnim] = useState(false);
    const handleCloseLootAnim = () => {setClosingLootForAnim(true);};
    const [isCraftOpen, setisCraftOpen] = useState(false);
    const handleCheckboxChangeDiv = (event) => {
        setisCraftOpen(event.target.checked);
    };

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/load-progress`, { params: { userId } });
                if (response.status === 200) {
                    setCards(response.data.cards);
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, [userId]);

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
                <button>MISSED ITEMS</button>
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
                    {cards.map((card, index) => (
                        <div className="Loot_Card" key={index}>
                            <img src={card} alt={`Card ${index + 1}`}/>
                        </div>
                    ))}
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
