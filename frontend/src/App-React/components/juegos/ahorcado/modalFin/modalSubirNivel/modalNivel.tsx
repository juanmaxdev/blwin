// src/components/ModalGameOver.tsx
import React from 'react';

interface ModalGameOverProps {
  isOpen: boolean;
  puntuacion: number;
  nivel: number;
}

const ModalGameOver: React.FC<ModalGameOverProps> = ({ isOpen, puntuacion, nivel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6">
        <h2 className=" font-bold bg-gradient-to-br from-red-700 via-red-400 to-red-700 mb-4 text-center titulo">
          ¡SUBES AL NIVEL <span className="font-semibold text-red-800">{nivel}</span> !
        </h2>
        <p className="text-center text-lg text-black mb-6 puntuacion">
          Tu puntuación es <span className="font-semibold text-red-800">{puntuacion}</span>
        </p>
      </div>
    </div>
  );
};

export default ModalGameOver;
