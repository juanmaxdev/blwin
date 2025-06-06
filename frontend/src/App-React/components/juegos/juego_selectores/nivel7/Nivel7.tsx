import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../ui/ButtonSound';
import BotonVolverInicio from '../botonInicio/BotonInicio';
import ProgressBar from '../detectiveJuegoPanel/BarraProgreso';

const Nivel7 = () => {
  const [css, setCss] = useState('');
  const [mensaje, setMensaje] = useState<React.ReactNode>(null);
  const navigate = useNavigate();

  const procesarCSS = (inputCSS: string) => {
    return inputCSS.replace(/(^|\s)(h2\s*\+\s*p\s*\{)/g, '.vista-previa $2');
  };

  const verificarCSS = () => {
    const reglas = css.match(/h2\s*\+\s*p\s*\{([^}]*)\}/);
    if (!reglas) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>Usa el selector indicado correctamente</span>
        </div>
      );
      return;
    }

    const declaraciones = reglas[1].split(';').map(linea => linea.trim()).filter(Boolean);

    const propiedadesValidas = [
      'text-decoration:underline',
      'font-style:italic'
    ];

    const normalizadas = declaraciones.map(d => d.replace(/\s*:\s*/, ':').toLowerCase());
    const todasCorrectas = propiedadesValidas.every(prop => normalizadas.includes(prop));

    if (normalizadas.length !== 2 || !todasCorrectas) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>Debes incluir exactamente las propiedades y valores indicados</span>
        </div>
      );
      return;
    }

    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    sessionStorage.setItem('nivel7Superado', 'true');
    setMensaje(
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-5 h-5" />
        <span>¡Perfecto! Estilo aplicado correctamente</span>
      </div>
    );
    setTimeout(() => navigate('/juego/selectores/nivel-8'), 2000);
  };

  useEffect(() => {
    const styleTag = document.getElementById('css-nivel-7');
    if (styleTag) {
      styleTag.innerHTML = procesarCSS(css);
    }
  }, [css]);

  return (
    <>
      <Head title="Nivel 7 - CSS Detective" />
      <style id="css-nivel-7" />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
        <BotonSonido />
        <BotonVolverInicio />

        <main className="flex flex-col items-center p-6 gap-6">
          <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
            Nivel 7 - CSS Detective
          </h1>
          <p className="text-lg text-indigo-700 text-center max-w-2xl">
            Aplica estilo solo al <strong>primer p que siga a un h2</strong> usando el selector <code>h2 + p</code>
          </p>
          <ProgressBar currentStep={7} />

          <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[10rem]">
            <div className="flex-1 h-full flex flex-col">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
              <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-4 text-base w-full flex-1 min-h-[10rem]">
                <h2>Título 1</h2>
                <p>Este debe tener el estilo</p>
                <p>Este no</p>
                <h2>Título 2</h2>
                <div>
                  <p>Este tampoco</p>
                </div>
                <p>Este no</p>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <img
                src="/foto-detective-listo.png"
                alt="Detective"
                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
              />
            </div>
          </section>

          <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
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
              {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
            </div>

            <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
              <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                {`<h2>Título 1</h2>
<p>Este debe tener el estilo</p>
<p>Este no</p>
<h2>Título 2</h2>
<div>
  <p>Este tampoco</p>
</div>
<p>Este no</p>`}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Nivel7;
