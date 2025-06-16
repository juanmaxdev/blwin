import React from 'react';

interface Props {
  etapa: string;
  finJuego: boolean;
  todasCorrectas: boolean;
  puntajeFinal: number;
  reiniciar: () => void;
}

const PantallaFinal: React.FC<Props> = ({ etapa, finJuego, todasCorrectas, puntajeFinal, reiniciar }) => (
  <div className="text-center mt-6">
    {finJuego ? (
      <p className="text-red-600 mb-4">Respuesta incorrecta. Fin del juego.</p>
    ) : etapa === 'final' ? (
      <>
        <p className="text-green-700 font-semibold mb-4">¡Completaste todas las etapas!</p>
        {todasCorrectas && (
          <p className="text-blue-600 font-medium mb-4">
            ¡Respondiste todas las preguntas correctamente! Tus puntos se duplican.
          </p>
        )}
        <p className="text-lg">Has ganado <strong>{puntajeFinal}</strong> puntos</p>
      </>
    ) : (
      <p className="mb-4">No quedan más preguntas o el juego ha terminado.</p>
    )}
  </div>
);

export default PantallaFinal;
