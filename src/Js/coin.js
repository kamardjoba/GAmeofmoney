import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coinImage from '../IMG/88nog.png';
import ink from '../IMG/ink.png';
import '../Css/coin.css';

const Coindiv = ({ onClick, coinPerClick, energyNow }) => {
  const [clicksArray, setClicksArray] = useState([]);

  const handleTouchStart = (event) => {
    event.preventDefault(); // Остановка стандартного поведения, если необходимо
    handleTouch(event.touches);
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Остановка стандартного поведения, если необходимо
    handleTouch(event.touches);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    // Остановка всех текущих анимаций или обработка завершения касания
  };

  const handleTouch = (touches) => {
    if (coinPerClick > energyNow) return;

    const newClicks = [];
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const x = touch.clientX;
      const y = touch.clientY;

      newClicks.push({
        id: Date.now() + i,
        x,
        y,
        value: coinPerClick,
      });

      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }

    setClicksArray((prevClicks) => [...prevClicks, ...newClicks]);
    onClick();
  };

  return (
    <motion.div className='Podsos'>
      <img
        src={coinImage}
        alt="Coin"
        height="90%"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      <AnimatePresence>
        {clicksArray.map((click) => (
          <motion.div
            key={click.id}
            className="click-value"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "ease-out" }}
            style={{ top: click.y, left: click.x }}
          >
            <p>+{click.value}</p>
            <img id="inktap" src={ink} alt='ink' width={"100%"} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Coindiv;



//onMouseDown={handleInteractionStart}
            //onMouseUp={handleInteractionEnd}
            //onClick={onClick}