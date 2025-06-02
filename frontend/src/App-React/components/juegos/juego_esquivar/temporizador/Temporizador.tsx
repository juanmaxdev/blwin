import React, { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
}

const Temporizador: React.FC<TimerProps> = ({ isRunning }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{
      padding: '1rem 2rem',
      backgroundColor: '#28a745',
      color: 'white',
      borderRadius: '12px',
      width: 'fit-content',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}>
      {seconds}s
    </div>
  );
};

export default Temporizador;
