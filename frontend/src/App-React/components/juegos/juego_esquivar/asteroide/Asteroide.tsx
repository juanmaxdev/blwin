import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Box } from "@mui/material";
import { useGameContext } from "../gameContext/GameContext";
import NPC from "../../../../assets/juegos/juego_esquivar/NPC.png";

type AsteroideProps = {
  ejeX: boolean;
  fila: number;
  columna: number;
};

export type AsteroideRef = {
  getPos: () => { fila: number; columna: number };
};

const Asteroide = forwardRef<AsteroideRef, AsteroideProps>(({ ejeX, fila, columna }, ref) => {
  const { jugando } = useGameContext();
  const [pos, setPos] = useState({ fila: fila, columna: columna });
  const [ejeXLocal, setEjeXLocal] = useState(ejeX);

  function numeroAleatorio() {
    return Math.floor(Math.random() * 3) + 2;
  }

  useImperativeHandle(ref, () => ({
    getPos: () => pos
  }));

  useEffect(() => {
    if (!jugando) return;

    setPos(ejeXLocal ? { fila: 1, columna: numeroAleatorio() } : { fila: numeroAleatorio(), columna: 1 });

    const intervalo = setInterval(() => {
      setPos((prevPos) => {
        const siguientePos = ejeXLocal
          ? { fila: prevPos.fila + 1, columna: prevPos.columna }
          : { fila: prevPos.fila, columna: prevPos.columna + 1 };

        if (siguientePos.columna === 5 || siguientePos.fila === 5) {
          setEjeXLocal(!ejeXLocal);
          return ejeXLocal
            ? { fila: numeroAleatorio(), columna: 2 }
            : { fila: 2, columna: numeroAleatorio() };
        }

        return siguientePos;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [jugando, ejeXLocal]);

  return (
    <Box
      sx={{
        gridColumn: `${pos.columna} / ${pos.columna + 1}`,
        gridRow: `${pos.fila} / ${pos.fila + 1}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img src={NPC} style={{ height: "40%" }} />
    </Box>
  );
});

export default Asteroide;
