//import { useNavigate } from 'react-router-dom';
//import Abecedario from '../../../components/juegos/ahorcado/Abecedario';
import ModeloImagen from '../../../components/juegos/ahorcado/modelo/Modelo';
import Boton from '../../../components/juegos/ahorcado/botonVolver/BotonVolver';
import { imagenSeleccionada } from '../../../components/juegos/ahorcado/types/Types';
import imagenAhorcado1 from '../../../assets/juegos/ahorcado/modelo/ahorcado_1.png';
import imagenAhorcado2 from '../../../assets/juegos/ahorcado/modelo/ahorcado_2.png';
import imagenAhorcado3 from '../../../assets/juegos/ahorcado/modelo/ahorcado_3.png';
import imagenAhorcado4 from '../../../assets/juegos/ahorcado/modelo/ahorcado_4.png';
import imagenAhorcado5 from '../../../assets/juegos/ahorcado/modelo/ahorcado_5.png';
import imagenAhorcado6 from '../../../assets/juegos/ahorcado/modelo/ahorcado_6.png';
import { useState, useEffect } from 'react';
import {
  preguntasProgramacionWebNivel1,
  preguntasProgramacionWebNivel2,
  preguntasProgramacionWebNivel3,
} from '../../../components/juegos/ahorcado/preguntas/Preguntas';
import ModalGameOver from '../../../components/juegos/ahorcado/modalFin/Modal';
import { useNavigate } from 'react-router-dom';
import '../../../assets/juegos/ahorcado/styles/Styles.css';

