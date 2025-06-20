'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importar imágenes de frameworks
import ReactImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/react-96.png';
import VueImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/vue.js-96.png';
import AngularImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/angular-100.png';
import ViteImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/vite-100.png';
import LaravelImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/laravel-64.png';
import GitImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/git-96.png';
import SpringImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/springboot-96.png';
import GitHubImg from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/github-94.png';
import NextJs from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/nextjs-100.png';
import Django from '../../../../../../assets/juegos/codequest/imagenes/iconos_frameworks/django-96.png'
import IconoTrasero from '../../../../../../assets/juegos/codequest/imagenes/codeQuest.png';
import '../../../../../../assets/juegos/codequest/styles/styles.css';

interface Carta {
  id: number;
  tipo: string;
  imagen: string;
  volteada: boolean;
  emparejada: boolean;
}

interface UsuarioMamonMemoriaProps {
  onJuegoCompletado: (puntos: number) => void;
  onJuegoFallado: () => void;
}

export default function UsuarioMamonMemoria({ onJuegoCompletado, onJuegoFallado }: UsuarioMamonMemoriaProps) {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<number[]>([]);
  const [puntos, setPuntos] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [mostrandoCartas, setMostrandoCartas] = useState(false);
  const [juegoCompletado, setJuegoCompletado] = useState(false);

  // Frameworks disponibles
  const frameworks = [
    { tipo: 'react', imagen: ReactImg, nombre: 'React' },
    { tipo: 'vue', imagen: VueImg, nombre: 'Vue.js' },
    { tipo: 'angular', imagen: AngularImg, nombre: 'Angular' },
    { tipo: 'nodejs', imagen: ViteImg, nombre: 'Node.js' },
    { tipo: 'laravel', imagen: LaravelImg, nombre: 'Laravel' },
    { tipo: 'git', imagen: GitImg, nombre: 'git' },
    { tipo: 'spring', imagen: SpringImg, nombre: 'Spring' },
    { tipo: 'github', imagen: GitHubImg, nombre: '.github' },
    { tipo: 'nextjs', imagen: NextJs, nombre: 'NextJs' },
    { tipo: 'django', imagen: Django, nombre: 'Django' }

  ];

  useEffect(() => {
    inicializarJuego();
  }, []);

  const inicializarJuego = () => {
    const cartasJuego: Carta[] = [];
    let id = 0;

    frameworks.forEach((framework) => {
      // Crear dos cartas de cada tipo
      for (let i = 0; i < 2; i++) {
        cartasJuego.push({
          id: id++,
          tipo: framework.tipo,
          imagen: framework.imagen,
          volteada: false,
          emparejada: false,
        });
      }
    });

    // Mezclamos las cartas
    const cartasMezcladas = cartasJuego.sort(() => Math.random() - 0.5);
    setCartas(cartasMezcladas);
    setPuntos(0);
    setIntentos(0);
    setJuegoCompletado(false);
  };

  const iniciarJuego = () => {
    setJuegoIniciado(true);
    setMostrandoCartas(true);

    // Mostrar todas las cartas por 3 segundos
    setCartas((prev) => prev.map((carta) => ({ ...carta, volteada: true })));

    setTimeout(() => {
      // Voltear todas las cartas hacia abajo
      setCartas((prev) => prev.map((carta) => ({ ...carta, volteada: false })));
      setMostrandoCartas(false);
    }, 3000);
  };

  const manejarClickCarta = (id: number) => {
    if (mostrandoCartas || cartasSeleccionadas.length >= 2) return;

    const carta = cartas.find((c) => c.id === id);
    if (!carta || carta.volteada || carta.emparejada) return;

    // Voltear la carta
    setCartas((prev) => prev.map((c) => (c.id === id ? { ...c, volteada: true } : c)));

    const nuevasSeleccionadas = [...cartasSeleccionadas, id];
    setCartasSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      verificarPareja(nuevasSeleccionadas);
    }
  };

  const verificarPareja = (seleccionadas: number[]) => {
    const [id1, id2] = seleccionadas;
    const carta1 = cartas.find((c) => c.id === id1);
    const carta2 = cartas.find((c) => c.id === id2);

    

    setTimeout(() => {
      if (carta1 && carta2 && carta1.tipo === carta2.tipo) {
        // ¡Pareja encontrada!
        setCartas((prev) => prev.map((c) => (c.id === id1 || c.id === id2 ? { ...c, emparejada: true } : c)));
        setPuntos((prev) => prev + 10);

        // Verificar si el juego está completado
        const cartasRestantes = cartas.filter((c) => !c.emparejada && c.id !== id1 && c.id !== id2);
        if (cartasRestantes.length === 0) {
          setJuegoCompletado(true);
          const puntosFinales = puntos + 20 + (intentos < 3 ? 50 : intentos < 5 ? 100 : 25);
          setTimeout(() => onJuegoCompletado(puntosFinales), 3000);
        }
      } else {
        // No es pareja, voltear las cartas hacia abajo
        setCartas((prev) => prev.map((c) => (c.id === id1 || c.id === id2 ? { ...c, volteada: false } : c)));
        setPuntos((prev) => Math.max(0, prev - 5));
        setIntentos((prev) => prev + 1);

        // Si falla muchas veces, terminar el juego
        if (intentos >= 7) {
          setTimeout(() => onJuegoFallado(), 1000);
        }
      }

      setCartasSeleccionadas([]);
    }, 1000);
  };


  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-screen mx-4 mb-14">
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold textoArcade text-purple-800 mb-2">Memoriza hasta que puedas</h2>
          <p className="text-gray-600 text-2xl mb-4 textoTales">
            "¡Vamos a comprobar lo que eres capaz de retener en tu memoria!"
          </p>

          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-green-600">{puntos}</span>
              <p className="text-sm text-gray-600">Puntos</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-blue-600">{intentos}/8</span>
              <p className="text-sm text-gray-600">Intentos</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-orange-600">
                {cartas.filter((c) => c.emparejada).length / 2}/10
              </span>
              <p className="text-sm text-gray-600">Pares de cartas</p>
            </div>
          </div>
        </div>

        {!juegoIniciado ? (
          <div className="text-center">
            <p className="text-lg textoFuente text-gray-700 mb-6">
              Memoriza la posición de los frameworks. Tendrás 3 segundos para ver donde se encuentran.
            </p>
            <button
              onClick={iniciarJuego}
              className="px-8 py-3  text-white font-bold rounded-lg bg-gradient-to-r from-purple-600 to-red-600
              bg-[length:200%_100%] bg-left transition-[background-position] duration-500 hover:bg-right"
            >
              ¡Empezar Juego!
            </button>
          </div>
        ) : (
          <>
            {mostrandoCartas && (
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-red-600 animate-pulse">¡Memoriza las posiciones! ⏰</p>
              </div>
            )}

            {/* Cuadrícula de cartas */}
            <div className="grid grid-cols-5 gap-4 mb-6 max-w-xl mx-auto ">
              <AnimatePresence>
                {cartas.map((carta) => (
                  <motion.div
                    key={carta.id}
                    className={`relative aspect-square cursor-pointer ${carta.emparejada ? 'opacity-50' : ''}`}
                    onClick={() => manejarClickCarta(carta.id)}
                    whileHover={{ scale: carta.emparejada ? 1 : 1.05 }}
                    whileTap={{ scale: carta.emparejada ? 1 : 0.95 }}
                    layout
                  >
                    <div className="w-full h-full relative preserve-3d transition-transform duration-500">
                      <motion.div
                        className="absolute inset-0 backface-hidden"
                        animate={{ rotateY: carta.volteada ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Parte trasera de la carta */}
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-center">
                          <img src={IconoTrasero} alt="Carta volteada" className="w-16 h-16 opacity-80" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 backface-hidden"
                        style={{ transform: 'rotateY(180deg)' }}
                        animate={{ rotateY: carta.volteada ? 0 : -180 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Parte frontal de la carta */}
                        <div className="w-full h-full bg-white rounded-lg shadow-lg border-2 border-gray-200 flex items-center justify-center p-4">
                          <img
                            src={carta.imagen}
                            alt={carta.tipo}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Efecto de emparejado */}
                    {carta.emparejada && (
                      <motion.div
                        className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl">✅</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {juegoCompletado && (
              <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-2xl font-bold text-green-600 mb-2">¡Felicidades! 🎉</h3>
                <p className="text-gray-700">
                  Has completado el juego de memoria con {puntos} puntos en {intentos} intentos.
                </p>
              </motion.div>
            )}

            {/*
            <div className="flex justify-center gap-4">
              <button
                onClick={reiniciarJuego}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reiniciar
              </button>
            </div>  */}
          </>
        )}
      </div>

      <style>
        {`
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}
      </style>
    </div>
  );
}
