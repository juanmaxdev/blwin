export function ComoJugar() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold mb-3">🎯 Cómo Jugar:</h4>
      <ul className="text-sm space-y-2">
        <li className="flex items-start">
          <span className="mr-2">1️⃣</span>
          <span>Haz clic en cualquier botón de acción</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">2️⃣</span>
          <span>Responde la pregunta aleatoria de programación</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">3️⃣</span>
          <span>Si es correcta, se ejecuta la acción</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">4️⃣</span>
          <span>Completa 4 partidas para ver tu resumen</span>
        </li>
      </ul>
    </div>
  )
}