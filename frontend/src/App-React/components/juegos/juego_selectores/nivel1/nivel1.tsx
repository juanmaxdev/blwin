// Importaciones de React y librerías necesarias
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección entre niveles
import { Head } from '../../../Head'; // Componente personalizado para manejar el título del documento
import { CheckCircle, XCircle } from 'lucide-react'; // Íconos de éxito y error
import confetti from 'canvas-confetti'; // Librería para lanzar confeti al acertar

// Componentes UI reutilizables del juego
import BotonSonido from '../../../ui/ButtonSound';
import ProgressBar from '../detectiveJuegoPanel/barraProgreso';
import BotonVolverInicio from '../botonInicio/botonInicio';
import BotonFinalizarJuego from '../botonFin/BotonFinalizarJuego';
import ContadorPuntuacion from '../puntuacion/contadorPuntuacion';

// Elementos HTML visibles en la vista previa para que el jugador los estilice
const elementosHTML = [
  { tag: 'p', contenido: 'Texto importante', className: '' },
  { tag: 'p', contenido: 'Otro texto sin importancia', className: '' },
];

const Nivel1 = () => {
  const [css, setCss] = useState(''); // Guarda el código CSS del jugador
  const [mensaje, setMensaje] = useState<React.ReactNode>(null); // Muestra mensajes de validación o éxito
  const navigate = useNavigate(); // Navegación programática

  // Añade prefijo ".vista-previa" a los selectores para limitar los estilos al área de juego
  const procesarCSS = (inputCSS: string) => {
    return inputCSS.replace(/(^|\s)(p\s*\{)/g, '.vista-previa $2');
  };

  // Función para verificar que el CSS escrito sea correcto y aplicar efectos
  const verificarCSS = () => {
    const regexSelector = /^\s*p\s*\{[^}]+\}/m; // Verifica que haya una regla con selector `p`

    // Si no se encuentra una regla válida con `p { ... }`
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

    // Crea una hoja de estilos para intentar aplicar el CSS
    const sheet = new CSSStyleSheet();
    try {
      sheet.replaceSync(procesarCSS(css)); // Si falla, el CSS tiene errores de sintaxis
    } catch {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>El código CSS tiene errores de sintaxis</span>
        </div>
      );
      return;
    }

    // Extrae las declaraciones CSS dentro de p { ... }
    const reglas = css.match(/p\s*\{([^}]*)\}/);
    if (!reglas) return;

    const declaraciones = reglas[1]
      .split(';')
      .map(linea => linea.trim())
      .filter(Boolean); // Limpia líneas vacías

    // Verifica que haya al menos una declaración CSS válida usando CSS.supports
    const contieneValida = declaraciones.some(decl => {
      const [prop, valor] = decl.split(':').map(str => str?.trim());
      return prop && valor && CSS.supports(`${prop}: ${valor}`);
    });

    // Si ninguna declaración es válida, muestra error
    if (!contieneValida) {
      setMensaje(
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          <span>Pon la propiedad y el valor correcto</span>
        </div>
      );
      return;
    }

    // Si todo es correcto: muestra éxito, lanza confeti, guarda progreso y redirige
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    sessionStorage.setItem('nivel1Superado', 'true'); // Marca nivel como superado
    setMensaje(
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-5 h-5" />
        <span>¡Perfecto! Estilo aplicado correctamente</span>
      </div>
    );
    setTimeout(() => navigate('/juego/selectores/nivel-2'), 2000); // Pasa al siguiente nivel
  };

  // Este efecto aplica el CSS modificado con .vista-previa dinámicamente
  useEffect(() => {
    const styleTag = document.getElementById('css-nivel-1');
    if (styleTag) {
      styleTag.innerHTML = procesarCSS(css); // Inyecta el CSS en un <style>
    }
  }, [css]);

  return (
    <>
      {/* Establece título del documento */}
      <Head title="Nivel 1 - CSS Detective" />
      {/* Etiqueta de estilos dinámicos */}
      <style id="css-nivel-1" />

      {/* Contenedor principal con fondo degradado */}
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">

        {/* Botón de sonido y puntuación */}
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
            Nivel 1 - CSS Detective
          </h1>
          <p className="text-lg text-indigo-700 text-center max-w-2xl">
            Aplica algún estilo directamente a todas las etiquetas{' '}
            <strong>
              <code>&lt;p&gt;</code>
            </strong>
          </p>

          {/* Barra de progreso */}
          <ProgressBar currentStep={1} />

          {/* Vista previa (lo que el jugador estiliza) */}
          <section className="w-full max-w-6xl bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-col md:flex-row items-start gap-6 relative">
            <div className="flex-1">
              <h2 className="font-mono text-lg font-semibold text-indigo-800 mb-3">Vista previa:</h2>
              <div className="vista-previa bg-gray-100 p-4 rounded-lg border border-gray-300 space-y-2 text-base w-full">
                <p>Texto importante</p>
                <p>Otro texto sin importancia</p>
              </div>
            </div>

            {/* Imagen decorativa de detective */}
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/foto-detective-viñeta.png"
                alt="Detective"
                className="w-36 h-auto drop-shadow-[0_5px_15px_rgba(129,140,248,0.4)] pointer-events-none select-none"
              />
            </div>
          </section>

          {/* Sección de editor y código HTML */}
          <section className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
            {/* Editor de CSS */}
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

            {/* Código HTML mostrado como referencia */}
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
