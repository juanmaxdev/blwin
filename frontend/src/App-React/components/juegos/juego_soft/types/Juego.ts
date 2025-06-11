export interface Carta {
  color: "corazones" | "diamantes" | "picas" | "espadas"
  valor: string
  valorNumerico: number
}

export interface EstadoJuego {
  manoJugador: Carta[]
  manoDealer: Carta[]
  tablero: Carta[]
  estadoJuego: "jugando" | "jugadorGanador" | "dealerGanador" | "tie" | "bust"
  puntuacionJugador: number
  puntuacionDealer: number
  verCartaDealer: boolean
  retoActivo: boolean
  retosActuales: Retos | null
  puntuacion: number
  preguntasRespondidas: number
  preguntasCorrectas: number
  partidasJugador: number
  juegoFinalizado: boolean
}

export interface Retos {
  id: string
  tipo: "teoría" | "codigo-completo" | "predecir-salida"
  lenguaje: "Java" | "C#" | "TypeScript" | "JavaScript"
  titulo: string
  descripcion: string
  preguntas: string
  opciones?: string[]
  codigo?: string
  plantillaCodigo?: string
  respuestaCorrecta: string
  explicacion: string
  accion: "pedirCarta" | "plantarse" | "siguientePartida"
  dificultad: "fácil" | "medio" | "dificil"
  verEjecucion?: boolean 
  casosTest?: Array<{
    input?: any[]
    salidaEsperada: any
    descripcion: string
  }>
}

export interface ConceptoCodigo {
  titulo: string
  descripcion: string
  ejemplo: string
}
