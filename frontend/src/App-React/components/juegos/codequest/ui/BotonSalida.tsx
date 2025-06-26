"use client"

import { motion } from "framer-motion"
import ImagenSalida from "../../../../assets/juegos/codequest/personaje/personaje_salida.png"

export default function BotonSalida() {
  return (
    <motion.button
      className="fixed top-2 sm:-top-4 left-2 sm:-left-6 z-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-none"
      onClick={() => window.parent.location.reload()}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={ImagenSalida}
        alt="Salir"
        className="inline-block w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 mr-1 sm:mr-2"
      />
    </motion.button>
  )
}
