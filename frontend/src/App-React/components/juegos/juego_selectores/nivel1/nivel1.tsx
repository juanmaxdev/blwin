import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Head } from '../../../../components/Head';
import BotonSonido from '../../../../components/ui/ButtonSound';
import LoginButton from '../../../../components/home/LoginButton';

const elementosEjemplo = [
  { id: 'rojo', className: 'cuadro bg-red-500', tag: 'div', contenido: 'Elemento Rojo' },
  { id: 'verde', className: 'cuadro bg-green-500', tag: 'div', contenido: 'Elemento Verde' },
  { id: '', className: 'cuadro especial bg-blue-500', tag: 'div', contenido: 'Especial Azul' },
];

const MinijuegoCSS = () => {
  const [css, setCss] = useState('');

  useEffect(() => {
    const dynamicStyle = document.getElementById('css-juego');
    if (dynamicStyle) dynamicStyle.innerHTML = css;
  }, [css]);

  return (
    <>
      <Head title="Minijuego CSS | BLWin" description="Aprende selectores CSS jugando" />
      <style id="css-juego" />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100">
        <BotonSonido />
        <LoginButton />

        <main className="flex flex-col items-center p-6 gap-6">
          <h1 className="text-3xl font-bold text-indigo-800 drop-shadow">
            🎨 Minijuego de Selectores CSS
          </h1>

          {/* Zona central de juego */}
          <section
            id="zona-juego"
            className="w-full max-w-4xl min-h-[200px] bg-white border border-indigo-300 rounded-xl shadow-inner p-4 flex flex-wrap justify-center gap-4"
          >
            {elementosEjemplo.map((el, i) => (
              <motion.div
                key={i}
                id={el.id}
                className={el.className}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {el.contenido}
              </motion.div>
            ))}
          </section>

          {/* Zona de edición */}
          <section className="w-full max-w-6xl flex flex-col md:flex-row gap-4 mt-8">
            {/* Editor CSS */}
            <div className="w-full md:w-1/2 bg-zinc-900 text-green-200 p-4 rounded-lg shadow-lg">
              <h2 className="font-mono text-lg mb-2">Escribe tu CSS aquí:</h2>
              <textarea
                className="w-full h-60 bg-zinc-800 text-green-100 font-mono p-2 rounded resize-none"
                placeholder={`/* Ejemplo:\n  #rojo { transform: rotate(5deg); }\n  .especial { border: 3px dashed yellow; }\n*/`}
                value={css}
                onChange={(e) => setCss(e.target.value)}
              />
            </div>

            {/* Vista HTML */}
            <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner overflow-auto">
              <h2 className="font-mono text-lg mb-2">Estructura HTML:</h2>
              <pre className="text-sm font-mono bg-white p-2 rounded border border-gray-300 overflow-x-auto">
{elementosEjemplo.map(el => 
`<${el.tag} ${el.id ? `id="${el.id}" ` : ''}${el.className ? `class="${el.className}"` : ''}>${el.contenido}</${el.tag}>`
).join('\n')}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MinijuegoCSS;
