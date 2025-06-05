import React, { useState } from "react";
import ContadorTiempo from "../../../components/juegos/sopaLetras/ContadorTiempo";
import Tablero from "../../../components/juegos/sopaLetras/Tablero";
import { motion } from "framer-motion";
import BotonSonido from "../../../components/juegos/sopaLetras/BotonSonido";
import BotonHome from "../../../components/juegos/sopaLetras/BotonHome";

const SopaLetras = () => {
  const [resetKey, setResetKey] = useState(0);
  const [contadorActivo, setContadorActivo] = useState(false);

  const reiniciarJuego = () => {
    setResetKey((prev) => prev + 1);
    setContadorActivo(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200">
      <header className="h-20 flex items-center justify-center bg-white/50 shadow-md">
        <div>
          <BotonSonido />
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow my-6">Juego de Sopa de Letras</h1>
        </div>
        <div>
          <BotonHome />
        </div>
      </header>

      {contadorActivo ? (
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <ContadorTiempo
            resetKey={resetKey}
            activo={contadorActivo}
            onTiempoCompleto={reiniciarJuego}
          />
          <Tablero resetKey={resetKey} />
        </main>
      ) : (
        <div className="flex-1 h-full flex flex-col items-center justify-center">
          <motion.img
            src="/SopaDeLetras.png"
            alt="Logo Sopa de letras"
            className="w-72 h-72 object-contain drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <button
            onClick={() => setContadorActivo(true)}
            className="mt-4 px-8 py-4 text-lg font-bold bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
          >
            Iniciar juego
          </button>
        </div>
      )}
    </div>
  );
};

export default SopaLetras;
