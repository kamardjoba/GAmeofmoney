import React, { useRef, useEffect, useState } from 'react';
import './MiniGame.css';

const MiniGame = ({ onClose, onSaveState, miniGameState }) => {
    const canvasRef = useRef(null);
    const [playerX, ] = useState(miniGameState.playerX || 240);
    const [bullets, setBullets] = useState(miniGameState.bullets || []);
    const [invaders, setInvaders] = useState(miniGameState.invaders || []);
    const [invaderBullets, setInvaderBullets] = useState(miniGameState.invaderBullets || []);
    const [score, setScore] = useState(miniGameState.score || 0);
    const [lives, setLives] = useState(miniGameState.lives || 3);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            ctx.fillRect(playerX, 460, 40, 10);

            ctx.fillStyle = 'red';
            bullets.forEach((bullet, index) => {
                ctx.fillRect(bullet.x, bullet.y, 5, 10);
                bullet.y -= 5;
                if (bullet.y < 0) {
                    setBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
            });

            ctx.fillStyle = 'orange';
            invaderBullets.forEach((bullet, index) => {
                ctx.fillRect(bullet.x, bullet.y, 5, 10);
                bullet.y += 2;
                if (bullet.y > canvas.height) {
                    setInvaderBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
                if (
                    bullet.y >= 460 &&
                    bullet.x >= playerX &&
                    bullet.x <= playerX + 40
                ) {
                    setLives(prevLives => prevLives - 1);
                    setInvaderBullets(prevBullets => prevBullets.filter((_, i) => i !== index));
                }
            });

            ctx.fillStyle = 'white';
            invaders.forEach(invader => {
                ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
            });

            let edgeReached = false;
            setInvaders(prevInvaders =>
                prevInvaders.map(invader => {
                    invader.x += 1;
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
                setInvaders(prevInvaders =>
                    prevInvaders.map(invader => ({
                        ...invader,
                        y: invader.y + 20
                    }))
                );
            }

            if (lives > 0 && invaders.length > 0) {
                requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = lives === 0 ? 'red' : 'green';
                ctx.font = '30px Arial';
                ctx.fillText(lives === 0 ? 'Game Over' : 'You Win!', canvas.width / 2 - 80, canvas.height / 2);
            }
        };

        draw();

        return () => {
            onSaveState({
                playerX,
                bullets,
                invaders,
                invaderBullets,
                score,
                lives
            });
        };
    }, [playerX, bullets, invaderBullets, invaders, lives, score, onSaveState]);

    return (
        <div className="mini-game-overlay">
            <canvas ref={canvasRef} width={500} height={500}></canvas>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default MiniGame;
