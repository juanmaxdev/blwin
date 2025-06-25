export function TiposPreguntas() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold mb-3">🎲 Tipos de Preguntas:</h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📚</span>
            <span>Teoría</span>
          </span>
          <span className="text-blue-600 font-semibold">15 preguntas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🧩</span>
            <span>Completar Código</span>
          </span>
          <span className="text-green-600 font-semibold">15 preguntas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🔮</span>
            <span>Predecir Output</span>
          </span>
          <span className="text-purple-600 font-semibold">15 preguntas</span>
        </div>
      </div>
    </div>
  )
}