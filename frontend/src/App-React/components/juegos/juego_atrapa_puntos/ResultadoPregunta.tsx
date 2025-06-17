// Importa React (requerido para usar JSX)
import React from 'react';

// Define los props que recibe este componente
interface Props {
  correcta: boolean | null;         // Si la respuesta fue correcta, incorrecta o aún no respondida
  correctaTexto: string;            // Texto de la respuesta correcta
  perdida: number;                  // Puntos perdidos en caso de fallo
  onSiguiente: () => void;          // Función que se ejecuta al hacer clic en "Siguiente pregunta"
}

// Componente funcional que muestra el resultado de la pregunta
const ResultadoPregunta: React.FC<Props> = ({
  correcta,
  correctaTexto,
  perdida,
  onSiguiente
}) => (
  <div className="mt-4">
    {/* Muestra un mensaje según si la respuesta fue correcta o no */}
    <p
      className={`text-lg font-semibold ${
        correcta === true               // Si fue correcta, texto en verde
          ? 'text-green-600'
          : correcta === false         // Si fue incorrecta, texto en rojo
          ? 'text-red-600'
          : ''                         // Si aún no se ha respondido, sin color especial
      }`}
    >
      {/* Contenido del mensaje */}
      {correcta
        ? '¡Correcto!' // Si fue correcta
        : `Incorrecto. Perdiste ${perdida} puntos. La respuesta correcta era: "${correctaTexto}".`}
    </p>

    {/* Botón para pasar a la siguiente pregunta */}
    <button
      onClick={onSiguiente} // Al hacer clic, llama a la función onSiguiente
      className="mt-4 px-8 py-4 text-lg font-bold bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
    >
      Siguiente pregunta
    </button>
  </div>
);

// Exporta el componente para poder usarlo en otras partes de la app
export default ResultadoPregunta;
