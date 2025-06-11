interface EstadisticasJuegoProps {
  puntuacionJugador: number
  puntuacionDealer: number
  puntuacion: number
  preguntasRespondidas: number
  respuestasCorrectas: number
}

export function EstadisticasJuego({
  puntuacionJugador,
  puntuacionDealer,
  puntuacion,
  preguntasRespondidas,
  respuestasCorrectas,
}: EstadisticasJuegoProps) {
  const accuracy = preguntasRespondidas > 0 ? Math.round((respuestasCorrectas / preguntasRespondidas) * 100) : 0

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-3">📊 Estadísticas</h3>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="font-semibold">Tu puntuación:</span>
          <div className="text-2xl font-bold text-blue-600">{puntuacionJugador}</div>
        </div>
        <div>
          <span className="font-semibold">Dealer:</span>
          <div className="text-2xl font-bold text-red-600">{puntuacionDealer}</div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>🏆 Puntos:</span>
            <span className="font-bold text-purple-600">{puntuacion}</span>
          </div>
          <div className="flex justify-between">
            <span>✅ Correctas:</span>
            <span className="text-green-600">
              {respuestasCorrectas}/{preguntasRespondidas}
            </span>
          </div>
          <div className="flex justify-between">
            <span>🎯 Precisión:</span>
            <span className={`font-bold ${accuracy >= 70 ? "text-green-600" : "text-red-600"}`}>{accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}