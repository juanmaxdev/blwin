import React from 'react';

// Definición de las propiedades que recibe el componente
interface Props {
    indice: number; // Índice de la opción
    valor: number; // Valor apostado
    cambiarValor: (indice: number, valor: number) => void; // Función para cambiar el valor apostado
    deshabilitado: boolean; // Si el input está deshabilitado
    correcta: boolean; // Si esta opción es la correcta
    seleccionada: boolean; // Si el usuario la seleccionó
    respondido: boolean; // Si ya se respondió la pregunta
    texto: string; // Texto de la opción
    puntos: number; // Máximo de puntos disponibles para apostar
}

// Componente funcional que representa una opción de apuesta
const OpcionApuesta: React.FC<Props> = ({
    indice,
    valor,
    cambiarValor,
    deshabilitado,
    correcta,
    seleccionada,
    respondido,
    texto,
    puntos
}) => {
    // Clases base para el contenedor del card
    let clases = 'flex flex-col justify-between h-full mt-6 p-6 rounded-xl border shadow-md bg-indigo-100 transition';

    // Si la pregunta fue respondida, aplicar colores condicionales
    if (respondido) {
        if (correcta) clases += ' bg-green-100 border-green-500';
        else if (seleccionada) clases += ' bg-red-100 border-red-500';
    }

    return (
        <div className={clases}>
            {/* Texto de la opción con estilo condicional si es correcta */}
            <span className={`text-center text-indigo-800 mb-2 overflow-auto font-semibold max-h-32 ${respondido && correcta ? 'text-green-700' : ''}`}>
                {texto}
            </span>

            {/* Input numérico para apostar puntos */}
            <div className="text-center">
                <input
                    type="number"
                    min={0}
                    max={puntos}
                    value={valor || 0}
                    onChange={(e) => cambiarValor(indice, Number(e.target.value))}
                    disabled={deshabilitado}
                    className="w-20 px-3 py-1 border rounded-xl bg-gray-50 text-indigo-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>
        </div>
    );
};

export default OpcionApuesta;
