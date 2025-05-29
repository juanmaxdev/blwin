import { Head } from '../components/Head';
import LoginButton from '../components/home/LoginButton';
import Slogan from '../components/home/Slogan';
import RankingPreview, { RankingItem } from '../components/home/RankingPreview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PersonajeCarrusel from '../components/home/PersonajeCarrusel';
import BotonSonido from '../components/ui/ButtonSound';

function decodeToken(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

const Home = () => {
  const navigate = useNavigate();
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [logueado, setLogueado] = useState(false);

  const handleJugar = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = decodeToken(token);
    const usuarioId = decoded?.id;

    if (!usuarioId) {
      alert('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('/api/Partida/Crear', {
        usuarioId
      });

      const partidaId = response.data.partidaId;
      localStorage.setItem('partidaId', partidaId);

      navigate('/juego');
    } catch (error) {
      console.error('Error al crear la partida:', error);
      alert('No se pudo iniciar la partida.');
    }
  };

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.get('/api/Partida/ranking/top5');
        setRanking(res.data);
      } catch (err) {
        console.error('Error al obtener el ranking:', err);
      }
    };

    fetchRanking();

    const token = localStorage.getItem('token');
    setLogueado(!!token);
  }, []);

  return (
    <>
      <Head title="Inicio | Triviados" description="Juego de trivia en línea" />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 relative overflow-hidden">
        <BotonSonido />
        <LoginButton />

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow mt-6">
              ¡Bienvenido a Triviados!
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.img
              src="/logo.png"
              alt="Logo Triviados"
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

              {logueado && (
                <button
                  onClick={handleJugar}
                  className="mt-4 px-8 py-4 text-lg font-bold bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                >
                  Jugar Ahora
                </button>
              )}
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3 }}
            >
              <RankingPreview ranking={ranking} />
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

        <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-blue-300 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      </div>
    </>
  );
};

export default Home;
