import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderWithLogo from '../components/layout/HeaderWithLogo';
import FormInput from '../components/ui/FormInput';
import GradientCharacter from '../components/GradientCharacter';
import Button from '../components/ui/Button';
import { Head } from '../components/Head';



const Register = () => {

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      setEsError(true);
      return;
    }

    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, password: password }),
      });


      if (!response.ok) {
        const errorText = await response.text();
        setMensaje(`❌ Error al registrar: ${errorText}`);
        setEsError(true);
        return;
      }

      const result = await response.text();
      setMensaje(`✅ ${result}`);
      setEsError(false);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      // Error de conexión
      console.error(err);
      setMensaje('❌ Error al conectar con el servidor');
      setEsError(true);
    }
  };

  return (
    <>
      <Head title="Registro | Triviados" description="Crea tu cuenta en Triviados" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
        <HeaderWithLogo />

        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] gap-8">

          <div className="flex-1 hidden md:flex">
            <GradientCharacter
              src="/personaje-registro-izquierda.png"
              alt="Personaje Registro Izquierda"
              gradientFrom="from-blue-300"
              gradientTo="to-blue-600"
            />
          </div>

          <div className="flex-1 max-w-full w-full bg-white shadow-2xl rounded-3xl p-10 z-10 relative">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Crear Cuenta</h2>
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
              <FormInput
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Registrarse</Button>
            </form>

            {mensaje && (
              <p className={`mt-4 text-center font-medium ${esError ? 'text-red-600' : 'text-green-600'}`}>
                {mensaje}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-indigo-500 hover:underline font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>

          <div className="flex-1 hidden md:flex">
            <GradientCharacter
              src="/personaje-registro-derecha.png"
              alt="Personaje Registro Derecha"
              gradientFrom="from-orange-300"
              gradientTo="to-orange-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
