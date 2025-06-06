import { useState, useEffect } from 'react';
import { Head } from '../../../Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../ui/ButtonSound';
import BotonVolverInicio from '../botonInicio/BotonInicio';
import ProgressBar from '../detectiveJuegoPanel/BarraProgreso';
import ModalFelicitacion from './ModalFelicitacion';


import detectivePensativo from '/public/foto-detective-interrogacion.png';
import detectiveIdea from '/public/foto-detective-idea.png';
import pizarra from '/public/foto-pizarra.png';
import detectiveCorriendo from '/public/foto-detective-corriendo.png';
import ladronCorriendo from '/public/foto-ladron-corriendo.png';
import ladronCaido from '/public/foto-ladron-caido.png';
import caja from '/public/foto-caja.png';
import piedra from '/public/foto-piedra.png';





const Nivel10 = () => {
    const [cssParte1, setCssParte1] = useState('');
    const [mensaje1, setMensaje1] = useState<React.ReactNode>(null);
    const [detectiveEnIdea, setDetectiveEnIdea] = useState(false);
    const [mostrarSegundaParte, setMostrarSegundaParte] = useState(false);

    const [cssParte2, setCssParte2] = useState('');
    const [mensaje2, setMensaje2] = useState<React.ReactNode>(null);
    const [ladronDerrotado, setLadronDerrotado] = useState(false);
    const [mostrarLadronArrestado, setMostrarLadronArrestado] = useState(false);
    const [mostrarModalFinal, setMostrarModalFinal] = useState(false);


    const procesarCSS = (inputCSS: string) => inputCSS;

    const verificarCSSParte1 = () => {
        const reglas = cssParte1.match(/#detective\s*\{([^}]*)\}/);
        if (!reglas) {
            setMensaje1(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Debes usar el selector <code>#detective</code></span>
                </div>
            );
            return;
        }

        const contenido = reglas[1]
            .replace(/\s+/g, '')
            .replace(/;+$/, '');

        if (contenido !== 'position:absolute;left:0') {
            setMensaje1(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Debes incluir exactamente las propiedades y valores indicados</span>
                </div>
            );
            return;
        }

        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        setDetectiveEnIdea(true);
        sessionStorage.setItem('nivel10Superado', 'true');
        setMensaje1(
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>¡Perfecto! El detective se ha alineado correctamente</span>
            </div>
        );

        setTimeout(() => {
            setMostrarSegundaParte(true);
            setMensaje1(null);
        }, 1500);
    };

    const verificarCSSParte2 = () => {
        const reglasDetectiveLadron = cssParte2.match(/#detective-corre,\s*#ladron-corre\s*\{([^}]*)\}/) ||
            cssParte2.match(/#ladron-corre\s*\{([^}]*)\}/);
        const reglasPiedra = cssParte2.match(/#piedra\s*\{([^}]*)\}/);

        if (!reglasDetectiveLadron || !reglasPiedra) {
            setMensaje2(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>Debes definir el selector <code>#ladron-corre</code> y <code>#piedra</code></span>
                </div>
            );
            return;
        }

        const detectiveLadronCSS = reglasDetectiveLadron[1].replace(/\s+/g, '').replace(/;+$/, '');
        const piedraCSS = reglasPiedra[1].replace(/\s+/g, '').replace(/;+$/, '');

        if (detectiveLadronCSS.includes('margin-left:30%')) {
            setLadronDerrotado(true); // Cambia la imagen del ladrón
        }

        if (detectiveLadronCSS !== 'margin-left:30%' || piedraCSS !== 'z-index:20') {
            setMensaje2(
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    <span>El CSS debe incluir <code>margin-left: 30%;</code> en <code>#detective-corre</code> y/o <code>#ladron-corre</code>, además de <code>z-index: 20;</code> en <code>#piedra</code></span>
                </div>
            );
            return;
        }

        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

        setMensaje2(
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>¡Bien hecho! Has completado la segunda parte correctamente.</span>
            </div>
        );

        setTimeout(() => {
            setMostrarLadronArrestado(true);
        }, 1000);

        setTimeout(() => {
            setMostrarModalFinal(true);
        }, 1500);
    };

    const handleCSSChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nuevoCSS = e.target.value;
        setCssParte2(nuevoCSS);

        // Detectar si contiene "margin-left: 30%"
        if (nuevoCSS.includes("margin-left: 30%")) {
            setLadronDerrotado(true);
        } else {
            setLadronDerrotado(false);
        }
    };

    useEffect(() => {
        const styleTag = document.getElementById('css-nivel-10');
        if (styleTag) {
            styleTag.innerHTML = procesarCSS(cssParte1 + '\n' + cssParte2);
        }
    }, [cssParte1, cssParte2]);

    return (
        <>
            <Head title="Nivel 10 - CSS Detective" />
            <style id="css-nivel-10" />
            <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
                <BotonSonido />
                <BotonVolverInicio />

                <main className="flex flex-col items-center p-6 gap-6">
                    <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
                        Nivel 10 - CSS Detective
                    </h1>

                    <p className="text-lg text-indigo-700 text-center max-w-2xl">
                        Usa el selector <code>#detective</code> para posicionar al detective con <strong>posición absoluta</strong> y <strong>alinearlo a la izquierda</strong> de la caja para que esté justo frente a la pizarra.
                    </p>

                    <ProgressBar currentStep={10} />

                    {/* PRIMERA PARTE */}
                    <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[12rem]">
                        <div className="flex-1 h-full flex flex-col relative">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
                            <div className="vista-previa bg-gray-100 p-4 pl-[8%] rounded-lg border border-gray-300 relative text-base w-full flex-1 min-h-[12rem]">
                                <section className="relative w-full h-60 flex items-center">
                                    <img
                                        id="detective"
                                        src={detectiveEnIdea ? detectiveIdea : detectivePensativo}
                                        alt="Detective"
                                        className="z-10 w-36 h-auto object-contain drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                    <img
                                        src={pizarra}
                                        alt="Pizarra"
                                        className="w-36 h-auto object-contain scale-x-[-1] absolute left-0 top-1/2 transform -translate-y-1/2"
                                    />
                                </section>
                            </div>
                        </div>
                    </section>

                    <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                            <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
                            <textarea
                                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                placeholder={`selector {\n  propiedad: valor;\n}`}
                                value={cssParte1}
                                onChange={(e) => setCssParte1(e.target.value)}
                            />
                            <button
                                onClick={verificarCSSParte1}
                                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                            {mensaje1 && <div className="mt-3 text-center">{mensaje1}</div>}
                        </div>

                        <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                            <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
                            <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                {`<section>
  <img src="pizarra.png" />
  <img id="detective" src="detective.png" />
</section>`}
                            </pre>
                        </div>
                    </section>

                    {/* SEGUNDA PARTE */}
                    {mostrarSegundaParte && (
                        <>
                            <h1 className="text-3xl font-bold text-indigo-800 text-center drop-shadow">
                                Nivel 10 - CSS Detective (PARTE 2)
                            </h1>
                            <p className="text-lg text-indigo-700 text-center max-w-2xl">
                                Usa el selector <code>#ladron-corre</code> y <code>#piedra</code> para mover al ladron hacia la izquierda y hacer que se tropieze con la piedra que hay dentro de la caja. Para lograrlo debes
                                <strong> sacar la piedra de la caja</strong> usando el índice del eje Z de la caja para que esté por delante de la caja <strong> y empujar al ladrón con un margen izquierdo del 30%</strong>
                            </p>

                            <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[12rem]">
                                <div className="flex-1 h-full flex flex-col relative">
                                    <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa (Parte 2):</h2>
                                    <div className="vista-previa bg-gray-100 p-4 pl-[8%] rounded-lg border border-gray-300 relative text-base w-full flex-1 min-h-[12rem]">
                                        <section className="relative w-full h-60 flex items-center">
                                            {/* Detective corriendo (izquierda) */}
                                            <img
                                                id="detective-corre"
                                                src={detectiveCorriendo}
                                                alt="Detective corriendo"
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-24 h-auto scale-x-[-3] scale-y-[3]"
                                            />

                                            {/* Ladrón corriendo o caído */}
                                            <img
                                                id="ladron-corre"
                                                src={ladronDerrotado ? ladronCaido : ladronCorriendo}
                                                alt="Ladrón"
                                                className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 z-20 w-24 h-auto ${ladronDerrotado ? "scale-x-[-2.5] scale-y-[2.5] translate-y-[55px]" : "scale-x-[1.5] scale-y-[1.5]"
                                                    }`}
                                            />

                                            {/* Caja en el centro con z-10 */}
                                            <img
                                                id="caja-centro"
                                                src={caja}
                                                alt="Caja en el centro"
                                                className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-auto"
                                            />

                                            {/* Piedra sin z-index (detrás de la caja) */}
                                            <img
                                                id="piedra"
                                                src={piedra}
                                                alt="Piedra"
                                                className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto scale-x-[0.5] scale-y-[0.5]"
                                            />
                                        </section>
                                    </div>
                                </div>
                            </section>

                            <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
                                    <h2 className="font-mono text-lg mb-2">Escribe tu CSS para la parte 2:</h2>
                                    <textarea
                                        className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                                        placeholder={`selector {\n  propiedad: valor;\n}`}
                                        value={cssParte2}
                                        onChange={handleCSSChange}
                                    />

                                    <button
                                        onClick={verificarCSSParte2}
                                        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Confirmar
                                    </button>
                                    {mensaje2 && <div className="mt-3 text-center">{mensaje2}</div>}
                                </div>

                                <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
                                    <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML parte 2:</h2>
                                    <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                                        {`<section>
  <img id="detective-corre" src="detective-corriendo.png" />
  <img id="ladron-corre" src="ladron-corriendo.png" />
  <img id="caja-centro" src="caja.png" />
  <img id="piedra" src="piedra.png" />
</section>`}
                                    </pre>
                                </div>
                            </section>
                        </>
                    )}


                </main>
            </div>
            {mostrarModalFinal && <ModalFelicitacion onClose={() => setMostrarModalFinal(false)} />}
        </>
    );
};

export default Nivel10;
