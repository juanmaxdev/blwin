import React, { useEffect, useState } from "react";
import Cuadricula from "./Cuadricula";
import ContadorTiempo from "./ContadorTiempo";
import type { EntradaPalabra } from "./Palabras";
import { ENTRADAS_PALABRAS } from "./Palabras";
import "./SopaDeLetras.css";

type Coordenada = { fila: number; col: number };
type PalabraEncontrada = { texto: string; coords: Coordenada[] };

const obtenerPalabrasAleatorias = (cantidad: number): EntradaPalabra[] => {
  const copia = [...ENTRADAS_PALABRAS];
  const seleccionadas: EntradaPalabra[] = [];
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

interface TableroProps {
  resetKey?: number;
}

const Tablero: React.FC<TableroProps> = ({ resetKey: resetKeyFromParent = 0 }) => {
  const [resetKey, setResetKey] = useState(resetKeyFromParent);

  useEffect(() => {
    setResetKey(resetKeyFromParent);
  }, [resetKeyFromParent]);

  const [palabrasObjetivo, setPalabrasObjetivo] = useState<EntradaPalabra[]>([]);
  const [matriz, setMatriz] = useState<string[][]>([]);
  const [seleccion, setSeleccion] = useState<Coordenada[]>([]);
  const [palabrasEncontradas, setPalabrasEncontradas] = useState<PalabraEncontrada[]>([]);
  const [seleccionActiva, setSeleccionActiva] = useState(false);

  const [timerActivo, setTimerActivo] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Generar tablero
  useEffect(() => {
    const entradas = obtenerPalabrasAleatorias(5);
    setPalabrasObjetivo(entradas);
    setMatriz(generarMatriz(9, 24, entradas.map((e) => e.palabra)));
    setSeleccion([]);
    setPalabrasEncontradas([]);
    setTimerActivo(true);
    setGameOver(false);
  }, [resetKey]);

  // Reiniciar cuando se encuentren todas las palabras
  useEffect(() => {
    if (
      !gameOver &&
      palabrasObjetivo.length > 0 &&
      palabrasEncontradas.length === palabrasObjetivo.length
    ) {
      setTimerActivo(false);
      setTimeout(() => {
        setResetKey((k) => k + 1);
        setTimerActivo(true);
      }, 1000);
    }
  }, [palabrasEncontradas, palabrasObjetivo, gameOver]);

  const iniciarSeleccion = (coord: Coordenada) => {
    if (gameOver) return;
    setSeleccionActiva(true);
    setSeleccion([coord]);
  };

  const agregarACoordenadas = (coord: Coordenada) => {
    if (gameOver || !seleccionActiva) return;
    const yaIncluida = seleccion.some((c) => c.fila === coord.fila && c.col === coord.col);
    if (!yaIncluida) {
      setSeleccion((prev) => [...prev, coord]);
    }
  };

  const terminarSeleccion = () => {
    if (gameOver || !seleccionActiva || seleccion.length === 0) return;
    setSeleccionActiva(false);

    const palabraFormada = seleccion.map(({ fila, col }) => matriz[fila][col]).join("");
    const reversa = palabraFormada.split("").reverse().join("");

    const valida = palabrasObjetivo.find(
      (e) => e.palabra === palabraFormada || e.palabra === reversa
    );

    if (valida && !palabrasEncontradas.some((p) => p.texto === valida.palabra)) {
      setPalabrasEncontradas((prev) => [
        ...prev,
        { texto: valida.palabra, coords: [...seleccion] },
      ]);
    }

    setSeleccion([]);
  };

  const handleTiempoCompleto = () => {
    setTimerActivo(false);
    setGameOver(true);
  };

  const reiniciarPartida = () => {
    setResetKey((k) => k + 1);
    setGameOver(false);
    setTimerActivo(true);
  };

  return (
<div className="flex flex-col w-screen min-h-screen relative bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200">
      {/* Contador en la parte superior centrado */}
      <div className="py-10 flex justify-center items-center">
        <ContadorTiempo
          resetKey={resetKey}
          activo={timerActivo}
          onTiempoCompleto={handleTiempoCompleto}
        />
      </div>

      {/* Contenido principal: pistas + tablero */}
      <div className="flex flex-grow overflow-hidden mt-20">
        {/* Pistas a la izquierda */}
        <div className="w-2/5 ml-20 pl-18">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">🔍 Pistas:</h3>
          <ul className="space-y-3 text-lg text-indigo-800">
            {palabrasObjetivo.map((entrada, i) => {
              const encontrada = palabrasEncontradas.some(
                (encontradaObj) => encontradaObj.texto === entrada.palabra
              );
              return (
                <li
                  key={i}
                  className={encontrada ? "line-through text-indigo-700" : ""}
                >
                  • {entrada.pista}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cuadricula a la derecha */}
        <div className="w-3/5 mt-5">
          <div className={`flex-grow flex justify-center items-center ${gameOver ? "pointer-events-none opacity-50" : ""
            }`}>
            <Cuadricula
              matriz={matriz}
              seleccion={seleccion}
              palabrasEncontradas={palabrasEncontradas}
              iniciarSeleccion={iniciarSeleccion}
              agregarACoordenadas={agregarACoordenadas}
              terminarSeleccion={terminarSeleccion}
            />
          </div>
        </div>
      </div>

      {/* Overlay de game over */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
          <h2 className="text-4xl font-bold text-red-600 mb-6">⏰ ¡Se acabó el tiempo!</h2>
          <button
            onClick={reiniciarPartida}
            className="mt-4 px-10 py-6 text-2xl font-bold bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
          >
            Volver a jugar
          </button>
        </div>
      )}
    </div>
  );



};

export default Tablero;
