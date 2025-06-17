import type { Carta } from "../types/Juego"

export function CrearMazo(): Carta[] {
  const colores: Carta["color"][] = ["corazones", "diamantes", "picas", "espadas"]
  const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  const deck: Carta[] = []

  for (const color of colores) {
    for (const valor of valores) {
      deck.push({
        color,
        valor,
        valorNumerico: getCartaValue(valor),
      })
    }
  }

  return Barajar(deck)
}

export function Barajar(deck: Carta[]): Carta[] {
  const shuffled = [...deck]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

function getCartaValue(value: string): number {
  if (value === "A") return 11
  if (["J", "Q", "K"].includes(value)) return 10
  return Number.parseInt(value)
}

export function CalcularValorCarta(hand: Carta[]): number {
  let total = hand.reduce((sum, Carta) => sum + Carta.valorNumerico, 0)
  let aces = hand.filter((Carta) => Carta.valor === "A").length

  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }

  return total
}
