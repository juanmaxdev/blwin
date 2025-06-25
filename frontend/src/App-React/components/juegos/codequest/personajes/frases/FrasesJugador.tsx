"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FrasesJugadorProps {
  tipoJefe: string | null
  vidaJugador: number
  estadoJuego: string
  fallosConsecutivos: number
}

export default function FrasesJugador({ tipoJefe, vidaJugador, estadoJuego, fallosConsecutivos }: FrasesJugadorProps) {
  const [fraseActual, setFraseActual] = useState<string | null>(null)
  const [mostrarFrase, setMostrarFrase] = useState(false)

  // Frases específicas por jefe y situación
  const frasesPorJefe = {
    react: {
      alta: [
        "¡Los hooks de React no tienen secretos para mí!",
        "useState y useEffect son mis mejores aliados.",
        "¡Voy a componentizar tu derrota!",
        "Mi código React es más limpio que tu interfaz.",
      ],
      media: [
        "Necesito recordar mejor los ciclos de vida...",
        "¿Era useEffect o useLayoutEffect?",
        "Creo que me está faltando práctica con Context.",
        "Los props están empezando a confundirme.",
      ],
      baja: [
        "¡No puedo fallar ahora con React!",
        "¿Cómo era la sintaxis de JSX otra vez?",
        "Necesito repasar los fundamentos urgentemente.",
        "¡Mi aplicación se está crasheando!",
      ],
    },
    java: {
      alta: [
        "¡La programación orientada a objetos es mi fuerte!",
        "Mis clases están bien encapsuladas.",
        "¡Voy a heredar tu derrota!",
        "Mi código Java es más robusto que tu JVM.",
      ],
      media: [
        "¿Era public static void main otra vez?",
        "Los generics me están dando problemas...",
        "Necesito recordar mejor las excepciones.",
        "¿Cuál era la diferencia entre == y equals?",
      ],
      baja: [
        "¡Mi código está lleno de NullPointerExceptions!",
        "¿Cómo se maneja la memoria en Java?",
        "¡Necesito más café para entender esto!",
        "Mi aplicación tiene más bugs que features.",
      ],
    },
    net: {
      alta: [
        "¡C# y .NET son mi especialidad!",
        "LINQ hace que todo sea más fácil.",
        "¡Voy a compilar tu derrota!",
        "Mi código .NET es más elegante que tu framework.",
      ],
      media: [
        "¿Era async/await o Task.Run?",
        "Entity Framework me está complicando...",
        "Necesito repasar los patrones de diseño.",
        "¿Cuál era la sintaxis de LINQ otra vez?",
      ],
      baja: [
        "¡Mi aplicación tiene memory leaks!",
        "¿Cómo se configura el appsettings.json?",
        "¡Necesito más documentación de Microsoft!",
        "Mi código está más enredado que un spaghetti.",
      ],
    },
    scrum: {
      alta: [
        "¡Soy un verdadero Scrum Master chaval!",
        "Mi velocity es impresionante.",
        "¡Este sprint será épico!",
        "Mi backlog siempre está perfectamente actualizado jaj.",
      ],
      media: [
        "¿Era daily scrum o standup meeting?",
        "Necesito mejorar mis estimaciones...",
        "¿Cuánto duraba un sprint otra vez?",
        "Mi retrospectiva esta vez necesitara mejoras.",
      ],
      baja: [
        "¡Mi sprint está completamente k.o!",
        "Voy a necesitar una retrospectiva urgente.",
        "¡Necesito un Scrum Master urgentemente, ¿Mario?!",
        "Mi equipo está en completo caos.",
      ],
    },
    programador: {
      alta: [
        "¡Domino todos los paradigmas de programación!",
        "Mi algoritmo es más eficiente que el tuyo.",
        "¡Voy a optimizar tu derrota!",
        "Mi código es más elegante que tu arquitectura.",
      ],
      media: [
        "¿Era O(n) o O(log n) la complejidad?",
        "Necesito repasar estructuras de datos...",
        "¿Cuál era el patrón de diseño correcto?",
        "Mi lógica está empezando a fallar.",
      ],
      baja: [
        "¡Mi código tiene más bugs que líneas!",
        "¿Cómo se implementaba ese algoritmo?",
        "¡Necesito volver a estudiar fundamentos!",
        "Mi lógica está completamente rota.",
      ],
    },
    mamon: {
      alta: [
        "¡No eres tan exigente como pensaba!",
        "Tus requisitos son pan comido.",
        "¡Voy a entregar antes del deadline!",
        "Mi código supera tus expectativas.",
      ],
      media: [
        "Tus cambios de último minuto me confunden...",
        "¿Podrías ser más específico con los requisitos?",
        "Necesito más tiempo para implementar esto.",
        "¿Era así como querías la funcionalidad?",
      ],
      baja: [
        "¡Tus requisitos son imposibles de cumplir!",
        "¿Podrías decidirte de una vez?",
        "¡Necesito más recursos para esto!",
        "Tu proyecto está fuera de alcance.",
      ],
    },
  }

  // Frases especiales para fallos consecutivos (Scrum)
  const frasesFallosScrum = [
    "¡El daily se está volviendo tenso!",
    "¡El equipo está perdiendo la confianza!",
    "¡Esto es un desastre de sprint!",
    "¡Necesitamos una retrospectiva urgente!",
  ]

  // Determinar el nivel de vida
  const getNivelVida = () => {
    if (vidaJugador > 70) return "alta"
    if (vidaJugador > 30) return "media"
    return "baja"
  }

  // Seleccionar frase aleatoria
  const seleccionarFrase = () => {
    if (!tipoJefe) return null

    // Frases especiales para Scrum con fallos consecutivos
    if (tipoJefe === "scrum" && fallosConsecutivos > 0 && fallosConsecutivos <= 4) {
      return frasesFallosScrum[fallosConsecutivos - 1]
    }

    const frasesJefe = frasesPorJefe[tipoJefe as keyof typeof frasesPorJefe]
    if (!frasesJefe) return null

    const nivelVida = getNivelVida()
    const frases = frasesJefe[nivelVida as keyof typeof frasesJefe]

    return frases[Math.floor(Math.random() * frases.length)]
  }

  // Mostrar frase cuando cambie el estado relevante
  useEffect(() => {
    if (estadoJuego === "pregunta" && Math.random() < 0.3) {
      // 30% de probabilidad
      const nuevaFrase = seleccionarFrase()
      if (nuevaFrase) {
        setFraseActual(nuevaFrase)
        setMostrarFrase(true)

        // Ocultar después de 3 segundos
        const timer = setTimeout(() => {
          setMostrarFrase(false)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [estadoJuego, vidaJugador, tipoJefe, fallosConsecutivos])

  // Mostrar frase cuando la vida esté muy baja
  useEffect(() => {
    if (vidaJugador <= 20 && vidaJugador > 0 && Math.random() < 0.5) {
      const nuevaFrase = seleccionarFrase()
      if (nuevaFrase) {
        setFraseActual(nuevaFrase)
        setMostrarFrase(true)

        const timer = setTimeout(() => {
          setMostrarFrase(false)
        }, 4000)

        return () => clearTimeout(timer)
      }
    }
  }, [vidaJugador])

  return (
    <AnimatePresence>
      {mostrarFrase && fraseActual && (
        <motion.div
          className="absolute -top-20 left-16 z-30"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`relative max-w-xs p-3 rounded-2xl shadow-lg border-2 ${
              vidaJugador > 70
                ? "bg-green-100 border-green-400 text-green-800"
                : vidaJugador > 30
                  ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                  : "bg-red-100 border-red-400 text-red-800"
            }`}
          >
            <p className="text-sm font-medium">{fraseActual}</p>

            {/* Punta de la viñeta */}
            <div
              className={`absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${
                vidaJugador > 70 ? "border-t-green-400" : vidaJugador > 30 ? "border-t-yellow-400" : "border-t-red-400"
              }`}
            />

            {/* Emoji según el estado */}
            <div className="absolute -top-2 -right-2 text-lg">
              {vidaJugador > 70 ? "😎" : vidaJugador > 30 ? "😅" : "😰"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
