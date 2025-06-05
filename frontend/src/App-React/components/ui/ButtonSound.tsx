import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ButtonSound = () => {
  const [sonidoActivo, setSonidoActivo] = useState(false);
  const [volumen, setVolumen] = useState(0.5);
  const [mostrarControl, setMostrarControl] = useState(false);
  const musicaInicio = useRef<HTMLAudioElement | null>(null);
  const pagina = useLocation();
  let nuevaSrc = "/sonidos/musica-inicio.mp3";
  // Cargar preferencias al iniciar
  useEffect(() => {
    const prefSonido = sessionStorage.getItem('sonidoActivo');
    const prefVolumen = sessionStorage.getItem('volumenMusica');
    if (pagina.pathname.includes("juego_esquivar")) {
      nuevaSrc = "/sonidos/musica-esquivar.mp3";
    } 
    if (prefSonido === 'true') setSonidoActivo(true);
    if (prefVolumen) setVolumen(parseFloat(prefVolumen));
  }, []);

  // Guardar preferencias
  useEffect(() => {
    sessionStorage.setItem('sonidoActivo', String(sonidoActivo));
    sessionStorage.setItem('volumenMusica', volumen.toString());
  }, [sonidoActivo, volumen]);

  // Forzar pausa si se desactiva
  useEffect(() => {
    if (!sonidoActivo && musicaInicio.current && !musicaInicio.current.paused) {
      musicaInicio.current.pause();
    }
  }, [sonidoActivo]);

  // Reproducir si activo, sin esperar clic si ya se activó antes
  useEffect(() => {
    if (!sonidoActivo || !musicaInicio.current) return;

    const yaSuena = sessionStorage.getItem('musicaInicioSonando');
    const usuarioToco = sessionStorage.getItem('usuarioTocoBotonSonido');

    if (yaSuena === 'true') {
      musicaInicio.current.volume = volumen;
      musicaInicio.current.play().catch(console.warn);
      return;
    }

    if (usuarioToco === 'true') {
      musicaInicio.current.volume = volumen;
      musicaInicio.current.play().then(() => {
        sessionStorage.setItem('musicaInicioSonando', 'true');
      }).catch(console.warn);
      return;
    }

    // Si no ha tocado el botón antes, espera a un clic
    const handleClick = () => {
      if (!musicaInicio.current || !sonidoActivo) return;
      musicaInicio.current.volume = volumen;
      musicaInicio.current.play().then(() => {
        sessionStorage.setItem('musicaInicioSonando', 'true');
      }).catch(console.warn);
    };

    const timeout = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('click', handleClick);
    };
  }, [sonidoActivo, volumen]);

  const toggleSonido = () => {
    sessionStorage.setItem('usuarioTocoBotonSonido', 'true');

    if (!musicaInicio.current) return;

    if (musicaInicio.current.paused) {
      musicaInicio.current.volume = volumen;
      musicaInicio.current.play().catch(console.warn);
      setSonidoActivo(true);
    } else {
      musicaInicio.current.pause();
      setSonidoActivo(false);
    }
  };

  const cambiarVolumen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoVolumen = parseFloat(e.target.value);
    setVolumen(nuevoVolumen);
    if (musicaInicio.current) {
      musicaInicio.current.volume = nuevoVolumen;
    }
  };

  return (
    <>
      <audio ref={musicaInicio} src="/sonidos/musica-inicio.mp3" preload="auto" loop />

      <div
        className="absolute top-4 left-4 z-50 group"
        onMouseEnter={() => setMostrarControl(true)}
        onMouseLeave={() => setMostrarControl(false)}
      >
        <motion.button
          onClick={toggleSonido}
          className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
          title={sonidoActivo ? 'Silenciar música' : 'Activar música'}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">{sonidoActivo ? '🔊' : '🔇'}</span>
        </motion.button>

        {mostrarControl && (
          <div className="mt-2 px-2 py-1 bg-white bg-opacity-90 rounded-md shadow-md transition-all duration-300 w-32">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumen}
              onChange={cambiarVolumen}
              className="w-full accent-indigo-600"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ButtonSound;
