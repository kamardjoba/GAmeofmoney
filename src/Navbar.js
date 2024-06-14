import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="navbar">
            {location.pathname !== '/' ? (
                <button onClick={handleBack} className="back-button">Назад</button>
            ) : (
                <div className="nav-buttons">
                    <button onClick={() => navigate('/earn')}>Заработать</button>
                    <button onClick={() => navigate('/ref')}>Реф</button>
                    {/* Добавьте другие кнопки здесь */}
                </div>
            )}
        </div>
    );
};

export default Navbar;
