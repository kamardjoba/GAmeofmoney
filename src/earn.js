import React from 'react';
import './earn.css'


const Earn = ({onClose}) => {
    return (
        <div className="earn">
            <div className="zagolovok">
                <p>Награди</p>
            </div>

            <div className="EarnBorder">
                <div className="EarnMenu">

                    <div className="Zadanie">
                        <div className="zg">
                            <h1>Подписатся на tg-канал</h1>
                        </div>
                        <p>Награда: 10000</p>
                        <button>
                            Подписатся
                        </button>
                        <button>
                            Проверить
                        </button>
                    </div>

                    <div className="Zadanie">
                        <div className="zg">
                            <h1>Вступить в клан Clash Royale</h1>
                        </div>
                        <p>Награда: 99000</p>
                        <button>
                            Подписатся
                        </button>
                        <button>
                            Проверить
                        </button>
                    </div>

                    <div className="Zadanie">
                        <div className="zg">
                            <h1>Подписатся на twitter</h1>
                        </div>
                        <p>Награда: 10000</p>
                        <button>
                            Подписатся
                        </button>
                        <button>
                            Проверить
                        </button>
                    </div>

                    <div className="Zadanie">
                        <div className="zg">
                            <h1>Подписатся на Discord</h1>
                        </div>
                        <p>Награда: 10000</p>
                        <button>
                            Подписатся
                        </button>
                        <button>
                            Проверить
                        </button>
                    </div>

                </div>
            </div>
            <div className="zagolovok">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Earn;