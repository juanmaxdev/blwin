interface CabeceraJuegoProps {
  puntos: number
  juegosJugados: number
}

export function Header({ puntos, juegosJugados }: CabeceraJuegoProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">🃏 Jack & Code</h1>
      <div className="flex justify-center items-center gap-4">
        <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
          <span className="text-white font-semibold">🎯 {puntos} puntos</span>
        </div>
        <div className="bg-yellow-500 bg-opacity-20 rounded-full px-4 py-2">
          <span className="text-yellow-200 font-semibold">Partida {juegosJugados}/4</span>
        </div>
      </div>
    </div>
  )
}