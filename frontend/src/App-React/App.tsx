import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import SopaLetras from './pages/juegos/sopaLetras/SopaLetras';

const App = () => (
  <Routes>
    {/* Página de inicio */}
    <Route path="/" element={<Home />} />

    {/* Página de registro */}
    <Route path="/register" element={<Register />} />

    {/* Página de login */}
    <Route path="/login" element={<Login />} />

    {/* Página de Sopa de letras */}
    <Route path="/sopaletras" element={<SopaLetras />} />

  </Routes>
);

export default App;
