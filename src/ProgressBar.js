import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, max }) => {
    const percentage = (current / max) * 100;

    return (
        <div className="progress-bar">
            <div className="progress-bar__background"></div>
            <div className="progress-bar__fill" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;
