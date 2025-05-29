import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const tematicas = [
  { nombre: 'Historia', color: '#FACC15', personaje: '/personajes/personaje1.png', rango: [80, 120] }, 
  { nombre: 'Música', color: '#8B5CF6', personaje: '/personajes/personaje8.png', rango: [120, 160] }, 
  { nombre: 'Arte', color: '#EF4444', personaje: '/personajes/personaje7.png', rango: [160, 200] },
  { nombre: 'Geografia', color: '#166534', personaje: '/personajes/personaje6.png', rango: [200, 240] },
  { nombre: 'Cine', color: '#F472B6', personaje: '/personajes/personaje5.png', rango: [240, 280] }, 
  { nombre: 'Ciencia', color: '#86EFAC', personaje: '/personajes/personaje4.png', rango: [280, 320] }, 
  { nombre: 'Deportes', color: '#FB923C', personaje: '/personajes/personaje3.png', rango: [320, 360] },
  { nombre: 'Informatica', color: '#3B82F6', personaje: '/personajes/personaje2.png', rango: [20, 40] },
  { nombre: 'BergerLevrault', color: '#A41E34', personaje: '/personajes/personaje9.png', rango: [40, 80] }, 
];


interface Props {
  onSelect: (tematica: string) => void;
  ultimaTematica?: string | null;
}

const RuletaTematicas = ({ onSelect, ultimaTematica }: Props) => {
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);

  // 🔊 Sonido de ruleta
  const sonidoRuleta = useRef<HTMLAudioElement | null>(null);

  const girarRuleta = async () => {
    if (girando) return;

    try {
      let response;
      if (!ultimaTematica) {
        response = await axios.get<string>('/api/pregunta/tematica/aleatoria');
      } else {
        response = await axios.get<string>('/api/pregunta/tematica/aleatoria-evitando', {
          params: { ultimaTematica }
        });
      }

      const temaServidor = response.data;
      const temaEncontrado = tematicas.find(t => t.nombre.toLowerCase() === temaServidor.toLowerCase());

      if (!temaEncontrado) {
        console.error('Temática no encontrada:', temaServidor);
        return;
      }

      const rangoMedio = (temaEncontrado.rango[0] + temaEncontrado.rango[1]) / 2;
      const vueltas = 5 * 360;
      const giroFinal = vueltas + (360 - rangoMedio);

      // ▶️ Iniciar sonido
      sonidoRuleta.current?.play();

      setRotacion(giroFinal);
      setGirando(true);

      setTimeout(() => {
        setGirando(false);

        // ⏹️ Detener y reiniciar el sonido
        sonidoRuleta.current?.pause();
        sonidoRuleta.current!.currentTime = 0;

        onSelect(temaEncontrado.nombre);
      }, 4000);
    } catch (err) {
      console.error('Error al girar la ruleta:', err);
    }
  };

  const radio = 300;
  const centro = radio;

  const createSlice = (index: number, total: number) => {
    const startAngle = (index * 360) / total;
    const endAngle = ((index + 1) * 360) / total;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const x1 = centro + radio * Math.cos((Math.PI * startAngle) / 180);
    const y1 = centro + radio * Math.sin((Math.PI * startAngle) / 180);
    const x2 = centro + radio * Math.cos((Math.PI * endAngle) / 180);
    const y2 = centro + radio * Math.sin((Math.PI * endAngle) / 180);

    return `M${centro},${centro} L${x1},${y1} A${radio},${radio} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 🔊 Reproductor del sonido de la ruleta */}
      <audio ref={sonidoRuleta} src="/sonidos/ruleta.mp3" preload="auto" />

      <div className="relative w-[600px] h-[600px]">
        <motion.svg
          width={600}
          height={600}
          viewBox="0 0 600 600"
          animate={{ rotate: rotacion, scale: girando ? 1.05 : 1 }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
          className={`rounded-full ${girando ? 'drop-shadow-[0_0_30px_gold]' : 'drop-shadow-xl'}`}
        >
          {/* Aura externa rotando */}
          {girando && (
            <motion.circle
              cx={centro}
              cy={centro}
              r={320}
              fill="none"
              stroke="gold"
              strokeWidth={2}
              strokeDasharray="10 10"
              animate={{ rotate: 360 }}
              transform={`rotate(0 ${centro} ${centro})`}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          )}

          {/* Ruleta */}
          {tematicas.map((tema, i) => (
            <path key={i} d={createSlice(i, tematicas.length)} fill={tema.color} />
          ))}

          {/* Personajes */}
          {tematicas.map((tema, i) => {
            const angle = ((i + 0.5) * 360) / tematicas.length;
            const x = centro + (radio - 70) * Math.cos((Math.PI * angle) / 180);
            const y = centro + (radio - 70) * Math.sin((Math.PI * angle) / 180);
            return (
              <image
                key={i}
                href={tema.personaje}
                x={x - 40}
                y={y - 40}
                width={80}
                height={80}
              />
            );
          })}

          {/* Chispas */}
          {girando &&
            Array.from({ length: 20 }).map((_, i) => {
              const angle = (i * 360) / 20;
              const x = centro + (radio + 10) * Math.cos((Math.PI * angle) / 180);
              const y = centro + (radio + 10) * Math.sin((Math.PI * angle) / 180);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={Math.random() * 2 + 1.5}
                  fill="gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                    delay: i * 0.05,
                  }}
                />
              );
            })}

          {/* Explosión dorada */}
          {girando &&
            Array.from({ length: 8 }).map((_, i) => (
              <motion.circle
                key={`boom-${i}`}
                cx={centro}
                cy={centro}
                r={5}
                fill="yellow"
                animate={{
                  r: [5, 150],
                  opacity: [0.6, 0],
                }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            ))}
        </motion.svg>

        {/* Puntero central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], boxShadow: girando ? '0 0 20px gold' : 'none' }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[100px] h-[100px] rounded-full border-4 border-black bg-white flex items-center justify-center relative"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-black"></div>
            <img src="/logo.png" alt="logo" className="w-16 h-16 object-contain z-10" />
          </motion.div>
        </div>
      </div>

      <button
        onClick={girarRuleta}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        disabled={girando}
      >
        {girando ? 'Girando...' : 'Girar Ruleta'}
      </button>
    </div>
  );
};

export default RuletaTematicas;