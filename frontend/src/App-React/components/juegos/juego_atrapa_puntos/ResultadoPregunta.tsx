import React from 'react';

interface Props {
  correcta: boolean | null;
  correctaTexto: string;
  perdida: number;
  onSiguiente: () => void;
}

const ResultadoPregunta: React.FC<Props> = ({ correcta, correctaTexto, perdida, onSiguiente }) => (
  <div className="mt-4">
    <p>
      {correcta
        ? '¡Correcto!'
        : `Incorrecto. Perdiste ${perdida} puntos. La respuesta correcta era: "${correctaTexto}".`}
    </p>
    <button onClick={onSiguiente} className="mt-3 bg-green-500 text-white px-4 py-2 rounded">
      Siguiente pregunta
    </button>
  </div>
);

export default ResultadoPregunta;
