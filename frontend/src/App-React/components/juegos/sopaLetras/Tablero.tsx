import React, { useEffect, useState } from "react";
import Cuadricula from "./Cuadricula";
import ContadorTiempo from "./ContadorTiempo";
import type { EntradaPalabra } from "./Palabras";
import { ENTRADAS_PALABRAS } from "./Palabras";
import "./SopaDeLetras.css";
import { mandarPuntuacion } from "../../../hooks/MandarPuntuacion";

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
      const esVertical = Math.random() < 0.5;
      if (esVertical) {
        const maxFila = filas - palabra.length;
        const filaInicio = Math.floor(Math.random() * (maxFila + 1));
        const col = Math.floor(Math.random() * columnas);

        let libre = true;
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[filaInicio + i][col] !== "") {
            libre = false;
            break;
          }
        }

        if (libre) {
          for (let i = 0; i < palabra.length; i++) {
            matriz[filaInicio + i][col] = palabra[i];
          }
          colocada = true;
        }
      } else {
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
  const [puntos, setPuntos] = useState(0);
  const nombreJuego = "Sopa-De-Letras";

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
    const entradas = obtenerPalabrasAleatorias(6);
    setPalabrasObjetivo(entradas);
    setMatriz(generarMatriz(13, 24, entradas.map((e) => e.palabra)));
    setSeleccion([]);
    setPalabrasEncontradas([]);
    setTimerActivo(true);
    setGameOver(false);
  }, [resetKey]);

  // Reiniciar cuando se encuentra todas las palabras
  useEffect(() => {
    if (
      !gameOver &&
      palabrasObjetivo.length > 0 &&
      palabrasEncontradas.length === palabrasObjetivo.length
    ) {
      setTimerActivo(false);
      setPuntos((prev) => prev + 20);
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
      setPuntos((prev) => prev + 10);
    }

    setSeleccion([]);
  };

  const handleTiempoCompleto = () => {
    setTimerActivo(false);
    setGameOver(true);
    guardarPuntuacion(puntos);
    setPuntos(0);
  };

  const reiniciarPartida = () => {
    setResetKey((k) => k + 1);
    setGameOver(false);
    setTimerActivo(true);
  };

  const guardarPuntuacion = async (puntos: number) => {
    await mandarPuntuacion(nombreJuego, puntos);
  };

  return (
<div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200 p-4 sm:p-6">
  <div className="flex flex-col items-center sm:flex-row sm:justify-center py-6 sm:py-10 gap-4 sm:gap-10">
    <ContadorTiempo
      resetKey={resetKey}
      activo={timerActivo}
      onTiempoCompleto={handleTiempoCompleto}
    />
    <div className="text-xl sm:text-2xl font-bold text-indigo-800">
      ⭐ Puntos: {puntos}
    </div>
  </div>

  <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 overflow-hidden flex-grow">
    <div className="lg:w-2/5 px-4 sm:px-10">
      <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6">🔍 Pistas:</h3>
      <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg text-indigo-800 mb-6">
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
      <div className="text-base sm:text-xl text-indigo-700 font-semibold mt-6">
        <span className="mr-6">Palabras +10</span>
        <span>Sopa de letras +20</span>
      </div>
    </div>

    <div className="lg:w-3/5 w-full flex justify-center mt-5 px-2">
      <div
        className={`max-w-full overflow-auto ${
          gameOver ? "pointer-events-none opacity-50" : ""
        }`}
      >
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
