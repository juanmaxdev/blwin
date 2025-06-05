import React, { useEffect, useState } from "react";

interface ContadorTiempoProps {
  resetKey: number;
  onTiempoCompleto: () => void;
}

const ContadorTiempo: React.FC<ContadorTiempoProps> = ({
  resetKey,
  onTiempoCompleto,
}) => {
  const [tiempo, setTiempo] = useState(60); // ⏱️ inicia en 60 segundos

  useEffect(() => {
    setTiempo(60); // reinicia a 60 cada vez que cambia resetKey
  }, [resetKey]);

  useEffect(() => {
    if (tiempo <= 0) return;

    const intervalo = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          onTiempoCompleto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempo, onTiempoCompleto]);

  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;

  const colorTemporizador =
    segundos > 20 || minutos > 0 ? "text-green-600"
      : segundos > 10 ? "text-yellow-400"
        : "text-red-500";

  return (
    <div className={`text-2xl font-extrabold contador-tiempo ${colorTemporizador}`}>
      ⏱ {minutos}:{segundos.toString().padStart(2, "0")}
    </div>
  );
};

export default ContadorTiempo;
