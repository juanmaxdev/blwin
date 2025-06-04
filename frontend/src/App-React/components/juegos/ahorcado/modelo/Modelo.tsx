type ModeloImagenProps = {
    rutaImagen: string;
    descripImagen?: string;
}

export default function ModeloImagen({rutaImagen, descripImagen}: ModeloImagenProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img 
        src={rutaImagen} 
        alt={descripImagen}
        style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
}
