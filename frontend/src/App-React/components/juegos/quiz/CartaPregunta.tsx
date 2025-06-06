import { Boton } from "./ui/Boton"
import { Carta, CartaContent, CartaHeader, CartaTitle, CartaDescription } from "./ui/Carta"
import { CheckCircle, XCircle } from "lucide-react"
import type { Pregunta } from "./data/Preguntas"

interface preguntaCartaProps {
  pregunta: Pregunta
  respuestaSeleccionada: string | null
  mostrarResultados: boolean
  onPreguntaSeleccionada: (answer: string) => void
  onSiguientePregunta: () => void
  esUltimaPregunta: boolean
}

export default function PreguntaCarta({
  pregunta,
  respuestaSeleccionada,
  mostrarResultados,
  onPreguntaSeleccionada,
  onSiguientePregunta,
  esUltimaPregunta,
}: preguntaCartaProps) {
  return (
    <Carta className="w-w-full h-[500px] w-[700px] overflow-auto">
      <CartaHeader>
        <CartaTitle>¿Qué lenguaje de programación es este?</CartaTitle>
        <CartaDescription>Analiza el código y selecciona la respuesta correcta</CartaDescription>
      </CartaHeader>
      <CartaContent className="space-y-6">
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{pregunta.codigo}</code>
          </pre>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {pregunta.opciones.map((opcion) => {
            let BotonClass = "h-12 text-left justify-start"
            let icon = null

            if (mostrarResultados && respuestaSeleccionada) {
              if (opcion === pregunta.respuestaCorrecta) {
                BotonClass += " bg-green-100 border-green-500 text-green-700 hover:bg-green-100"
                icon = <CheckCircle className="h-4 w-4 text-green-600" />
              } else if (opcion === respuestaSeleccionada && opcion !== pregunta.respuestaCorrecta) {
                BotonClass += " bg-red-100 border-red-500 text-red-700 hover:bg-red-100"
                icon = <XCircle className="h-4 w-4 text-red-600" />
              } else {
                BotonClass += " opacity-50"
              }
            }

            return (
              <Boton
                key={opcion}
                variant="outline"
                className={BotonClass}
                onClick={() => onPreguntaSeleccionada(opcion)}
                disabled={mostrarResultados}
              >
                <span className="flex-1">{opcion}</span>
                {icon}
              </Boton>
            )
          })}
        </div>

        {mostrarResultados && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              {respuestaSeleccionada === pregunta.respuestaCorrecta ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-green-700 font-semibold">¡Correcto! +10 puntos</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-600" />
                  <span className="text-red-700 font-semibold">
                    Incorrecto. La respuesta era {pregunta.respuestaCorrecta}
                  </span>
                </>
              )}
            </div>

            {pregunta.explicacion && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="text-sm text-blue-800">
                  <strong>Explicación:</strong> {pregunta.explicacion}
                </div>
              </div>
            )}

            <Boton onClick={onSiguientePregunta} className="w-full" size="lg">
              {!esUltimaPregunta ? "Siguiente Pregunta" : "Ver Resultados"}
            </Boton>
          </div>
        )}
      </CartaContent>
    </Carta>
  )
}
