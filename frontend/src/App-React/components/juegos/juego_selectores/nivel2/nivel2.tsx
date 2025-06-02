import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../../components/Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../../components/ui/ButtonSound';

const elementosHTML = [
    { tag: 'p', contenido: 'Esto es una pista', className: 'pista' },
    { tag: 'p', contenido: 'No es una pista', className: '' },
    { tag: 'span', contenido: 'Otra pista', className: 'pista' },
    { tag: 'div', contenido: 'Pista dentro de div', className: 'pista' },
];

const Nivel2 = () => {
    const [css, setCss] = useState('');
    const [mensaje, setMensaje] = useState<React.ReactNode>(null);
    const navigate = useNavigate();

    const verificarCSS = () => {
        const regexSelector = /\.pista\s*\{([^}]+)\}/;
        const match = css.match(regexSelector);

        if (match) {
            const propiedades = match[1]
                .split(';')
                .map(linea => linea.trim())
                .filter(Boolean);

            const propiedadesValidas = propiedades.filter(linea => {
                const [prop, val] = linea.split(':').map(str => str.trim());
                return (
                    prop &&
                    val &&
                    /^[a-z-]+$/.test(prop) &&
                    !/^".+"$/.test(val) &&
                    val.length > 0
                );
            });

            if (propiedadesValidas.length > 0) {
                confetti({
                    particleCount: 300,
                    spread: 100,
                    origin: { y: 0.6 },
                });

                //Mensaje de Acierto
                setMensaje(
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Correcto - Avanzando al Nivel 3</span>
                    </div>
                );
                setTimeout(() => navigate('/juego/selectores/nivel-3'), 3000);
                return;
            }
        }

        //Mensaje de Fallo
        setMensaje(
            <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                <XCircle className="w-5 h-5" />
                <span>Fallo - Asegúrate de aplicar estilos válidos a la clase "pista".</span>
            </div>
        );
    };

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
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">

                <BotonSonido />

                <main className="flex flex-col items-center p-6 gap-6">
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 2 - CSS Detective
                    </h1>

                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica estilos CSS a todos los elementos que contienen pista
                    </p>

                    {/* Vista previa de HTML con imagen decorativa */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative">
                        {/* Vista previa */}
                        <div className="flex-1">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full">
                                <p className="pista">Esto es una pista</p>
                                <p>No es una pista</p>
                                <span className="pista block">Otra pista</span>
                                <div className="pista">Pista dentro de div</div>
                            </div>
                        </div>

                        {/* Imagen decorativa al lado derecho */}
                        <div className="hidden md:flex justify-center items-center">
                            <img
                                src="/foto-detective-completa.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
                            />
                        </div>
                    </section>


                    {/* Editor - HTML*/}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        {/* Editor CSS */}
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`/* Ejemplo:\n  selector {\n\tpropiedad: valor;\n  } \n*/`}
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                            />
                            {/*Botón de enviar */}
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

                        {/* HTML en texto plano */}
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