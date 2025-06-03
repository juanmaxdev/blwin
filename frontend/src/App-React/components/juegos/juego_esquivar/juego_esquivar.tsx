import { Grid } from "@mui/material";
import { useGameContext } from "./gameContext/GameContext";
import Temporizador from "./temporizador/Temporizador";
import Boton from "./boton/Boton";
import Nave from "./nave/Nave";
import Asteroide, { AsteroideRef } from "./asteroide/asteroide";
import Background from "../../../assets/juegos/juego_esquivar/Background.png"
import { useEffect, useRef, useState } from "react";

export default function JuegoEsquivar() {
    const {
        jugando,
        setJugando,
        jugadorPos,
        setJugadorPos,
    } = useGameContext();


    const [ejeX, setEjeX] = useState(true);
    const [resetKey, setResetKey] = useState(0);
    const asteroideRef = useRef<AsteroideRef>(null);
    const asteroideRef2 = useRef<AsteroideRef>(null);


    useEffect(() => {
        if (!jugando) return;

        const interval = setInterval(() => {
            const posAsteroide = asteroideRef.current?.getPos();
            const posAsteroide2 = asteroideRef2.current?.getPos();
            if (!posAsteroide) return;
            if (!posAsteroide2) return;

            if (
                posAsteroide.fila === jugadorPos.fila &&
                posAsteroide.columna === jugadorPos.columna 
                || posAsteroide2.fila === jugadorPos.fila &&
                posAsteroide2.columna === jugadorPos.columna 
            ) {
                alert("💥 Impacto detectado!");
                setJugando(false);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [jugando, jugadorPos]);


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
        setJugando(!jugando);
    };

    const handleStop = () => {
        setJugadorPos({ fila: 3, columna: 3 });
        setJugando(false);
        setResetKey(prev => prev + 1);
    };

    return (
        <Grid container display="grid" gridTemplateColumns="repeat(5, 20%)" gridTemplateRows="repeat(5, 20%)"
            sx={{
                height: "100vh",
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}
        >
            <Asteroide ref={asteroideRef} ejeX={false} fila={1} columna={2} />
            <Asteroide ref={asteroideRef2} ejeX={true} fila={2} columna={1} />
            <Nave fila={jugadorPos.fila} columna={jugadorPos.columna} />
            <Temporizador jugando={jugando} key={resetKey} fila={1} columna={5} />
            {jugando == true ?
                <>
                    <Boton valor={"RENDIRSE"} funcion={handleStop} fila={1} columna={1} />
                    <Boton valor="justify-content" funcion={moverX} fila={5} columna={1} />
                    <Boton valor="flex-start" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 2) : moverJugador(2, jugadorPos.columna)} fila={5} columna={2} />
                    <Boton valor="center" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 3) : moverJugador(3, jugadorPos.columna)} fila={5} columna={3} />
                    <Boton valor="flex-end" funcion={() => ejeX == true ? moverJugador(jugadorPos.fila, 4) : moverJugador(4, jugadorPos.columna)} fila={5} columna={4} />
                    <Boton valor="align-items" funcion={moverY} fila={5} columna={5} />
                </>
                : <Boton valor={"START"} funcion={handleStart} fila={5} columna={3} />}
        </Grid>
    );
}
