import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import MiniJuegoAhorcado from './pages/juegos/ahorcado/Ahorcado'

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />

    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />

    {/* Minijuego Ahorcado */}
    <Route path="/ahorcado" element={<MiniJuegoAhorcado />} />

  </Routes>
);

export default App;
