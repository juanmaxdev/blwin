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
  accion: "golpear" | "parar" | "nuevoJuego"
  dificultad: "fácil" | "medio" | "dificil"
  verEjecucion?: boolean 
  casosTest?: Array<{
    input?: any[]
    salidaEsperada: any
    descripcion: string
  }>
}

export interface CodeConcept {
  title: string
  description: string
  example: string
}
