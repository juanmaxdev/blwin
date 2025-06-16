
import  Button  from "../../../ui/Button"
import type { Retos } from "../types/Juego"

interface ControlJuegoProps {
  estadoJuego: string
  retoActivo: boolean
  onInitiateRetos: (action: Retos["accion"]) => void
}

export function ControlJuego({ estadoJuego, retoActivo, onInitiateRetos }: ControlJuegoProps) {
  const puedeJugar = estadoJuego === "jugando" && !retoActivo
  const puedeNuevoJuego = estadoJuego !== "jugando" && !retoActivo

  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={() => onInitiateRetos("pedirCarta")}
        disabled={!puedeJugar}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
      >
        🎰 Pedir Carta
      </Button>
      <Button
        onClick={() => onInitiateRetos("plantarse")}
        disabled={!puedeJugar}
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3"
      >
        ✋ Plantarse
      </Button>
      <Button
        onClick={() => onInitiateRetos("siguientePartida")}
        disabled={!puedeNuevoJuego}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
      >
        🔁 Siguiente Partida
      </Button>
    </div>
  )
}