'use client';

import { Heart, Zap, Percent, RotateCcw, Users, Microscope, Footprints } from 'lucide-react';

interface ComodinProps {
  vida: boolean;
  danyo: boolean;
  cincuentaPorCiento: boolean;
  onRecuperarVida: () => void;
  onDanyo: () => void;
  onCincuentaPorCiento: () => void;
}

interface ComodinScrumProps {
  vida: boolean;
  retro: boolean;
  daily: boolean;
  onRecuperarVida: () => void;
  onRetro: () => void;
  onDaily: () => void;
}

interface ComodinMamonProps {
  vida: boolean;
  buscarInternet: boolean;
  escapar: boolean;
  onRecuperarVida: () => void;
  onBuscarInternet: () => void;
  onEscapar: () => void;
}

export default function Comodin({
  vida,
  danyo,
  cincuentaPorCiento,
  onRecuperarVida,
  onDanyo,
  onCincuentaPorCiento,
}: ComodinProps) {
  return (
    <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center text-gray-800">Comodines</h3>
      <div className="space-y-3">
        <button
          onClick={onRecuperarVida}
          disabled={!vida}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            vida
              ? 'bg-red-100 hover:bg-red-200 text-red-700 border-2 border-red-300 hover:border-red-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Sanamiento - Recuperar 30 puntos de vida"
        >
          <Heart className="w-5 h-5 mr-2" />
          Poción de Vida
        </button>

        <button
          onClick={onDanyo}
          disabled={!danyo}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            danyo
              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-2 border-yellow-300 hover:border-yellow-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Inflinges 30 puntos de daño al jefe"
        >
          <Zap className="w-5 h-5 mr-2" />
          Daño Elemental
        </button>

        <button
          onClick={onCincuentaPorCiento}
          disabled={!cincuentaPorCiento}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            cincuentaPorCiento
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300 hover:border-blue-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Eliminar dos opciones incorrectas"
        >
          <Percent className="w-5 h-5 mr-2" />
          Sabiduría del 50%
        </button>
      </div>
    </div>
  );
}

export function ComodinScrum({ vida, retro, daily, onRecuperarVida, onRetro, onDaily }: ComodinScrumProps) {
  return (
    <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center text-gray-800">Comodines</h3>
      <div className="space-y-3">
        <button
          onClick={onRecuperarVida}
          disabled={!vida}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            vida
              ? 'bg-red-100 hover:bg-red-200 text-red-700 border-2 border-red-300 hover:border-red-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Sanamiento - Recuperar 30 puntos de vida"
        >
          <Heart className="w-5 h-5 mr-2" />
          Poción de Vida
        </button>

        <button
          onClick={onRetro}
          disabled={!retro}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            retro
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300 hover:border-blue-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Eliminar dos opciones incorrectas - Conocimiento de retrospectiva anterior"
        >
          <Users className="w-5 h-5 mr-2" />
          Retrospectiva
        </button>
        <button
          onClick={onDaily}
          disabled={!daily}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            daily
              ? 'bg-green-100 hover:bg-green-200 text-green-700 border-2 border-green-300 hover:border-green-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Cambiar a una nueva pregunta - No pierdes tu partida actual"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reiniciar Pregunta
        </button>
      </div>
    </div>
  );
}

export function ComodinJefeMamon({ vida, buscarInternet, escapar, onRecuperarVida, onBuscarInternet, onEscapar }: ComodinMamonProps) {
  return (
    <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center text-gray-800">Comodines</h3>
      <div className="space-y-3">
        <button
          onClick={onRecuperarVida}
          disabled={!vida}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            vida
              ? 'bg-red-100 hover:bg-red-200 text-red-700 border-2 border-red-300 hover:border-red-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Sanamiento - Recuperar 30 puntos de vida"
        >
          <Heart className="w-5 h-5 mr-2" />
          Poción de Vida
        </button>

        <button
          onClick={onBuscarInternet}
          disabled={!buscarInternet}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            buscarInternet
              ? 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300 hover:border-blue-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Buscas en la IA - Te dice la opción correcta"
        >
          <Microscope className="w-5 h-5 mr-2" />
          Sr.ChatGPT
        </button>
        <button
          onClick={onEscapar}
          disabled={!escapar}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            escapar
              ? 'bg-green-100 hover:bg-green-200 text-green-700 border-2 border-green-300 hover:border-green-400 cursor-pointer transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title="Escapas del jefe y vuelves a la selección de personajes - No pierdes tu partida actual"
        >
          <Footprints  className="w-5 h-5 mr-2" />
          Escapar
        </button>
      </div>
    </div>
  );
}
