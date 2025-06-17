import { EstadisticasJuego } from "../estadisticasJuegos/EstadisticasJuego"
import { InformacionCarta } from "../informacionCarta/InformacionCarta"

interface BarraLateralProps {
  puntuacionJugador: number
  puntuacionDealer: number
  verCartasDealer: boolean
  puntuacion: number
  preguntasRespondidas: number
  respuestasCorrectas: number
}

export function BarraLateral({
  puntuacionJugador,
  puntuacionDealer,
  verCartasDealer,
  puntuacion,
  preguntasRespondidas,
  respuestasCorrectas,
}: BarraLateralProps) {
  return (
    <div className="space-y-6">
      <EstadisticasJuego
        puntuacionJugador={puntuacionJugador}
        puntuacionDealer={verCartasDealer ? puntuacionDealer : 0}
        puntuacion={puntuacion}
        preguntasRespondidas={preguntasRespondidas}
        respuestasCorrectas={respuestasCorrectas}
      />

      <InformacionCarta titulo="Cómo Jugar" icono="🎯">
        <ul className="text-sm space-y-1">
          <li>1️⃣ Haz clic en cualquier botón</li>
          <li>2️⃣ Responde la pregunta</li>
          <li>3️⃣ Si es correcta, se ejecuta la acción</li>
          <li>4️⃣ Completa 4 partidas</li>
        </ul>
      </InformacionCarta>

      <InformacionCarta titulo="Puntos" icono="🏆">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Correcta:</span>
            <span className="font-semibold text-green-600">+10</span>
          </div>
          <div className="flex justify-between">
            <span>Incorrecta:</span>
            <span className="font-semibold text-red-600">-5</span>
          </div>
        </div>
      </InformacionCarta>
    </div>
  )
}
