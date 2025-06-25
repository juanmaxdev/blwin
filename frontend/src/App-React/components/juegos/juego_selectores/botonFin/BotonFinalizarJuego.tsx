// Importa hooks de React y de React Router para manejar estado y navegación
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importa íconos de dos librerías distintas
import { FaFlagCheckered } from 'react-icons/fa';
import { X } from 'lucide-react';

// Importa la librería de animaciones Framer Motion
import { motion } from 'framer-motion';

// Importa función personalizada para enviar puntuación al servidor
import { mandarPuntuacion } from '../../../../hooks/MandarPuntuacion';

// Componente principal que muestra el botón para finalizar el juego y manejar la lógica asociada
const BotonFinalizarJuego = () => {
    // Estados locales para manejar visibilidad del modal, progreso y puntuaciones
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nivelesSuperados, setNivelesSuperados] = useState(0);
    const [bonusDesbloqueado, setBonusDesbloqueado] = useState(false);
    const [bonusCompletado, setBonusCompletado] = useState(false);
    const [puntuacion, setPuntuacion] = useState(0);
    const [puntosEnviados, setPuntosEnviados] = useState(false);

    // Hook de navegación para redirigir al usuario
    const navigate = useNavigate();

    // Recorre los niveles del 1 al 10 para contar cuántos están marcados como superados en sessionStorage
    const contarNivelesSuperados = () => {
        let contador = 0;
        for (let i = 1; i <= 10; i++) {
            if (sessionStorage.getItem(`nivel${i}Superado`) === 'true') {
                contador++;
            }
        }

        // Calcula los puntos, actualiza estados y muestra el modal
        const puntos = contador * 50;
        setNivelesSuperados(contador);
        setPuntuacion(puntos);
        setBonusDesbloqueado(contador >= 9); // El bonus se desbloquea si se superan al menos 9 niveles
        setBonusCompletado(sessionStorage.getItem('nivel10Superado') === 'true');
        setMostrarModal(true);
    };

    // Navega al nivel bonus si está desbloqueado y aún no ha sido completado
    const irANivelBonus = () => {
        if (bonusDesbloqueado && !bonusCompletado) {
            navigate('/juego/selectores/nivel-10');
        }
    };

    // Finaliza el juego: intenta enviar la puntuación al servidor y limpia los datos del sessionStorage
    const terminarJuego = async () => {
        try {
            if (!puntosEnviados) {
                const response = await mandarPuntuacion('CSS Detective', puntuacion);
                if (!response.ok) {
                    console.error('Error al mandar la puntuación al servidor');
                } else {
                    setPuntosEnviados(true);
                }
            }
        } catch (error) {
            console.error('Error al enviar la puntuación:', error);
        }

        // Limpia el sessionStorage y recarga la página padre
        sessionStorage.clear();
        window.parent.location.reload();
    };

    return (
        <div className="absolute top-4 right-20 z-50">
            {/* Botón flotante para finalizar el juego, con animación al hacer clic */}
            <motion.button
                onClick={contarNivelesSuperados}
                className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
                title="Finalizar juego"
                whileTap={{ scale: 0.9 }}
                aria-label="Finalizar juego"
            >
                <FaFlagCheckered size={28} className="text-red-600" />
            </motion.button>

            {/* Modal que muestra los resultados del juego */}
            {mostrarModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center relative space-y-4">

                        {/* Botón para cerrar el modal */}
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setMostrarModal(false)}
                            aria-label="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Contenido del modal: mensaje, progreso y puntuación */}
                        <h2 className="text-2xl font-bold text-indigo-700">¡Buen trabajo!</h2>
                        <p className="text-indigo-600">Has completado <strong>{nivelesSuperados}</strong> niveles</p>
                        <p className="text-gray-700">Tu puntuación actual es:</p>
                        <p className="text-xl font-bold text-indigo-800">{puntuacion} puntos</p>
                        <p className="text-gray-600 mt-2">¿Quieres seguir jugando?</p>

                        {/* Mensaje adicional si el nivel bonus ya fue completado */}
                        {bonusCompletado && (
                            <p className="text-sm text-green-600 font-medium">Nivel bonus completado</p>
                        )}

                        {/* Botones para jugar nivel bonus o terminar el juego */}
                        <div className="space-y-3">
                            <button
                                onClick={irANivelBonus}
                                disabled={!bonusDesbloqueado || bonusCompletado}
                                className={`w-full px-4 py-2 rounded font-semibold ${
                                    bonusDesbloqueado && !bonusCompletado
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {bonusCompletado ? 'Bonus completado' : 'Jugar nivel bonus'}
                            </button>

                            <button
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold"
                                onClick={terminarJuego}
                            >
                                Terminar Juego
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Exporta el componente para usarlo en otros lugares del proyecto
export default BotonFinalizarJuego;
