// context/GameContext.tsx
import React, { createContext, useContext, useState } from "react";

// Position permite seguir y almacenar la posición en la que se encuetran los elementos en cada momento
type Position = {
    fila: number;
    columna: number;
};

// Diferentes valores generales que necesitan ser llevados de forma  cetralizada para el correcto funcionamiento del juego
type GameContextType = {
    jugando: boolean;
    setJugando: (value: boolean) => void;
    jugadorPos: Position;
    setJugadorPos: (pos: Position) => void;
    puntacion: number;
    setPuntuacion: React.Dispatch<React.SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [jugando, setJugando] = useState(false);
    const [jugadorPos, setJugadorPos] = useState<Position>({ fila: 3, columna: 3 });
    const [puntacion, setPuntuacion] = useState(0);


    return (
        <GameContext.Provider value={{ jugando, setJugando, jugadorPos, setJugadorPos, puntacion, setPuntuacion }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGameContext must be used inside <GameProvider>");
    return ctx;
};
