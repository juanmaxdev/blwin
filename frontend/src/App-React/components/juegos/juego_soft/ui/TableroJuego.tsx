import { Mano } from "./Mano"
import { ControlJuego } from "../controlJuego/ControlJuego"
import type { Carta, Retos } from "../types/Juego"


interface TableroProps {
  manoDealer: Carta[]
  manoJugador: Carta[]
  puntuacionDealer: number
  puntuacionJugador: number
  verCartaDealer: boolean
  estadoJuego: string
  retoActivo: boolean
  onInitiateChallenge: (action: Retos["accion"]) => void
}

export function Tablero({
  manoDealer,
  manoJugador,
  puntuacionDealer,
  puntuacionJugador,
  verCartaDealer,
  estadoJuego,
  retoActivo,
  onInitiateChallenge,
}: TableroProps) {
  const getStatusMessage = () => {
    switch (estadoJuego) {
      case "playerWin":
        return "🎉 ¡Ganaste!"
      case "dealerWin":
        return "😔 Ganó el dealer"
      case "tie":
        return "🤝 Empate"
      case "bust":
        return "💥 Te pasaste de 21"
      default:
        return "🎓 Responde preguntas para jugar"
    }
  }

  return (
    <div className="lg:col-span-2 bg-green-700 bg-opacity-80 rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{getStatusMessage()}</h2>
      </div>

      <div className="mb-8">
        <Mano cartas={manoDealer} titulo="Dealer" puntuacion={puntuacionDealer} ocultarPrimeraCarta={!verCartaDealer} />
      </div>

      <div className="mb-8">
        <Mano cartas={manoJugador} titulo="Tu mano" puntuacion={puntuacionJugador} />
      </div>

      <ControlJuego
        estadoJuego={estadoJuego}
        retoActivo={retoActivo}
        onInitiateRetos={onInitiateChallenge}
      />
    </div>
  )
}