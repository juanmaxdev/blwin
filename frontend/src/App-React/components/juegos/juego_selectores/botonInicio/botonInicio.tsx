import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BotonVolverInicio = () => {

  return (
    <div className="absolute top-4 right-4 z-50">
      <motion.button
        onClick={() => window.parent.location.reload()}
        className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
        title="Volver al inicio"
        whileTap={{ scale: 0.9 }}
        aria-label="Volver al inicio"
      >
        <FaHome size={28} className="text-indigo-700" />
      </motion.button>
    </div>
  );
};

export default BotonVolverInicio;
