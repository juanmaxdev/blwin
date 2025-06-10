import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import MiniJuegoAhorcado from './pages/juegos/ahorcado/Ahorcado'
import PaginaJuegoEsquivar from './pages/juegos/PaginaJuegoEsquivar';
import SopaLetras from './pages/juegos/PaginaJuegoSopaDeLetras';
import JuegoQuiz from './pages/juegos/quiz/JuegoQuiz';

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />

    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />

    <Route path="/juego_esquivar" element={<PaginaJuegoEsquivar />} />

    <Route path="/login" element={<Login />} />

    <Route path="/juegos_sopa_de_letras" element={<SopaLetras />} />

    {/* Minijuego Ahorcado */}
    <Route path="/ahorcado" element={<MiniJuegoAhorcado />} />

    {/* Juego Z-Wing */}
    <Route path="/juego_esquivar" element={<PaginaJuegoEsquivar />} />

    {/* Juego Quiz */}
    <Route path="/juego-quiz" element={<JuegoQuiz />} />

  </Routes>

);

export default App;
