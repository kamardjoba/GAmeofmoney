import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coinImage from '../IMG/88nog.png';
import ink from '../IMG/ink.png';
import '../Css/coin.css';

const Coindiv = ({ onClick, coinPerClick, energyNow }) => {
  const [clicksArray, setClicksArray] = useState([]);

  const handleTouchStart = (event) => {
    event.preventDefault();
    handleTouch(event);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    handleTouch(event);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    event.target.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  const handleTouch = (event) => {
    const touches = event.touches;
    if (coinPerClick > energyNow) return;

    const newClicks = [];
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const rect = event.target.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -40;
      const rotateY = ((x / rect.width) - 0.5) * 40;
      
      event.target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      newClicks.push({
        id: Date.now() + i,
        x: touch.clientX,
        y: touch.clientY,
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