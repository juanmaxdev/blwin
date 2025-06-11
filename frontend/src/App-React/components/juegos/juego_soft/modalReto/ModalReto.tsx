import { useState } from "react"
import  Boton from "../../../ui/Button"
import type { Retos } from "../types/Juego"

interface ModalRetosProps {
  retos: Retos
  onComplete: (correct: boolean) => void
  onClose: () => void
}

export function retosModal({ retos, onComplete, onClose }: ModalRetosProps) {
  const [preguntaSeleccionada, setpreguntaSeleccionada] = useState("")
  const [preguntaCodigo, setpreguntaCodigo] = useState("")
  const [verResultado, setverResultado] = useState(false)
  const [esCorrecto, setesCorrecto] = useState(false)

  const handleSubmit = () => {
    let correct = false

    if (retos.tipo === "codigo-completo") {
      correct = preguntaCodigo.toLowerCase().trim().includes(retos.respuestaCorrecta.toLowerCase())
    } else {
      correct = preguntaSeleccionada === retos.respuestaCorrecta
    }

    setesCorrecto(correct)
    setverResultado(true)
  }

  const handleContinue = () => {
    onComplete(esCorrecto)
    onClose()
  }

  const getlenguajeIcon = (lenguaje: string) => {
    const icons = { Java: "☕", "C#": "🔷", tipoScript: "📘", JavaScript: "🟨" }
    return icons[lenguaje as keyof typeof icons] || "💻"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getlenguajeIcon(retos.lenguaje)}</span>
              <div>
                <h2 className="text-2xl font-bold">{retos.titulo}</h2>
                <span className="text-sm text-gray-600">{retos.lenguaje}</span>
              </div>
            </div>
            <Boton onClick={onClose}>
              ✕
            </Boton>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">{retos.preguntas}</h3>

            {/* Código base */}
            {(retos.codigo || retos.plantillaCodigo) && (
              <div className="mb-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono">
                    {retos.tipo === "codigo-completo" ? retos.plantillaCodigo : retos.codigo}
                  </pre>
                </div>
              </div>
            )}

            {/* Input para código */}
            {retos.tipo === "codigo-completo" && (
              <div className="mb-4">
                <input
                  type="text"
                  value={preguntaCodigo}
                  onChange={(e) => setpreguntaCodigo(e.target.value)}
                  className="w-full p-3 border rounded-lg font-mono"
                  placeholder="Completa el código..."
                  disabled={verResultado}
                />
              </div>
            )}

            {/* Opciones múltiples */}
            {(retos.tipo === "teoría" || retos.tipo === "predecir-salida") && retos.opciones && (
              <div className="space-y-3">
                {retos.opciones.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                      preguntaSeleccionada === option ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    } ${verResultado && option === retos.respuestaCorrecta ? "border-green-500 bg-green-50" : ""}
                    ${verResultado && preguntaSeleccionada === option && option !== retos.respuestaCorrecta ? "border-red-500 bg-red-50" : ""}`}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={preguntaSeleccionada === option}
                      onChange={(e) => setpreguntaSeleccionada(e.target.value)}
                      className="mr-3 mt-1"
                      disabled={verResultado}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {verResultado && (
            <div className={`p-4 rounded-lg mb-4 ${esCorrecto ? "bg-green-50" : "bg-red-50"}`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{esCorrecto ? "🎉" : "📚"}</span>
                <span className={`font-bold ${esCorrecto ? "text-green-800" : "text-red-800"}`}>
                  {esCorrecto ? "¡Correcto!" : "Incorrecto"}
                </span>
              </div>
              <p className="text-sm mb-2">{retos.explicacion}</p>
              {!esCorrecto && (
                <p className="text-sm font-mono bg-white p-2 rounded">Respuesta: {retos.respuestaCorrecta}</p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {!verResultado ? (
              <>
                <Boton onClick={onClose}>
                  Cancelar
                </Boton>
                <Boton
                  onClick={handleSubmit}
                  disabled={
                    (retos.tipo === "codigo-completo" && !preguntaCodigo.trim()) ||
                    ((retos.tipo === "teoría" || retos.tipo === "predecir-salida") && !preguntaSeleccionada)
                  }
                >
                  Verificar
                </Boton>
              </>
            ) : (
              <Boton onClick={handleContinue}>{esCorrecto ? "✓ Continuar" : "Intentar de nuevo"}</Boton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}