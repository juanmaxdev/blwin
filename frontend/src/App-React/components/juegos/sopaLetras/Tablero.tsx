import React, { useEffect, useState } from "react";
import Cuadricula from "./Cuadricula";
import { TODAS_LAS_PALABRAS } from "./Palabras"; // asegúrate de tener este archivo
import "./SopaDeLetras.css";

type Coordenada = { fila: number; col: number };
type PalabraEncontrada = { texto: string; coords: Coordenada[] };

interface TableroProps {
  resetKey: number;
}

const obtenerPalabrasAleatorias = (cantidad: number) => {
  const copia = [...TODAS_LAS_PALABRAS];
  const seleccionadas: string[] = [];
  while (seleccionadas.length < cantidad && copia.length > 0) {
    const i = Math.floor(Math.random() * copia.length);
    seleccionadas.push(copia.splice(i, 1)[0]);
  }
  return seleccionadas;
};

const generarMatriz = (filas: number, columnas: number, palabras: string[]) => {
  const matriz = Array.from({ length: filas }, () =>
    Array.from({ length: columnas }, () => "")
  );

  palabras.forEach((palabra) => {
    let colocada = false;
    while (!colocada) {
      const fila = Math.floor(Math.random() * filas);
      const maxCol = columnas - palabra.length;
      const colInicio = Math.floor(Math.random() * (maxCol + 1));
      let libre = true;

      for (let i = 0; i < palabra.length; i++) {
        if (matriz[fila][colInicio + i] !== "") {
          libre = false;
          break;
        }
      }

      if (libre) {
        for (let i = 0; i < palabra.length; i++) {
          matriz[fila][colInicio + i] = palabra[i];
        }
        colocada = true;
      }
    }
  });

  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (matriz[f][c] === "") {
        matriz[f][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }

  return matriz;
};

const Tablero: React.FC<TableroProps> = ({ resetKey }) => {
  const [matriz, setMatriz] = useState<string[][]>([]);
  const [palabrasObjetivo, setPalabrasObjetivo] = useState<string[]>([]);
  const [seleccion, setSeleccion] = useState<Coordenada[]>([]);
  const [palabrasEncontradas, setPalabrasEncontradas] = useState<PalabraEncontrada[]>([]);
  const [seleccionActiva, setSeleccionActiva] = useState(false);

  useEffect(() => {
    const palabras = obtenerPalabrasAleatorias(5);
    setPalabrasObjetivo(palabras);
    setMatriz(generarMatriz(10, 18, palabras));
    setSeleccion([]);
    setPalabrasEncontradas([]);
  }, [resetKey]);

  const iniciarSeleccion = (coord: Coordenada) => {
    setSeleccionActiva(true);
    setSeleccion([coord]);
  };

  const agregarACoordenadas = (coord: Coordenada) => {
    if (!seleccionActiva) return;

    const yaIncluida = seleccion.some((c) => c.fila === coord.fila && c.col === coord.col);
    if (!yaIncluida) {
      setSeleccion((prev) => [...prev, coord]);
    }
  };

  const terminarSeleccion = () => {
    if (!seleccionActiva || seleccion.length === 0) return;
    setSeleccionActiva(false);

    const palabra = seleccion.map(({ fila, col }) => matriz[fila][col]).join("");
    const reversa = palabra.split("").reverse().join("");

    const valida = palabrasObjetivo.includes(palabra)
      ? palabra
      : palabrasObjetivo.includes(reversa)
        ? reversa
        : null;

    if (valida && !palabrasEncontradas.some((p) => p.texto === valida)) {
      setPalabrasEncontradas((prev) => [...prev, { texto: valida, coords: [...seleccion] }]);
    }

    setSeleccion([]);
  };

  return (
    <div className="flex flex-col items-center">
      <Cuadricula
        matriz={matriz}
        seleccion={seleccion}
        palabrasEncontradas={palabrasEncontradas}
        iniciarSeleccion={iniciarSeleccion}
        agregarACoordenadas={agregarACoordenadas}
        terminarSeleccion={terminarSeleccion}
      />
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">🔍 Palabras a buscar:</h3>
        <ul className="grid grid-cols-2 gap-x-4 text-sm">
          {palabrasObjetivo.map((p, i) => (
            <li
              key={i}
              className={
                palabrasEncontradas.some((encontrada) => encontrada.texto === p)
                  ? "line-through text-green-600"
                  : ""
              }
            >
              • {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tablero;
