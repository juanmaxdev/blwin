type ModeloImagenProps = {
    rutaImagen: string;
    descripImagen?: string;
}

export default function ModeloImagen({rutaImagen, descripImagen}: ModeloImagenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={rutaImagen} alt={descripImagen} />
    </div>
  );
}
