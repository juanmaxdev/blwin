// Importa el ícono de "home" desde la librería de íconos
import { FaHome } from 'react-icons/fa';

// Importa la librería para animaciones
import { motion } from 'framer-motion';

// Componente que renderiza un botón flotante para volver al inicio (recargar la página)
const BotonVolverInicio = () => {

  return (
    // Posiciona el botón en la parte superior derecha de la pantalla
    <div className="absolute top-4 right-4 z-50">
      <motion.button
        // Al hacer clic, recarga la página principal del iframe
        onClick={() => window.parent.location.reload()}
        className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
        title="Volver al inicio"
        whileTap={{ scale: 0.9 }} // Efecto de escala al hacer tap o clic
        aria-label="Volver al inicio"
      >
        {/* Ícono de casa con color personalizado */}
        <FaHome size={28} className="text-indigo-700" />
      </motion.button>
    </div>
  );
};

// Exporta el componente para poder utilizarlo en otros archivos
export default BotonVolverInicio;
