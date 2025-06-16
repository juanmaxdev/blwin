import { motion } from "framer-motion";
import ImagenSalida from "../../../../assets/juegos/codequest/personaje/personaje_salida.png"

export default function BotonSalida() {
    return(
        <motion.button
            className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow-none"
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
        >
            <img src={ImagenSalida} alt="Salir" className="inline-block w-28 h-32 mr-2" />
        </motion.button>
    );
}