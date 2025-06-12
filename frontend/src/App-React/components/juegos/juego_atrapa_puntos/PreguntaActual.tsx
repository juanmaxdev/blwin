import React from 'react';
import ResultadoPregunta from './ResultadoPregunta';
import OpcionApuesta from './OpcionApuesta';
import { Pregunta } from './JuegoAtrapaPuntos';

interface Props {
    pregunta: Pregunta;
    apuestas: number[];
    puntos: number;
    respondido: boolean;
    cambiarApuesta: (indice: number, valor: number) => void;
    enviarRespuesta: () => void;
    ultimaRespuestaCorrecta: boolean | null;
    siguientePregunta: () => void;
}

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
    const totalApostado = apuestas.reduce((a, b) => a + b, 0);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <p className="mb-4 font-medium">{pregunta.pregunta}</p>
            <p className="mb-4">Apuesta total (máx {puntos}): {totalApostado}</p>
            <div className="grid grid-cols-1 gap-2">
                {pregunta.opciones.map((opcion, idx) => (
                    <OpcionApuesta
                        key={idx}
                        indice={idx}
                        valor={apuestas[idx]}
                        cambiarValor={cambiarApuesta}
                        deshabilitado={respondido}
                        correcta={idx === pregunta.respuesta_correcta}
                        seleccionada={apuestas[idx] > 0}
                        respondido={respondido}
                        texto={opcion}
                        puntos={puntos}
                    />
                ))}
            </div>
            {!respondido ? (
                <button onClick={enviarRespuesta} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Enviar respuesta
                </button>
            ) : (
                <ResultadoPregunta
                    correcta={ultimaRespuestaCorrecta}
                    correctaTexto={pregunta.opciones[pregunta.respuesta_correcta]}
                    perdida={totalApostado - apuestas[pregunta.respuesta_correcta]}
                    onSiguiente={siguientePregunta}
                />
            )}
        </div>
    );
};

export default PreguntaActual;
