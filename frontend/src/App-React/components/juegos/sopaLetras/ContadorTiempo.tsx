// src/components/juegos/sopaLetras/ContadorTiempo.tsx
import React, { useEffect, useState } from "react";

interface ContadorTiempoProps {
  resetKey: number;
  onTiempoCompleto: () => void;
}

const ContadorTiempo: React.FC<ContadorTiempoProps> = ({ resetKey, onTiempoCompleto }) => {
  const [tiempo, setTiempo] = useState(0);

  useEffect(() => {
    setTiempo(0); // reinicia el contador cuando cambia resetKey
  }, [resetKey]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((t) => {
        if (t + 1 === 60) {
          onTiempoCompleto();
          return 0;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [onTiempoCompleto]);

  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;

  return (
    <div className="contador-tiempo">
      ⏱️ Tiempo: {minutos}:{segundos.toString().padStart(2, "0")}
    </div>
  );
};

export default ContadorTiempo;
