import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const personajes = [
   {
    nombre: "Z-Wing",
    historia: "Las naves Z-Wing surcan el espacio en busca de conocimiento y descubrimientos. Hoy es tu primer día como piloto, y el universo entero se abre ante ti. ¡Veamos hasta dónde puedes llegar!",
    imagen: "/personajes/Z-Wing.png",
    fondo: "from-blue-200 to-blue-500",
    enlace: "/juego_esquivar"
  }, 
  {
    nombre: "Quiz",
    historia: "Quiz es un juego de preguntas diseñado para poner a prueba tus conocimientos de lógica, sintaxis y funciones en distintos lenguajes de programación. ¿Tienes lo necesario para convertirte en un maestro de la programación? ¡El reto comienza ahora!",
    imagen: "/personajes/Quiz.png",
    fondo: "from-green-200 to-green-500",
    enlace: "/juego-quiz"
  }, 
];

const PersonajeCarrusel = () => {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<null | typeof personajes[0]>(null);

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
              <div className="text-center md:text-left max-w-md">
                <h3 className="text-3xl font-bold text-indigo-800 mb-3">
                  {personajeSeleccionado.nombre}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {personajeSeleccionado.historia}
                </p>
                <br />
                <Button variant="contained"><Link to={personajeSeleccionado.enlace}>¡A jugar!</Link></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonajeCarrusel;