import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    nombre: "Sopa de letras",
    historia: "Concentra tu ingenio, desliza tu mirada, encuentra la solución. Porque en esta sopa, cada segundo cuenta.",
    imagen: "/SopaDeLetras.png",
    fondo: "from-red-400 to-red-600",
    enlace: "/juegos_sopa_de_letras"
  },
  {
    nombre: "El juego del Ahorcado",
    historia: "En los oscuros pasillos de una escuela abandonada, se rumorea que un juego prohibido aparece en la pizarra cada medianoche. Quien intente jugar al Ahorcado escuchará susurros que revelan letras...",
    imagen: "/avatarJuegos/avatar_juego_ahorcado.png",
    fondo: "from-gray-500 to-black",
    enlace: "/ahorcado",
  },
  {
    nombre: "Quiz",
    historia: "Quiz es un juego de preguntas diseñado para poner a prueba tus conocimientos de lógica, sintaxis y funciones en distintos lenguajes de programación. ¿Tienes lo necesario para convertirte en un maestro de la programación? ¡El reto comienza ahora!",
    imagen: "/personajes/Quiz.png",
    fondo: "from-green-200 to-green-500",
    enlace: "/juego-quiz"
  },
  {
    nombre: "Css Detective",
    historia: "¿Alguna vez has soñado con ser detective? Pon a prueba tus habilidades resolviendo casos mientras aprendes selectores CSS en escenarios HTML interactivos",
    imagen: "/foto-detective-completa.png",
    fondo: "from-gray-200 to-gray-200",
    enlace: "juego/selectores"
  },
];

const PersonajeCarrusel = () => {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<null | typeof personajes[0]>(null);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState("")
  const sessionToken = localStorage.getItem("token");
  const personajeRef = useRef<HTMLDivElement | null>(null);
  const juegoRef = useRef<HTMLDivElement | null>(null);

  const scrollAElemento = (el: HTMLElement, offset: number = 100) => {
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };


  if (juegoSeleccionado == "") {
    return (
      <section className="w-full pt-0 pb-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-6">
            {personajes.map((personaje, idx) => (
              <motion.div
                key={idx}
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${personaje.fondo} p-1 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition`}
                onClick={() => {
                  setPersonajeSeleccionado(personaje);
                  setTimeout(() => {
                    if (personajeRef.current) {
                      scrollAElemento(personajeRef.current, 100);
                    }
                  }, 100);
                }}
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
                ref={personajeRef}
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
                  {sessionToken && (
                    <Button variant="contained"
                      onClick={() => {
                        setJuegoSeleccionado(personajeSeleccionado.enlace);
                        setTimeout(() => {
                          if (juegoRef.current) {
                            scrollAElemento(juegoRef.current, 100);
                          }
                        }, 100);
                      }}>
                      ¡A jugar!
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section >
    );
  } else {
    return (
      <div style={{paddingBottom:10}}>
        <motion.div
          ref={juegoRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[90vw] mx-auto h-[90vh] mt-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          <iframe
            src={juegoSeleccionado}
            className="w-full h-full border-none rounded-b-2xl"
            allowFullScreen
          />
        </motion.div>
      </div>

    );
  }
};

export default PersonajeCarrusel;