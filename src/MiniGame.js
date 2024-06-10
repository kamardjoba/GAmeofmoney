// MiniGame.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import './MiniGame.css';

const MiniGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [playerX, setPlayerX] = useState(240);
    const [bullets, setBullets] = useState([]);
    const [invaders, setInvaders] = useState([]);
    const [invaderBullets, setInvaderBullets] = useState([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Инициализация пришельцев
        const initialInvaders = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 11; j++) {
                initialInvaders.push({ x: 30 + j * 40, y: 30 + i * 30, width: 30, height: 20 });
            }
        }
        setInvaders(initialInvaders);

        // Основной цикл отрисовки
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем игрока
            ctx.fillStyle = 'green';
            ctx.fillRect(playerX, 460, 40, 10);

            // Рисуем пули игрока
            ctx.fillStyle = 'red';
            bullets.forEach((bullet, index) => {
                ctx.fillRect(bullet.x, bullet.y, 5, 10);
                bullet.y -= 5;
                if (bullet.y < 0) {
                    setBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
            });

            // Рисуем пули пришельцев
            ctx.fillStyle = 'orange';
            invaderBullets.forEach((bullet, index) => {
                ctx.fillRect(bullet.x, bullet.y, 5, 10);
                bullet.y += 3; // Увеличиваем скорость для плавности
                if (bullet.y > canvas.height) {
                    setInvaderBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
                // Проверка попадания по игроку
                if (
                    bullet.y >= 460 &&
                    bullet.x >= playerX &&
                    bullet.x <= playerX + 40
                ) {
                    setLives(prevLives => prevLives - 1);
                    setInvaderBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
            });

            // Рисуем пришельцев
            ctx.fillStyle = 'white';
            invaders.forEach(invader => {
                ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
            });

            // Обновление положения пришельцев и проверка столкновений
            let edgeReached = false;
            setInvaders(prevInvaders =>
                prevInvaders.map(invader => {
                    invader.x += direction * 1; // Скорость пришельцев
                    if (invader.x <= 0 || invader.x + invader.width >= canvas.width) {
                        edgeReached = true;
                    }
                    bullets.forEach((bullet, bIndex) => {
                        if (
                            bullet.x >= invader.x &&
                            bullet.x <= invader.x + invader.width &&
                            bullet.y >= invader.y &&
                            bullet.y <= invader.y + invader.height
                        ) {
                            setInvaders(prevInvaders => prevInvaders.filter((_, i) => i !== invader));
                            setBullets(prevBullets => prevBullets.filter((_, i) => i !== bIndex));
                            setScore(prevScore => prevScore + 10);
                        }
                    });
                    return invader;
                })
            );

            if (edgeReached) {
                setDirection(prevDirection => -prevDirection);
                setInvaders(prevInvaders =>
                    prevInvaders.map(invader => ({
                        ...invader,
                        y: invader.y + 20,
                    }))
                );
            }

            // Вероятность выстрела пришельцев
            if (Math.random() < 0.02) { // Увеличиваем вероятность для плавности
                const shootingInvader = invaders[Math.floor(Math.random() * invaders.length)];
                if (shootingInvader) {
                    setInvaderBullets(prevBullets => [
                        ...prevBullets,
                        { x: shootingInvader.x + shootingInvader.width / 2, y: shootingInvader.y }
                    ]);
                }
            }

            if (lives > 0 && invaders.length > 0) {
                requestAnimationFrame(draw);
            } else if (lives === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'red';
                ctx.font = '30px Arial';
                ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
            } else if (invaders.length === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'green';
                ctx.font = '30px Arial';
                ctx.fillText('You Win!', canvas.width / 2 - 60, canvas.height / 2);
            }
        };

        draw();
    }, [playerX, bullets, invaderBullets, invaders, direction, lives]);

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        setPlayerX(touch.clientX - 20); // Центрирование самолета по пальцу
    };

    const handleTouchStart = useCallback((e) => {
        setBullets(prevBullets => [...prevBullets, { x: playerX + 17.5, y: 450 }]);
    }, [playerX]);

    useEffect(() => {
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchstart', handleTouchStart);
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [handleTouchStart]); // Добавьте handleTouchStart в зависимости

    return (
        <div className="mini-game-overlay">
            <canvas ref={canvasRef} width={500} height={500}></canvas>
            <div className="score">Score: {score}</div>
            <div className="lives">Lives: {lives}</div>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default MiniGame;
