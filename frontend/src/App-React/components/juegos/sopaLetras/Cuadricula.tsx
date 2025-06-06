import React from "react";
import "./SopaDeLetras.css";

type Coordenada = { fila: number; col: number };

interface CuadriculaProps {
    matriz: string[][];
    seleccion: Coordenada[];
    palabrasEncontradas: { texto: string; coords: Coordenada[] }[];
    iniciarSeleccion: (coord: Coordenada) => void;
    agregarACoordenadas: (coord: Coordenada) => void;
    terminarSeleccion: () => void;
}

const Cuadricula: React.FC<CuadriculaProps> = ({
    matriz,
    seleccion,
    palabrasEncontradas,
    iniciarSeleccion,
    agregarACoordenadas,
    terminarSeleccion,
}) => {
    const estaSeleccionada = (fila: number, col: number) =>
        seleccion.some((c) => c.fila === fila && c.col === col);

    const estaEncontrada = (fila: number, col: number) =>
        palabrasEncontradas.some((palabra) =>
            palabra.coords.some((c) => c.fila === fila && c.col === col)
        );

    const numColumnas = matriz.length > 0 ? matriz[0].length : 0;

    return (
        <div
            className="cuadricula"
            onMouseUp={terminarSeleccion}
            onMouseLeave={terminarSeleccion}
            style={{
                gridTemplateColumns: `repeat(${numColumnas}, 40px)`
            }}
        >
            {matriz.map((fila, i) => (
                <div className="fila" key={i}>
                    {fila.map((letra, j) => {
                        const seleccionada = estaSeleccionada(i, j);
                        const encontrada = estaEncontrada(i, j);
                        return (
                            <span
                                key={j}
                                className={`celda ${seleccionada ? "seleccionada" : ""
                                    } ${encontrada ? "encontrada" : ""}`}
                                onMouseDown={() => iniciarSeleccion({ fila: i, col: j })}
                                onMouseEnter={() => agregarACoordenadas({ fila: i, col: j })}
                            >
                                {letra}
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Cuadricula;
