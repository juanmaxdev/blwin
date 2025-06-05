import { useState } from 'react';
import ContadorTiempo from '../../../components/juegos/sopaLetras/ContadorTiempo';
import Tablero from '../../../components/juegos/sopaLetras/Tablero';

const SopaLetras = () => {
  const [resetKey, setResetKey] = useState(0);

  const reiniciarJuego = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200">
      <header className="h-15 flex items-center justify-center bg-white/50 shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow py-3">Sopa de letras</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <ContadorTiempo resetKey={resetKey} onTiempoCompleto={reiniciarJuego} />
        <Tablero resetKey={resetKey} />
      </main>
    </div>
  );
};

export default SopaLetras;
