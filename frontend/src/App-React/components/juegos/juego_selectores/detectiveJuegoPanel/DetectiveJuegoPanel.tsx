import BotonSonido from '../../../../components/ui/ButtonSound';

function CssDetectivePanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 flex flex-col items-center justify-center p-8 font-sans">
      <BotonSonido />

      <img src="/foto-detective1.png" alt="Detective principal" className="w-64 h-auto mb-8 drop-shadow-2xl drop-shadow-[0_0_25px_white]" />

      <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-6 drop-shadow-md">CSS Detective</h1>

      <p className="text-x text-indigo-800 max-w-2xl text-center mb-6 leading-relaxed">
        Un juego interactivo para aprender <span className="font-bold text-indigo-800">selectores CSS</span> resolviendo casos en escenas HTML<br />
      </p>

      <button
        onClick={() => {
          // Eliminar si existen las variables "nivelXSuperado"
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key?.startsWith('nivel') && key.endsWith('Superado')) {
              sessionStorage.removeItem(key);
              i--;
            }
          }

          window.location.href = '/juego/selectores/nivel-1';
        }}
        className="bg-white text-indigo-700 text-lg font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-100 transition-all duration-300 hover:scale-105"
      >
        Iniciar caso
      </button>
    </div>
  );
}

export default CssDetectivePanel;