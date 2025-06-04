// src/components/ModalGameOver.tsx
import React from 'react';

interface ModalGameOverProps {
  isOpen: boolean;
  puntuacion: number;
  irInicio: () => void;
  volverAempezar: () => void;
}

const ModalGameOver: React.FC<ModalGameOverProps> = ({ isOpen, puntuacion, irInicio, volverAempezar }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6">
        <h2 className=" font-bold text-gray-800 mb-4 text-center titulo">
          ¡Partida Terminada!
        </h2>
        <p className="text-center text-lg text-gray-700 mb-6 puntuacion">
          Tu puntuación es <span className="font-semibold text-indigo-600">{puntuacion}</span>
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={irInicio}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition puntuacion"
          >
            Volver al inicio
          </button>
          <button
            onClick={volverAempezar}
            className="px-4 py-2 bg-gradient-to-br from-red-700 via-red-400 to-red-700 hover:from-red-400 hover:via-red-700 hover:to-red-400 rounded-lg transition puntuacion"
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGameOver;
