import { useState, useEffect } from 'react'; 
// Importa hooks React para manejar estado y efectos secundarios.

import { Head } from '../../../../components/Head';
// Componente para manipular la etiqueta <head> del documento (ej. título).

import { CheckCircle, XCircle } from 'lucide-react';
// Iconos para mostrar mensajes de éxito y error.

import confetti from 'canvas-confetti';
// Librería para mostrar confeti animado al acertar.

import BotonSonido from '../../../../components/ui/ButtonSound';
// Botón para activar/desactivar sonidos del juego.

import BotonVolverInicio from '../botonInicio/botonInicio';
// Botón para volver al inicio del juego.

import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
// Barra de progreso que muestra el avance por niveles.

import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';
// Botón para terminar el juego.

import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';
// Componente que muestra la puntuación actual.

/**
 * Componente principal que representa el Nivel 9 del juego CSS Detective.
 * El usuario debe escribir CSS que seleccione ciertos elementos y aplique estilos exactos.
 */
const Nivel9 = () => {
    // Estado para almacenar el CSS que el usuario escribe
    const [css, setCss] = useState('');
    
    // Estado para almacenar un mensaje (error o éxito) que se muestra al usuario
    // React.ReactNode permite poner contenido JSX o texto
    const [mensaje, setMensaje] = useState<React.ReactNode>(null);

    // Función para procesar el CSS antes de inyectarlo en la página (actualmente no modifica)
    const procesarCSS = (inputCSS: string) => inputCSS;

    /**
     * Función que valida el CSS escrito por el usuario
     * - Verifica que se use el selector correcto
     * - Verifica que tenga exactamente dos propiedades específicas con valores exactos
     * - Muestra mensajes de error o éxito
     * - Activa confeti y guarda progreso en sessionStorage si está correcto
     */
    const verificarCSS = () => {
        // Busca en el CSS el bloque con el selector indicado y extrae sus declaraciones
        const reglas = css.match(/section\s+div\s*>\s*p:first-child\s*\{([^}]*)\}/);

        // Si no encuentra el selector, muestra error y termina
        if (!reglas) {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Usa el selector indicado correctamente</span>
                </div>
            );
            return;
        }

        // Separa las declaraciones CSS por ';', limpia espacios y filtra vacíos
        const declaraciones = reglas[1].split(';').map(linea => linea.trim()).filter(Boolean);

        // Propiedades y valores exactos que se esperan
        const propiedadesValidas = [
            'text-transform:uppercase',
            'letter-spacing:2px'
        ];

        // Normaliza las declaraciones: quita espacios alrededor de ':' y pasa a minúsculas
        const normalizadas = declaraciones.map(d => d.replace(/\s*:\s*/, ':').toLowerCase());

        // Comprueba que todas las propiedades válidas estén incluidas en lo que escribió el usuario
        const todasCorrectas = propiedadesValidas.every(prop => normalizadas.includes(prop));

        // Si no tiene exactamente dos declaraciones o no tiene las correctas, muestra error
        if (normalizadas.length !== 2 || !todasCorrectas) {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Debes incluir exactamente las propiedades y valores indicados</span>
                </div>
            );
            return;
        }

        // Si pasa todas las validaciones:
        // Muestra animación de confeti
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

        // Guarda en sessionStorage que el nivel fue superado (para persistencia)
        sessionStorage.setItem('nivel9Superado', 'true');

        // Muestra mensaje de éxito
        setMensaje(
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>¡Perfecto! Estilo aplicado correctamente</span>
            </div>
        );
    };

    // useEffect que inyecta el CSS escrito por el usuario en una etiqueta <style> dentro del DOM
    // Se ejecuta cada vez que cambia el estado 'css'
    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-9');
        if (styleTag) {
            styleTag.innerHTML = procesarCSS(css);
        }
    }, [css]);

    // JSX que describe la UI de este nivel
    return (
        <>
            {/* Cambia el título de la página */}
            <Head title="Nivel 9 - CSS Detective" />
            {/* Etiqueta style donde se inyecta el CSS del usuario */}
            <style id="css-nivel-9" />
            
            {/* Contenedor principal con fondo degradado y scroll oculto en horizontal */}
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">

                {/* Barra superior con botones de sonido y puntuación */}
                <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
                    <BotonSonido />
                    <div className="absolute top-2 left-24 flex items-center gap-4 z-10">
                        <ContadorPuntuacion />
                    </div>
                </div>

                {/* Botones para finalizar juego y volver a inicio */}
                <BotonFinalizarJuego />
                <BotonVolverInicio />

                {/* Contenido principal */}
                <main className="flex flex-col items-center p-6 gap-6">
                    {/* Título del nivel */}
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 9 - CSS Detective
                    </h1>

                    {/* Descripción / instrucción del nivel */}
                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica <strong>transformación a mayúsculas y espaciado entre letras a los <code>p</code> que sean el primer hijo dentro de un <code>div</code> dentro de una <code>section</code></strong>
                    </p>

                    {/* Barra de progreso, indica que estamos en el paso 9 */}
                    <ProgressBar currentStep={9} />

                    {/* Vista previa del HTML que se estilizará */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[10rem]">
                        {/* Columna con vista previa del resultado */}
                        <div className="flex-1 h-full flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full flex-1 min-h-[10rem]">
                                <section>
                                    <div>
                                        <p>Este debe estar en mayúsculas y con espaciado</p>
                                        <p>Este no cambia</p>
                                    </div>
                                    <p>Este tampoco cambia</p>
                                </section>
                            </div>
                        </div>

                        {/* Imagen decorativa del detective, solo visible en pantallas md o mayores */}
                        <div className="hidden md:flex justify-center items-center">
                            <img
                                src="/foto-detective-sentado.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
                            />
                        </div>
                    </section>

                    {/* Sección para escribir CSS y mostrar el código HTML */}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        {/* Área para que el usuario escriba su CSS */}
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`selector {\n  propiedad: valor;\n}`}
                                value={css}
                                onChange={(e) => setCss(e.target.value)} // Actualiza el estado al escribir
                            />
                            {/* Botón para validar el CSS */}
                            <button
                                onClick={verificarCSS}
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            {/* Muestra mensaje de error o éxito */}
                            {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
                        </div>

                        {/* Área que muestra el código HTML de referencia para el usuario */}
                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                {`<section>
  <div>
    <p>Este debe estar en mayúsculas y con espaciado</p>
    <p>Este no cambia</p>
  </div>
  <p>Este tampoco cambia</p>
</section>`}
                            </pre>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Nivel9;
// Exporta el componente para usarlo en la app.
