import { useEffect, useState } from 'react';  // Importa hooks para manejar estado y efectos en el componente
import { useNavigate } from 'react-router-dom';  // Hook para navegar programáticamente entre rutas
import { Head } from '../../../Head';  // Componente para gestionar el título y metadata de la página
import { CheckCircle, XCircle } from 'lucide-react';  // Iconos para mostrar éxito o error
import confetti from 'canvas-confetti';  // Librería para animación de confeti
import BotonSonido from '../../../ui/ButtonSound';  // Componente botón para activar/desactivar sonido
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';  // Barra de progreso del juego
import BotonVolverInicio from '../botonInicio/botonInicio';  // Botón para regresar a la pantalla principal
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';  // Botón para finalizar el juego
import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';  // Componente que muestra la puntuación

// Array con distintos elementos HTML y su contenido para mostrar en la vista previa y el código
const elementosHTML = [
    { tag: 'section', contenido: '<p class="activo">Elemento dentro de section</p>' },
    { tag: 'div', contenido: '<p class="activo">Elemento fuera de section</p>' },
    { tag: 'section', contenido: '<span class="activo">Otro en section</span>' },
    { tag: 'none', contenido: '<p class="activo">Otro fuera de section</p>' }
];

const Nivel3 = () => {
    // Estado para guardar el CSS escrito por el usuario
    const [css, setCss] = useState('');
    // Estado para mostrar mensajes de error o éxito al usuario
    const [mensaje, setMensaje] = useState<React.ReactNode>(null);
    // Hook para cambiar de ruta en la aplicación
    const navigate = useNavigate();

    // Función que verifica si el CSS cumple con la condición del nivel
    const verificarCSS = () => {
        // Se usa una expresión regular para buscar una regla CSS que seleccione .activo dentro de section
        const match = css.match(/section\s+\.activo\s*\{\s*([a-z-]+)\s*:\s*([^;}]+);?\s*\}/);

        if (match) {
            // Si se encuentra la regla, se extraen la propiedad y valor de CSS
            const propiedad = match[1].trim();
            const valor = match[2].trim();

            // Se valida si el navegador soporta la propiedad y valor CSS
            const esSoportado = CSS.supports(propiedad, valor);

            if (esSoportado) {
                // Si es válido, se dispara la animación de confeti
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                // Se guarda en sessionStorage que el nivel fue superado
                sessionStorage.setItem('nivel3Superado', 'true');
                // Se muestra mensaje de éxito al usuario
                setMensaje(
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        <span>¡Perfecto! Estilo aplicado correctamente</span>
                    </div>
                );
                // Después de 2 segundos se navega al siguiente nivel
                setTimeout(() => navigate('/juego/selectores/nivel-4'), 2000);
            } else {
                // Si la propiedad o valor no son soportados, se muestra mensaje de error
                setMensaje(
                    <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                        <XCircle className="w-5 h-5" />
                        <span>Fallo - Combinación inválida: {propiedad}: {valor}</span>
                    </div>
                );
            }
        } else {
            // Si no se encontró la regla correcta, se indica al usuario el error en la sintaxis o selector
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Fallo - Aplica estilos solo a .activo dentro de un &lt;section&gt;</span>
                </div>
            );
        }
    };

    // Cada vez que cambia el estado css, se actualiza el contenido de la etiqueta <style> para aplicar el CSS en tiempo real
    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-3');
        if (styleTag) styleTag.innerHTML = css;
    }, [css]);

    return (
        <>
            {/* Se establece el título de la página */}
            <Head title="Nivel 3 - CSS Detective" />
            {/* Estilo que se va a modificar dinámicamente con el CSS ingresado */}
            <style id="css-nivel-3" />
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
                {/* Botones de sonido, puntuación y controles de juego en la parte superior */}
                <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
                    <BotonSonido />
                    <div className="absolute top-2 left-24 flex items-center gap-4 z-10">
                        <ContadorPuntuacion />
                    </div>
                </div>
                <BotonFinalizarJuego />
                <BotonVolverInicio />

                <main className="flex flex-col items-center p-6 gap-6">
                    {/* Título y descripción del nivel */}
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 3 - CSS Detective
                    </h1>
                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica estilos solo a los elementos con clase <code>.activo</code> dentro de un <code>&lt;section&gt;</code>
                    </p>

                    {/* Barra de progreso para mostrar el avance en el juego */}
                    <ProgressBar currentStep={3} />

                    {/* Vista previa de los elementos HTML sobre los que se aplicará el CSS */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row gap-6 relative">
                        <div className="flex-1">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base">
                                {/* Se muestran los elementos con sus clases y estructura real */}
                                <section><p className="activo">Elemento dentro de section</p></section>
                                <div><p className="activo">Elemento fuera de section</p></div>
                                <section><span className="activo block">Otro en section</span></section>
                                <p className="activo">Otro fuera de section</p>
                            </div>
                        </div>

                        {/* Imagen decorativa de un detective */}
                        <div className="hidden md:flex items-center justify-center">
                            <img
                                src="/foto-detective-interrogacion.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none" />
                        </div>
                    </section>

                    {/* Sección con el editor de CSS y el código HTML para referencia */}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        {/* Editor de texto donde el usuario escribe el CSS */}
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`/* Ejemplo:\n  selector tipo {\n\tpropiedad: valor;\n  } \n*/`}
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                            />
                            <button
                                onClick={verificarCSS}
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            {/* Mostrar mensajes de validación o éxito */}
                            {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
                        </div>

                        {/* Panel que muestra el código HTML para referencia del usuario */}
                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                {/* Se mapea el array de elementos para mostrar su código HTML como texto */}
                                {elementosHTML.map(el =>
                                    el.tag === 'none'
                                        ? el.contenido
                                        : `<${el.tag}>${el.contenido}</${el.tag}>`
                                ).join('\n')}
                            </pre>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Nivel3;  // Exporta el componente para ser usado en la app
