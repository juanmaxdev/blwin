import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import PaginaJuegoEsquivar from './pages/juegos/PaginaJuegoEsquivar';

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />
    
    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />
      <Route path="/juego_esquivar" element={<PaginaJuegoEsquivar />} />
  </Routes>
);

export default App;
