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
  {
    nombre: "Robotín v2.0",
    historia: "Forjado en los laboratorios secretos del ciberespacio, Robotín es un androide ultraprogramado con inteligencia artificial cuántica...",
    imagen: "/personajes/personaje2.png",
    fondo: "from-blue-300 to-blue-500"
  },
  {
    nombre: "Máximo 'Max' Turbo",
    historia: "Desde pequeño, Max Turbo soñaba con ser campeón en todos los deportes… y terminó siéndolo...",
    imagen: "/personajes/personaje3.png",
    fondo: "from-orange-300 to-orange-500"
  },
  {
    nombre: "Profesor Alquion Vialhart",
    historia: "En lo más alto de la Torre del Saber, Alquion mezcla ciencia con alquimia. Maestro de las fórmulas imposibles...",
    imagen: "/personajes/personaje4.png",
    fondo: "from-green-300 to-green-500"
  },
  {
    nombre: "Paloma Lumière",
    historia: "Paloma creció entre rollos de película y butacas de terciopelo en el cine clásico de su abuelo... la llaman “Palomita”.",
    imagen: "/personajes/personaje5.png",
    fondo: "from-pink-300 to-pink-500"
  },
   {
    nombre: "Agilín BL",
    historia: "Nacido en los pasillos digitales de Berger-Levrault, Agilín BL domina el arte del método Agile. Planifica sprints en segundos, automatiza tareas y odia los cuellos de botella. Su superpoder: transformar papeleo en productividad con solo un clic.“¡Scrum, café... y al backlog!",
    imagen: "/personajes/personaje9.png",
    fondo: "from-red-700 to-red-800"
  },
  {
    nombre: "Globy el Navegante",
    historia: "Globy nació en una antigua biblioteca de mapas... puede nombrar capitales y cordilleras en segundos.",
    imagen: "/personajes/personaje6.png",
    fondo: "from-emerald-400 to-emerald-600"
  },
  {
    nombre: "Pincelina DaVinci",
    historia: "Pincelina nació del primer trazo de una obra maestra olvidada... Cree que el arte está en todo.",
    imagen: "/personajes/personaje7.png",
    fondo: "from-red-400 to-red-600"
  },
  {
    nombre: "BeatBox",
    historia: "BeatBox nació del ruido de una batalla de rap y una sinfonía... su lema: “desde Mozart hasta Eminem, todo tiene su beat”.",
    imagen: "/personajes/personaje8.png",
    fondo: "from-purple-400 to-purple-600"
  },
   {
    nombre: "Sabel Otodo",
    historia: "Sabel se crió con Aristotéles y fue el mejor amigo de Einstein, dice la leyenda que con 3k puntos te da una ayudita ya que... ¡prácticamente lo sabe todo!",
    imagen: "/personajes/sabio.png",
    fondo: "from-gray-200 to-gray-200"
  }
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