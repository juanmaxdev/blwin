// src/components/ModalGameOver.tsx
import React from 'react';
import { useEffect } from 'react';
import gifMurcielago from '../../../../../assets/juegos/ahorcado/modelo/gif-murcielago.gif'

interface ModalGameOverProps {
  isOpen: boolean;
  puntuacion: number;
  nivel: number;
  onClose: () => void;
}

const ModalSubidaNivel: React.FC<ModalGameOverProps> = ({ isOpen, puntuacion, nivel, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md px-6">
        <div className="flex justify-evenly w-full mb-4">
          <img src={gifMurcielago} style={{ width: '100px' }} alt="Murciélago animado" />
          <img src={gifMurcielago} style={{ width: '100px' }} alt="Murciélago animado" />
        </div>
        <h2 className=" font-bold bg-gradient-to-br rounded from-red-700 via-red-400 to-red-700 mb-4 text-center titulo">
          ¡SUBES AL NIVEL <span className="font-semibold fuente" style={{fontSize: '3.5rem'}}>{nivel}</span> !
        </h2>
        <p className="text-center text-lg text-black mb-6 puntuacion">
          Tu puntuación actual es de <span className="font-semibold text-red-800">{puntuacion}</span>
        </p>
      </div>
    </div>
  );
};

export default ModalSubidaNivel;
