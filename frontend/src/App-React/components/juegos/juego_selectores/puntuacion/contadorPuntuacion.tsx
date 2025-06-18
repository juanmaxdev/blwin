import { useEffect, useState } from "react";
import { Trophy, Star, Zap } from "lucide-react";

// Props del componente: puede recibir una puntuación anterior para comparar
interface ScoreCircleProps {
    puntuacionAnterior?: number;
}

// Componente que muestra un contador de puntuación visual y compara con la anterior si se da
export default function ContadorPuntuacion({ puntuacionAnterior }: ScoreCircleProps) {
    const [puntuacionActual, setPuntuacionActual] = useState(0);

    useEffect(() => {
        // Al cargar el componente, calcula la cantidad de niveles superados
        let contador = 0;
        for (let i = 1; i <= 10; i++) {
            if (sessionStorage.getItem(`nivel${i}Superado`) === "true") {
                contador++;
            }
        }

        // Cada nivel superado suma 50 puntos
        const puntos = contador * 50;
        setPuntuacionActual(puntos);
    }, []);

    // Cálculo de la diferencia entre la puntuación anterior y la actual
    const diferencia = puntuacionAnterior !== undefined
        ? puntuacionActual - puntuacionAnterior
        : 0;

    const mejoro = diferencia > 0;
    const empeoro = diferencia < 0;

    return (
        <div className={"relative flex items-center justify-center"}>
            {/* Círculo exterior con gradiente y sombra */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 shadow-2xl">
                
                {/* Círculo interior blanco con contenido y decoraciones */}
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center relative overflow-hidden">

                    {/* Íconos decorativos con baja opacidad al fondo */}
                    <div className="absolute inset-0 opacity-10">
                        <Star className="absolute top-4 left-6 w-2 h-2 text-yellow-500" />
                        <Zap className="absolute top-8 right-4 w-2 h-2 text-blue-500" />
                        <Trophy className="absolute bottom-6 left-4 w-2 h-2 text-purple-500" />
                        <Star className="absolute bottom-4 right-6 w-2 h-2 text-pink-500" />
                    </div>

                    {/* Puntuación actual visible al usuario */}
                    <div className="text-center z-10">
                        <div className="mb-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {puntuacionActual.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                                PUNTOS
                            </div>
                        </div>

                        {/* Si hay puntuación anterior, se muestra la diferencia */}
                        {puntuacionAnterior !== undefined && (
                            <div className="flex items-center justify-center gap-1 text-xs">
                                {mejoro && (
                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                        <span className="text-lg">↗</span>
                                        <span className="font-semibold">+{diferencia}</span>
                                    </div>
                                )}
                                {empeoro && (
                                    <div className="flex items-center text-red-600 dark:text-red-400">
                                        <span className="text-lg">↘</span>
                                        <span className="font-semibold">{diferencia}</span>
                                    </div>
                                )}
                                {diferencia === 0 && (
                                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                                        <span className="text-lg">→</span>
                                        <span className="font-semibold">0</span>
                                    </div>
                                )}

                                {/* Muestra la puntuación anterior como referencia */}
                                <span className="text-gray-400 dark:text-gray-500 ml-1">
                                    (anterior: {puntuacionAnterior})
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Capa con brillo para dar un efecto visual atractivo */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
