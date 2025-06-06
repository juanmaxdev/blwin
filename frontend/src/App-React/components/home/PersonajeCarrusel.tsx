import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const personajes = [
  {
    nombre: "El juego del Ahorcado",
    historia: "En los oscuros pasillos de una escuela abandonada, se rumorea que un juego prohibido aparece en la pizarra cada medianoche. Quien intente jugar al Ahorcado escuchará susurros que revelan letras...",
    imagen: "/avatarJuegos/avatar_juego_ahorcado.png",
    fondo: "from-gray-800 to-black",
    boton: {
      nombre: "Atrevete...",
      ruta: "/ahorcado",
    }
  },
];

const PersonajeCarrusel = () => {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<null | typeof personajes[0]>(null);
  const navigate = useNavigate();

  return (
    <section className="w-full pt-0 pb-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div className="flex flex-wrap justify-center gap-6">
          {personajes.map((personaje, idx) => (
            <motion.div
              key={idx}
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${personaje.fondo} p-1 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition`}
              onClick={() => setPersonajeSeleccionado(personaje)}
            >
              <img
                src={personaje.imagen}
                alt={personaje.nombre}
                className="w-16 h-16 object-contain"
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {personajeSeleccionado && (
            <motion.div
              key={personajeSeleccionado.nombre}
              className="flex flex-col md:flex-row items-center gap-10 p-8 rounded-3xl bg-white/60 backdrop-blur-lg shadow-2xl max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={personajeSeleccionado.imagen}
                alt={personajeSeleccionado.nombre}
                className="w-52 h-52 object-contain drop-shadow-lg"
                whileHover={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex flex-col items-center max-w-md space-y-4">
                <h3 className="text-3xl font-bold text-indigo-800 mb-3">
                  {personajeSeleccionado.nombre}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {personajeSeleccionado.historia}
                </p>
                {personajeSeleccionado.boton && (
                  <button
                    className={`mt-4 px-6 py-2 rounded-full text-white bg-gradient-to-br ${personajeSeleccionado.fondo} hover:opacity-90 transition mx-auto`}
                    onClick={() => navigate(personajeSeleccionado.boton!.ruta)}
                  >
                    {personajeSeleccionado.boton.nombre}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonajeCarrusel;