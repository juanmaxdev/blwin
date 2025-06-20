import { useState } from "react";


export default function TirarDado() {
  const [resultado, setResultado] = useState<number | null>(null);
  const [animando, setAnimando] = useState(false);

  const tirarDado = () => {
    if (animando) return; // Evitar múltiples tiradas simultáneas
    setAnimando(true);
    setResultado(null);

    // Simular animación de lanzamiento
    setTimeout(() => {
      const nuevoResultado = Math.floor(Math.random() * 6) + 1;
      setResultado(nuevoResultado);
      setAnimando(false);
    }, 1000); // Duración de la animación
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={tirarDado}
        className={`px-4 py-2 rounded-lg bg-blue-500 text-white font-bold transition-transform duration-300 ${animando ? 'animate-pulse' : ''}`}
        disabled={animando}
      >
        {animando ? 'Tirando...' : 'Tirar Dado'}
      </button>
      {resultado !== null && (
        <div className="mt-4 text-2xl font-bold">
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
}