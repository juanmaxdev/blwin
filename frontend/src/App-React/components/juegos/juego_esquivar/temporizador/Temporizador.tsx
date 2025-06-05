import React, { useEffect, useState } from 'react';

interface TimerProps {
  jugando: boolean;
  fila: number;
  columna: number
}

const Temporizador: React.FC<TimerProps> = ({ jugando, fila, columna }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (jugando) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [jugando]);

  return (
    <div style={{
        gridColumn: `${columna} / ${columna + 1}`,
        gridRow: `${fila} / ${fila + 1}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div style={{
        padding: '1rem 2rem',
        background: 'radial-gradient(rgba(0, 234, 255, 0.3), #8f00ff)',
        color: 'white',
        borderRadius: '12px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>
        {seconds}s
      </div>
    </div>
  );
};

export default Temporizador;
