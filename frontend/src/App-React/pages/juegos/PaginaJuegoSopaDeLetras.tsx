import { useState } from "react";
import Tablero from "../../components/juegos/sopaLetras/Tablero";
import { motion } from "framer-motion";
import BotonHome from "../../components/juegos/sopaLetras/BotonHome";

const SopaLetras = () => {
  const [resetKey, setResetKey] = useState(0);
  const [contadorActivo, setContadorActivo] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200 overflow-hidden">
      <header className="h-20 flex items-center justify-center bg-white/50 shadow-md">
        <BotonHome />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow my-6">Juego de Sopa de Letras</h1>
      </header>

      {contadorActivo ? (
        <main>
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
