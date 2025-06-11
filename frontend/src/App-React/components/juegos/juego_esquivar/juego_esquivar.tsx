import { Grid } from "@mui/material";
import { useGameContext } from "./gameContext/GameContext";
import Temporizador from "./temporizador/Temporizador";
import Boton from "./boton/Boton";
import Nave from "./nave/Nave";
import Asteroide, { AsteroideRef } from "./asteroide/Asteroide";
import Background from "../../../assets/juegos/juego_esquivar/Background.png"
import { useEffect, useRef, useState } from "react";
import Contador from "./contador/Contador";
import { mandarPuntuacion } from "../../../hooks/MandarPuntuacion";
import ButtonSound from "../../ui/ButtonSound";
import toast, { Toaster } from 'react-hot-toast';
import Ranking from "../../ranking/Ranking";


export default function JuegoEsquivar() {

    // Valores aportados por el gameContext
    const {
        jugando,
        setJugando,
        jugadorPos,
        setJugadorPos,
        puntacion,
        setPuntuacion,
    } = useGameContext();

    // Constante necesaria para enviar el nombre del juego al backend (id general del juego)
    const nombreJuego = "z-wing";

    // Marca si el movimiento de la nave se va a realizar entorno al eje X o al eje Y
    const [ejeX, setEjeX] = useState(true);

    // Marca la velocidad de desplazamiento de los asteroides
    const [velocidad, setVelocidad] = useState(1500);

    // Const necesaria para poder resetear los temporizadores
    const [resetKey, setResetKey] = useState(0);

    // Permite seguir el posicionamiento de los asteroides 1 y 2
    const asteroideRef = useRef<AsteroideRef>(null);
    const asteroideRef2 = useRef<AsteroideRef>(null);

    // Permite realizar un seguimiento de si han puntuado los asteroides 1 y 2 al ser esquivados
    const asteroide1ContadoRef = useRef(false);
    const asteroide2ContadoRef = useRef(false);

    // Sonido que se reproduce al realizar un impacto
    const impactoRef = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        // Comprueba si ha comenzado la partida para lanzar las siguientes funciones
        if (!jugando) return;

        // Coprueba cada 0.1 segundos si uno de los asteroides se encuentra en la misma posición que el jugador para marcar el impacto
        const interval = setInterval(() => {

            // Posición actual de cada asteroide
            const posAsteroide = asteroideRef.current?.getPos();
            const posAsteroide2 = asteroideRef2.current?.getPos();
            if (!posAsteroide || !posAsteroide2) return;

            if (
                (posAsteroide.fila === jugadorPos.fila && posAsteroide.columna === jugadorPos.columna) ||
                (posAsteroide2.fila === jugadorPos.fila && posAsteroide2.columna === jugadorPos.columna)
            ) {
                impactoRef.current?.play().catch(console.warn);
                toast.error('💥 ¡GAME OVER!');
                handleStop();
                return;
            }
        }, 100);

        return () => clearInterval(interval);
    }, [jugando, jugadorPos]);

    // Realiza un seguimiento de los asteroides para puntuar
    useEffect(() => {
        if (!jugando) return;

        const interval = setInterval(() => {
            const posAsteroide = asteroideRef.current?.getPos();
            const posAsteroide2 = asteroideRef2.current?.getPos();
            if (!posAsteroide || !posAsteroide2) return;

            // En caso de que los asteroides hayan salido del tablero suman 10 puntos a la puntuación total, además marcan que este asteroide ya ha puntuado
            if ((posAsteroide.fila > 4 || posAsteroide.columna > 4) && !asteroide1ContadoRef.current) {
                setPuntuacion(prev => prev + 10);
                asteroide1ContadoRef.current = true;
            }

            if ((posAsteroide2.fila > 4 || posAsteroide2.columna > 4) && !asteroide2ContadoRef.current) {
                setPuntuacion(prev => prev + 10);
                asteroide2ContadoRef.current = true;
            }

            // Comprueba que los asteroides hayan vuelto a la posición de inicio
            if ((posAsteroide.fila === 1 || posAsteroide.columna === 1) && asteroide1ContadoRef.current) {
                asteroide1ContadoRef.current = false;
            }

            if ((posAsteroide2.fila === 1 || posAsteroide2.columna === 1) && asteroide2ContadoRef.current) {
                asteroide2ContadoRef.current = false;
            }

            // Marca unos puntos para comenzar a subir la dificultad del juego aumentando la velocidad de los asteroides
            if (puntacion == 40) {
                setVelocidad(1300);
            }
            if (puntacion == 80) {
                setVelocidad(1000);
            }
            if (puntacion == 120) {
                setVelocidad(800);
            }
            if (puntacion == 150) {
                setVelocidad(750);
            }
            if (puntacion == 200) {
                setVelocidad(500);
            }
            if (puntacion == 300) {
                setVelocidad(250);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [jugando, puntacion]);


    // Modifica la posición del jugador se usa en los botones 
    const moverJugador = (fila: number, columna: number) => {
        setJugadorPos({ fila, columna });
    };

    // Marca ejeX true para permitir movimiento horizontal
    const moverX = () => {
        setEjeX(true);
    }

    // Marca ejeX false para permitir movimiento vertical
    const moverY = () => {
        setEjeX(false);
    }

    // Marca el inicio de la partida colocando la nave en el centro de la página e inicializando la puntuación a 0
    const handleStart = () => {
        setJugadorPos({ fila: 3, columna: 3 });
        setPuntuacion(0);
        setJugando(!jugando);
    };

    // Envia la puntuación a la API
    const guardarPuntuacion = async () => {
        await mandarPuntuacion(nombreJuego, puntacion);
    }

    // Maneja el fin de la partida, reiniciando los temporizadores y enviando la puntuación
    const handleStop = () => {
        guardarPuntuacion();
        setJugando(false);
        setResetKey(prev => prev + 1);
    };


    // Envia al index
    const handleRedirect = () => {
        const confirmado = window.confirm("¿Estás seguro de que quieres volver al inicio?");
        if (confirmado) {
            window.location.href = "/";
        }
    }

    return (
        <>
            <Toaster position="top-center" />
            <audio ref={impactoRef} src="/sonidos/fallo.mp3" preload="auto" />
            <ButtonSound></ButtonSound>
            <Grid container display="grid" gridTemplateColumns="repeat(5, 20%)" gridTemplateRows="repeat(5, 20%)"
                sx={{
                    height: "100vh",
                    backgroundImage: `url(${Background})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
            >

                {jugando == true ?
                    <>
                        <Temporizador jugando={jugando} key={resetKey} fila={1} columna={5} />
                        <Contador puntos={puntacion} columna={1} fila={1} />
                        <Boton valor="justify-content" funcion={moverX} fila={5} columna={1} />
                        <Boton valor="flex-start" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 2) : moverJugador(2, jugadorPos.columna)} fila={5} columna={2} />
                        <Boton valor="center" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 3) : moverJugador(3, jugadorPos.columna)} fila={5} columna={3} />
                        <Boton valor="flex-end" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 4) : moverJugador(4, jugadorPos.columna)} fila={5} columna={4} />
                        <Boton valor="align-items" funcion={moverY} fila={5} columna={5} />
                        <Asteroide ref={asteroideRef} ejeX={false} fila={1} columna={2} velocidad={velocidad} />
                        <Asteroide ref={asteroideRef2} ejeX={true} fila={2} columna={1} velocidad={velocidad} />
                        <Nave fila={jugadorPos.fila} columna={jugadorPos.columna} />
                    </>
                    :
                    <>
                        <Contador puntos={puntacion} columna={3} fila={1} />
                        <Nave fila={2} columna={3} />
                        <Boton valor={"Volver al inicio"} funcion={handleRedirect} fila={4} columna={3} />
                        <Boton valor={"Comenzar juego"} funcion={handleStart} fila={3} columna={3} />
                        <div
                            style={{
                                gridColumn: `4/6`,
                                gridRow: `3/5`,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Ranking tituloRanking={"Top 5 Z-Wing"} nombreJuego={nombreJuego} />
                        </div>
                    </>
                }
            </Grid>
        </>
    );
}
