import React from 'react';
import './shop.css';

const Shop = ({ coins, onUpgrade, onClose, upgrades }) => {
    return (
        <div className="shop">
            <div className="zagolovok">
                <p>Магазин</p>
            </div>
            <div className="section">
                <div className='hz'>
                    <p>Монет за клик</p>
                </div>
                <div className="section-menu">
                    <p>Уровень: {upgrades.coinPerClick.level}</p>
                    <p>Стоимость: {upgrades.coinPerClick.cost}</p>
                    <button onClick={() => onUpgrade('coinPerClick')} disabled={coins < upgrades.coinPerClick.cost}>
                        Улучшить
                    </button>
                </div>
            </div>
            <div className="section">
                <div className='hz'>
                    <p>Энергия</p>
                </div>
                <div className="section-menu">
                    <p>Лимит: {upgrades.energy.limit}</p>
                    <p>Уровень: {upgrades.energy.level}</p>
                    <p>Стоимость: {upgrades.energy.cost}</p>
                    <button onClick={() => onUpgrade('energy')} disabled={coins < upgrades.energy.cost}>
                        Улучшить
                    </button>
                </div>
            </div>
            <div className="section">
                <div className='hz'>
                    <p>Восстановление энергии</p>
                </div>
                <div className="section-menu">
                    <p>Время: {upgrades.energyTime.time / 1000} сек</p>
                    <p>Уровень: {upgrades.energyTime.level}</p>
                    <p>Стоимость: {upgrades.energyTime.cost}</p>
                    <button onClick={() => onUpgrade('energyTime')} disabled={coins < upgrades.energyTime.cost}>
                        Улучшить
                    </button>
                </div>
            </div>
            <button onClick={onClose} className="close-button">Закрыть</button>
        </div>
    );
};

export default Shop;
