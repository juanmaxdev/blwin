import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../ui/ButtonSound';
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
import BotonVolverInicio from '../botonInicio/botonInicio';
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';

//Datos que sale en el codigo HTML
const elementosHTML = [
  { tag: 'p', contenido: 'Texto importante', className: '' },
  { tag: 'p', contenido: 'Otro texto sin importancia', className: '' },
];

const Nivel1 = () => {
  const [css, setCss] = useState('');
  const [mensaje, setMensaje] = useState<React.ReactNode>(null);
  const navigate = useNavigate();

  const procesarCSS = (inputCSS: string) => {
    return inputCSS.replace(/(^|\s)(p\s*\{)/g, '.vista-previa $2');
  };

  const verificarCSS = () => {
    const regexSelector = /^\s*p\s*\{[^}]+\}/m;

    if (!regexSelector.test(css)) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>
            Usa el selector <code>p</code> correctamente: <code>p &#123; propiedad: valor; &#125;</code>
          </span>
        </div>
      );
      return;
    }

    //Validaciones
    const sheet = new CSSStyleSheet();
    try {
      sheet.replaceSync(procesarCSS(css));
    } catch {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>El código CSS tiene errores de sintaxis</span>
        </div>
      );
      return;
    }

    const reglas = css.match(/p\s*\{([^}]*)\}/);
    if (!reglas) return;

    const declaraciones = reglas[1].split(';').map(linea => linea.trim()).filter(Boolean);

    const contieneValida = declaraciones.some(decl => {
      const [prop, valor] = decl.split(':').map(str => str?.trim());
      return prop && valor && CSS.supports(`${prop}: ${valor}`);
    });

    //Si el contenido no es valido muestra debajo una alerta 
    if (!contieneValida) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>Pon la propiedad y el valor correcto</span>
        </div>
      );
      return;
    }

    //Resultado de exito
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    sessionStorage.setItem('nivel1Superado', 'true');
    setMensaje(
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-5 h-5" />
        <span>¡Perfecto! Estilo aplicado correctamente</span>
      </div>
    );
    setTimeout(() => navigate('/juego/selectores/nivel-2'), 2000);
  };

  //Aplica el estilo a la parte indicada
  useEffect(() => {
    const styleTag = document.getElementById('css-nivel-1');
    if (styleTag) {
      styleTag.innerHTML = procesarCSS(css);
    }
  }, [css]);

  return (
    <>
      <Head title="Nivel 1 - CSS Detective" />
      <style id="css-nivel-1" />


      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
        <BotonSonido />
        <BotonFinalizarJuego />
        <BotonVolverInicio />

        <main className="flex flex-col items-center p-6 gap-6">
          {/* Vista Información*/}
          <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
            Nivel 1 - CSS Detective
          </h1>
          <p className="text-lg text-indigo-700 text-center max-w-2xl">
            Aplica algún estilo directamente a todas las etiquetas{' '}
            <strong>
              <code>&lt;p&gt;</code>
            </strong>
          </p>

          {/* Barra de Progeso */}
          <ProgressBar currentStep={1} />

          {/* Vista previa*/}
          <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative">
            <div className="flex-1">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
              <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full">
                <p>Texto importante</p>
                <p>Otro texto sin importancia</p>
              </div>
            </div>

            {/* Imagen decorativa */}
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/foto-detective-viñeta.png"
                alt="Detective"
                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
              />
            </div>
          </section>

          {/* Editor CSS + HTML */}
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
              <button
                onClick={verificarCSS}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirmar
              </button>
              {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
            </div>

            {/* HTML visible */}
            <div className="w-full md:w-1/2 bg-white p-4 rounded-xl shadow-xl border border-indigo-300 flex flex-col">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Código HTML:</h2>
              <pre className="flex-1 text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-300 whitespace-pre-wrap overflow-x-auto w-full h-full min-h-[10rem]">
                {elementosHTML.map(el => `<${el.tag}>${el.contenido}</${el.tag}>`).join('\n')}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Nivel1;
