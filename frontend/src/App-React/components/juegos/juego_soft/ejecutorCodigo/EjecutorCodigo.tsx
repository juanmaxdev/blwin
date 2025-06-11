import { useState, useEffect } from "react"

interface EjecutorCodigoProps {
    codigo: string
    testCases?: Array<{
    input?: any[]
    salidaEsperada: any
    descripcion: string
  }>
}

export function EjecutorCodigo({ codigo, testCases }: EjecutorCodigoProps) {
  const [output, setOutput] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; descripcion: string; actual?: any }>>([])

  const executecodigo = async () => {
    setIsExecuting(true)
    setOutput("")
    setTestResults([])

    try {
      // Capturar console.log
      const logs: string[] = []
      const originalLog = console.log
      console.log = (...args) => {
        logs.push(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" "))
      }

      // Ejecutar el código
      const func = new Function(codigo)
      func()

      // Restaurar console.log
      console.log = originalLog

      // Mostrar output
      setOutput(logs.join("\n") || "Código ejecutado sin output")

      // Ejecutar test cases si existen
      if (testCases && testCases.length > 0) {
        const results = testCases.map((testCase) => {
          try {
            // Extraer el nombre de la función del código
            const functionMatch = codigo.match(/function\s+(\w+)\s*\(/)
            if (!functionMatch) {
              return { passed: false, descripcion: testCase.descripcion, actual: "No se encontró función" }
            }

            const functionName = functionMatch[1]

            // Crear contexto para ejecutar la función
            const testFunc = new Function(`
              ${codigo}
              return ${functionName};
            `)

            const extractedFunction = testFunc()

            if (testCase.input) {
              const actual = extractedFunction(...testCase.input)
              const passed = JSON.stringify(actual) === JSON.stringify(testCase.salidaEsperada)
              return { passed, descripcion: testCase.descripcion, actual }
            } else {
              // Para casos sin input específico
              const actual = extractedFunction()
              const passed = JSON.stringify(actual) === JSON.stringify(testCase.salidaEsperada)
              return { passed, descripcion: testCase.descripcion, actual }
            }
          } catch (error) {
            return { passed: false, descripcion: testCase.descripcion, actual: `Error: ${error}` }
          }
        })

        setTestResults(results)
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    }

    setIsExecuting(false)
  }

  useEffect(() => {
    // Auto-ejecutar cuando cambia el código
    const timer = setTimeout(() => {
      executecodigo()
    }, 500)

    return () => clearTimeout(timer)
  }, [codigo])

  return (
    <div className="bg-gray-900 rounded-lg p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-green-400">🚀 Ejecución en Vivo</h4>
        <button
          onClick={executecodigo}
          disabled={isExecuting}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm disabled:opacity-50"
        >
          {isExecuting ? "Ejecutando..." : "▶ Ejecutar"}
        </button>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-400 mb-1">Output:</div>
        <div className="bg-black rounded p-2 min-h-[40px] font-mono text-sm">
          {output || (isExecuting ? "Ejecutando..." : "Esperando ejecución...")}
        </div>
      </div>

      {testResults.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 mb-2">Resultados de Pruebas:</div>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded text-xs ${
                  result.passed ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{result.passed ? "✅" : "❌"}</span>
                  <span>{result.descripcion}</span>
                </div>
                {!result.passed && result.actual && (
                  <div className="mt-1 text-xs opacity-75">
                    Resultado:{" "}
                    {typeof result.actual === "object" ? JSON.stringify(result.actual) : String(result.actual)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
