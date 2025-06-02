function CssDetectivePanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 flex flex-col items-center justify-center p-8 font-sans">
      <img src="/foto-Detective.png" alt="Detective principal" className="w-64 h-auto mb-8 drop-shadow-2xl drop-shadow-[0_0_25px_white]"/>

      <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-6 drop-shadow-md">CSS Detective</h1>

      <p className="text-x text-indigo-800 max-w-2xl text-center mb-6 leading-relaxed">
        Un juego interactivo para aprender <span className="font-bold text-indigo-800">selectores CSS</span> resolviendo casos en escenas HTML. <br />
      </p>

      <button className="bg-white text-indigo-700 text-lg font-semibold px-6 py-2 rounded-xl shadow-lg">Iniciar caso</button>
    </div>
  );
}

export default CssDetectivePanel;