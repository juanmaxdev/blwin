import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import MiniJuegoAhorcado from './pages/juegos/ahorcado/Ahorcado'
import PaginaJuegoEsquivar from './pages/juegos/PaginaJuegoEsquivar';
import JuegoQuiz from './pages/juegos/quiz/JuegoQuiz';
import PanelDetectiveJuego from './components/juegos/juego_selectores/detectiveJuegoPanel/DetectiveJuegoPanel';
import MinijuegoCSS from './components/juegos/juego_selectores/nivel1/Nivel1';
import Nivel3 from './components/juegos/juego_selectores/nivel3/Nivel3';
import Nivel2 from './components/juegos/juego_selectores/nivel2/Nivel2';
import Nivel4 from './components/juegos/juego_selectores/nivel4/Nivel4';
import Nivel5 from './components/juegos/juego_selectores/nivel5/Nivel5';
import Nivel8 from './components/juegos/juego_selectores/nivel8/Nivel8';
import Nivel6 from './components/juegos/juego_selectores/nivel6/Nivel6';
import Nivel9 from './components/juegos/juego_selectores/nivel9/Nivel9';
import Nivel7 from './components/juegos/juego_selectores/nivel7/Nivel7';
import NivelDetectiveFlexbox from './components/juegos/juego_selectores/nivel_bonus/NivelBonus';

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

        {/* Juego Z-Wing */}
        <Route path="/juego_esquivar" element={<PaginaJuegoEsquivar />} />

        {/* Juego Quiz */}
        <Route path="/juego-quiz" element={<JuegoQuiz />} />

        {/* Página de Principal de Juego Detective CSS */}
        <Route path="/juego/selectores" element={<PanelDetectiveJuego />} />

        {/* Página-Nivel 1 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-1" element={<MinijuegoCSS />} />

        {/* Página-Nivel 2 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-2" element={<Nivel2 />} />

        {/* Página-Nivel 3 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-3" element={<Nivel3 />} />

        {/* Página-Nivel 4 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-4" element={<Nivel4 />} />

        {/* Página-Nivel 5 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-5" element={<Nivel5 />} />

        {/* Página-Nivel 6 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-6" element={<Nivel6 />} />

        {/* Página-Nivel 7 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-7" element={<Nivel7 />} />

        {/* Página-Nivel 8 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-8" element={<Nivel8 />} />

        {/* Página-Nivel 9 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-9" element={<Nivel9 />} />

        {/* Página-Nivel 10 de Juego Detective CSS */}
        <Route path="/juego/selectores/nivel-10" element={<NivelDetectiveFlexbox />} />

    </Routes>
);

export default App;
