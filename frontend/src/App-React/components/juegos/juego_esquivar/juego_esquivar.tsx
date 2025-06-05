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


export default function JuegoEsquivar() {
    const {
        jugando,
        setJugando,
        jugadorPos,
        setJugadorPos,
        puntacion,
        setPuntuacion,
    } = useGameContext();

    const nombreJuego = "z-wing";

    const [ejeX, setEjeX] = useState(true);
    const [velocidad, setVelocidad] = useState(1500);
    const [resetKey, setResetKey] = useState(0);
    const asteroideRef = useRef<AsteroideRef>(null);
    const asteroideRef2 = useRef<AsteroideRef>(null);
    const asteroide1ContadoRef = useRef(false);
    const asteroide2ContadoRef = useRef(false);

    useEffect(() => {
        if (!jugando) return;

        const interval = setInterval(() => {
            const posAsteroide = asteroideRef.current?.getPos();
            const posAsteroide2 = asteroideRef2.current?.getPos();
            if (!posAsteroide || !posAsteroide2) return;

            if (
                (posAsteroide.fila === jugadorPos.fila && posAsteroide.columna === jugadorPos.columna) ||
                (posAsteroide2.fila === jugadorPos.fila && posAsteroide2.columna === jugadorPos.columna)
            ) {
                toast.error('💥 ¡Impacto detectado!');
                handleStop();
                return;
            }
        }, 100);

        return () => clearInterval(interval);
    }, [jugando, jugadorPos]);

    useEffect(() => {
        if (!jugando) return;

        const interval = setInterval(() => {
            const posAsteroide = asteroideRef.current?.getPos();
            const posAsteroide2 = asteroideRef2.current?.getPos();
            if (!posAsteroide || !posAsteroide2) return;

            if ((posAsteroide.fila > 4 || posAsteroide.columna > 4) && !asteroide1ContadoRef.current) {
                setPuntuacion(prev => prev + 10);
                asteroide1ContadoRef.current = true;
            }

            if ((posAsteroide2.fila > 4 || posAsteroide2.columna > 4) && !asteroide2ContadoRef.current) {
                setPuntuacion(prev => prev + 10);
                asteroide2ContadoRef.current = true;
            }

            if ((posAsteroide.fila === 1 || posAsteroide.columna === 1) && asteroide1ContadoRef.current) {
                asteroide1ContadoRef.current = false;
            }

            if ((posAsteroide2.fila === 1 || posAsteroide2.columna === 1) && asteroide2ContadoRef.current) {
                asteroide2ContadoRef.current = false;
            }

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
        }, 1000);

        return () => clearInterval(interval);
    }, [jugando, puntacion]);


    const moverJugador = (fila: number, columna: number) => {
        setJugadorPos({ fila, columna });
    };

    const moverX = () => {
        setEjeX(true);
    }
    const moverY = () => {
        setEjeX(false);
    }
    const handleStart = () => {
        setJugadorPos({ fila: 3, columna: 3 });
        setPuntuacion(0);
        setJugando(!jugando);
    };

    const guardarPuntuacion = async () => {
        await mandarPuntuacion(nombreJuego, puntacion);
    }

    const handleStop = () => {
        guardarPuntuacion();
        setJugadorPos({ fila: 3, columna: 3 });
        setJugando(false);
        setResetKey(prev => prev + 1);
    };

    const handleRedirect = () => {
        const confirmado = window.confirm("¿Estás seguro de que quieres volver al inicio?");
        if (confirmado) {
            window.location.href = "/";
        }
    }

    return (
        <>
            <Toaster position="top-center" />

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
                        <Nave fila={2} columna={3} />
                        <Boton valor={"Volver al inicio"} funcion={handleRedirect} fila={4} columna={3} />
                        <Boton valor={"Comenzar juego"} funcion={handleStart} fila={3} columna={3} />
                    </>
                }
            </Grid>
        </>
    );
}
