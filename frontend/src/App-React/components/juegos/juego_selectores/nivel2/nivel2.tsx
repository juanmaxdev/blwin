// Importaciones necesarias de React y librerías externas
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección programática
import { Head } from '../../../Head'; // Componente personalizado para el <head> del documento
import { CheckCircle, XCircle } from 'lucide-react'; // Íconos de validación
import confetti from 'canvas-confetti'; // Efecto de confeti al acertar

// Componentes personalizados reutilizables
import BotonSonido from '../../../ui/ButtonSound';
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
import BotonVolverInicio from '../botonInicio/botonInicio';
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';
import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';

// Datos que se usan para generar la vista previa del HTML
const elementosHTML = [
    { tag: 'p', contenido: 'Esto es una pista', className: 'pista' },
    { tag: 'p', contenido: 'No es una pista', className: '' },
    { tag: 'span', contenido: 'Otra pista', className: 'pista' },
    { tag: 'div', contenido: 'Pista dentro de div', className: 'pista' },
];

// Componente principal del nivel 2
const Nivel2 = () => {
    const [css, setCss] = useState(''); // Guarda el CSS que escribe el usuario
    const [mensaje, setMensaje] = useState<React.ReactNode>(null); // Muestra mensajes de validación
    const navigate = useNavigate(); // Para redirigir al siguiente nivel

    // Función que valida el CSS del usuario
    const verificarCSS = () => {
        const regexSelector = /\.pista\s*\{([^}]*)\}/m; // Busca el bloque de reglas .pista { ... }
        const match = css.match(regexSelector);

        if (!match) {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>
                        El selector debe ser <code>.pista &#123; propiedad: valor; &#125;</code>
                    </span>
                </div>
            );
            return;
        }

        // Extrae y separa las declaraciones CSS dentro del selector .pista
        const declaraciones = match[1].split(';').map(linea => linea.trim()).filter(Boolean);

        // Verifica que al menos una declaración sea válida
        const contieneValida = declaraciones.some(decl => {
            const [prop, val] = decl.split(':').map(str => str?.trim());
            return (
                prop &&
                val &&
                /^[a-z-]+$/.test(prop) && // La propiedad debe tener solo letras y guiones
                CSS.supports(`${prop}: ${val}`) // Verifica si la propiedad y el valor son válidos
            );
        });

        // Si ninguna declaración es válida, muestra error
        if (!contieneValida) {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>
                        Asegúrate de que al menos una propiedad y valor sean válidos - Ejemplo: <code>color: red;</code>
                    </span>
                </div>
            );
            return;
        }

        // Si todo está bien: lanza confeti, guarda progreso y avanza al siguiente nivel
        confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
        sessionStorage.setItem('nivel2Superado', 'true');
        setMensaje(
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>¡Perfecto! Estilo aplicado correctamente</span>
            </div>
        );
        setTimeout(() => navigate('/juego/selectores/nivel-3'), 2000);
    };

    // Aplica el CSS que el usuario escribe directamente en un <style> dinámico
    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-2');
        if (styleTag) {
            styleTag.innerHTML = css;
        }
    }, [css]);

    return (
        <>
            <Head title="Nivel 2 - CSS Detective" />
            <style id="css-nivel-2" />

            {/* Fondo con degradado y configuración inicial */}
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
                <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
                    <BotonSonido />
                    <div className="absolute top-2 left-24 flex items-center gap-4 z-10">
                        <ContadorPuntuacion />
                    </div>
                </div>
                <BotonFinalizarJuego />
                <BotonVolverInicio />

                {/* Contenido principal del juego */}
                <main className="flex flex-col items-center p-6 gap-6">
                    {/* Título e instrucciones */}
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 2 - CSS Detective
                    </h1>
                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica estilos CSS a todos los elementos que contienen la clase <code>pista</code>
                    </p>

                    <ProgressBar currentStep={2} />

                    {/* Vista previa de los elementos afectados por el CSS */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative">
                        <div className="flex-1">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full">
                                <p className="pista">Esto es una pista</p>
                                <p>No es una pista</p>
                                <span className="pista block">Otra pista</span>
                                <div className="pista">Pista dentro de div</div>
                            </div>
                        </div>

                        {/* Imagen decorativa del detective */}
                        <div className="hidden md:flex justify-center items-center">
                            <img
                                src="/foto-detective-completa.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
                            />
                        </div>
                    </section>

                    {/* Editor de código CSS y visualización del código HTML */}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        {/* Editor CSS */}
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`/* Ejemplo:\n  .pista {\n\tcolor: red;\n  } \n*/`}
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                            />
                            <button
                                onClick={verificarCSS}
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            {mensaje && (
                                <div className="mt-3 text-center">{mensaje}</div>
                            )}
                        </div>

                        {/* HTML visible para el jugador */}
                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                {elementosHTML.map(el =>
                                    `<${el.tag}${el.className ? ` class="${el.className}"` : ''}>${el.contenido}</${el.tag}>`
                                ).join('\n')}
                            </pre>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Nivel2;
