export function Lenguajes() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold mb-3">💻 Lenguajes:</h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>☕</span>
            <span>Java</span>
          </span>
          <span className="text-orange-600 font-semibold">POO, Collections</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🔷</span>
            <span>C#</span>
          </span>
          <span className="text-purple-600 font-semibold">Types, LINQ</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📘</span>
            <span>TypeScript</span>
          </span>
          <span className="text-blue-600 font-semibold">Interfaces, Generics</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🟨</span>
            <span>JavaScript</span>
          </span>
          <span className="text-yellow-600 font-semibold">ES6+, DOM</span>
        </div>
      </div>
    </div>
  )
}
