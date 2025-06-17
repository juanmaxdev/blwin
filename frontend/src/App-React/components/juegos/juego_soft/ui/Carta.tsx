import type {Carta as CartaTipo} from "../types/Juego"

interface CartaProps{
    carta: CartaTipo
    cartaOculta?: boolean
}

export function Carta({ carta, cartaOculta = false}: CartaProps){
 const simbolos = { corazones: "♥️", diamantes: "♦️", picas: "♣️", espadas: "♠️" }
  const colores = { corazones: "text-red-500", diamantes: "text-red-500", picas: "text-black", espadas: "text-black" }

  if (cartaOculta) {
    return (
      <div className="w-16 h-24 bg-blue-600 border-2 border-blue-800 rounded-lg flex items-center justify-center">
        <div className="text-white text-2xl">?</div>
      </div>
    )
  }

  return (
    <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-lg flex flex-col items-center justify-between p-1">
      <div className={`text-sm font-bold ${colores[carta.color]}`}>{carta.valor}</div>
      <div className="text-2xl">{simbolos[carta.color]}</div>
      <div className={`text-sm font-bold ${colores[carta.color]} rotate-180`}>{carta.valor}</div>
    </div>
  )
}