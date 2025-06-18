// Importa el botón de sonido personalizado desde la carpeta de componentes
import BotonSonido from '../../../../components/ui/ButtonSound';

// Componente principal que muestra la pantalla de bienvenida del juego
export const DetectiveJuegoPanel = () => {
  return (
    // Contenedor general con fondo en gradiente, centrado y con padding
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 flex flex-col items-center justify-center p-8 font-sans">
      
      {/* Botón de sonido que permite activar/desactivar música o efectos */}
      <BotonSonido />

      {/* Imagen del personaje detective */}
      <img
        src="/foto-detective1.png"
        alt="Detective principal"
        className="w-64 h-auto mb-8 drop-shadow-2xl drop-shadow-[0_0_25px_white]"
      />

      {/* Título principal del juego */}
      <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-6 drop-shadow-md">
        CSS Detective
      </h1>

      {/* Descripción del juego centrada con estilo relajado */}
      <p className="text-x text-indigo-800 max-w-2xl text-center mb-6 leading-relaxed">
        Un juego interactivo para aprender <span className="font-bold text-indigo-800">selectores CSS</span> resolviendo casos en escenas HTML
        <br />
      </p>

      {/* Botón para iniciar el juego desde el nivel 1 */}
      <button
        onClick={() => {
          // Se eliminan del sessionStorage todas las claves que marcan niveles superados
          const clavesAEliminar = [];
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key?.startsWith('nivel') && key.endsWith('Superado')) {
              clavesAEliminar.push(key);
            }
          }

          // Se eliminan las claves identificadas
          clavesAEliminar.forEach((key) => sessionStorage.removeItem(key));

          // Redirige al primer nivel del juego
          window.location.href = '/juego/selectores/nivel-1';
        }}
        className="bg-white text-indigo-700 text-lg font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-100 transition-all duration-300 hover:scale-105"
      >
        Iniciar Juego
      </button>
    </div>
  );
}
