import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../../components/Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import BotonSonido from '../../../../components/ui/ButtonSound';

const elementosHTML = [
  { tag: 'p', contenido: 'Texto importante', className: '' },
  { tag: 'p', contenido: 'Otro texto sin importancia', className: '' },
];

const Nivel1 = () => {
  const [css, setCss] = useState('');
  const [mensaje, setMensaje] = useState<React.ReactNode>(null);
  const navigate = useNavigate();

  const verificarCSS = () => {
    const regexSelector = /^\s*p\s*\{[^}]+\}/m;
    if (regexSelector.test(css)) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
          <CheckCircle className="w-5 h-5" />
          <span>¡Bien hecho! Has aplicado estilo correctamente.</span>
        </div>
      );
      setTimeout(() => navigate('/juego/selectores/nivel-2'), 3000);
    } else {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>Recuerda usar <code>p &#123; propiedad: valor; &#125;</code> para dar estilo.</span>
        </div>
      );
    }
  };

  useEffect(() => {
    const styleTag = document.getElementById('css-nivel-1');
    if (styleTag) styleTag.innerHTML = css;
  }, [css]);

  return (
    <>
      <Head title="Nivel 1 - CSS Detective" />
      <style id="css-nivel-1" />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
        <BotonSonido />

        <main className="flex flex-col items-center p-6 gap-6">
          <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
            Nivel 1 - CSS Detective
          </h1>

          <p className="text-lg text-indigo-700 text-center max-w-2xl">
            Aplica algún estilo directamente a todas las etiquetas <strong><code>&lt;p&gt;</code></strong>
          </p>

          <section className="w-full max-w-4xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row gap-6">
            {/* Bloque de Vista previa */}
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="font-mono text-lg font-semibold text-indigo-800">Vista previa:</h2>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base">
                <p>Texto importante</p>
                <p>Otro texto sin importancia</p>
              </div>
            </div>

            {/* Imagen decorativa */}
            <div className="flex justify-center items-center mt-4 md:mt-0 md:w-1/3">
              <img
                src="/foto-detective-viñeta.png"
                alt="Detective"
                className="w-32 sm:w-36 md:w-40 h-auto drop-shadow-md pointer-events-none select-none"
              />
            </div>
          </section>


          <section className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
              <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
              <textarea
                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                placeholder={`/* Ejemplo:\n  p {\n\tcolor: red;\n  } \n*/`}
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
                {elementosHTML
                  .map(el => `<${el.tag}>${el.contenido}</${el.tag}>`)
                  .join('\n')}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Nivel1;
