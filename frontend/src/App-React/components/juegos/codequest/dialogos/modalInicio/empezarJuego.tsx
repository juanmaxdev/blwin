'use client';

import { useState } from 'react';
import '../../../../../assets/juegos/codequest/styles/styles.css';

// listado de jefes
import JefeReact from '../../../../../assets/juegos/codequest/personaje/jefe_react.png';
import JefeJava from '../../../../../assets/juegos/codequest/personaje/jefe_java.png';
import JefeNET from '../../../../../assets/juegos/codequest/personaje/jefe_net.png';
import JefeMamon from '../../../../../assets/juegos/codequest/personaje/jefe_usuario_cabron.png';
import JefeProgramador from '../../../../../assets/juegos/codequest/personaje/jefe_programador.png';
import JefeScrum from '../../../../../assets/juegos/codequest/personaje/jefe_scrum.png';

// listado de jefes derrotados
import JefeReactDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_react_derrotado.png';
import JefeJavaDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_java_derrotado.png';
import JefeNETDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_net_derrotado.png';
import JefeMamonDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_usuario_cabron_derrotado.png';
import JefeProgramadorDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_programador_derrotado.png';
import JefeScrumDerrotado from '../../../../../assets/juegos/codequest/personaje/jefe_scrum_derrotado.png';

// Campos de batalla

import JefeReactCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_react.jpg';
import JefeJavaCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_java.jpg';
import JefeNETCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_net.jpg';
import JefeMamonCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_jefeMamon.jpg';
import JefeProgramadorCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_jefeProgramador.jpg';
import JefeScrumCampoBatalla from '../../../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_scrum.jpg';

interface EmpezarJuegoProps {
  onSeleccionarJefe: (jefe: string) => void;
  jefesDerrotados?: string[];
  esSeleccionPostVictoria?: boolean;
}

type JefeInfo = {
  id: string;
  nombre: string;
  imagen: string;
  imagenDerrotado: string;
  descripcion: string;
  fondo: string;
};

