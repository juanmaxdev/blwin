import React from 'react';

// Se define la interfaz de props que recibe el componente
interface Props {
  etapa: string; // Indica la etapa actual del juego ('2', '3', '4' o 'final')
  finJuego: boolean; // True si el juego ha terminado por una respuesta incorrecta
  todasCorrectas: boolean; // True si el usuario respondió todas las preguntas correctamente
  puntajeFinal: number; // Puntuación final del usuario
  reiniciar: () => void; // Función para reiniciar el juego (aunque no se usa en este componente)
}

// Componente funcional que representa la pantalla final del juego
const PantallaFinal: React.FC<Props> = ({
  etapa,
  finJuego,
  todasCorrectas,
  puntajeFinal
}) => (
  // Contenedor principal con estilos centrados y margen superior
  <div className="text-center mt-6">

    {/* Condicional: Si el juego terminó por una respuesta incorrecta */}
    {finJuego ? (
      <p className="text-red-600 text-lg font-semibold mb-4">
        Respuesta incorrecta. Fin del juego.
      </p>
    ) : etapa === 'final' ? (
      // Si se completaron todas las etapas correctamente
      <>
        <p className="text-green-700 text-lg font-semibold mb-4">
          ¡Completaste todas las etapas!
        </p>

        {/* Si además se respondieron todas las preguntas bien */}
        {todasCorrectas && (
          <p className="text-blue-600 font-lg font-semibold mb-4">
            ¡Respondiste todas las preguntas correctamente! Tus puntos se duplican.
          </p>
        )}

        {/* Mostrar la puntuación final */}
        <p className="text-lg font-semibold">
          Has ganado <strong>{puntajeFinal}</strong> puntos
        </p>
      </>
    ) : (
      // Si no quedan preguntas o por alguna razón terminó el juego sin llegar al final
      <p className="mb-4 text-lg font-semibold text-red-600">
        No quedan más preguntas o el juego ha terminado.
      </p>
    )}
  </div>
);

// Exporta el componente para poder usarlo en otras partes de la app
export default PantallaFinal;
