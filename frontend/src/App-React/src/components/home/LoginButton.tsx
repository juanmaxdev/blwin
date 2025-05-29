import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioLogueado');
    setUsuario(storedUser);
  }, []);

  const handleLogout = () => {
    // Eliminar todo lo relacionado a la sesión
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('token');
    localStorage.removeItem('partidaId');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <div className="absolute top-6 right-6 z-20">
      {usuario ? (
        <div className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow-md">
          <span className="truncate max-w-[100px]">{usuario}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline ml-2"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-indigo-50 transition"
        >
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
