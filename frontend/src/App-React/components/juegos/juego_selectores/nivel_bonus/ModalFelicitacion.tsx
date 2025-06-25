// Importamos React para poder usar JSX y componentes funcionales
import React from 'react';

// Definimos la interfaz de las propiedades que recibirá el componente ModalFelicitacion.
// En este caso, solo se espera una función `onClose` que se ejecutará al cerrar el modal.
interface ModalProps {
  onClose: () => void;
}

// Definimos un componente funcional de React llamado ModalFelicitacion.
// Utiliza las propiedades definidas en ModalProps.
const ModalFelicitacion: React.FC<ModalProps> = ({ onClose }) => {
  return (
    // Contenedor principal del modal. Ocupa toda la pantalla con fondo oscuro semitransparente.
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Caja del modal en sí: fondo blanco, bordes redondeados, sombra, animación y centrado */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center animate-fade-in">
        
        {/* Imagen decorativa en la parte superior del modal */}
        <img
          src="/public/foto-detective-arrestando.png"
          alt="Felicitación"
          className="w-38 h-32 mx-auto mb-4 object-contain"
        />

        {/* Título del modal */}
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">¡¡Enhorabuena!!</h2>

        {/* Mensaje explicando el motivo de la felicitación */}
        <p className="text-gray-700 mb-4">
          Gracias a tu ayuda hemos identificado y capturado al ladrón de CSS que llevábamos tanto tiempo persiguiendo.
          <br /><br />
          Ahora todas las hojas de estilo que había robado volverán a sus respectivas webs y los usuarios podrán navegar por una interfaz agradable e interactiva de nuevo.
        </p>

        {/* Botón para cerrar el modal. Ejecuta la función onClose al hacer clic */}
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

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default ModalFelicitacion;
