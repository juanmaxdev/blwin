'use client';

import { ModalDialogoIntro } from '../modalDialogo/modalDialogo';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Fondo from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_java.jpg';
import ImagenPersonaje from '../../../../../assets/juegos/codequest/personaje/personaje_principal_front.png';
import '../../../../../assets/juegos/codequest/styles/styles.css';

// Registrar el plugin de texto
gsap.registerPlugin(TextPlugin);

interface IntroduccionProps {
  onFinish: () => void;
}

export default function Introduccion({ onFinish }: IntroduccionProps) {
  const historiaInicial = [
    {
      id: 'introduccion',
      titulo: 'Bienvenido a CodeQuest',
      texto:
        '¡Bienvenido a CodeQuest! En este juego, aprenderás a programar mientras exploras un mundo lleno de aventuras. Tu misión es ayudar a los habitantes del planeta CodeLand ya que han sido invadidos por criaturas, debes utilizar tus habilidades de programación.',
    },
    {
      id: 'misionInicial',
      titulo: 'Tu mision principal',
      texto:
        'Tu tarea principal es derrotar a todos los jefes para absorver sus conocimientos y poder ser un programador Full Stack. Para hacerlo, necesitarás usar comandos de programación y utilizar la lógica.',
    },
    {
      id: 'comodines',
      titulo: 'Comodines y habilidades especiales',
      texto:
        'A lo largo del juego, encontrarás comodines que te ayudarán en tu misión. Estos comodines te permitirán realizar acciones especiales, como curarte, usar la sabiduría del 50%, habilidades u otras sorpresas. Aprende a usarlos sabiamente.',
    },
  ];

  const [indexActual, setIndexActual] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [sonidoActivo, setSonidoActivo] = useState(true);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const personajeRef = useRef<HTMLImageElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const botonesRef = useRef<HTMLDivElement>(null);
  const musicaRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar animaciones al montar el componente
  useEffect(() => {
    iniciarAnimaciones();
    iniciarMusica();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (musicaRef.current) {
        musicaRef.current.pause();
        musicaRef.current = null;
      }
    };
  }, []);

  // Manejar progresión de diálogos
  useEffect(() => {
    if (!mostrarModal) return;

    if (indexActual >= historiaInicial.length) {
      onFinish();
      return;
    }

    timerRef.current = setTimeout(() => {
      setIndexActual((prev) => prev + 1);
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [indexActual, mostrarModal, onFinish]);

  const iniciarMusica = () => {
    if (sonidoActivo) {
      musicaRef.current = new Audio('/sonidos/musica-intro.mp3');
      musicaRef.current.loop = true;
      musicaRef.current.volume = 0.3;
      musicaRef.current.play().catch(() => {
        // Silenciar error si no se puede reproducir automáticamente
      });
    }
  };

  const toggleSonido = () => {
    setSonidoActivo(!sonidoActivo);
    if (musicaRef.current) {
      if (sonidoActivo) {
        musicaRef.current.pause();
      } else {
        musicaRef.current.play().catch(() => {});
      }
    }
  };

  const iniciarAnimaciones = () => {
    const tl = gsap.timeline();

    // Animación del fondo para hacerle el zoom
    gsap.set(fondoRef.current, { scale: 1.2, opacity: 0 });
    tl.to(fondoRef.current, {
      duration: 2,
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
    });

    // Animación del titulo dividido en letras
    if (tituloRef.current) {
      const texto = 'CODEQUEST';
      tituloRef.current.innerHTML = texto
        .split('')
        .map(
          (letra, index) =>
            `<span class="letra-titulo tituloPrincipal" data-index="${index}" style="display: inline-block; opacity: 0; transform: translateY(-100px) rotateX(90deg);">${letra}</span>`
        )
        .join('');

      const letras = tituloRef.current.querySelectorAll('.letra-titulo');

      tl.to(letras, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        rotationX: 0,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 0.5,
      });

      // Efecto de brillo en las letras
      tl.to(
        letras,
        {
          duration: 0.3,
          textShadow: '0 0 20px #8B5CF6, 0 0 40px #8B5CF6, 0 0 60px #8B5CF6',
          stagger: 0.05,
          yoyo: true,
          repeat: 1,
        },
        '-=0.5'
      );
    }

    // Animación del personaje que aparezca desde el lateral
    gsap.set(personajeRef.current, { x: -200, opacity: 0, rotation: -10 });
    tl.to(personajeRef.current, {
      duration: 1.5,
      x: 0,
      opacity: 1,
      rotation: 0,
      ease: 'elastic.out(1, 0.5)',
      delay: 1,
    });

    // Animación de los botones
    gsap.set(botonesRef.current, { y: 50, opacity: 0 });
    tl.to(botonesRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      delay: 0.5,
    });

    // Animación flotante continua del personaje
    tl.to(
      personajeRef.current,
      {
        duration: 3,
        y: -20,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      },
      '-=0.5'
    );

    // Mostrar modal después de las animaciones
    tl.call(
      () => {
        setMostrarModal(true);
      },
      [],
      3
    );
  };

  const handleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Animación de salida
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    tl.to([tituloRef.current, personajeRef.current, botonesRef.current], {
      duration: 0.8,
      opacity: 0,
      y: -50,
      stagger: 0.1,
      ease: 'power2.in',
    });
  };

  const mostrarInformacionAyuda = () => {
    setMostrarAyuda(true);
  };

  const cerrarAyuda = () => {
    setMostrarAyuda(false);
  };

  const saltarIntroduccion = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onFinish();
  };

  const item = historiaInicial[indexActual] || {};

  return (
    <>
      <audio ref={musicaRef} preload="auto" />

      <div
        ref={fondoRef}
        className="h-screen flex flex-col overflow-hidden relative"
        style={{
          backgroundImage: `url(${Fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay oscuro para mejor legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

        {/* Botones de control superiores */}
        <div className="absolute top-6 right-6 z-50 flex gap-4">
          {/* Botón de sonido */}
          <button
            onClick={toggleSonido}
            className="p-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
            title={sonidoActivo ? 'Silenciar música' : 'Activar música'}
          >
            <span className="text-2xl">{sonidoActivo ? '🔊' : '🔇'}</span>
          </button>

          {/* Botón de ayuda */}
          <button
            onClick={mostrarInformacionAyuda}
            className="p-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
            title="Ayuda"
          >
            <span className="text-2xl">❓</span>
          </button>

          {/* Botón de saltar */}
          <button
            onClick={saltarIntroduccion}
            className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-105 text-white font-semibold"
            title="Saltar introducción"
          >
            Saltar ⏭️
          </button>
        </div>

        {/* Título animado */}
        <div
          ref={tituloRef}
          className="tituloPrincipal font-bold text-center w-full text-purple-900 drop-shadow-md mt-8 z-10 relative"
          style={{
            fontSize: '8rem',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '0.1em',
          }}
        />

        {/* Efectos de partículas decorativas */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Modal de diálogo */}
        {mostrarModal && (
          <ModalDialogoIntro id={item.id} titulo={item.titulo} texto={item.texto} onClose={handleClose} />
        )}

        {/* Personaje */}
        <div className="absolute bottom-4 left-56 z-10">
          <img
            ref={personajeRef}
            src={ImagenPersonaje || '/placeholder.svg'}
            alt="Personaje Principal"
            className="w-96 h-auto filter drop-shadow-2xl"
          />
        </div>

        {/* Botones inferiores */}
        <div ref={botonesRef} className="absolute bottom-8 right-8 z-10 flex flex-col gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Futura implementacion 🚀
          </button>

          <button
            onClick={() => setIndexActual((prev) => Math.min(prev + 1, historiaInicial.length))}
            className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
          >
            Futura implementacion ➡️
          </button>
        </div>
      </div>

      {/* Modal de Ayuda */}
      {mostrarAyuda && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative">
            <button onClick={cerrarAyuda} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>

            <h2 className="textoTales text-3xl font-bold text-purple-800 mb-6 text-center">🎮 Guía de CodeQuest</h2>

            <div className="space-y-4 text-gray-700">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-2">🎯 Objetivo del Juego</h3>
                <p>Derrota a todos los jefes programadores para convertirte en un Full Stack Developer.</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">⚔️ Combate</h3>
                <p>
                  Responde preguntas correctamente para dañar a los jefes. Las respuestas incorrectas te harán perder
                  vida.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">🎁 Comodines</h3>
                <p>Usa comodines estratégicamente: Poción de Vida, Daño Elemental y Sabiduría del 50%.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">⏱️ Tiempo</h3>
                <p>Cada pregunta tiene un límite de tiempo según su dificultad. ¡Piensa rápido!</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={cerrarAyuda}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                ¡Entendido! 👍
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
