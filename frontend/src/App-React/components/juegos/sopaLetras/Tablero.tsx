import React, { useEffect, useState } from 'react';
import { TODAS_LAS_PALABRAS } from './Palabras';

interface TableroProps {
  resetKey: number;
}

const obtenerPalabrasAleatorias = (cantidad: number) => {
  const copia = [...TODAS_LAS_PALABRAS];
  const seleccionadas = [];
  while (seleccionadas.length < cantidad && copia.length > 0) {
    const indice = Math.floor(Math.random() * copia.length);
    seleccionadas.push(copia.splice(indice, 1)[0]);
  }
  return seleccionadas;
};

const generarMatriz = (filas: number, columnas: number, palabras: string[]) => {
  const matriz = Array.from({ length: filas }, () =>
    Array.from({ length: columnas }, () => '')
  );

  palabras.forEach((palabra) => {
    let colocada = false;
    while (!colocada) {
      const fila = Math.floor(Math.random() * filas);
      const maxCol = columnas - palabra.length;
      const colInicio = Math.floor(Math.random() * (maxCol + 1));

      let espacioLibre = true;
      for (let i = 0; i < palabra.length; i++) {
        if (matriz[fila][colInicio + i] !== '') {
          espacioLibre = false;
          break;
        }
      }

      if (espacioLibre) {
        for (let i = 0; i < palabra.length; i++) {
          matriz[fila][colInicio + i] = palabra[i];
        }
        colocada = true;
      }
    }
  });

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (matriz[f][c] === '') {
        matriz[f][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }

  return matriz;
};

const Tablero: React.FC<TableroProps> = ({ resetKey }) => {
  const [matriz, setMatriz] = useState<string[][]>([]);
  const [palabras, setPalabras] = useState<string[]>([]);

  const iniciarJuego = () => {
    const seleccionadas = obtenerPalabrasAleatorias(5);
    const nuevaMatriz = generarMatriz(10, 18, seleccionadas);
    setPalabras(seleccionadas);
    setMatriz(nuevaMatriz);
  };

  useEffect(() => {
    iniciarJuego();
  }, [resetKey]);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="cuadricula grid grid-cols-18 gap-1">
        {matriz.map((fila, i) =>
          fila.map((letra, j) => (
            <span
              key={`${i}-${j}`}
              className="w-6 h-6 bg-white rounded flex items-center justify-center text-sm font-bold shadow"
            >
              {letra}
            </span>
          ))
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">🔍 Palabras a buscar:</h3>
        <ul className="grid grid-cols-2 gap-x-4 text-sm">
          {palabras.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tablero;
