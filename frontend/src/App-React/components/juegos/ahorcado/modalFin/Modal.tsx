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
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ¡Partida Terminada!
        </h2>
        <p className="text-center text-lg text-gray-700 mb-6">
          Tu puntuación es <span className="font-semibold text-indigo-600">{puntuacion}</span>
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={irInicio}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
          >
            Volver al inicio
          </button>
          <button
            onClick={volverAempezar}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGameOver;
