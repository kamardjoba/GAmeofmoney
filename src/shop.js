// shop.js
import React, { useEffect } from 'react';
import './shop.css';

const Shop = ({ coins, onClose,
                  onUpgrade, coinPerClick, upgradeLevel, upgradeCost,
                  onUpgradeEnergy, clickLimit, upgradeLevelEnergy, upgradeCostEnergy,
                  onUpgradeEnergyTime, valEnergyTime, upgradeEnergyTimeLevel, upgradeCostEnergyTime  }) => {

    useEffect(() => {
        // Настройка кнопки "Назад" при монтировании компонента
        if (window.Telegram.WebApp) {
            if (!window.Telegram.WebApp.BackButton.isVisible) {
                window.Telegram.WebApp.BackButton.show();
            }
            window.Telegram.WebApp.BackButton.offClick(); // Убираем старые обработчики
            window.Telegram.WebApp.BackButton.onClick(() => {
                onClose();
                if (window.Telegram.WebApp.BackButton.isVisible) {
                    window.Telegram.WebApp.BackButton.hide(); // Скрываем кнопку
                }
            });
        }

        return () => {
            // Скрываем кнопку при размонтировании компонента
            if (window.Telegram.WebApp && window.Telegram.WebApp.BackButton.isVisible) {
                window.Telegram.WebApp.BackButton.hide();
            }
        };
    }, [onClose]);

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
                    <p>{coinPerClick}</p>
                    <div className="inform">
                        <p>Уровень улучшения: {upgradeLevel}</p>
                    </div>
                    <div className="inform">
                        <p>Стоимость улучшения: {upgradeCost}</p>
                    </div>
                    <button onClick={onUpgrade} disabled={coins < upgradeCost}>
                        Улучшить
                    </button>
                </div>
            </div>

            <div className="section">
                <div className='hz'>
                    <p>Энергия</п>
                </div>
                <div className="section-menu">
                    <p>{clickLimit}</п>
                    <div className="inform">
                        <п>Уровень улучшения: {upgradeLevelEnergy}</п>
                    </div>
                    <div className="inform">
                        <п>Стоимость улучшения: {upgradeCostEnergy}</п>
                    </div>
                    <button onClick={onUpgradeEnergy} disabled={coins < upgradeCostEnergy}>
                        Улучшить
                    </button>
                </div>
            </div>

            <div className="section">
                <div className='hz'>
                    <п>Востановления енергиї</п>
                </div>
                <div className="section-menu">
                    <п>{valEnergyTime} в секунду</п>
                    <div className="inform">
                        <п>Уровень улучшения: {upgradeEnergyTimeLevel}</п>
                    </div>
                    <div className="inform">
                        <п>Стоимость улучшения: {upgradeCostEnergyTime}</п>
                    </div>
                    <button onClick={onUpgradeEnergyTime} disabled={coins < upgradeCostEnergyTime}>
                        Улучшить
                    </button>
                </div>
            </div>
            <div className="zagolovok">
                <button onClick={onClose} className="close-button">Закрыть</button>
            </div>
        </div>
    );
};

export default Shop;
