import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../Head';
import { CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import BotonSonido from '../../../ui/ButtonSound';
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
import BotonVolverInicio from '../botonInicio/botonInicio';
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';
import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';

// Array con elementos HTML que se mostrarán en la sección de código visible
const elementosHTML = [
  { tag: 'h6', contenido: '¡¡¡' },
  { tag: 'h6', contenido: 'HOLAAAAAAAAA' },
  { tag: 'h6', contenido: 'MUNDOOOOOOOO' },
  { tag: 'h6', contenido: '!!!' },
];

const Nivel4 = () => {
  // Estado para almacenar el CSS que escribe el usuario
  const [css, setCss] = useState('');
  // Estado para mostrar mensajes de error o éxito
  const [mensaje, setMensaje] = useState<React.ReactNode>(null);
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Función para modificar el CSS antes de aplicarlo al estilo en línea,
  // agregando un selector padre ".vista-previa" para aislar el estilo
  const procesarCSS = (inputCSS: string) => {
    return inputCSS.replace(/(^|\s)(h6\s*\{)/g, '.vista-previa $2');
  };

  // Función que valida el CSS introducido por el usuario
  const verificarCSS = () => {
    // Expresión regular para validar que exista un selector h6 con sus llaves
    const regex = /^\s*h6\s*\{[^}]*\}/m;
    if (!regex.test(css)) {
      // Mensaje de error si no usa el selector h6 correctamente
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>
            Usa el selector <code>h6</code> correctamente con la propiedad:valor
          </span>
        </div>
      );
      return;
    }

    // Extrae las reglas CSS del selector h6
    const reglas = css.match(/h6\s*\{([^}]*)\}/);
    if (!reglas) return;

    // Divide las declaraciones CSS separadas por punto y coma
    const declaraciones = reglas[1]
      .split(';')
      .map(linea => linea.trim())
      .filter(Boolean);

    // Solo se permite una declaración en el bloque CSS
    if (declaraciones.length !== 1) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>
            Solo debes tener <code>background-color: blue;</code> en <code>h6</code>
          </span>
        </div>
      );
      return;
    }

    // Normaliza la declaración para facilitar la comparación:
    // elimina espacios extras, punto y coma al final y pasa a minúsculas
    const propiedadNormalizada = declaraciones[0].replace(/\s*:\s*/, ':').replace(/\s+/g, ' ').trim().replace(/;$/, '').toLowerCase();

    // Compara si la declaración es exactamente "background-color:blue"
    const esCorrecto = propiedadNormalizada === 'background-color:blue';

    if (!esCorrecto) {
      // Mensaje si la propiedad es incorrecta o diferente
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>
            Debes usar solo: <code>background-color: blue;</code> en <code>h6</code>
          </span>
        </div>
      );
      return;
    }

    // Si todo es correcto, muestra confeti y guarda el progreso
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    sessionStorage.setItem('nivel4Superado', 'true');

    // Mensaje de éxito
    setMensaje(
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-5 h-5" />
        <span>¡Perfecto! Estilo aplicado correctamente</span>
      </div>
    );

    // Navega al siguiente nivel después de 2 segundos
    setTimeout(() => navigate('/juego/selectores/nivel-5'), 2000);
  };

  // useEffect para actualizar el estilo en línea cuando cambia el CSS escrito
  useEffect(() => {
    const styleTag = document.getElementById('css-nivel-4');
    if (styleTag) {
      styleTag.innerHTML = procesarCSS(css);
    }
  }, [css]);

  return (
    <>
      <Head title="Nivel 4 - CSS Detective" />
      {/* Etiqueta style para inyectar el CSS */}
      <style id="css-nivel-4" />
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
        <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
          <BotonSonido />
          <div className="absolute top-2 left-24 flex items-center gap-4 z-10">
            <ContadorPuntuacion />
          </div>
        </div>
        <BotonFinalizarJuego />
        <BotonVolverInicio />

        <main className="flex flex-col items-center p-6 gap-6">
          {/* Título e instrucciones */}
          <h1 className="text-4xl font-bold text-indigo-800 text-center drop-shadow">
            Nivel 4 - CSS Detective
          </h1>
          <p className="text-lg text-indigo-700 text-center max-w-2xl">
            Aplica un <strong>color de fondo azul</strong> a todos los <strong><code>&lt;h6&gt;</code></strong>
          </p>

          {/* Barra de progreso que indica el nivel actual */}
          <ProgressBar currentStep={4} />

          {/* Vista previa con los elementos HTML que deben verse afectados por el CSS */}
          <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative min-h-[10rem]">
            <div className="flex-1 h-full flex flex-col">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
              <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full flex-1 min-h-[10rem]">
                {/* Aquí se muestran los h6 para que el usuario vea el efecto de su CSS */}
                <h6>¡¡¡</h6>
                <h6>HOLAAAAAAAAA</h6>
                <h6>MUNDOOOOOOOO</h6>
                <h6>!!!</h6>
              </div>
            </div>

            {/* Imagen decorativa a la derecha */}
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/foto-detective-linterna.png"
                alt="Detective"
                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
              />
            </div>
          </section>

          {/* Sección con el editor CSS y el código HTML visible */}
          <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
            {/* Editor donde el usuario escribe su CSS */}
            <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
              <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
              <textarea
                className="w-full h-40 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                placeholder={`selector {\n  propiedad: valor;\n}`}
                value={css}
                onChange={(e) => setCss(e.target.value)}
              />
              {/* Botón para validar el CSS */}
              <button
                onClick={verificarCSS}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirmar
              </button>
              {/* Muestra mensajes de error o éxito */}
              {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
            </div>

            {/* Panel que muestra el código HTML que se está usando en la vista previa */}
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

export default Nivel4;
