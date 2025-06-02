import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import PanelDetectiveJuego from './components/juegos/juego_selectores/detectiveJuegoPanel/DetectiveJuegoPanel';
import MinijuegoCSS from './components/juegos/juego_selectores/nivel1/nivel1';
import Nivel2 from './components/juegos/juego_selectores/nivel2/nivel2';
import Nivel3 from './components/juegos/juego_selectores/nivel3/nivel3';

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />

    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />

    {/* Página de Principal de Juego Detective CSS */}
    <Route path="/juego/selectores" element={<PanelDetectiveJuego />} />

    {/* Página-Nivel 1 de Juego Detective CSS */}
    <Route path="/juego/selectores/nivel-1" element={<MinijuegoCSS />} />

    {/* Página-Nivel 2 de Juego Detective CSS */}
    <Route path="/juego/selectores/nivel-2" element={<Nivel2 />} />

    {/* Página-Nivel 3 de Juego Detective CSS */}
    <Route path="/juego/selectores/nivel-3" element={<Nivel3 />} />
  </Routes>
);

export default App;
