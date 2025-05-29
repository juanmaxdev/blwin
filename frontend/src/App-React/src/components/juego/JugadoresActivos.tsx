 import React, { useEffect, useState } from 'react';
import { motion, Reorder } from 'framer-motion';

interface JugadorActivo {
  usuarioId: number;
  nombreUsuario: string;
  puntos: number;
  vidasRestantes: number;
}

const JugadoresActivos: React.FC = () => {
  const [jugadores, setJugadores] = useState<JugadorActivo[]>([]);
  const usuarioIdSesion = Number(localStorage.getItem('usuarioId')); // o ajusta si tienes otro key

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const res = await fetch('/api/partida/jugadores-activos');
        const data = await res.json();
        setJugadores(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJugadores();
    const interval = setInterval(fetchJugadores, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderVidas = (vidas: number) => {
    return [...Array(3)].map((_, i) => {
      const estaPerdida = i >= vidas;
      return (
        <motion.span
          key={i}
          className={`text-lg ${estaPerdida ? 'text-gray-300' : 'text-red-500'}`}
          animate={estaPerdida ? { scale: [1.2, 1], opacity: [0.8, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {estaPerdida ? '💔' : '❤️'}
        </motion.span>
      );
    });
  };

  // Lógica para top 5 + jugador actual + separadores
  const jugadoresRender = (() => {
    const top5 = jugadores.slice(0, 5);
    const jugadorSesion = jugadores.find(j => j.usuarioId === usuarioIdSesion);
    const incluidoEnTop5 = jugadorSesion && top5.some(j => j.usuarioId === jugadorSesion.usuarioId);
    const hayMasDe5 = jugadores.length > 5;
    const resultado: (JugadorActivo | 'separador')[] = [...top5];

    if (!incluidoEnTop5 && jugadorSesion) {
      if (hayMasDe5) resultado.push('separador');
      resultado.push(jugadorSesion);
    }

    const totalVisibles = resultado.filter(r => r !== 'separador').length;
    if (jugadores.length > totalVisibles) {
      resultado.push('separador');
    }

    return resultado;
  })();

  return (
    <div className="w-60 p-4 bg-white shadow-xl rounded-2xl">
      <h2 className="text-lg font-bold mb-4 text-center">Jugadores Activos</h2>
      <Reorder.Group
        axis="y"
        values={jugadoresRender.filter(j => j !== 'separador') as JugadorActivo[]}
        onReorder={() => {}}
        as="ul"
        className="space-y-2"
      >
        {jugadoresRender.map((item, index) =>
          item === 'separador' ? (
            <div key={`sep-${index}`} className="text-center text-gray-400 text-sm">...</div>
          ) : (
            <Reorder.Item
              key={item.usuarioId}
              value={item}
              className={`transition-colors px-4 py-3 rounded-xl shadow-md cursor-pointer
                ${item.usuarioId === usuarioIdSesion ? 'bg-yellow-200 font-bold' : 'bg-blue-100 hover:bg-blue-200'}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <div className="flex flex-col justify-between">
                <span>{item.nombreUsuario}</span>
                <div className="flex justify-between">
                  <div className="flex gap-1">{renderVidas(item.vidasRestantes)}</div>
                  <div className="text-sm font-bold text-indigo-700">{item.puntos} pts</div>
                </div>
              </div>
            </Reorder.Item>
          )
        )}
      </Reorder.Group>
    </div>
  );
};

export default JugadoresActivos;

