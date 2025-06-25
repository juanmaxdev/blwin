import { Head } from '../../components/Head';
import LoginButton from '../../components/home/LoginButton';
import Slogan from '../../components/home/Slogan';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PersonajeCarrusel from '../../components/home/PersonajeCarrusel';
import BotonSonido from '../../components/ui/ButtonSound';
import Ranking from '../../components/ranking/Ranking';


const Home = () => {
  const [, setLogueado] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    setLogueado(!!token);
  }, []);

  return (
    <>
      <Head title="Inicio | BLWin" description="Juego para aprender programación en línea" />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 relative overflow-hidden">
        <BotonSonido />
        <LoginButton />

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow mt-6">
              ¡Bienvenido a BLWin!
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.img
              src="/logo.png"
              alt="Logo BLWin"
              className="w-72 h-72 object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Slogan />
            </motion.div>


            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3 }}
            >
              <Ranking tituloRanking={'Top 5 global'}></Ranking>
            </motion.div>
          </div>
        </main>

        {/* Animaciones decorativas */}
        <div className="relative w-full h-32 overflow-hidden mb-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-[150%] rounded-full opacity-60"
                style={{
                  top: `${i * 20 + 5}px`,
                  backgroundColor: ['#EF4444', '#FACC15', '#3B82F6', '#8B5CF6', '#FB923C', '#86EFAC'][i % 6],
                }}
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        </div>

        <PersonajeCarrusel />

      </div>
    </>
  );
};

export default Home;
