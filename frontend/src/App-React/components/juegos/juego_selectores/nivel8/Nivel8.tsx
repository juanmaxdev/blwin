import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../../components/Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../../components/ui/ButtonSound';
import BotonVolverInicio from '../botonInicio/botonInicio';
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';
import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';

const Nivel8 = () => {
    // Estado para almacenar el CSS que el usuario escribe
    const [css, setCss] = useState('');
    // Estado para mostrar mensajes de error o éxito tras validar el CSS
    const [mensaje, setMensaje] = useState<React.ReactNode>(null);
    // Hook para navegación programática
    const navigate = useNavigate();

    // Función para procesar CSS antes de aplicarlo (aquí no hace nada, devuelve igual)
    const procesarCSS = (inputCSS: string) => inputCSS;

    // Función para validar el CSS escrito por el usuario
    const verificarCSS = () => {
        // Buscamos las reglas CSS que usen el selector 'section > p'
        const reglas = css.match(/section\s*>\s*p\s*\{([^}]*)\}/);

        if (!reglas) {
            // Si no encuentra el selector correctamente, muestra mensaje de error
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Usa el selector indicado correctamente</span>
                </div>
            );
            return;
        }

        // Separa las declaraciones CSS dentro de las llaves en un array
        const declaraciones = reglas[1]
            .split(';')
            .map(linea => linea.trim())
            .filter(Boolean);

        // Propiedades y valores exactos que deben usarse
        const propiedadesValidas = [
            'color:red',
            'font-weight:bold'
        ];

        // Normalizamos las declaraciones para facilitar comparación (quita espacios y minúsculas)
        const normalizadas = declaraciones.map(d => d.replace(/\s*:\s*/, ':').toLowerCase());

        // Comprobamos que todas las propiedades indicadas estén presentes en el CSS
        const todasCorrectas = propiedadesValidas.every(prop => normalizadas.includes(prop));

        // Si no hay exactamente 2 propiedades o alguna es incorrecta, muestra error
        if (normalizadas.length !== 2 || !todasCorrectas) {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Debes incluir exactamente las propiedades y valores indicados</span>
                </div>
            );
            return;
        }

        // Si pasa validación:
        // - Dispara confetti
        // - Guarda progreso en sessionStorage
        // - Muestra mensaje de éxito
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        sessionStorage.setItem('nivel8Superado', 'true');
        setMensaje(
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>¡Perfecto! Estilo aplicado correctamente</span>
            </div>
        );

        // Después de 2 segundos, navega al siguiente nivel
        setTimeout(() => navigate('/juego/selectores/nivel-9'), 2000);
    };

    // Cada vez que cambia el CSS, se actualiza el contenido del <style> para aplicar los estilos
    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-8');
        if (styleTag) {
            styleTag.innerHTML = procesarCSS(css);
        }
    }, [css]);

    return (
        <>
            {/* Título y metadatos para la página */}
            <Head title="Nivel 8 - CSS Detective" />
            {/* Etiqueta style para insertar CSS dinámicamente */}
            <style id="css-nivel-8" />

            {/* Contenedor principal con gradiente de fondo */}
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
                {/* Botones de sonido y puntaje en la esquina superior izquierda */}
                <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
                    <BotonSonido />
                    <div className="absolute top-2 left-24 flex items-center gap-4 z-10">
                        <ContadorPuntuacion />
                    </div>
                </div>

                {/* Botones para finalizar juego y volver al inicio */}
                <BotonFinalizarJuego />
                <BotonVolverInicio />

                {/* Contenido principal */}
                <main className="flex flex-col items-center p-6 gap-6">
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 8 - CSS Detective
                    </h1>

                    {/* Instrucciones para el usuario */}
                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica <strong>color rojo y negrita a los elementos <code>p</code> hijos directos de <code>section</code></strong>
                    </p>

                    {/* Barra de progreso indicando el nivel actual */}
                    <ProgressBar currentStep={8} />

                    {/* Vista previa con HTML y estilos dinámicos */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[10rem]">
                        <div className="flex-1 h-full flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full flex-1 min-h-[10rem]">
                                {/* HTML de ejemplo */}
                                <section>
                                    <p>Este debe estar rojo y en negrita</p>
                                    <div>
                                        <p>Este no cambia</p>
                                    </div>
                                </section>
                                <p>Este tampoco cambia</p>
                            </div>
                        </div>

                        {/* Imagen decorativa para pantallas md+ */}
                        <div className="hidden md:flex justify-center items-center">
                            <img
                                src="/foto-detective-fumador.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
                            />
                        </div>
                    </section>

                    {/* Sección con editor de CSS y código HTML para referencia */}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        {/* Editor de CSS */}
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`selector {\n  propiedad: valor;\n}`}
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                            />
                            <button
                                onClick={verificarCSS}
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            {/* Muestra mensaje de error o éxito */}
                            {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
                        </div>

                        {/* Código HTML para que el usuario pueda copiar o revisar */}
                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                {`<section>
  <p>Este debe estar rojo y en negrita</p>
  <div>
    <p>Este no cambia</p>
  </div>
</section>
<p>Este tampoco cambia</p>`}
                            </pre>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Nivel8;
