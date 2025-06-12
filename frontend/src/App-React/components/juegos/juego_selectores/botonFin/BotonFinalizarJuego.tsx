import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFlagCheckered } from 'react-icons/fa';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const BotonFinalizarJuego = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nivelesSuperados, setNivelesSuperados] = useState(0);
    const [bonusDesbloqueado, setBonusDesbloqueado] = useState(false);
    const navigate = useNavigate();

    const contarNivelesSuperados = () => {
        let contador = 0;
        for (let i = 1; i <= 10; i++) {
            if (sessionStorage.getItem(`nivel${i}Superado`) === 'true') {
                contador++;
            }
        }
        setNivelesSuperados(contador);
        setBonusDesbloqueado(contador === 9);
        setMostrarModal(true);
    };

    const irANivelBonus = () => {
        if (bonusDesbloqueado) {
            navigate('/juego/selectores/nivel-10');
        }
    };

    return (
        <div className="absolute top-4 right-20 z-50">
            <motion.button
                onClick={contarNivelesSuperados}
                className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
                title="Finalizar juego"
                whileTap={{ scale: 0.9 }}
                aria-label="Finalizar juego"
            >
                <FaFlagCheckered size={28} className="text-red-600" />
            </motion.button>

            {mostrarModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center relative space-y-4">
                        
                        {/* Botón de cierre con ícono */}
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setMostrarModal(false)}
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-indigo-700">🎉 ¡Felicidades!</h2>
                        <p className="text-indigo-600">Has finalizado el juego.</p>
                        <p className="text-gray-700">
                            <strong>{nivelesSuperados}</strong> niveles superados.
                        </p>
                        <p className="text-gray-500 italic">(Puntuación: próximamente...)</p>

                        <div className="space-y-3">
                            <button
                                onClick={irANivelBonus}
                                disabled={!bonusDesbloqueado}
                                className={`w-full px-4 py-2 rounded font-semibold ${
                                    bonusDesbloqueado
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Jugar nivel bonus
                            </button>

                            <button
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold"
                                onClick={() => navigate('/juego/selectores')}
                            >
                                Jugar otra vez
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotonFinalizarJuego;
