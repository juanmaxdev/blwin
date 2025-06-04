import React, { useEffect, useState, useRef } from "react";
import Cuadricula from "./Cuadricula";
import ListaPalabras from "./ListaPalabras";
import "./SopaDeLetras.css";
import { TODAS_LAS_PALABRAS } from "./Palabras";


const obtenerPalabrasAleatorias = (cantidad: number): string[] => {
    const copia = [...TODAS_LAS_PALABRAS];
    const seleccionadas: string[] = [];
    while (seleccionadas.length < cantidad && copia.length > 0) {
        const indice = Math.floor(Math.random() * copia.length);
        seleccionadas.push(copia.splice(indice, 1)[0]);
    }
    return seleccionadas;
};

const generarMatriz = (filas: number, columnas: number, palabras: string[]): string[][] => {
    const matriz: string[][] = Array.from({ length: filas }, () =>
        Array.from({ length: columnas }, () => "")
    );

    palabras.forEach((palabra) => {
        let colocada = false;
        while (!colocada) {
            const fila = Math.floor(Math.random() * filas);
            const maxColumna = columnas - palabra.length;
            const colInicio = Math.floor(Math.random() * (maxColumna + 1));

            let espacioLibre = true;
            for (let i = 0; i < palabra.length; i++) {
                if (matriz[fila][colInicio + i] !== "") {
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

type Coordenada = { fila: number; col: number };
type PalabraEncontrada = { texto: string; coords: Coordenada[] };

const Tablero: React.FC = () => {
    const [palabrasObjetivo, setPalabrasObjetivo] = useState<string[]>([]);
    const [matriz, setMatriz] = useState<string[][]>([]);
    const [seleccion, setSeleccion] = useState<Coordenada[]>([]);
    const [palabrasEncontradas, setPalabrasEncontradas] = useState<PalabraEncontrada[]>([]);
    const seleccionActiva = useRef(false);

    useEffect(() => {
        const seleccionadas = obtenerPalabrasAleatorias(5);
        const nuevaMatriz = generarMatriz(10, 18, seleccionadas);
        setPalabrasObjetivo(seleccionadas);
        setMatriz(nuevaMatriz);
    }, []);

    const palabraSeleccionada = (coords: Coordenada[]) =>
        coords.map(({ fila, col }) => matriz[fila][col]).join("");

    const validarPalabra = (palabra: string) => {
        const palabraReversa = palabra.split("").reverse().join("");
        if (
            palabrasObjetivo.includes(palabra) &&
            !palabrasEncontradas.some((p) => p.texto === palabra)
        ) {
            return palabra;
        }
        if (
            palabrasObjetivo.includes(palabraReversa) &&
            !palabrasEncontradas.some((p) => p.texto === palabraReversa)
        ) {
            return palabraReversa;
        }
        return null;
    };

    const iniciarSeleccion = (coord: Coordenada) => {
        seleccionActiva.current = true;
        setSeleccion([coord]);
    };

    const agregarACoordenadas = (coord: Coordenada) => {
        if (!seleccionActiva.current) return;
        if (seleccion.length === 0) {
            setSeleccion([coord]);
            return;
        }
        if (seleccion.some((c) => c.fila === coord.fila && c.col === coord.col)) return;

        const primera = seleccion[0];
        const ultima = seleccion[seleccion.length - 1];

        const enLineaHorizontal = primera.fila === coord.fila;
        const enLineaVertical = primera.col === coord.col;

        if (!(enLineaHorizontal || enLineaVertical)) return;

        if (
            enLineaHorizontal &&
            coord.fila === ultima.fila &&
            Math.abs(coord.col - ultima.col) === 1
        ) {
            setSeleccion([...seleccion, coord]);
        } else if (
            enLineaVertical &&
            coord.col === ultima.col &&
            Math.abs(coord.fila - ultima.fila) === 1
        ) {
            setSeleccion([...seleccion, coord]);
        }
    };

    const terminarSeleccion = () => {
        if (!seleccionActiva.current) return;
        seleccionActiva.current = false;
        const palabra = palabraSeleccionada(seleccion);
        const valida = validarPalabra(palabra);
        if (valida) {
            setPalabrasEncontradas((prev) => [...prev, { texto: valida, coords: seleccion }]);
        }
        setSeleccion([]);
    };

    return (
        <div
            className="contenedor-sopa"
            onMouseLeave={() => {
                if (seleccionActiva.current) terminarSeleccion();
            }}
        >
            <Cuadricula
                matriz={matriz}
                seleccion={seleccion}
                palabrasEncontradas={palabrasEncontradas}
                iniciarSeleccion={iniciarSeleccion}
                agregarACoordenadas={agregarACoordenadas}
                terminarSeleccion={terminarSeleccion}
            />
            <ListaPalabras
                palabras={palabrasObjetivo}
                palabrasEncontradas={palabrasEncontradas.map((p) => p.texto)}
            />
        </div>
    );
};

export default Tablero;
