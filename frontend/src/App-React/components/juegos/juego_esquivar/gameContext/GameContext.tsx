// context/GameContext.tsx
import React, { createContext, useContext, useState } from "react";

type Position = {
    fila: number;
    columna: number;
};

type GameContextType = {
    jugando: boolean;
    setJugando: (value: boolean) => void;
    jugadorPos: Position;
    setJugadorPos: (pos: Position) => void;
    asteroidePos: Position;
    setAsteroidePos: (pos: Position) => void;
    puntacion: number;
    setPuntuacion: React.Dispatch<React.SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [jugando, setJugando] = useState(false);
    const [jugadorPos, setJugadorPos] = useState<Position>({ fila: 3, columna: 3 });
    const [asteroidePos, setAsteroidePos] = useState<Position>({ fila: 1, columna: 2 });
    const [puntacion, setPuntuacion] = useState(0);


    return (
        <GameContext.Provider value={{ jugando, setJugando, jugadorPos, setJugadorPos, asteroidePos, setAsteroidePos, puntacion, setPuntuacion }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGameContext must be used inside <GameProvider>");
    return ctx;
};
