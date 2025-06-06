import React, { useEffect, useState, useRef } from "react";

interface ContadorTiempoProps {
  resetKey: number;
  onTiempoCompleto: () => void;
  activo: boolean;
}

const ContadorTiempo: React.FC<ContadorTiempoProps> = ({
  resetKey,
  activo,
  onTiempoCompleto,
}) => {
  const [tiempo, setTiempo] = useState(60);
  const yaLlamóRef = useRef(false);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  // Reiniciar tiempo y la bandera cuando resetKey cambia
  useEffect(() => {
    setTiempo(60);
    yaLlamóRef.current = false;
  }, [resetKey]);

  // Manejo del intervalo
  useEffect(() => {
    if (!activo) {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
      return;
    }

    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    intervaloRef.current = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          if (!yaLlamóRef.current) {
            yaLlamóRef.current = true;
            onTiempoCompleto();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
    };
  }, [activo, resetKey, onTiempoCompleto]);

  // Render
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  const colorTemporizador =
    segundos > 20 || minutos > 0
      ? "text-green-600"
      : segundos > 10
        ? "text-yellow-400"
        : "text-red-500";

  return (
    <div className={`text-2xl font-extrabold contador-tiempo ${colorTemporizador}`}>
      ⏱ {minutos}:{segundos.toString().padStart(2, "0")}
    </div>
  );
};

export default ContadorTiempo;
