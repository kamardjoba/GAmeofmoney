// MiniGame.js
import React, { useRef, useEffect, useState } from 'react';
import './MiniGame.css';

const MiniGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [playerX, setPlayerX] = useState(240);
    const [bullets, setBullets] = useState([]);
    const [invaders, setInvaders] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Создание начального состояния пришельцев
        const initialInvaders = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 11; j++) {
                initialInvaders.push({ x: 30 + j * 40, y: 30 + i * 30 });
            }
        }
        setInvaders(initialInvaders);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем игрока
            ctx.fillStyle = 'green';
            ctx.fillRect(playerX, 460, 40, 10);

            // Рисуем пули
            ctx.fillStyle = 'red';
            bullets.forEach((bullet, index) => {
                ctx.fillRect(bullet.x, bullet.y, 5, 10);
                bullet.y -= 5;
                if (bullet.y < 0) {
                    setBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
            });

            // Рисуем пришельцев
            ctx.fillStyle = 'white';
            invaders.forEach((invader, index) => {
                ctx.fillRect(invader.x, invader.y, 30, 20);
            });

            // Обновление положения пришельцев и проверка столкновений
            invaders.forEach((invader, invIndex) => {
                bullets.forEach((bullet, bIndex) => {
                    if (
                        bullet.x >= invader.x &&
                        bullet.x <= invader.x + 30 &&
                        bullet.y >= invader.y &&
                        bullet.y <= invader.y + 20
                    ) {
                        setInvaders(prevInvaders => prevInvaders.filter((_, i) => i !== invIndex));
                        setBullets(prevBullets => prevBullets.filter((_, i) => i !== bIndex));
                        setScore(prevScore => prevScore + 10);
                    }
                });
            });

            requestAnimationFrame(draw);
        };

        draw();
    }, [playerX, bullets, invaders]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            setPlayerX(prevX => Math.max(prevX - 10, 0));
        } else if (e.key === 'ArrowRight') {
            setPlayerX(prevX => Math.min(prevX + 10, 480));
        } else if (e.key === ' ') {
            setBullets(prevBullets => [...prevBullets, { x: playerX + 17.5, y: 450 }]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="mini-game-overlay">
            <canvas ref={canvasRef} width={500} height={500}></canvas>
            <div className="score">Score: {score}</div>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default MiniGame;
