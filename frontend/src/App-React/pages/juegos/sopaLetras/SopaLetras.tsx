import { useState } from 'react';
import ContadorTiempo from '../../../components/juegos/sopaLetras/ContadorTiempo';
import Tablero from '../../../components/juegos/sopaLetras/Tablero';

const SopaLetras = () => {
  const [resetKey, setResetKey] = useState(0);

  const reiniciarJuego = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200">
      <header className="h-16 flex items-center justify-center bg-white/50 shadow-md">
        <h1 className="text-4xl font-bold text-black">Juego de Sopa de letras</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <ContadorTiempo resetKey={resetKey} onTiempoCompleto={reiniciarJuego} />
        <Tablero resetKey={resetKey} />
      </main>
    </div>
  );
};

export default SopaLetras;
