"use client"

interface FrasesPersonalizadasProps {
  tipo: "motivacional" | "preocupacion" | "desesperacion" | "victoria" | "derrota"
  contexto?: string
  className?: string
}

export default function FrasesPersonalizadas({
  tipo,
  contexto = "general",
  className = "",
}: FrasesPersonalizadasProps) {
  const frasesPorTipo = {
    motivacional: {
      general: [
        "¡Puedo hacerlo!",
        "¡Mi conocimiento me llevará a la victoria!",
        "¡Estoy preparado para este desafío!",
        "¡Vamos a demostrar de qué estoy hecho!",
      ],
      react: [
        "¡React no tiene secretos para mí!",
        "¡Mis componentes son invencibles!",
        "¡El estado está bajo mi control!",
      ],
      java: ["¡La POO es mi especialidad!", "¡Mis clases están bien diseñadas!", "¡Java corre por mis venas!"],
      scrum: ["¡Soy un verdadero agilista!", "¡Mi sprint será perfecto!", "¡La metodología está de mi lado!"],
    },
    preocupacion: {
      general: [
        "Esto se está poniendo difícil...",
        "Necesito concentrarme más...",
        "¿Será que estudié lo suficiente?",
        "Espero recordar bien la teoría...",
      ],
      react: [
        "¿Era useEffect o useLayoutEffect?",
        "Los hooks me están confundiendo...",
        "¿Cuál era la sintaxis correcta?",
      ],
      java: ["¿Era public o private?", "Los generics me dan dolor de cabeza...", "¿Cómo era el manejo de excepciones?"],
      scrum: ["¿Cuánto duraba un sprint?", "¿Era daily o standup?", "Mi velocity está bajando..."],
    },
    desesperacion: {
      general: [
        "¡Esto es más difícil de lo que pensaba!",
        "¡Necesito más tiempo para estudiar!",
        "¡No puedo fallar ahora!",
        "¡Mi carrera está en juego!",
      ],
      react: [
        "¡Mi aplicación se está crasheando!",
        "¡Los componentes no renderizan!",
        "¡El estado está completamente roto!",
      ],
      java: ["¡NullPointerException everywhere!", "¡Mi código no compila!", "¡Necesito más café!"],
      scrum: ["¡El sprint está descarrilado!", "¡El equipo está en caos!", "¡Necesito una retrospectiva urgente!"],
    },
    victoria: {
      general: ["¡Lo logré!", "¡Sabía que podía hacerlo!", "¡Mi conocimiento triunfó!", "¡Soy imparable!"],
      react: ["¡React ha sido conquistado!", "¡Mis componentes son perfectos!", "¡El DOM virtual me obedece!"],
      java: ["¡Java no pudo conmigo!", "¡Mi código es bulletproof!", "¡La JVM está de mi lado!"],
      scrum: ["¡Sprint completado con éxito!", "¡Soy un Scrum Master certificado!", "¡La agilidad me define!"],
    },
    derrota: {
      general: [
        "He fallado... pero aprenderé de esto.",
        "Volveré más fuerte.",
        "Esto no termina aquí.",
        "Necesito estudiar más...",
      ],
      react: [
        "React me ha vencido... por ahora.",
        "Mis componentes necesitan refactoring.",
        "Volveré con mejor arquitectura.",
      ],
      java: [
        "Java es más complejo de lo que pensaba.",
        "Necesito más práctica con la POO.",
        "Mi próximo código será mejor.",
      ],
      scrum: ["Mi sprint ha fallado...", "Necesito una mejor retrospectiva.", "La próxima iteración será mejor."],
    },
  }

  const obtenerFraseAleatoria = () => {
    const frasesContexto =
      frasesPorTipo[tipo][contexto as keyof (typeof frasesPorTipo)[typeof tipo]] || frasesPorTipo[tipo].general
    return frasesContexto[Math.floor(Math.random() * frasesContexto.length)]
  }

  const frase = obtenerFraseAleatoria()

  const getColorClasses = () => {
    switch (tipo) {
      case "motivacional":
        return "bg-green-100 border-green-400 text-green-800"
      case "preocupacion":
        return "bg-yellow-100 border-yellow-400 text-yellow-800"
      case "desesperacion":
        return "bg-red-100 border-red-400 text-red-800"
      case "victoria":
        return "bg-blue-100 border-blue-400 text-blue-800"
      case "derrota":
        return "bg-gray-100 border-gray-400 text-gray-800"
      default:
        return "bg-white border-gray-300 text-gray-700"
    }
  }

  const getEmoji = () => {
    switch (tipo) {
      case "motivacional":
        return "💪"
      case "preocupacion":
        return "😅"
      case "desesperacion":
        return "😰"
      case "victoria":
        return "🎉"
      case "derrota":
        return "😔"
      default:
        return "💭"
    }
  }

  return (
    <div className={`relative max-w-xs p-3 rounded-2xl shadow-lg border-2 ${getColorClasses()} ${className}`}>
      <p className="text-sm font-medium">{frase}</p>

      {/* Emoji indicador */}
      <div className="absolute -top-2 -right-2 text-lg">{getEmoji()}</div>

      {/* Punta de la viñeta */}
      <div
        className={`absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${
          tipo === "motivacional"
            ? "border-t-green-400"
            : tipo === "preocupacion"
              ? "border-t-yellow-400"
              : tipo === "desesperacion"
                ? "border-t-red-400"
                : tipo === "victoria"
                  ? "border-t-blue-400"
                  : "border-t-gray-400"
        }`}
      />
    </div>
  )
}
