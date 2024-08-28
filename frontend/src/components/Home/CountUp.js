import React, { useState, useEffect } from 'react';

const CountUp = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const increment = Math.ceil((end - prevCount) / 10); // Velocidad del conteo
        return prevCount + increment;
      });
    }, 50); // Intervalo de actualización

    // Limpiar intervalo cuando el conteo llega al valor final
    if (count >= end) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  return <span>{count}</span>;
};

export default CountUp;
