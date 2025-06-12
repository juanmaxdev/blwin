type BotonProps = {
  nombre: string;
}

export default function Boton({nombre}: BotonProps) {

  return (
    <button className="text-black text-3xl fuente" onClick={() => window.parent.location.reload()}>
      {nombre}
    </button>
  );
}
