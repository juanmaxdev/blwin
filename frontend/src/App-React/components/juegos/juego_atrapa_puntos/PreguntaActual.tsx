import React from 'react';
// Importa el componente que muestra el resultado tras responder
import ResultadoPregunta from './ResultadoPregunta';
// Importa el componente para renderizar cada opción de respuesta con su apuesta
import OpcionApuesta from './OpcionApuesta';
// Importa el tipo de dato para preguntas
import { Pregunta } from './JuegoAtrapaPuntos';

// Interfaz que define los props que recibe el componente
interface Props {
    pregunta: Pregunta;                          // Objeto con el enunciado, opciones y la respuesta correcta
    apuestas: number[];                          // Apuestas actuales del usuario para cada opción
    puntos: number;                              // Puntos disponibles para apostar
    respondido: boolean;                         // Indica si ya se respondió la pregunta
    cambiarApuesta: (indice: number, valor: number) => void; // Función para actualizar una apuesta
    enviarRespuesta: () => void;                 // Función que envía y evalúa la respuesta
    ultimaRespuestaCorrecta: boolean | null;     // Resultado de la última respuesta (true, false o null)
    siguientePregunta: () => void;               // Función para avanzar a la siguiente pregunta
}

// Componente funcional que representa la pregunta en curso
const PreguntaActual: React.FC<Props> = ({
    pregunta,
    apuestas,
    puntos,
    respondido,
    cambiarApuesta,
    enviarRespuesta,
    ultimaRespuestaCorrecta,
    siguientePregunta
}) => {
    // Calcula el total de puntos apostados sumando las apuestas actuales
    const totalApostado = apuestas.reduce((a, b) => a + b, 0);

    return (
        <div className="rounded-lg p-6 items-center text-center justify-center">
            {/* Enunciado de la pregunta */}
            <h1 className="text-2xl md:text-2xl mt-10 font-extrabold text-indigo-800 drop-shadow my-6">
                {pregunta.pregunta}
            </h1>

            {/* Muestra cuántos puntos se han apostado en total */}
            <p className="mb-4 mt-5 text-indigo-800">Total (máx {puntos}): {totalApostado}</p>

            {/* Renderiza las opciones de respuesta */}
            <div className="flex flex-wrap justify-center gap-4 py-10 mb-10">
                {pregunta.opciones.map((opcion, idx) => (
                    <div key={idx} className="w-64 h-40">
                        <OpcionApuesta
                            indice={idx}
                            valor={apuestas[idx]}
                            cambiarValor={cambiarApuesta}
                            deshabilitado={respondido} // Se deshabilita la edición tras responder
                            correcta={idx === pregunta.respuesta_correcta}
                            seleccionada={apuestas[idx] > 0}
                            respondido={respondido}
                            texto={opcion}
                            puntos={puntos}
                        />
                    </div>
                ))}
            </div>

            {/* Botón de acción según si ya se respondió o no */}
            {!respondido ? (
                // Si no ha respondido, muestra el botón para enviar la respuesta
                <button
                    onClick={enviarRespuesta}
                    className="mt-4 px-8 py-4 text-lg font-bold bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                >
                    Enviar respuesta
                </button>
            ) : (
                // Si ya se respondió, muestra el resultado y el botón para continuar
                <ResultadoPregunta
                    correcta={ultimaRespuestaCorrecta}
                    correctaTexto={pregunta.opciones[pregunta.respuesta_correcta]}
                    perdida={totalApostado - apuestas[pregunta.respuesta_correcta]} // Puntos perdidos
                    onSiguiente={siguientePregunta}
                />
            )}
        </div>
    );
};

// Exporta el componente para poder usarlo en otros archivos
export default PreguntaActual;
