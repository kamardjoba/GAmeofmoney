import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coinImage from '../IMG/88nog.png';
import ink from '../IMG/ink.png';
import '../Css/coin.css';

const Coindiv = ({ onClick, coinPerClick, energyNow }) => {
  const [clicksArray, setClicksArray] = useState([]);

  const handleInteractionStart = (event) => {
    const touchEvents = event.type === 'touchstart' ? event.touches : [event];
    const newClicks = [];

    for (let touchEvent of touchEvents) {
      const rect = event.target.getBoundingClientRect();
      const x = touchEvent.clientX - rect.left;
      const y = touchEvent.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -40;
      const rotateY = ((x / rect.width) - 0.5) * 40;
      
      event.target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (coinPerClick <= energyNow) {
        newClicks.push({ id: Date.now(), x, y, value: coinPerClick });
      }
    }

    setClicksArray((prevClicks) => [...prevClicks, ...newClicks]);
    onClick();

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };
  
  const handleInteractionEnd = (event) => {
    event.target.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <motion.div className='Podsos'>
      <img 
        src={coinImage} 
        alt="Coin" 
        height="90%" 
        onTouchEnd={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
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
