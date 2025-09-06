import React, { useState, useEffect } from 'react';

const Toast = ({ show, message }) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsDone(false);
      
      // 动画时序控制
      const timer1 = setTimeout(() => setIsDone(true), 250);
      const timer2 = setTimeout(() => {
        setIsVisible(false);
        setIsDone(false);
      }, 1800);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [show, message]);

  if (!isVisible) return null;

  return (
    <div className={`copied-tip ${isVisible ? 'show' : ''} ${isDone ? 'done' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;