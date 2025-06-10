import React from 'react';

interface ModalProps {
  onClose: () => void;
}

const ModalFelicitacion: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center animate-fade-in">
        {/* Imagen superior */}
        <img
          src="/public/foto-detective-arrestando.png"
          alt="Felicitación"
          className="w-38 h-32 mx-auto mb-4 object-contain"
        />
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">¡¡Enhorabuena!!</h2>
        <p className="text-gray-700 mb-4">
          Gracias a tu ayuda hemos identificado y capturado al ladrón de CSS que llevábamos tanto tiempo persiguiendo.
          <br /><br />
          Ahora todas las hojas de estilo que había robado volverán a sus respectivas webs y los usuarios podrán navegar por una interfaz agradable e interactiva de nuevo.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl"
        >
          ¡Genial!
        </button>
      </div>
    </div>
  );
};

export default ModalFelicitacion;
