import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import BotonSonido from '../../../ui/ButtonSound';

const elementosHTML = [
    { tag: 'section', contenido: '<p class="activo">Elemento dentro de section</p>' },
    { tag: 'div', contenido: '<p class="activo">Elemento fuera de section</p>' },
    { tag: 'section', contenido: '<span class="activo">Otro en section</span>' },
    { tag: 'none', contenido: '<p class="activo">Otro fuera de section</p>' }
];

const Nivel3 = () => {
    const [css, setCss] = useState('');
    const [mensaje, setMensaje] = useState<React.ReactNode>(null);
    const navigate = useNavigate();

    const verificarCSS = () => {
        const match = css.match(/section\s+\.activo\s*\{\s*([a-z-]+)\s*:\s*([^;}]+);?\s*\}/);

        if (match) {
            const propiedad = match[1].trim();
            const valor = match[2].trim();

            const esSoportado = CSS.supports(propiedad, valor);

            if (esSoportado) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                setMensaje(
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Correcto - Avanzando al Nivel 4...</span>
                    </div>
                );
                setTimeout(() => navigate('/juego/selectores/nivel-4'), 3000);
            } else {
                setMensaje(
                    <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                        <XCircle className="w-5 h-5" />
                        <span>Fallo - Combinación inválida: {propiedad}: {valor}</span>
                    </div>
                );
            }
        } else {
            setMensaje(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Fallo - Aplica estilos solo a .activo dentro de un &lt;section&gt;</span>
                </div>
            );
        }
    };

    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-3');
        if (styleTag) styleTag.innerHTML = css;
    }, [css]);

    return (
        <>
            <Head title="Nivel 3 - CSS Detective" />
            <style id="css-nivel-3" />
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
                <BotonSonido />
                <main className="flex flex-col items-center p-6 gap-6">
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 3 - CSS Detective
                    </h1>
                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Aplica estilos solo a los elementos con clase <code>.activo</code> dentro de un <code>&lt;section&gt;</code>
                    </p>

                    {/* Vista previa */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row gap-6 relative">
                        <div className="flex-1">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base">
                                <section><p className="activo">Elemento dentro de section</p></section>
                                <div><p className="activo">Elemento fuera de section</p></div>
                                <section><span className="activo block">Otro en section</span></section>
                                <p className="activo">Otro fuera de section</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center justify-center">
                            <img
                                src="/foto-detective-interrogacion.png"
                                alt="Detective"
                                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none" />
                        </div>
                    </section>

                    {/* Editor y HTML */}
                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
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
                            {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
                        </div>

                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
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

export default Nivel3;
