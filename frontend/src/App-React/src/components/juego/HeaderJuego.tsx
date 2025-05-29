import { motion } from 'framer-motion';

interface HeaderJuegoProps {
  puntos: number;
  vidas: number;
  usuarioNombre: string | null;
  animacionPuntos: boolean;
  animacionVida: boolean;
}

const HeaderJuego = ({ puntos, vidas, usuarioNombre, animacionPuntos, animacionVida }: HeaderJuegoProps) => {
  const renderVidas = () => {
    return [...Array(3)].map((_, i) => {
      const estaPerdida = i >= vidas;
      return (
        <motion.span
          key={i}
          className={`text-3xl ${estaPerdida ? 'text-gray-400' : 'text-red-500'}`}
          animate={animacionVida && estaPerdida ? { scale: [1.4, 1], rotate: [0, -20, 20, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {estaPerdida ? '💔' : '❤️'}
        </motion.span>
      );
    });
  };

  return (
    <>
      <div className="absolute top-6 left-6 bg-white bg-opacity-70 px-4 py-2 rounded-xl shadow flex items-center gap-6 z-50">
        <div className="text-indigo-800 font-bold text-lg flex items-center gap-2">
          Puntos:
          <motion.span
            key={puntos}
            animate={animacionPuntos ? { scale: [1.5, 1] } : {}}
            className="text-green-600"
          >
            {puntos}
          </motion.span>
        </div>
        <div className="flex gap-1">{renderVidas()}</div>
      </div>

      {usuarioNombre && (
        <div className="absolute top-6 right-6 z-50">
          <div className="px-4 py-2 text-white font-bold rounded-lg border-4 animate-gradient-border bg-indigo-600 shadow-lg">
            {usuarioNombre}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderJuego;
