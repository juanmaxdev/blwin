import '../../../../../assets/juegos/codequest/styles/styles.css';

interface BarraDeVidaProps {
  actual: number;
  max: number;
  width?: string;
  height?: string;
  esJefe?: string;
}

export default function BarraDeVida({ actual, max, width = 'w-full', height = 'h-6', esJefe }: BarraDeVidaProps) {
  const percentage = Math.max(0, Math.min(100, (actual / max) * 100));

  // Determinar el color basado en el porcentaje de vida
  const getColorClass = () => {
    if (percentage <= 20) return 'bg-red-600';
    if (percentage <= 50) return 'bg-yellow-500';
    return esJefe ? 'bg-purple-600' : 'bg-green-600';
  };

  // Aqui colocamos las estilos de los personajes de vida y nombres

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-bold px-1">
        <span
          className={
            esJefe
              ? 'text-2xl font-bold textoFuente bg-gradient-to-r from-purple-500 to-red-800 bg-clip-text text-transparent'
              : 'text-2xl font-bold textoFuente bg-gradient-to-r from-purple-500 to-red-800 bg-clip-text text-transparent'
          }
        >
          {esJefe ? esJefe : ''}
        </span>
        <span className="text-xl text-white">{`${actual}/${max} HP`}</span>
      </div>
      <div
        className={`${width} ${height} bg-gray-200 rounded-full overflow-hidden border-2 ${
          esJefe ? 'border-purple-800' : 'border-green-800'
        } shadow-inner relative`}
        role="progressbar" // Agregar el rol
        aria-valuenow={actual} // Agregar el valor actual
        aria-valuemin={0} // Valor mínimo
        aria-valuemax={max} // Valor máximo
      >
        <div
          className={`${getColorClass()} h-full rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${percentage}%`,
          }}
        />

        {/* Líneas decorativas para efecto de segmentación */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-black/10" />
          ))}
        </div>

        {/* Brillo en la parte superior */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