export default function EmpezarJuego({
  onSeleccionarJefe,
  jefesDerrotados = [],
  esSeleccionPostVictoria = false,
}: EmpezarJuegoProps) {
  const [jefeSeleccionado, setJefeSeleccionado] = useState<string | null>(null);

  const jefes: JefeInfo[] = [
    {
      id: 'react',
      nombre: 'Jefe React',
      imagen: JefeReact,
      imagenDerrotado: JefeReactDerrotado,
      fondo: JefeReactCampoBatalla,
      descripcion: 'Maestro de los componentes y el estado. Te desafiará con preguntas sobre React.',
    },
    {
      id: 'java',
      nombre: 'Jefe Java',
      imagen: JefeJava,
      imagenDerrotado: JefeJavaDerrotado,
      fondo: JefeJavaCampoBatalla,
      descripcion: 'Experto en POO y JVM. Sus preguntas pondrán a prueba tu conocimiento de Java.',
    },
    {
      id: 'net',
      nombre: 'Jefe .NET',
      imagen: JefeNET,
      imagenDerrotado: JefeNETDerrotado,
      fondo: JefeNETCampoBatalla,
      descripcion: 'Guardián del framework de Microsoft. Prepárate para preguntas sobre .NET.',
    },
    {
      id: 'mamon',
      nombre: 'Usuario Mamón',
      imagen: JefeMamon,
      imagenDerrotado: JefeMamonDerrotado,
      fondo: JefeMamonCampoBatalla,
      descripcion: 'El cliente imposible de satisfacer. Sus preguntas son impredecibles y caprichosas.',
    },
    {
      id: 'programador',
      nombre: 'Jefe Programador',
      imagen: JefeProgramador,
      imagenDerrotado: JefeProgramadorDerrotado,
      fondo: JefeProgramadorCampoBatalla,
      descripcion: 'Conocedor de todos los lenguajes. Te desafiará con preguntas generales de programación.',
    },
    {
      id: 'scrum',
      nombre: 'Jefe Scrum',
      imagen: JefeScrum,
      imagenDerrotado: JefeScrumDerrotado,
      fondo: JefeScrumCampoBatalla,
      descripcion: 'Maestro de las metodologías ágiles. Sus preguntas se centran en Scrum.',
    },
  ];

  const handleSeleccionarJefe = () => {
    if (jefeSeleccionado) {
      onSeleccionarJefe(jefeSeleccionado);
    }
  };

  const jefesDisponibles = jefes.filter((jefe) => !jefesDerrotados.includes(jefe.id));
  const todosJefesDerrrotados = jefesDisponibles.length === 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-gradient-to-tr from-purple-200 via-orange-100 to-blue-100 rounded-2xl shadow-xl max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl w-full mx-2 sm:mx-4 p-3 sm:p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        {esSeleccionPostVictoria ? (
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h2 className="tituloFuenteSecundario text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
              ¡Victoria!
            </h2>
            <p className="textoFuente text-sm sm:text-base md:text-lg text-gray-700">
              {todosJefesDerrrotados
                ? '¡Felicidades! Has derrotado a todos los jefes. Eres el maestro supremo de CodeQuest!'
                : '¡Excelente! ¿Quieres enfrentarte a otro jefe?'}
            </p>
          </div>
        ) : (
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h2 className="tituloFuenteSecundario text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-1 sm:mb-2">
              ¡Bienvenido a CodeQuest!
            </h2>
            <p className="textoFuente font-semibold text-sm sm:text-base md:text-lg text-gray-700">
              Selecciona al jefe contra el que quieres enfrentarte:
            </p>
          </div>
        )}

        {todosJefesDerrrotados ? (
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">🏆</div>
            <h3 className="tituloFuenteSecundario text-lg sm:text-xl md:text-2xl font-bold text-gold-600 mb-2 sm:mb-4">
              ¡Eres el Campeón de CodeQuest!
            </h3>
            <p className="textoFuente text-semibold text-gray-700 mb-3 sm:mb-6 text-sm sm:text-base">
              Has demostrado tu dominio en todas las tecnologías.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              Jugar de Nuevo
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
              {jefes.map((jefe) => {
                const estaDerrotado = jefesDerrotados.includes(jefe.id);
                const puedeSeleccionar = !estaDerrotado && jefeSeleccionado !== jefe.id;

                return (
                  <div
                    key={jefe.id}
                    className={`border-2 rounded-lg p-2 sm:p-3 md:p-4 transition-all relative ${
                      estaDerrotado
                        ? 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                        : jefeSeleccionado === jefe.id
                        ? 'border-purple-600 bg-purple-100 transform scale-105 cursor-pointer'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer'
                    }`}
                    onClick={() => !estaDerrotado && setJefeSeleccionado(jefe.id)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-3 relative">
                        <img
                          src={estaDerrotado ? jefe.imagenDerrotado : jefe.imagen}
                          alt={jefe.nombre}
                          className={`w-full h-full object-contain ${estaDerrotado ? 'grayscale' : ''}`}
                        />
                      </div>
                      <h3
                        className={`tituloFuenteSecundario text-sm sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 ${
                          estaDerrotado ? 'text-gray-500' : 'text-gray-800'
                        }`}
                      >
                        {jefe.nombre}
                      </h3>
                      <p
                        className={`textoFuente text-center text-xs sm:text-sm ${
                          estaDerrotado ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {estaDerrotado ? 'Ya has demostrado tu superioridad ante este jefe.' : jefe.descripcion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <button
                onClick={handleSeleccionarJefe}
                disabled={!jefeSeleccionado}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-bold text-white transition-colors text-sm sm:text-base ${
                  jefeSeleccionado ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                ¡Empezar Aventura!
              </button>

              {esSeleccionPostVictoria && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  Reiniciar Juego
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
