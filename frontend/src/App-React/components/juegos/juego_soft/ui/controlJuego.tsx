
import { Boton } from "./boton"
import type { Retos } from "../tipos/juego"

interface GameControlsProps {
  estadoJuego: string
  retoActivo: boolean
  onInitiateRetos: (action: Retos["accion"]) => void
}

export function GameControls({ estadoJuego, retoActivo, onInitiateRetos }: GameControlsProps) {
  const puedeJugar = estadoJuego === "playing" && !retoActivo
  const puedeNuevoJuego = estadoJuego !== "playing" && !retoActivo

  return (
    <div className="flex justify-center space-x-4">
      <Boton
        onClick={() => onInitiateRetos("golpear")}
        disabled={!puedeJugar}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
      >
        ☕ Pedir Carta
      </Boton>
      <Boton
        onClick={() => onInitiateRetos("parar")}
        disabled={!puedeJugar}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3"
      >
        🔷 Plantarse
      </Boton>
      <Boton
        onClick={() => onInitiateRetos("nuevoJuego")}
        disabled={!puedeNuevoJuego}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
      >
        📘 Siguiente Partida
      </Boton>
    </div>
  )
}