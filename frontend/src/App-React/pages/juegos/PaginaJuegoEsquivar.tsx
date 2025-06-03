import { GameProvider} from "../../components/juegos/juego_esquivar/gameContext/GameContext";

import JuegoEsquivar from "../../components/juegos/juego_esquivar/juego_esquivar";

export default function PaginaJuegoEsquivar() {
  return (
    <GameProvider>
       <JuegoEsquivar />
    </GameProvider>
  );
}
