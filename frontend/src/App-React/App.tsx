import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import PanelDetectiveJuego from './components/juegos/juegos_selectores/detectiveJuegoPanel/DetectiveJuegoPanel';

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

  </Routes>
);

export default App;
