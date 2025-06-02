//import { useNavigate } from 'react-router-dom';
//import Abecedario from '../../../components/juegos/ahorcado/Abecedario';
import ModeloImagen from '../../../components/juegos/ahorcado/modelo/Modelo';
import {imagenSeleccionada} from '../../../components/juegos/ahorcado/types/Types';

function decodeToken(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

const imagenesAhorcado: imagenSeleccionada[] = [
    {
        imagen: '@/assets/juegos/ahorcado/modelo/ahorcado_1.png',
        descripcion: 'Ahorcado - Paso 1',
    },
    {
        imagen: '../../assets/juegos/ahorcado/modelo/ahorcado_2.png',
        descripcion: 'Ahorcado - Paso 2',
    },
    {
        imagen: '../../assets/juegos/ahorcado/modelo/ahorcado_3.png',
        descripcion: 'Ahorcado - Paso 3',
    },
    {
        imagen: '../../assets/juegos/ahorcado/modelo/ahorcado_4.png',
        descripcion: 'Ahorcado - Paso 4',
    },
    {
        imagen: '../../assets/juegos/ahorcado/modelo/ahorcado_5.png',
        descripcion: 'Ahorcado - Paso 5',
    },
    {
        imagen: '../../assets/juegos/ahorcado/modelo/ahorcado_6.png',
        descripcion: 'Ahorcado - Paso 6',
    },
];

const Ahorcado = () => {

    const imagenSeleccionada = imagenesAhorcado[0];

  {
    /*  const navigate = useNavigate();

  
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
  }*/
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200 relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">Juego de Ahorcado</h1>
      <ModeloImagen rutaImagen={imagenSeleccionada.imagen} descripImagen={imagenSeleccionada.descripcion}/>
    </div>
  );
};

export default Ahorcado;
