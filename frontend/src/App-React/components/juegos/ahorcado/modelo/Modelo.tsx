type ModeloImagenProps = {
    rutaImagen: string;
    descripImagen?: string;
}

export default function ModeloImagen({rutaImagen, descripImagen}: ModeloImagenProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={rutaImagen} alt={descripImagen} />
    </div>
  );
}
