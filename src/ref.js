import React from 'react';
import './ref.css'
import Icon from './IMG/N.png';

const Ref = ({onClose}) => {
    return (
        <div className="ref">
            <div className="zagolovok">
                <p>Реферали</p>
            </div>

            <div className="SendBorder">
                <div className='SendInfo'>
                    <p>Пригласить Друга</p>
                </div>
                <div className="sendMenu">
                    <button>
                        Пригласить
                    </button>
                    <button>
                        Скопировать Ссилку
                    </button>
                </div>
            </div>

            <div className="FrandsBorder">
                <div className='FrendsInfo'>
                    <p>Мои друзя</p>
                </div>
                <div className="FrendsMenu">

                    <div className='Frends'>
                        <div className='FrendsAvatar'>
                            <img src={Icon} alt="Icon"/>
                        </div>
                        <p>Megatron</p>
                    </div>

                    <div className='Frends'>
                        <div className='FrendsAvatar'>
                            <img src={Icon} alt="Icon"/>
                        </div>
                        <p>Papa Karlo</p>
                    </div>

                    <div className='Frends'>
                        <div className='FrendsAvatar'>
                            <img src={Icon} alt="Icon"/>
                        </div>
                        <p>Anonimus</p>
                    </div>

                    <div className='Frends'>
                        <div className='FrendsAvatar'>
                            <img src={Icon} alt="Icon"/>
                        </div>
                        <p>Kardibalet</p>
                    </div>

                    <div className='Frends'>
                        <div className='FrendsAvatar'>
                            <img src={Icon} alt="Icon"/>
                        </div>
                        <p>Severnaia zvezda</p>
                    </div>
                </div>
            </div>
            <div className="zagolovok">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Ref;