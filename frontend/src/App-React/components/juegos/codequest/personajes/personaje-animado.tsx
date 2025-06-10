"use client"

import { useState, useEffect } from "react"

interface PersonajeAnimadoProps {
  imagen: string
  className?: string
  animacion?: "idle" | "attack" | "damage"
}

export default function PersonajeAnimado({
  imagen,
  className = "w-64 h-64",
  animacion = "idle",
}: PersonajeAnimadoProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animacion)

  useEffect(() => {
    setCurrentAnimation(animacion)

    // Si es una animación temporal (attack o damage), volver a idle después de un tiempo
    if (animacion === "attack" || animacion === "damage") {
      const timer = setTimeout(() => {
        setCurrentAnimation("idle")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [animacion])

  // Clases CSS para las animaciones
  const getAnimationClass = () => {
    switch (currentAnimation) {
      case "idle":
        return "animate-bounce-slow"
      case "attack":
        return "animate-pulse"
      case "damage":
        return "animate-shake"
      default:
        return ""
    }
  }

  return (
    <div className={`${className} ${getAnimationClass()}`}>
      <img
        src={imagen}
        alt="Personaje"
        className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300"
      />

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
