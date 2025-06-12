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
        <p className="text-lg">Puntaje final: <strong>{puntajeFinal}</strong></p>
      </>
    ) : (
      <p className="mb-4">No quedan más preguntas o el juego ha terminado.</p>
    )}
    <button onClick={reiniciar} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
      Reiniciar juego
    </button>
  </div>
);

export default PantallaFinal;
