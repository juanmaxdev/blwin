//import { useNavigate } from 'react-router-dom';
//import Abecedario from '../../../components/juegos/ahorcado/Abecedario';
import ModeloImagen from '../../../components/juegos/ahorcado/modelo/Modelo';
import { imagenSeleccionada } from '../../../components/juegos/ahorcado/types/Types';
import imagenAhorcado1 from '../../../assets/juegos/ahorcado/modelo/ahorcado_1.png';
import imagenAhorcado2 from '../../../assets/juegos/ahorcado/modelo/ahorcado_2.png';
import imagenAhorcado3 from '../../../assets/juegos/ahorcado/modelo/ahorcado_3.png';
import imagenAhorcado4 from '../../../assets/juegos/ahorcado/modelo/ahorcado_4.png';
import imagenAhorcado5 from '../../../assets/juegos/ahorcado/modelo/ahorcado_5.png';
import imagenAhorcado6 from '../../../assets/juegos/ahorcado/modelo/ahorcado_6.png';
import { useState } from 'react';
import { preguntasProgramacionWeb } from '../../../components/juegos/ahorcado/preguntas/Preguntas';
import ModalGameOver from '../../../components/juegos/ahorcado/modalFin/Modal';
import { useNavigate } from 'react-router-dom';

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
  const imgSegunFallo = imagenesAhorcado[numeroFallos];

  const [indicePregunta] = useState(() =>
    Math.floor(Math.random() * preguntasProgramacionWeb.length)
  );

  const preguntaAleatoria = preguntasProgramacionWeb[indicePregunta].pregunta;
  const respuesta = preguntasProgramacionWeb[indicePregunta].respuesta.toUpperCase();

  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);

  const navigate = useNavigate();
  const handleIrInicio = () => {
    navigate('/');
  };

  const handleVolverAJugar = () => {
    setLetrasSeleccionadas([]);
    setNumeroFallos(0);
    setIsGameOver(false);
  };

  const handleGameEnd = (finalScore: number) => {
    setPuntuacion(finalScore);
    setIsGameOver(true);
  };

  const onClickLetra = (letra: string) => {
    if (letrasSeleccionadas.includes(letra)) return;
    setLetrasSeleccionadas([...letrasSeleccionadas, letra]);
    if (!respuesta.includes(letra)) {
      if (numeroFallos === 5) {
       handleGameEnd(puntuacion);
      
      }
      setNumeroFallos((prev) => Math.min(prev + 1, imagenesAhorcado.length - 1));
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200">
      <header className="h-16 flex items-center justify-center bg-white/50 shadow-md">
        <h1 className="text-4xl font-bold text-black">Juego de Ahorcado</h1>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 h-full flex items-center justify-center p-4">
          <div className="max-w-full max-h-full">
            <ModeloImagen
              rutaImagen={imgSegunFallo.imagen}
              descripImagen={imgSegunFallo.descripcion}
            />
          </div>
        </div>

        <div className="w-3/4 flex flex-col p-6 overflow-hidden">
          <div className="flex items-center justify-center my-8">
            <h5 className="text-4xl font-bold text-gray-600">
              Pregunta: {preguntaAleatoria}
            </h5>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex space-x-2">
              {Array.from(respuesta).map((char, idx) => {
                const estaDescubierta = letrasSeleccionadas.includes(char);
                return (
                  <div
                    key={idx}
                    className={`w-12 h-14 border-b-4 border-gray-800 text-center text-2xl font-medium ${
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
            <h3 className="text-center text-xxl font-bold text-gray-700 mb-5">
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
                      transition-colors duration-200
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