import { Boton } from "../../quiz/ui/Boton" 
import Ranking from "../../../ranking/Ranking"

const juegoNombre = "blackjack";

interface ResumenPartidaProps {
  puntosTotales: number
  preguntasRespondidas: number
  repuestasCorrectas: number
  partidasJugadas: number
  onRestart: () => void
}

export function ResumenPartida({
  puntosTotales,
  preguntasRespondidas,
  repuestasCorrectas,
  partidasJugadas,
  onRestart,
}: ResumenPartidaProps) {
  const accuracy = preguntasRespondidas > 0 ? Math.round((repuestasCorrectas / preguntasRespondidas) * 100) : 0

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-5xl">
      <div className="bg-white rounded-lg w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🎉 ¡Sesión Completada!</h1>
          <p className="text-gray-600">Completaste {partidasJugadas} partidas</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{puntosTotales}</div>
            <div className="text-sm">Puntos Totales</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm">Precisión</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{preguntasRespondidas}</div>
            <div className="text-sm">Preguntas</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">{repuestasCorrectas}</div>
            <div className="text-sm">Correctas</div>
          </div>
        </div>
      
        <div className="text-center">
          <Boton onClick={onRestart} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            🔄 Nueva Sesión
          </Boton>
        </div>
      </div>

      <div className="w-[500px] bg-white p-6 rounded-xl shadow-lg mt-6 md:mt-0 md:ml-6">
        <Ranking
          tituloRanking={"Top 5 Juego-Blackjack"}
          nombreJuego={juegoNombre}
        />
      </div>
    </div>
  </div>
);




}