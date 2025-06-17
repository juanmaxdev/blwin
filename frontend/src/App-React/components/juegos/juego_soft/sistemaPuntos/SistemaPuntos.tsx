export function SistemaPuntos() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold mb-2">🏆 Sistema de Puntos:</h4>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>Respuesta correcta:</span>
          <span className="font-semibold text-green-600">+10 puntos</span>
        </div>
        <div className="flex justify-between">
          <span>Respuesta incorrecta:</span>
          <span className="font-semibold text-red-600">-5 puntos</span>
        </div>
      </div>
    </div>
  )
}
