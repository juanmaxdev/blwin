import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import PanelDetectiveJuego from './components/juegos/juego_selectores/detectiveJuegoPanel/DetectiveJuegoPanel';
import MinijuegoCSS from './components/juegos/juego_selectores/nivel1/nivel1';

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />

    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />

    {/* Página de login */}
    <Route path="/juego/selectores" element={<PanelDetectiveJuego />} />
    <Route path="/juego/selectores/nive-uno" element={<MinijuegoCSS />} />


  </Routes>
);

export default App;
