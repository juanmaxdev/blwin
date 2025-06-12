import React from 'react';

interface Props {
    indice: number;
    valor: number;
    cambiarValor: (indice: number, valor: number) => void;
    deshabilitado: boolean;
    correcta: boolean;
    seleccionada: boolean;
    respondido: boolean;
    texto: string;
    puntos: number;
}

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
    let clases = 'flex items-center space-x-2 p-2 rounded';
    if (respondido) {
        if (correcta) clases += ' bg-green-100 border border-green-500';
        else if (seleccionada) clases += ' bg-red-100 border border-red-500';
        else clases += ' bg-gray-50';
    }

    return (
        <div className={clases}>
            <input
                type="number"
                min={0}
                max={puntos}
                value={valor || 0}
                onChange={(e) => cambiarValor(indice, Number(e.target.value))}
                disabled={deshabilitado}
                className="w-24 border rounded px-2 py-1"
            />
            <span className={respondido && correcta ? 'font-semibold text-green-700' : ''}>
                {texto}
            </span>
        </div>
    );
};

export default OpcionApuesta;
