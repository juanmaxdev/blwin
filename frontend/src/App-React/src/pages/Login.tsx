import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderWithLogo from '../components/layout/HeaderWithLogo';
import FormInput from '../components/ui/FormInput';
import GradientCharacter from '../components/GradientCharacter';
import Button from '../components/ui/Button';
import { Head } from '../components/Head';
import BotonSonido from '../components/ui/ButtonSound';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nombre, password: password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMensaje(result.message || 'Credenciales incorrectas');
        setEsError(true);
        return;
      }

      const token = result.token;

      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const userId = payload.id;

      localStorage.setItem('token', token);
      localStorage.setItem('usuarioLogueado', nombre);
      localStorage.setItem('usuarioId', userId);

      setMensaje('Inicio de sesión exitoso');
      setEsError(false);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error(err);
      setMensaje('Error al conectar con el servidor');
      setEsError(true);
    }
  };

  return (
    <>
      <Head title="Iniciar Sesión | Triviados" description="Página de inicio de sesión para usuarios" />
      <BotonSonido />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
        <HeaderWithLogo />
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] gap-8">
          <div className="flex-1 hidden md:flex">
            <GradientCharacter
              src="/personaje-izquierda.png"
              alt="Personaje Izquierda"
              gradientFrom="from-yellow-300"
              gradientTo="to-yellow-500"
            />
          </div>

          <div className="flex-1 max-w-full w-full bg-white shadow-2xl rounded-3xl p-10 z-10 relative">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormInput
                type="text"
                placeholder="Nombre de usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <FormInput
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Entrar</Button>
            </form>

            {mensaje && (
              <p className={`mt-4 text-center font-medium ${esError ? 'text-red-600' : 'text-green-600'}`}>
                {mensaje}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-indigo-500 hover:underline font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="flex-1 hidden md:flex">
            <GradientCharacter
              src="/personaje-derecha.png"
              alt="Personaje Derecha"
              gradientFrom="from-purple-400"
              gradientTo="to-indigo-600"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