function decodeToken(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

const imagenesAhorcado: imagenSeleccionada[] = [
  {
    imagen: imagenAhorcado1,
    descripcion: 'Ahorcado - Paso 1',
  },
  {
    imagen: imagenAhorcado2,
    descripcion: 'Ahorcado - Paso 2',
  },
  {
    imagen: imagenAhorcado3,
    descripcion: 'Ahorcado - Paso 3',
  },
  {
    imagen: imagenAhorcado4,
    descripcion: 'Ahorcado - Paso 4',
  },
  {
    imagen: imagenAhorcado5,
    descripcion: 'Ahorcado - Paso 5',
  },
  {
    imagen: imagenAhorcado6,
    descripcion: 'Ahorcado - Paso 6',
  },
];

const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

const Ahorcado = () => {
  const [numeroFallos, setNumeroFallos] = useState<number>(0);
  const [indicePregunta, setIndicePregunta] = useState<number>(0);
  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);

  const navigate = useNavigate();

  const preguntasNivelActual = (() => {
    if (puntuacion >= 450) return preguntasProgramacionWebNivel3;
    if (puntuacion >= 150) return preguntasProgramacionWebNivel2;
    return preguntasProgramacionWebNivel1;
  })();

  const nivelActual = () => {
    if (puntuacion >= 450) return 3;
    if (puntuacion >= 150) return 2;
    return 1;
  };

  useEffect(() => {
    const nuevoIdx = Math.floor(Math.random() * preguntasNivelActual.length);
    setIndicePregunta(nuevoIdx);
    setLetrasSeleccionadas([]);
    setNumeroFallos(0);
  }, [preguntasNivelActual]);

  const preguntaAleatoria = preguntasNivelActual[indicePregunta].pregunta;
  const respuesta = preguntasNivelActual[indicePregunta].respuesta.toUpperCase();

  const puntosPorNivel = () => {
    if (puntuacion >= 450) return 150;
    if (puntuacion >= 150) return 100;
    return 50;
  };

  const imgSegunFallo = imagenesAhorcado[numeroFallos];

  const handleIrInicio = () => {
    navigate('/');
  };

  const handleVolverAJugar = () => {
    setLetrasSeleccionadas([]);
    setNumeroFallos(0);
    setIsGameOver(false);
    setPuntuacion(0);
  };

  const handleGameEnd = (finalScore: number) => {
    setPuntuacion(finalScore);
    setIsGameOver(true);
  };

  const onClickLetra = (letra: string) => {
    if (letrasSeleccionadas.includes(letra) || isGameOver) return;

    const nuevasLetras = [...letrasSeleccionadas, letra];
    setLetrasSeleccionadas(nuevasLetras);

    if (!respuesta.includes(letra)) {
      if (numeroFallos === 5) {
        handleGameEnd(puntuacion);
        return;
      }
      setNumeroFallos((prev) => prev + 1);
      return;
    }
    const caracteresUnicos = Array.from(new Set(respuesta.replace(/\s+/g, '')));
    const todasDescubiertas = caracteresUnicos.every((c) => [...nuevasLetras].includes(c));

    if (todasDescubiertas) {
      setPuntuacion((prevScore) => prevScore + puntosPorNivel());

      const longitudActual = preguntasNivelActual.length;
      const nuevoIdx = Math.floor(Math.random() * longitudActual);
      setIndicePregunta(nuevoIdx);

      setLetrasSeleccionadas([]);
      setNumeroFallos(0);
    }
  };

  {
    /*  const navigate = useNavigate();

  
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
    return;
  }

  const decoded = decodeToken(token);
  const usuarioId = decoded?.id;

  if (!usuarioId) {
    alert('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
    localStorage.removeItem('token');
    navigate('/login');
    return;
  }*/
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-200">
      <header className="relative flex items-center justify-center bg-gradient-to-br from-red-300 via-red-200 to-red-300 shadow h-20">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Boton nombre="VOLVER" />
        </div>
        <h1 className="text-4xl font-bold text-black text-center w-full titulo mb-5">Juego del Ahorcado</h1>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
          <p className="text-center text-lg font-semibold text-gray-800 puntuacion">Nivel: {nivelActual()}</p>
          <p className="my-8 text-center text-lg font-semibold text-gray-800 puntuacion">Puntuación: {puntuacion}</p>
          <div className="max-w-full w-full h-[90%] flex items-center justify-center">
            <ModeloImagen rutaImagen={imgSegunFallo.imagen} descripImagen={imgSegunFallo.descripcion} />
          </div>
        </div>

        <div className="w-3/4 flex flex-col p-6 overflow-hidden">
          <div className="flex items-center justify-center my-8">
            <h5 className="text-4xl font-bold tituloh5 text-black">Pregunta: {preguntaAleatoria}</h5>
          </div>

          <div className="flex-1 flex items-center justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from(respuesta).map((char, idx) => {
                const estaDescubierta = letrasSeleccionadas.includes(char);
                return (
                  <div
                    key={idx}
                    className={`w-12 h-14 border-b-4 border-gray-800 text-center text-2xl font-medium fuente ${
                      char === ' '
                        ? 'border-none bg-transparent'
                        : estaDescubierta
                        ? 'text-gray-900'
                        : 'text-transparent'
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : estaDescubierta ? char : '_'}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-none mt-4">
            <h3 className="text-center text-xxl font-bold titulo bg-gradient-to-br from-red-700 via-red-400 to-red-700 bg-clip-text text-transparent mb-12">
              Elige una letra
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALFABETO.map((letra) => {
                const yaSeleccionada = letrasSeleccionadas.includes(letra);
                return (
                  <button
                    key={letra}
                    onClick={() => onClickLetra(letra)}
                    disabled={yaSeleccionada}
                    className={`
                      flex-1 min-w-[40px] h-10 flex items-center justify-center text-lg font-semibold rounded-md
                      transition-colors duration-200 fuente
                      ${
                        yaSeleccionada
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }
                    `}
                  >
                    {letra}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <ModalGameOver
          isOpen={isGameOver}
          puntuacion={puntuacion}
          irInicio={handleIrInicio}
          volverAempezar={handleVolverAJugar}
        />
      </main>
    </div>
  );
};

export default Ahorcado;
