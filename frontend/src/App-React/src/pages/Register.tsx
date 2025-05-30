import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderWithLogo from '../components/layout/HeaderWithLogo';
import FormInput from '../components/ui/FormInput';
import GradientCharacter from '../components/GradientCharacter';
import Button from '../components/ui/Button';
import { Head } from '../components/Head';
import { registerPost } from '../hooks/Register';
import { loginPost } from '../hooks/Login';



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
      setMensaje('Las contraseñas no coinciden');
      setEsError(true);
      return;
    }

    try {
      const registro = await registerPost(nombre, password);

      if (!registro) {
        setMensaje('Error al registrar');
        setEsError(true);
        return;
      }

      setMensaje('Registro exitoso');
      setEsError(false);

      try {
        await loginPost(nombre, password);

      } catch (err) {
        console.error(err);
        setMensaje('Error al conectar con el servidor');
        setEsError(true);
      }

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
