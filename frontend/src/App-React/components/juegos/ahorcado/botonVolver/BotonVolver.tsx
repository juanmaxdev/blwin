import { useNavigate } from 'react-router-dom';

type BotonProps = {
  nombre: string;
}

export default function Boton({nombre}: BotonProps) {
  const navigate = useNavigate();

  return (
    <button className="text-black text-3xl fuente" onClick={() => navigate('/')}>
      {nombre}
    </button>
  );
}
