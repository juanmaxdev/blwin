import { useEffect } from "react"
import { Header } from "../../../components/juegos/juego_soft/ui/cabeceraJuego"
import { Tablero } from "../../../components/juegos/juego_soft/ui/TableroJuego" 
import { BarraLateral } from "../../../components/juegos/juego_soft/ui/BarraLateral"
import { RetosModal } from "../../../components/juegos/juego_soft/modalReto/ModalReto"
import { ResumenPartida } from "../../../components/juegos/juego_soft/ui/ResumenPartida"
import { useGameLogic } from "../../../components/juegos/juego_soft/logicaJuego/LogicaJuego"
import { mandarPuntuacion } from "../../../hooks/MandarPuntuacion"

export function JuegoBlackjack() {
  const nombreJuego = "blackjack";
  const { estadoJuego, initializeGame, initiateRetos, handleRetosComplete, restartSession, closeRetosModal } =
    useGameLogic()
    

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  if (estadoJuego.juegoFinalizado) {
    mandarPuntuacion(nombreJuego, estadoJuego.puntuacion);
    return (
      <ResumenPartida
        puntosTotales={estadoJuego.puntuacion}
        preguntasRespondidas={estadoJuego.preguntasRespondidas}
        repuestasCorrectas={estadoJuego.preguntasCorrectas}
        partidasJugadas={estadoJuego.partidasJugador}
        onRestart={restartSession}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 px-4">
      <div className="max-w-6xl mx-auto">
        <Header puntos={estadoJuego.puntuacion} juegosJugados={estadoJuego.partidasJugador} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Tablero
            manoDealer={estadoJuego.manoDealer}
            manoJugador={estadoJuego.manoJugador}
            puntuacionDealer={estadoJuego.puntuacionDealer}
            puntuacionJugador={estadoJuego.puntuacionJugador}
            verCartaDealer={estadoJuego.verCartaDealer}
            estadoJuego={estadoJuego.estadoJuego}
            retoActivo={estadoJuego.retoActivo}
            onInitiateChallenge={initiateRetos}
          />

          <BarraLateral
            puntuacionJugador={estadoJuego.puntuacionJugador}
            puntuacionDealer={estadoJuego.puntuacionDealer}
            verCartasDealer={estadoJuego.verCartaDealer}
            puntuacion={estadoJuego.puntuacion}
            preguntasRespondidas={estadoJuego.preguntasRespondidas}
            respuestasCorrectas={estadoJuego.preguntasCorrectas}
          />
        </div>

        {estadoJuego.retoActivo && estadoJuego.retosActuales && (
          <RetosModal
            retos={estadoJuego.retosActuales}
            onComplete={handleRetosComplete}
            onClose={closeRetosModal}
          />
        )}

        
        
      </div>      
    </div>
  )
}
